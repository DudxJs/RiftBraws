const arena = {
  width: 1280,
  height: 720,
  gravity: 1800,
  floorY: 640,
  lastTime: 0,
  running: false,
  winner: null
};

const keys = {};
const platforms = [
  { x: 0, y: 660, w: 1280, h: 60 },
  { x: 180, y: 540, w: 220, h: 18 },
  { x: 540, y: 470, w: 220, h: 18 },
  { x: 860, y: 540, w: 220, h: 18 }
];

function createFighter({ x, y, color, name, facing = 1, isBot = false }) {
  return {
    name,
    x,
    y,
    w: 44,
    h: 58,
    vx: 0,
    vy: 0,
    speed: 360,
    jumpPower: 700,
    color,
    facing,
    onGround: false,
    health: 100,
    attackCooldown: 0,
    attackTimer: 0,
    heavyCooldown: 0,
    isBot,
    lastHitAt: 0,
    hitFlash: 0
  };
}

const player = createFighter({ x: 180, y: 560, color: '#7fe7a8', name: 'Jogador', facing: 1, isBot: false });
const bot = createFighter({ x: 990, y: 560, color: '#ff8d70', name: 'Bot', facing: -1, isBot: true });

function setCanvasSize() {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;

  const ratio = 1280 / 720;
  const availableWidth = window.innerWidth - 40;
  const availableHeight = window.innerHeight - 140;
  const width = Math.min(availableWidth, availableHeight * ratio);
  const height = width / ratio;

  canvas.width = 1280;
  canvas.height = 720;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function rectsIntersect(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function getAttackBox(fighter) {
  const direction = fighter.facing;
  return {
    x: fighter.x + (direction > 0 ? fighter.w : -60),
    y: fighter.y + 8,
    w: 60,
    h: 42
  };
}

function updateHud() {
  const playerFill = document.getElementById('player-health-fill');
  const botFill = document.getElementById('bot-health-fill');
  if (playerFill) playerFill.style.width = `${player.health}%`;
  if (botFill) botFill.style.width = `${bot.health}%`;
}

function setMessage(text) {
  const el = document.getElementById('game-message');
  if (!el) return;
  if (!text) {
    el.classList.add('hidden');
    el.textContent = '';
    return;
  }
  el.textContent = text;
  el.classList.remove('hidden');
}

function resetStage() {
  player.x = 190;
  player.y = 560;
  player.vx = 0;
  player.vy = 0;
  player.health = 100;
  player.onGround = false;
  player.attackCooldown = 0;
  player.attackTimer = 0;
  player.heavyCooldown = 0;
  player.facing = 1;

  bot.x = 1040;
  bot.y = 560;
  bot.vx = 0;
  bot.vy = 0;
  bot.health = 100;
  bot.onGround = false;
  bot.attackCooldown = 0;
  bot.attackTimer = 0;
  bot.heavyCooldown = 0;
  bot.facing = -1;

  arena.running = true;
  arena.winner = null;
  updateHud();
  setMessage('');
}

function showMainMenu() {
  const overlay = document.getElementById('game-overlay');
  if (overlay) overlay.classList.add('hidden');
  document.querySelectorAll('.page').forEach(page => page.classList.add('active'));
  const home = document.getElementById('page-home');
  if (home) home.classList.add('active');
  arena.running = false;
}

function startGame() {
  setCanvasSize();
  resetStage();
  const overlay = document.getElementById('game-overlay');
  if (overlay) overlay.classList.remove('hidden');
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
}

function stopGame() {
  showMainMenu();
}

function attackFighter(attacker, defender, heavy = false) {
  const attackBox = getAttackBox(attacker);
  const hitBox = {
    x: defender.x,
    y: defender.y,
    w: defender.w,
    h: defender.h
  };

  if (!rectsIntersect(attackBox, hitBox)) return false;

  const damage = heavy ? 18 : 10;
  const force = heavy ? 780 : 540;
  defender.health = clamp(defender.health - damage, 0, 100);
  defender.vx = (attacker.x < defender.x ? 1 : -1) * force;
  defender.vy = -280;
  defender.hitFlash = 0.12;
  defender.lastHitAt = performance.now();

  if (defender.health <= 0) {
    arena.winner = attacker.name;
    arena.running = false;
    setMessage(`${attacker.name} venceu! Pressione R para recomeçar.`);
  }

  return true;
}

function updateFighter(fighter, dt, controlState, isBot = false) {
  if (fighter.health <= 0) return;

  fighter.attackCooldown = Math.max(0, fighter.attackCooldown - dt);
  fighter.heavyCooldown = Math.max(0, fighter.heavyCooldown - dt);
  fighter.hitFlash = Math.max(0, fighter.hitFlash - dt);

  const moveLeft = controlState.left;
  const moveRight = controlState.right;
  const jump = controlState.jump;
  const attack = controlState.attack;
  const heavy = controlState.heavy;

  if (moveLeft) fighter.vx = -fighter.speed;
  else if (moveRight) fighter.vx = fighter.speed;
  else fighter.vx *= 0.75;

  if (fighter.vx !== 0) fighter.facing = fighter.vx > 0 ? 1 : -1;

  if (jump && fighter.onGround) {
    fighter.vy = -fighter.jumpPower;
    fighter.onGround = false;
  }

  fighter.vy += arena.gravity * dt;
  fighter.x += fighter.vx * dt;
  fighter.y += fighter.vy * dt;

  fighter.x = clamp(fighter.x, 0, arena.width - fighter.w);

  let grounded = false;
  for (const platform of platforms) {
    const prevY = fighter.y - fighter.vy * dt;
    const abovePlatform = prevY + fighter.h <= platform.y + 10 && fighter.y + fighter.h >= platform.y && fighter.y + fighter.h <= platform.y + 80;

    if (rectsIntersect(fighter, platform)) {
      if (fighter.vy >= 0 && abovePlatform) {
        fighter.y = platform.y - fighter.h;
        fighter.vy = 0;
        fighter.onGround = true;
        grounded = true;
      }
    }
  }

  if (!grounded) {
    fighter.onGround = false;
  }

  if (fighter.y > arena.height + 200) {
    fighter.health = 0;
    arena.winner = isBot ? 'Jogador' : 'Bot';
    arena.running = false;
    setMessage(`${arena.winner} venceu! Pressione R para recomeçar.`);
  }

  fighter.attackTimer = Math.max(0, fighter.attackTimer - dt);
  if (attack && fighter.attackCooldown <= 0) {
    fighter.attackCooldown = 0.32;
    fighter.attackTimer = 0.16;
    attackFighter(fighter, isBot ? player : bot, false);
  }

  if (heavy && fighter.heavyCooldown <= 0) {
    fighter.heavyCooldown = 0.72;
    fighter.attackTimer = 0.22;
    attackFighter(fighter, isBot ? player : bot, true);
  }
}

function updateBot(dt) {
  const nextState = { left: false, right: false, jump: false, attack: false, heavy: false };
  const target = player;
  const deltaX = target.x - bot.x;

  if (Math.abs(deltaX) > 100) {
    nextState.right = deltaX > 0;
    nextState.left = deltaX < 0;
  }

  if (Math.abs(deltaX) < 90 && bot.onGround) {
    if (Math.random() < 0.022) nextState.jump = true;
  }

  if (Math.abs(deltaX) < 90 && bot.attackCooldown <= 0) {
    nextState.attack = true;
  }

  if (Math.abs(deltaX) < 120 && Math.random() < 0.014 && bot.heavyCooldown <= 0) {
    nextState.heavy = true;
  }

  updateFighter(bot, dt, nextState, true);
}

function updatePlayer(dt) {
  const playerKeyState = {
    left: keys['KeyA'] || keys['ArrowLeft'],
    right: keys['KeyD'] || keys['ArrowRight'],
    jump: keys['KeyW'] || keys['ArrowUp'] || keys['Space'],
    attack: keys['KeyJ'] || keys['KeyZ'],
    heavy: keys['KeyK'] || keys['KeyX']
  };

  updateFighter(player, dt, playerKeyState, false);
}

function drawBackground(ctx) {
  const gradient = ctx.createLinearGradient(0, 0, 0, arena.height);
  gradient.addColorStop(0, '#0d1d2e');
  gradient.addColorStop(0.35, '#0b1a2c');
  gradient.addColorStop(1, '#0a1622');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, arena.width, arena.height);

  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  for (let i = 0; i < 80; i++) {
    ctx.fillRect((i * 37) % arena.width, (i * 53) % 300, 2, 2);
  }
}

function drawPlatform(ctx, platform) {
  ctx.fillStyle = '#253856';
  ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
  ctx.fillStyle = '#7fb3ff';
  ctx.fillRect(platform.x, platform.y, platform.w, 4);
}

function drawFighter(ctx, fighter) {
  ctx.save();
  if (fighter.hitFlash > 0) {
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 18;
  }

  ctx.fillStyle = fighter.color;
  ctx.fillRect(fighter.x, fighter.y + 14, fighter.w, fighter.h - 14);
  ctx.fillStyle = '#e3ecff';
  ctx.beginPath();
  ctx.arc(fighter.x + fighter.w / 2, fighter.y + 14, 10, 0, Math.PI * 2);
  ctx.fill();

  if (fighter.attackTimer > 0) {
    const attackBox = getAttackBox(fighter);
    ctx.strokeStyle = fighter.color;
    ctx.lineWidth = 3;
    ctx.strokeRect(attackBox.x, attackBox.y, attackBox.w, attackBox.h);
  }

  ctx.fillStyle = 'rgba(0,0,0,0.28)';
  ctx.fillRect(fighter.x - 8, fighter.y - 16, fighter.w + 16, 8);

  const healthRatio = fighter.health / 100;
  const healthWidth = fighter.w * healthRatio;
  ctx.fillStyle = '#2dff94';
  ctx.fillRect(fighter.x, fighter.y - 16, healthWidth, 8);
  ctx.restore();
}

function render() {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  drawBackground(ctx);
  for (const platform of platforms) drawPlatform(ctx, platform);
  drawFighter(ctx, player);
  drawFighter(ctx, bot);

  if (!arena.running && arena.winner) {
    setMessage(`${arena.winner} venceu! Pressione R para recomeçar.`);
  }
}

function loop(timestamp) {
  const delta = Math.min((timestamp - arena.lastTime) / 1000 || 0.016, 0.033);
  arena.lastTime = timestamp;

  if (arena.running) {
    updatePlayer(delta);
    updateBot(delta);
    render();
  } else {
    render();
  }

  requestAnimationFrame(loop);
}

function bindGameControls() {
  window.addEventListener('keydown', (event) => {
    keys[event.code] = true;
    if (event.code === 'KeyR' && !arena.running) {
      resetStage();
    }
    if (event.code === 'Escape') {
      stopGame();
    }
  });

  window.addEventListener('keyup', (event) => {
    keys[event.code] = false;
  });

  window.addEventListener('resize', setCanvasSize);

  const exitBtn = document.getElementById('exit-game');
  if (exitBtn) {
    exitBtn.addEventListener('click', stopGame);
  }
}

function initGame() {
  setCanvasSize();
  updateHud();
  bindGameControls();
  resetStage();
  render();
  requestAnimationFrame(loop);
}

window.startGame = startGame;
window.showMainMenu = showMainMenu;
window.addEventListener('DOMContentLoaded', initGame);
