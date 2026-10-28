const navItems = [
  { id: "home", label: "Home" },
  { id: "legends", label: "Lendas" },
  { id: "weapons", label: "Armas" },
  { id: "skins", label: "Skins" },
  { id: "maps", label: "Mapas" },
  { id: "help", label: "Ajuda" }
];

const legendData = [
  {
    id: "aegis",
    name: "Aegis",
    title: "Paladino do Vento",
    type: "Tank",
    stats: { power: 82, speed: 68, defense: 90, mobility: 70 },
    weapons: ["Espada", "Martelo"],
    skin: "Aegis Prime",
    style: "Defesa / pressão",
    anims: ["Idle", "Walk", "Jump", "Dash", "Heavy attack", "Ultimate"]
  },
  {
    id: "nova",
    name: "Nova",
    title: "Lanceira de Cometas",
    type: "Agile",
    stats: { power: 72, speed: 92, defense: 60, mobility: 95 },
    weapons: ["Lança", "Cajado"],
    skin: "Nova Eclipse",
    style: "Velocidade / combo",
    anims: ["Idle", "Walk", "Jump", "Air dash", "Combo", "Ultimate"]
  },
  {
    id: "brutus",
    name: "Brutus",
    title: "Quebra-Ilhas",
    type: "Heavy",
    stats: { power: 96, speed: 54, defense: 88, mobility: 60 },
    weapons: ["Machado", "Martelo"],
    skin: "Brutus Titan",
    style: "Força / smash",
    anims: ["Idle", "Charge", "Jump", "Smash", "Recover", "Ultimate"]
  },
  {
    id: "lyra",
    name: "Lyra",
    title: "Astra de Sinais",
    type: "Hybrid",
    stats: { power: 78, speed: 82, defense: 72, mobility: 84 },
    weapons: ["Espada", "Lança"],
    skin: "Lyra Arcane",
    style: "Controle / set-up",
    anims: ["Idle", "Dash", "Jump", "Air strike", "Burst", "Ultimate"]
  },
  {
    id: "vex",
    name: "Vex",
    title: "Assassina do Vácuo",
    type: "Glass Cannon",
    stats: { power: 88, speed: 90, defense: 56, mobility: 92 },
    weapons: ["Lâminas", "Adaga"],
    skin: "Vex Phantom",
    style: "Agressão / evasão",
    anims: ["Idle", "Dodge", "Jump", "Dash", "Combo", "Ultimate"]
  },
  {
    id: "mara",
    name: "Mara",
    title: "Guardiã do Trovão",
    type: "Balanced",
    stats: { power: 80, speed: 76, defense: 76, mobility: 80 },
    weapons: ["Cajado", "Machado"],
    skin: "Mara Volt",
    style: "Equilibrio / anti-air",
    anims: ["Idle", "Walk", "Jump", "Uppercut", "Burst", "Ultimate"]
  },
  {
    id: "kairo",
    name: "Kairo",
    title: "Comandante da Fenda",
    type: "Control",
    stats: { power: 74, speed: 70, defense: 78, mobility: 74 },
    weapons: ["Lança", "Cajado"],
    skin: "Kairo Rift",
    style: "Zone control / nockback",
    anims: ["Idle", "Walk", "Jump", "Teleport", "Burst", "Ultimate"]
  },
  {
    id: "sola",
    name: "Sola",
    title: "Guardiã do Amanhecer",
    type: "Mobility",
    stats: { power: 70, speed: 88, defense: 64, mobility: 94 },
    weapons: ["Espada", "Lâminas"],
    skin: "Sola Dawn",
    style: "Mobility / precision",
    anims: ["Idle", "Dash", "Flip", "Jump", "Combo", "Ultimate"]
  }
];

const weaponData = [
  {
    id: "sword",
    name: "Espada",
    style: "Médio / rápido",
    damage: "Alta precisão",
    range: "Médio",
    color: "#7f9bff",
    description: "Fácil de controlar, ótimo para combos e ataques em sequência."
  },
  {
    id: "hammer",
    name: "Martelo",
    style: "Pesado / zona",
    damage: "Muito forte",
    range: "Curto",
    color: "#f7b267",
    description: "Poder de knockback muito alto e controle de espaço na arena."
  },
  {
    id: "spear",
    name: "Lança",
    style: "Longo / ofensivo",
    damage: "Equilibrado",
    range: "Longo",
    color: "#53d4ff",
    description: "Excelente para empurrar o oponente e manter distância segura."
  },
  {
    id: "axe",
    name: "Machado",
    style: "Pesado / arremesso",
    damage: "Alta potência",
    range: "Médio",
    color: "#ff8d70",
    description: "Ataques fortes e poderosos, perfect para destruição e pressure."
  },
  {
    id: "staff",
    name: "Cajado",
    style: "Magia / controle",
    damage: "Controle e dano em área",
    range: "Médio",
    color: "#90caf9",
    description: "Bom para área, interrupção e setups de combo."
  },
  {
    id: "blades",
    name: "Lâminas",
    style: "Ágil / combo",
    damage: "Velocidade e pressão",
    range: "Curto",
    color: "#d9a6ff",
    description: "Ideal para dano contínuo e ataques rápidos em sequência."
  },
  {
    id: "dagger",
    name: "Adaga",
    style: "Furtivo / rápido",
    damage: "Dano de precisão",
    range: "Curto",
    color: "#ffd166",
    description: "Agilidade e evasão, com dano constante e ataque direto."
  },
  {
    id: "bow",
    name: "Arco",
    style: "Controle / distância",
    damage: "Dano direcionado",
    range: "Longo",
    color: "#7ee7b0",
    description: "Mantém pressão à distância e aplica dano de forma constante."
  }
];

