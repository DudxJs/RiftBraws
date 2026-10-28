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
    nav.innerHTML = navItems
      .map(item => `
        <button class="${item.id === "home" ? "active" : ""}" data-page="${item.id}">
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
    const intro = `
      <strong>Modo:</strong> Treino, sala local e partidas rápidas<br>
      <strong>Modo de jogo:</strong> plataforma fighter 2D com knockback e arenas de combate<br>
      <strong>Foco:</strong> ataque em combo, manipulação de mapas e ultimates concludentes
    `;

    summary.innerHTML = intro;
  }

  function renderLegendCards() {
    legendGrid.innerHTML = legendData.map(legend => `
      <article class="card">
        <span class="card-badge">${legend.type}</span>
        <div class="character-portrait" style="background: linear-gradient(140deg, rgba(124,155,255,0.34), rgba(72,209,255,0.18)), linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));"></div>

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
      </article>
    `).join("");
  }

  function renderSkinCards() {
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
      </article>
    `).join("");
  }

  function renderMapCards() {
    mapGrid.innerHTML = mapData.map(map => `
      <article class="card">
        <span class="card-badge">${map.size}</span>
        <div class="character-portrait" style="background: linear-gradient(140deg, rgba(124,155,255,0.26), rgba(124,255,194,0.18));"></div>
        <div class="character-header">
          <h3>${map.name}</h3>
          <span class="tag">${map.theme}</span>
        </div>
        <div class="stats">
          <div class="stat-pill"><strong>Perigo</strong><br>${map.danger}</div>
          <div class="stat-pill"><strong>Estilo</strong><br>${map.theme}</div>
        </div>
      </article>
    `).join("");
  }

  function applySettingsToInputs(settings) {
    settingsName.value = settings.userName;
    graphicsQuality.value = settings.graphics;
    fullscreenToggle.checked = settings.fullscreen;
    soundToggle.checked = settings.sound;
    vibrationToggle.checked = settings.vibration;

    playerNameInput.value = settings.userName;
  }

  function saveSettings() {
    const newSettings = {
      userName: settingsName.value || defaultSettings.userName,
      graphics: graphicsQuality.value || defaultSettings.graphics,
      fullscreen: fullscreenToggle.checked,
      sound: soundToggle.checked,
      vibration: vibrationToggle.checked
    };

    localStorage.setItem("riftbrawl-settings", JSON.stringify(newSettings));
    applySettingsToInputs(newSettings);
    playerNameInput.value = newSettings.userName;

    if (statusMessage) {
      statusMessage.textContent = "Configuração salva.";
    }

    configModal.classList.add("hidden");
  }

  function resetSettings() {
    localStorage.removeItem("riftbrawl-settings");
    applySettingsToInputs(defaultSettings);
  }

  function loadSettings() {
    const saved = JSON.parse(localStorage.getItem("riftbrawl-settings") || "null");
    const settings = saved || defaultSettings;
    applySettingsToInputs(settings);
    playerNameInput.value = settings.userName;
  }

  openConfigBtn.addEventListener("click", () => configModal.classList.remove("hidden"));
  closeConfigBtn.addEventListener("click", () => configModal.classList.add("hidden"));
  saveSettingsBtn.addEventListener("click", saveSettings);
  resetSettingsBtn.addEventListener("click", resetSettings);

  document.getElementById("btn-train").addEventListener("click", () => {
    statusMessage.textContent = "Treino vs Bot iniciado.";
  });

  document.getElementById("btn-lobby").addEventListener("click", () => {
    statusMessage.textContent = "Sala criada com sucesso.";
  });

  document.getElementById("btn-join").addEventListener("click", () => {
    const code = roomCodeInput.value.trim();
    statusMessage.textContent = code ? `Entrando na sala ${code}` : "Digite um código válido.";
  });

  playerNameInput.addEventListener("input", (event) => {
    statusMessage.textContent = `Jogador: ${event.target.value || "Seu nome"}`;
  });

  renderNav();
  renderSummary();
  renderLegendCards();
  renderWeaponCards();
  renderSkinCards();
  renderMapCards();
  loadSettings();
});
