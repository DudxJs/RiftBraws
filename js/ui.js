document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("main-nav");
  const summary = document.getElementById("summary");
  const legendGrid = document.getElementById("legend-grid");
  const weaponGrid = document.getElementById("weapon-grid");
  const skinGrid = document.getElementById("skin-grid");
  const mapGrid = document.getElementById("map-grid");
  const playerNameInput = document.getElementById("player-name");
  const roomCodeInput = document.getElementById("room-code");
  const statusMessage = document.getElementById("status-message");

  const configModal = document.getElementById("config-modal");
  const openConfigBtn = document.getElementById("open-config");
  const closeConfigBtn = document.getElementById("close-config");
  const saveSettingsBtn = document.getElementById("save-settings");
  const resetSettingsBtn = document.getElementById("reset-settings");

  const settingsName = document.getElementById("settings-name");
  const graphicsQuality = document.getElementById("graphics-quality");
  const fullscreenToggle = document.getElementById("fullscreen-toggle");
  const soundToggle = document.getElementById("sound-toggle");
  const vibrationToggle = document.getElementById("vibration-toggle");

  function renderNav() {
    if (!nav) return;

    nav.innerHTML = navItems
      .map(item => `
        <button class="${item.id === "home" ? "active" : ""}" data-page="${item.id}" type="button">
          ${item.label}
        </button>
      `)
      .join("");

    nav.addEventListener("click", (event) => {
      const button = event.target.closest("[data-page]");
      if (!button) return;

      const pageId = button.dataset.page;
      document.querySelectorAll(".page").forEach(page => {
        page.classList.toggle("active", page.id === `page-${pageId}`);
      });

      document.querySelectorAll(".main-nav button").forEach(btn => {
        btn.classList.toggle("active", btn === button);
      });
    });
  }

  function renderSummary() {
    if (!summary) return;

    summary.innerHTML = `
      <strong>Modo:</strong> Treino, sala local e partidas rápidas<br>
      <strong>Modo de jogo:</strong> plataforma fighter 2D com knockback, knockback em arco e arenas de combate<br>
      <strong>Foco:</strong> ataque em combo, manipulação de mapas, ultimates e controle de espaço
    `;
  }

  function renderLegendCards() {
    if (!legendGrid) return;

    legendGrid.innerHTML = legendData.map(legend => `
      <article class="card">
        <span class="card-badge">${legend.type}</span>
        <div class="character-portrait" style="background: linear-gradient(140deg, rgba(127,155,255,0.34), rgba(83,212,255,0.18));"></div>

        <div class="character-header">
          <h3>${legend.name}</h3>
          <span class="tag">${legend.skin}</span>
        </div>

        <div class="stats">
          <div class="stat-pill"><strong>Power</strong><br>${legend.stats.power}</div>
          <div class="stat-pill"><strong>Speed</strong><br>${legend.stats.speed}</div>
          <div class="stat-pill"><strong>Defense</strong><br>${legend.stats.defense}</div>
          <div class="stat-pill"><strong>Mobility</strong><br>${legend.stats.mobility}</div>
        </div>

        <div class="weapon-chip">${legend.weapons.join(" · ")}</div>
        <div class="skin-chip">${legend.anims.join(" · ")}</div>
      </article>
    `).join("");
  }

  function renderWeaponCards() {
    if (!weaponGrid) return;

    weaponGrid.innerHTML = weaponData.map(weapon => `
      <article class="card">
        <span class="card-badge" style="background: ${weapon.color}22; border-color: ${weapon.color}80;">${weapon.style}</span>
        <div class="character-portrait" style="background: linear-gradient(140deg, ${weapon.color}50, rgba(72,209,255,0.1));"></div>
        <div class="character-header">
          <h3>${weapon.name}</h3>
          <span class="tag">${weapon.range}</span>
        </div>
        <div class="stats">
          <div class="stat-pill"><strong>Dano</strong><br>${weapon.damage}</div>
          <div class="stat-pill"><strong>Alcance</strong><br>${weapon.range}</div>
        </div>
        <div class="skin-chip">${weapon.description}</div>
      </article>
    `).join("");
  }

  function renderSkinCards() {
    if (!skinGrid) return;

    skinGrid.innerHTML = skinData.map(skin => `
      <article class="card">
        <span class="card-badge">${skin.type}</span>
        <div class="character-portrait" style="background: linear-gradient(140deg, ${skin.accent}88, rgba(255,255,255,0.08));"></div>
        <div class="character-header">
          <h3>${skin.name}</h3>
          <span class="tag">${skin.legend}</span>
        </div>
        <div class="stats">
          <div class="stat-pill"><strong>Aura</strong><br>${skin.aura}</div>
          <div class="stat-pill"><strong>Variante</strong><br>${skin.variant}</div>
        </div>
        <div class="skin-chip">${skin.effect}</div>
      </article>
    `).join("");
  }

  function renderMapCards() {
    if (!mapGrid) return;

    mapGrid.innerHTML = mapData.map(map => `
      <article class="card">
        <span class="card-badge">${map.size}</span>
        <div class="character-portrait" style="background: linear-gradient(140deg, rgba(127,155,255,0.26), rgba(127,255,194,0.18));"></div>
        <div class="character-header">
          <h3>${map.name}</h3>
          <span class="tag">${map.theme}</span>
        </div>
        <div class="stats">
          <div class="stat-pill"><strong>Perigo</strong><br>${map.danger}</div>
          <div class="stat-pill"><strong>Estilo</strong><br>${map.theme}</div>
        </div>
        <div class="skin-chip">${map.description}</div>
      </article>
    `).join("");
  }

  function applySettingsToInputs(settings) {
    if (settingsName) settingsName.value = settings.userName;
    if (graphicsQuality) graphicsQuality.value = settings.graphics;
    if (fullscreenToggle) fullscreenToggle.checked = settings.fullscreen;
    if (soundToggle) soundToggle.checked = settings.sound;
    if (vibrationToggle) vibrationToggle.checked = settings.vibration;

    if (playerNameInput) playerNameInput.value = settings.userName;
  }

  function saveSettings() {
    const newSettings = {
      userName: settingsName ? (settingsName.value || defaultSettings.userName) : defaultSettings.userName,
      graphics: graphicsQuality ? (graphicsQuality.value || defaultSettings.graphics) : defaultSettings.graphics,
      fullscreen: fullscreenToggle ? fullscreenToggle.checked : defaultSettings.fullscreen,
      sound: soundToggle ? soundToggle.checked : defaultSettings.sound,
      vibration: vibrationToggle ? vibrationToggle.checked : defaultSettings.vibration
    };

    localStorage.setItem("riftbrawl-settings", JSON.stringify(newSettings));
    applySettingsToInputs(newSettings);

    if (statusMessage) {
      statusMessage.textContent = "Configuração salva.";
    }

    if (configModal) {
      configModal.classList.add("hidden");
    }
  }

  function resetSettings() {
    localStorage.removeItem("riftbrawl-settings");
    applySettingsToInputs(defaultSettings);
  }

  function loadSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem("riftbrawl-settings") || "null");
      const settings = saved || defaultSettings;
      applySettingsToInputs(settings);
    } catch (error) {
      applySettingsToInputs(defaultSettings);
    }
  }

  if (openConfigBtn) {
    openConfigBtn.addEventListener("click", () => {
      if (configModal) configModal.classList.remove("hidden");
    });
  }

  if (closeConfigBtn) {
    closeConfigBtn.addEventListener("click", () => {
      if (configModal) configModal.classList.add("hidden");
    });
  }

  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener("click", saveSettings);
  }

  if (resetSettingsBtn) {
    resetSettingsBtn.addEventListener("click", resetSettings);
  }

  const trainBtn = document.getElementById("btn-train");
  const lobbyBtn = document.getElementById("btn-lobby");
  const joinBtn = document.getElementById("btn-join");

  function startMatch(mode = "bot") {
    if (statusMessage) {
      statusMessage.textContent = mode === "bot" ? "Treino vs Bot iniciado." : "Sala iniciada.";
    }
    if (typeof window.startGame === "function") {
      window.startGame();
    }
  }

  if (trainBtn) {
    trainBtn.addEventListener("click", () => startMatch("bot"));
  }

  if (lobbyBtn) {
    lobbyBtn.addEventListener("click", () => startMatch("lobby"));
  }

  if (joinBtn) {
    joinBtn.addEventListener("click", () => {
      const code = roomCodeInput ? roomCodeInput.value.trim() : "";
      if (!code) {
        if (statusMessage) statusMessage.textContent = "Digite um código válido.";
        return;
      }
      if (statusMessage) statusMessage.textContent = `Entrando na sala ${code}`;
      if (typeof window.startGame === "function") {
        window.startGame();
      }
    });
  }

  if (playerNameInput) {
    playerNameInput.addEventListener("input", (event) => {
      if (statusMessage) {
        statusMessage.textContent = `Jogador: ${event.target.value || "Seu nome"}`;
      }
    });
  }

  renderNav();
  renderSummary();
  renderLegendCards();
  renderWeaponCards();
  renderSkinCards();
  renderMapCards();
  loadSettings();
});
