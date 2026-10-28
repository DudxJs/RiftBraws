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
    anims: ["Idle", "Walk", "Jump", "Dash", "Heavy attack", "Ultimate"]
  },
  {
    id: "nova",
    name: "Nova",
    title: "Lanceira de Cometas",
    type: "Agile",
    stats: { power: 72, speed: 90, defense: 60, mobility: 95 },
    weapons: ["Lança", "Cajado"],
    skin: "Nova Eclipse",
    anims: ["Idle", "Walk", "Jump", "Air dash", "Combo", "Ultimate"]
  },
  {
    id: "brutus",
    name: "Brutus",
    title: "Quebra-Ilhas",
    type: "Heavy",
    stats: { power: 95, speed: 54, defense: 88, mobility: 60 },
    weapons: ["Machado", "Martelo"],
    skin: "Brutus Titan",
    anims: ["Idle", "Charge", "Jump", "Smash", "Recover", "Ultimate"]
  },
  {
    id: "lyra",
    name: "Lyra",
    title: "Astra de Sinais",
    type: "Hybrid",
    stats: { power: 76, speed: 80, defense: 72, mobility: 84 },
    weapons: ["Espada", "Lança"],
    skin: "Lyra Arcane",
    anims: ["Idle", "Dash", "Jump", "Air strike", "Burst", "Ultimate"]
  }
];

const weaponData = [
  {
    id: "sword",
    name: "Espada",
    style: "Médio / rápido",
    damage: "Alta precisão",
    range: "Médio",
    color: "#7c9bff"
  },
  {
    id: "hammer",
    name: "Martelo",
    style: "Pesado / zone control",
    damage: "Muito forte",
    range: "Curto",
    color: "#f7b267"
  },
  {
    id: "lance",
    name: "Lança",
    style: "Longo / ofensivo",
    damage: "Equilibrado",
    range: "Longo",
    color: "#7fe7a8"
  },
  {
    id: "axe",
    name: "Machado",
    style: "Pesado / arremesso",
    damage: "Alta potência",
    range: "Médio",
    color: "#ff8d8d"
  },
  {
    id: "staff",
    name: "Cajado",
    style: "Magia / controle",
    damage: "Controle e dano em área",
    range: "Médio",
    color: "#8ac5ff"
  },
  {
    id: "blades",
    name: "Lâminas",
    style: "Ágil / combo",
    damage: "Velocidade e pressão",
    range: "Curto",
    color: "#d3a8ff"
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
    variant: "Ascendente"
  },
  {
    id: "storm",
    name: "Stormguard",
    legend: "Aegis",
    type: "Skin Épica",
    accent: "#6fd0ff",
    aura: "Tempestade",
    variant: "Proteção"
  },
  {
    id: "iron",
    name: "Iron Titan",
    legend: "Brutus",
    type: "Skin Rara",
    accent: "#f7b267",
    aura: "Metal",
    variant: "Titânico"
  },
  {
    id: "moon",
    name: "Moonveil",
    legend: "Lyra",
    type: "Skin Mítica",
    accent: "#d9b3ff",
    aura: "Lunar",
    variant: "Celestial"
  }
];

const mapData = [
  {
    id: "rift",
    name: "Rift Peak",
    theme: "Aéreo / gelo",
    danger: "Tempestade gravitacional",
    size: "Médio"
  },
  {
    id: "forge",
    name: "Forge Rift",
    theme: "Vulcão / metal",
    danger: "Fogo e degraus instáveis",
    size: "Grande"
  },
  {
    id: "temple",
    name: "Sacred Temple",
    theme: "Antigo / celeste",
    danger: "Pontos de teleporte",
    size: "Médio"
  },
  {
    id: "harbor",
    name: "Storm Harbor",
    theme: "Mar / relâmpago",
    danger: "Ondas e correntes",
    size: "Grande"
  }
];

const defaultSettings = {
  userName: "Jogador",
  graphics: "medium",
  fullscreen: false,
  sound: true,
  vibration: true
};