const skinData = [
  {
    id: "ember",
    name: "Ember Rise",
    legend: "Nova",
    type: "Skin Legendária",
    accent: "#ff9966",
    aura: "Fogo",
    variant: "Ascendente",
    effect: "Chamas giratórias e explosão de energia no ultimate"
  },
  {
    id: "storm",
    name: "Stormguard",
    legend: "Aegis",
    type: "Skin Épica",
    accent: "#6fd0ff",
    aura: "Tempestade",
    variant: "Proteção",
    effect: "Escudo de relâmpago com brilho azul de arena"
  },
  {
    id: "iron",
    name: "Iron Titan",
    legend: "Brutus",
    type: "Skin Rara",
    accent: "#f7b267",
    aura: "Metal",
    variant: "Titânico",
    effect: "Ataques com impacto pesado e brilho de metal rubro"
  },
  {
    id: "moon",
    name: "Moonveil",
    legend: "Lyra",
    type: "Skin Mítica",
    accent: "#d9b3ff",
    aura: "Lunar",
    variant: "Celestial",
    effect: "Área brilhante com silhueta lunar ao entrar em combate"
  },
  {
    id: "phantom",
    name: "Phantom Veil",
    legend: "Vex",
    type: "Skin Épica",
    accent: "#8d7bff",
    aura: "Vácuo",
    variant: "Eclipse",
    effect: "Vapor roxo com trail de sombras ao se mover"
  },
  {
    id: "volt",
    name: "Volt Storm",
    legend: "Mara",
    type: "Skin Rara",
    accent: "#9ee7ff",
    aura: "Trovão",
    variant: "Relâmpago",
    effect: "Efeitos de energia elétrica ao usar combos"
  },
  {
    id: "rift",
    name: "Rift Breaker",
    legend: "Kairo",
    type: "Skin Legendária",
    accent: "#70f0d4",
    aura: "Fenda",
    variant: "Vórtice",
    effect: "Luz cinza-prateada com partículas de portal"
  },
  {
    id: "dawn",
    name: "Dawnflare",
    legend: "Sola",
    type: "Skin Mítica",
    accent: "#ffd36e",
    aura: "Sol",
    variant: "Amanhecer",
    effect: "Brilho dourado com faíscas suaves ao atacar"
  }
];

const mapData = [
  {
    id: "rift-peak",
    name: "Rift Peak",
    theme: "Aéreo / gelo",
    danger: "Tempestade gravitacional",
    size: "Médio",
    description: "Arena de altitude com ventos fortes e bordas perigosas."
  },
  {
    id: "forge-rift",
    name: "Forge Rift",
    theme: "Vulcão / metal",
    danger: "Fogo e degraus instáveis",
    size: "Grande",
    description: "Fundo quente, plataformas frágeis e pressão constante."
  },
  {
    id: "sacred-temple",
    name: "Sacred Temple",
    theme: "Antigo / celeste",
    danger: "Pontos de teleporte",
    size: "Médio",
    description: "Ambiente místico com linhas de energia e espaços abertos."
  },
  {
    id: "storm-harbor",
    name: "Storm Harbor",
    theme: "Mar / relâmpago",
    danger: "Ondas e correntes",
    size: "Grande",
    description: "Litoral turbulento com ondas e correntes perigosas."
  },
  {
    id: "sunspire",
    name: "Sunspire",
    theme: "Deserto / sol",
    danger: "Brisa térmica",
    size: "Médio",
    description: "Plataformas altas com calor e movimentação agressiva."
  },
  {
    id: "shadow-gate",
    name: "Shadow Gate",
    theme: "Sombrio / energia",
    danger: "Faixas instáveis",
    size: "Grande",
    description: "Arena de combate com energia caótica e espaços estreitos."
  }
];

const defaultSettings = {
  userName: "Jogador",
  graphics: "medium",
  fullscreen: false,
  sound: true,
  vibration: true
};
