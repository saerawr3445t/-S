'use strict';

// ============================================================
// SECTION 1 — ASSETS & CONFIGURATION
// כדי להוסיף תמונה/אודיו/וידאו: מלא את הנתיב המתאים כאן
// ============================================================
const ASSETS = {
  images: {
    mainObject: '',           // דוגמה: 'assets/images/cookie.png'
    background: '',           // דוגמה: 'assets/images/bg.jpg'
    buildingIcons: {
      cursor:  '',
      farm:    '',
      mine:    '',
      factory: '',
      bank:    '',
    }
  },
  audio: {
    click:     '',            // דוגמה: 'assets/audio/click.mp3'
    purchase:  '',
    milestone: '',
    ambient:   '',
  },
  video: {
    background: '',           // דוגמה: 'assets/video/bg.mp4'
  }
};

const CONFIG = {
  saveKey:           'clicker_save_v1',
  tickRateMs:        100,
  autosaveIntervalS: 30,
  particleCount:     8,
  particleLifeMs:    700,
  baseClickValue:    1,
  language:          'he',
  prestigeThreshold: 1e12,
  goldenMinMs:       240000,  // 4 דקות
  goldenMaxMs:       480000,  // 8 דקות
  goldenDurationMs:  15000,
  goldenMultiplier:  777,
  offlineCapHours:   24,
};

// ============================================================
// SECTION 2 — STRINGS
// ============================================================
const STRINGS = {
  he: {
    clicks:        'קליקים',
    perSec:        'לשנייה: ',
    upgrades:      'שדרוגים',
    buildings:     'בניינים',
    save:          'שמור',
    export:        'ייצוא',
    import:        'ייבוא',
    reset:         'איפוס',
    stats:         'סטטיסטיקות',
    manualClicks:  'קליקים ידניים: ',
    playTime:      'זמן משחק: ',
    upgradesBought:'שדרוגים שנקנו: ',
    achievements:  'הישגים: ',
    cost:          'עלות: ',
    saved:         'נשמר: ',
    never:         'לא נשמר',
    clickHint:     'לחץ!',
    news:          'חדשות:',
    prestige:      'עלייה לדרגה ✦',
    prestigeDesc:  'אפס את הכל תמורת ×{m} לנצח',
    offlineEarned: 'היית משם {t}. הרווחת {n}.',
    resetConfirm:  'בטוח שאתה רוצה לאפס? כל ההתקדמות תמחק!',
    goldenAlert:   '✨ זהב! לחץ על האובייקט המנצנץ!',
    goldenBonus:   '✨ בונוס זהב! +{n}',
    prestigeDone:  '✦ עלית לדרגה! מכפיל: ×{m}',
    exportDone:    'נשמר ללוח',
    importPrompt:  'הדבק את קוד הייבוא:',
    importFail:    'שגיאה בייבוא',
  },
  en: {
    clicks:        'clicks',
    perSec:        'Per second: ',
    upgrades:      'Upgrades',
    buildings:     'Buildings',
    save:          'Save',
    export:        'Export',
    import:        'Import',
    reset:         'Reset',
    stats:         'Stats',
    manualClicks:  'Manual clicks: ',
    playTime:      'Play time: ',
    upgradesBought:'Upgrades bought: ',
    achievements:  'Achievements: ',
    cost:          'Cost: ',
    saved:         'Saved: ',
    never:         'Never saved',
    clickHint:     'Click!',
    news:          'News:',
    prestige:      'Prestige ✦',
    prestigeDesc:  'Reset all for ×{m} forever',
    offlineEarned: 'You were away {t}. Earned {n}.',
    resetConfirm:  'Are you sure you want to reset? All progress will be lost!',
    goldenAlert:   '✨ Golden! Click the shining object!',
    goldenBonus:   '✨ Golden bonus! +{n}',
    prestigeDone:  '✦ Prestiged! Multiplier: ×{m}',
    exportDone:    'Copied to clipboard',
    importPrompt:  'Paste save code:',
    importFail:    'Import error',
  }
};

const NEWS_LINES = {
  he: [
    'מדענים גילו שיותר קליקים = יותר אושר.',
    'השוק מדווח: מחירי בניינים ירדו. בינתיים לא.',
    'תושבי העיר מתלוננים על רעש מהמפעל. הצלחנו.',
    'הסמן החל להשתעמם. תן לו עוד עבודה.',
    'עיתון: "מי לוחץ כל כך הרבה?" — דיווח מיוחד בעמ׳ 7.',
    'בנק מרכזי: "אנחנו לא מכירים את המטבע הזה."',
    'מחקר חדש: 9 מתוך 10 קליקרים מאושרים.',
    'המחסן מלא. מישהו יכול לקנות עוד בניין?',
    'אירוע זהב צפוי בקרוב. היה ערני.',
    'ממשלה שוקלת מס על קליקים. נבחר ממשלה חדשה.',
  ],
  en: [
    'Scientists confirm: more clicks = more happiness.',
    'Market report: building prices remain unchanged.',
    'Residents complain about factory noise. Success.',
    'The cursor is bored. Give it more work.',
    'Newspaper: "Who keeps clicking?" — page 7 special.',
    'Central bank: "We don\'t recognize this currency."',
    'Study: 9/10 clicker players are satisfied.',
    'Warehouse full. Someone buy another building?',
    'Golden event expected soon. Stay alert.',
    'Government considers click tax. New election called.',
  ]
};

// ============================================================
// SECTION 3 — BUILDINGS DATA
// ============================================================
const BUILDINGS = [
  {
    id: 'cursor',
    nameHe: 'סמן', nameEn: 'Cursor',
    descHe: 'לוחץ לבד פעם בכל 10 שניות.', descEn: 'Autoclicks once every 10 seconds.',
    emoji: '🖱️', baseCps: 0.1,  baseCost: 15,    costScale: 1.15,
  },
  {
    id: 'farm',
    nameHe: 'חווה', nameEn: 'Farm',
    descHe: 'מגדלת קליקים בשדה.', descEn: 'Grows clicks in the field.',
    emoji: '🌾', baseCps: 0.5,  baseCost: 100,   costScale: 1.15,
  },
  {
    id: 'mine',
    nameHe: 'מכרה', nameEn: 'Mine',
    descHe: 'חופר קליקים מהאדמה.', descEn: 'Digs clicks from the ground.',
    emoji: '⛏️', baseCps: 4,    baseCost: 1100,  costScale: 1.15,
  },
  {
    id: 'factory',
    nameHe: 'מפעל', nameEn: 'Factory',
    descHe: 'מייצר קליקים בסדרה.', descEn: 'Mass-produces clicks.',
    emoji: '🏭', baseCps: 10,   baseCost: 12000, costScale: 1.15,
  },
  {
    id: 'bank',
    nameHe: 'בנק', nameEn: 'Bank',
    descHe: 'קליקים מולידים קליקים.', descEn: 'Clicks beget clicks.',
    emoji: '🏦', baseCps: 40,   baseCost: 130000, costScale: 1.15,
  },
];

// ============================================================
// SECTION 4 — UPGRADES DATA
// ============================================================
const UPGRADES = [
  // --- קליק ידני ---
  {
    id: 'better_finger',
    nameHe: 'אצבע חזקה', nameEn: 'Better Finger',
    descHe: 'קליקים שווים פי 2.', descEn: 'Clicks worth ×2.',
    cost: 100,
    unlockWhen: s => s.totalClicks >= 25,
    apply: s => { s.clickMultiplier *= 2; }
  },
  {
    id: 'titanium_finger',
    nameHe: 'אצבע טיטניום', nameEn: 'Titanium Finger',
    descHe: 'קליקים שווים פי 2 נוסף.', descEn: 'Clicks worth ×2 more.',
    cost: 500,
    unlockWhen: s => s.totalClicks >= 100,
    apply: s => { s.clickMultiplier *= 2; }
  },
  {
    id: 'golden_touch',
    nameHe: 'מגע זהב', nameEn: 'Golden Touch',
    descHe: 'קליקים שווים פי 5.', descEn: 'Clicks worth ×5.',
    cost: 50000,
    unlockWhen: s => s.totalClicks >= 1000,
    apply: s => { s.clickMultiplier *= 5; }
  },
  // --- סמן ---
  {
    id: 'cursor_2',
    nameHe: 'סמן חד', nameEn: 'Sharpened Cursor',
    descHe: 'סמנים פי 2 מהירים.', descEn: 'Cursors are ×2 faster.',
    cost: 500,
    unlockWhen: s => (s.buildings.cursor || 0) >= 1,
    apply: s => { s.buildingMult.cursor = (s.buildingMult.cursor || 1) * 2; }
  },
  {
    id: 'cursor_3',
    nameHe: 'סמן רובוטי', nameEn: 'Robotic Cursor',
    descHe: 'סמנים פי 5 מהירים.', descEn: 'Cursors ×5.',
    cost: 5000,
    unlockWhen: s => (s.buildings.cursor || 0) >= 10,
    apply: s => { s.buildingMult.cursor = (s.buildingMult.cursor || 1) * 5; }
  },
  // --- חווה ---
  {
    id: 'farm_2',
    nameHe: 'דשן מתקדם', nameEn: 'Advanced Fertilizer',
    descHe: 'חוות פי 2 יעילות.', descEn: 'Farms ×2 efficient.',
    cost: 1000,
    unlockWhen: s => (s.buildings.farm || 0) >= 1,
    apply: s => { s.buildingMult.farm = (s.buildingMult.farm || 1) * 2; }
  },
  {
    id: 'farm_3',
    nameHe: 'חווה רובוטית', nameEn: 'Robotic Farm',
    descHe: 'חוות פי 5 יעילות.', descEn: 'Farms ×5.',
    cost: 20000,
    unlockWhen: s => (s.buildings.farm || 0) >= 10,
    apply: s => { s.buildingMult.farm = (s.buildingMult.farm || 1) * 5; }
  },
  // --- מכרה ---
  {
    id: 'mine_2',
    nameHe: 'מקדחה משופרת', nameEn: 'Improved Drill',
    descHe: 'מכרות פי 2.', descEn: 'Mines ×2.',
    cost: 5000,
    unlockWhen: s => (s.buildings.mine || 0) >= 1,
    apply: s => { s.buildingMult.mine = (s.buildingMult.mine || 1) * 2; }
  },
  {
    id: 'mine_3',
    nameHe: 'מכרה קוונטי', nameEn: 'Quantum Mine',
    descHe: 'מכרות פי 5.', descEn: 'Mines ×5.',
    cost: 60000,
    unlockWhen: s => (s.buildings.mine || 0) >= 10,
    apply: s => { s.buildingMult.mine = (s.buildingMult.mine || 1) * 5; }
  },
  // --- מפעל ---
  {
    id: 'factory_2',
    nameHe: 'קו ייצור', nameEn: 'Assembly Line',
    descHe: 'מפעלים פי 2.', descEn: 'Factories ×2.',
    cost: 20000,
    unlockWhen: s => (s.buildings.factory || 0) >= 1,
    apply: s => { s.buildingMult.factory = (s.buildingMult.factory || 1) * 2; }
  },
  {
    id: 'factory_3',
    nameHe: 'מפעל נאנו', nameEn: 'Nano Factory',
    descHe: 'מפעלים פי 5.', descEn: 'Factories ×5.',
    cost: 250000,
    unlockWhen: s => (s.buildings.factory || 0) >= 10,
    apply: s => { s.buildingMult.factory = (s.buildingMult.factory || 1) * 5; }
  },
  // --- בנק ---
  {
    id: 'bank_2',
    nameHe: 'ריבית דריבית', nameEn: 'Compound Interest',
    descHe: 'בנקים פי 2.', descEn: 'Banks ×2.',
    cost: 200000,
    unlockWhen: s => (s.buildings.bank || 0) >= 1,
    apply: s => { s.buildingMult.bank = (s.buildingMult.bank || 1) * 2; }
  },
  {
    id: 'bank_3',
    nameHe: 'בנק מרכזי', nameEn: 'Central Bank',
    descHe: 'בנקים פי 5.', descEn: 'Banks ×5.',
    cost: 2000000,
    unlockWhen: s => (s.buildings.bank || 0) >= 10,
    apply: s => { s.buildingMult.bank = (s.buildingMult.bank || 1) * 5; }
  },
  // --- כללי ---
  {
    id: 'global_2x',
    nameHe: 'תנופה גלובלית', nameEn: 'Global Surge',
    descHe: 'כל הייצור פי 2.', descEn: 'All production ×2.',
    cost: 1000000,
    unlockWhen: s => s.totalClicks >= 500000,
    apply: s => { s.globalMultiplier *= 2; }
  },
];

// ============================================================
// SECTION 5 — ACHIEVEMENTS DATA
// ============================================================
const ACHIEVEMENTS = [
  { id: 'first_click',   nameHe: 'לחיצה ראשונה',  nameEn: 'First Click',    icon: '👆', check: s => s.totalClicks >= 1 },
  { id: 'clicks_100',    nameHe: '100 קליקים',     nameEn: '100 Clicks',     icon: '💯', check: s => s.totalClicks >= 100 },
  { id: 'clicks_1k',     nameHe: '1,000 קליקים',   nameEn: '1,000 Clicks',   icon: '🔥', check: s => s.totalClicks >= 1000 },
  { id: 'clicks_10k',    nameHe: '10,000 קליקים',  nameEn: '10K Clicks',     icon: '⚡', check: s => s.totalClicks >= 10000 },
  { id: 'clicks_100k',   nameHe: '100K קליקים',    nameEn: '100K Clicks',    icon: '🌟', check: s => s.totalClicks >= 100000 },
  { id: 'clicks_1m',     nameHe: 'מיליון קליקים',  nameEn: '1M Clicks',      icon: '🏆', check: s => s.totalClicks >= 1000000 },
  { id: 'own_cursor',    nameHe: 'סמן ראשון',      nameEn: 'First Cursor',   icon: '🖱️', check: s => (s.buildings.cursor||0) >= 1 },
  { id: 'own_farm',      nameHe: 'חווה ראשונה',    nameEn: 'First Farm',     icon: '🌾', check: s => (s.buildings.farm||0) >= 1 },
  { id: 'own_mine',      nameHe: 'מכרה ראשון',     nameEn: 'First Mine',     icon: '⛏️', check: s => (s.buildings.mine||0) >= 1 },
  { id: 'own_factory',   nameHe: 'מפעל ראשון',     nameEn: 'First Factory',  icon: '🏭', check: s => (s.buildings.factory||0) >= 1 },
  { id: 'own_bank',      nameHe: 'בנק ראשון',      nameEn: 'First Bank',     icon: '🏦', check: s => (s.buildings.bank||0) >= 1 },
  { id: 'buildings_10',  nameHe: '10 בניינים',     nameEn: '10 Buildings',   icon: '🏗️', check: s => totalBuildings(s) >= 10 },
  { id: 'buildings_50',  nameHe: '50 בניינים',     nameEn: '50 Buildings',   icon: '🏙️', check: s => totalBuildings(s) >= 50 },
  { id: 'upgrades_5',    nameHe: '5 שדרוגים',      nameEn: '5 Upgrades',     icon: '⬆️', check: s => countUpgrades(s) >= 5 },
  { id: 'cps_10',        nameHe: '10 לשנייה',      nameEn: '10 CPS',         icon: '⏱️', check: s => s.cps >= 10 },
  { id: 'cps_100',       nameHe: '100 לשנייה',     nameEn: '100 CPS',        icon: '🚀', check: s => s.cps >= 100 },
  { id: 'cps_1000',      nameHe: '1K לשנייה',      nameEn: '1K CPS',         icon: '💫', check: s => s.cps >= 1000 },
  { id: 'golden',        nameHe: 'מגע זהב',        nameEn: 'Golden Touch',   icon: '✨', check: s => s.goldenClicks >= 1 },
  { id: 'prestige_1',    nameHe: 'עליית דרגה',     nameEn: 'Prestige',       icon: '✦', check: s => s.prestigeCount >= 1 },
];

function totalBuildings(s) {
  return Object.values(s.buildings).reduce((a, b) => a + b, 0);
}
function countUpgrades(s) {
  return Object.values(s.upgrades).filter(Boolean).length;
}

// ============================================================
// SECTION 6 — GAME STATE
// ============================================================
let state = {
  clicks:           0,
  clickValue:       CONFIG.baseClickValue,
  clickMultiplier:  1,
  cps:              0,
  globalMultiplier: 1,
  buildings:        {},
  buildingMult:     {},
  upgrades:         {},
  achievements:     {},
  totalClicks:      0,
  manualClicks:     0,
  goldenClicks:     0,
  prestigeCount:    0,
  prestigeMultiplier: 1,
  startTime:        Date.now(),
  lastSaveTime:     null,
  lastTickTime:     Date.now(),
};

// ============================================================
// SECTION 7 — SAVE / LOAD
// ============================================================
function saveGame() {
  state.lastSaveTime = Date.now();
  const payload = JSON.stringify({ version: 2, state });
  localStorage.setItem(CONFIG.saveKey, payload);
  renderSaveInfo();
}

function loadGame() {
  const raw = localStorage.getItem(CONFIG.saveKey);
  if (!raw) return;
  try {
    const { version, state: saved } = JSON.parse(raw);
    if (version < 2) { localStorage.removeItem(CONFIG.saveKey); return; }
    Object.assign(state, saved);
  } catch(e) {
    localStorage.removeItem(CONFIG.saveKey);
  }
}

function exportSave() {
  const data = btoa(unescape(encodeURIComponent(JSON.stringify({ version: 2, state }))));
  navigator.clipboard.writeText(data).then(() => showToast(t('exportDone'), '📋'));
}

function importSave() {
  const input = prompt(t('importPrompt'));
  if (!input) return;
  try {
    const { version, state: saved } = JSON.parse(decodeURIComponent(escape(atob(input.trim()))));
    if (version < 2) throw new Error('old version');
    Object.assign(state, saved);
    recomputeCps();
    renderAll();
  } catch(e) {
    showToast(t('importFail'), '❌');
  }
}

// ============================================================
// SECTION 8 — CORE GAME LOGIC
// ============================================================
function getCost(building) {
  const owned = state.buildings[building.id] || 0;
  return Math.ceil(building.baseCost * Math.pow(building.costScale, owned));
}

function recomputeCps() {
  let total = 0;
  for (const b of BUILDINGS) {
    const owned = state.buildings[b.id] || 0;
    const mult  = state.buildingMult[b.id] || 1;
    total += b.baseCps * owned * mult;
  }
  state.cps = total * state.globalMultiplier * state.prestigeMultiplier;

  // Recompute click value
  state.clickValue = Math.max(1, Math.floor(
    CONFIG.baseClickValue * state.clickMultiplier * state.prestigeMultiplier
  ));
}

function buyBuilding(id) {
  const b = BUILDINGS.find(x => x.id === id);
  if (!b) return;
  const cost = getCost(b);
  if (state.clicks < cost) return;
  state.clicks -= cost;
  state.buildings[id] = (state.buildings[id] || 0) + 1;
  recomputeCps();
  playSound('purchase');
  scheduleRender();
  checkAchievements();
}

function buyUpgrade(id) {
  const u = UPGRADES.find(x => x.id === id);
  if (!u || state.upgrades[id]) return;
  if (state.clicks < u.cost) return;
  if (!u.unlockWhen(state)) return;
  state.clicks -= u.cost;
  state.upgrades[id] = true;
  u.apply(state);
  recomputeCps();
  playSound('purchase');
  scheduleRender();
  checkAchievements();
}

// ============================================================
// SECTION 9 — ACHIEVEMENTS
// ============================================================
function checkAchievements() {
  for (const a of ACHIEVEMENTS) {
    if (!state.achievements[a.id] && a.check(state)) {
      state.achievements[a.id] = true;
      showToast((CONFIG.language === 'he' ? a.nameHe : a.nameEn), a.icon);
      playSound('milestone');
    }
  }
}

// ============================================================
// SECTION 10 — TICK LOOP
// ============================================================
let lastBuildingFlash = {};

function tick() {
  const now = Date.now();
  const delta = (now - state.lastTickTime) / 1000;
  state.lastTickTime = now;

  if (state.cps > 0) {
    state.clicks += state.cps * delta;
    scheduleRender();
  }

  // Building tick flash — flash once per second per building
  for (const b of BUILDINGS) {
    const owned = state.buildings[b.id] || 0;
    if (owned === 0) continue;
    const lastFlash = lastBuildingFlash[b.id] || 0;
    if (now - lastFlash >= 1000) {
      lastBuildingFlash[b.id] = now;
      const row = document.querySelector(`[data-building-id="${b.id}"]`);
      if (row) {
        row.classList.remove('tick-flash');
        void row.offsetWidth;
        row.classList.add('tick-flash');
      }
    }
  }

  checkAchievements();
}

// ============================================================
// SECTION 11 — CLICK HANDLER
// ============================================================
function handleClick(e) {
  const isGolden = document.getElementById('main-object').classList.contains('golden-mode');
  let gained = state.clickValue;

  if (isGolden) {
    gained = Math.ceil(state.clickValue * CONFIG.goldenMultiplier);
    state.goldenClicks++;
    endGoldenMode();
    showToast(t('goldenBonus').replace('{n}', fmt(gained)), '✨');
  }

  state.clicks      += gained;
  state.totalClicks += 1;
  state.manualClicks += 1;

  spawnParticles(e, '+' + fmt(gained));
  triggerClickAnim();
  playSound('click');
  scheduleRender();
  checkAchievements();
}

function triggerClickAnim() {
  const ring = document.getElementById('pulse-ring');
  ring.classList.remove('active');
  void ring.offsetWidth;
  ring.classList.add('active');

  const counter = document.getElementById('click-counter');
  counter.classList.remove('bump');
  void counter.offsetWidth;
  counter.classList.add('bump');
}

// ============================================================
// SECTION 12 — PARTICLE ENGINE
// ============================================================
const PARTICLE_POOL = [];
const PARTICLE_POOL_SIZE = 40;

function initParticlePool() {
  const layer = document.getElementById('particle-layer');
  for (let i = 0; i < PARTICLE_POOL_SIZE; i++) {
    const p = document.createElement('div');
    p.className = i < 4 ? 'particle dot' : 'particle';
    layer.appendChild(p);
    PARTICLE_POOL.push({ el: p, inUse: false });
  }
}

function getParticle() {
  return PARTICLE_POOL.find(p => !p.inUse) || PARTICLE_POOL[0];
}

function spawnParticles(e, label) {
  const area = document.getElementById('click-area');
  const rect = area.getBoundingClientRect();
  const cx = e.clientX - rect.left;
  const cy = e.clientY - rect.top;

  for (let i = 0; i < CONFIG.particleCount; i++) {
    const slot = getParticle();
    slot.inUse = true;
    const p = slot.el;
    const angle = (360 / CONFIG.particleCount) * i + (Math.random() * 30 - 15);
    p.style.setProperty('--angle', angle + 'deg');
    p.style.setProperty('--life', CONFIG.particleLifeMs + 'ms');
    p.style.left = cx + 'px';
    p.style.top  = cy + 'px';
    p.textContent = (i === 0) ? label : '';
    p.classList.remove('active');
    void p.offsetWidth;
    p.classList.add('active');
    setTimeout(() => { slot.inUse = false; }, CONFIG.particleLifeMs);
  }
}

// ============================================================
// SECTION 13 — GOLDEN MODE
// ============================================================
let goldenTimer = null;

function scheduleGolden() {
  const delay = CONFIG.goldenMinMs + Math.random() * (CONFIG.goldenMaxMs - CONFIG.goldenMinMs);
  goldenTimer = setTimeout(startGoldenMode, delay);
}

function startGoldenMode() {
  const obj = document.getElementById('main-object');
  obj.classList.add('golden-mode');
  showToast(t('goldenAlert'), '✨');
  setTimeout(endGoldenMode, CONFIG.goldenDurationMs);
}

function endGoldenMode() {
  document.getElementById('main-object').classList.remove('golden-mode');
  scheduleGolden();
}

// ============================================================
// SECTION 14 — PRESTIGE
// ============================================================
function canPrestige() {
  return state.clicks >= CONFIG.prestigeThreshold;
}

function doPrestige() {
  if (!canPrestige()) return;
  state.prestigeCount++;
  state.prestigeMultiplier = 1 + state.prestigeCount * 0.5;

  // Reset progress but keep prestige data
  state.clicks          = 0;
  state.totalClicks     = 0;
  state.manualClicks    = 0;
  state.cps             = 0;
  state.clickMultiplier = 1;
  state.globalMultiplier = 1;
  state.buildings       = {};
  state.buildingMult    = {};
  state.upgrades        = {};
  state.startTime       = Date.now();

  recomputeCps();
  buildUpgradeCards();
  buildBuildingRows();
  renderAll();
  saveGame();
  showToast(t('prestigeDone').replace('{m}', fmt(state.prestigeMultiplier)), '✦');
}

// ============================================================
// SECTION 15 — UI RENDERING
// ============================================================
let renderPending = false;

function scheduleRender() {
  if (renderPending) return;
  renderPending = true;
  requestAnimationFrame(() => { renderPending = false; renderAll(); });
}

function renderAll() {
  renderStats();
  renderBuildings();
  renderUpgrades();
  renderPrestige();
}

let lastRenderedClicks = -1;
let lastRenderedCps    = -1;

function renderStats() {
  const c = Math.floor(state.clicks);
  if (c !== lastRenderedClicks) {
    document.getElementById('click-counter').textContent = fmt(c);
    lastRenderedClicks = c;
  }
  const cps = state.cps;
  if (Math.abs(cps - lastRenderedCps) > 0.001) {
    document.getElementById('cps-value').textContent = fmt(cps);
    lastRenderedCps = cps;
  }
  document.getElementById('stat-manual').textContent = fmt(state.manualClicks);
  document.getElementById('stat-achievements').textContent =
    Object.values(state.achievements).filter(Boolean).length + ' / ' + ACHIEVEMENTS.length;
  document.getElementById('stat-upgrades').textContent = countUpgrades(state);

  const sec = Math.floor((Date.now() - state.startTime) / 1000);
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
  document.getElementById('stat-time').textContent =
    h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

function renderBuildings() {
  for (const b of BUILDINGS) {
    const row = document.querySelector(`[data-building-id="${b.id}"]`);
    if (!row) continue;
    const owned = state.buildings[b.id] || 0;
    const cost  = getCost(b);
    row.querySelector('.b-count').textContent = owned;
    row.querySelector('.b-cost').textContent  = t('cost') + fmt(cost);
    row.classList.toggle('affordable-no', state.clicks < cost);
  }
}

function renderUpgrades() {
  for (const u of UPGRADES) {
    const card = document.querySelector(`[data-upgrade-id="${u.id}"]`);
    if (!card) continue;
    const unlocked = u.unlockWhen(state);
    const bought   = !!state.upgrades[u.id];
    card.style.display = (unlocked && !bought) ? '' : 'none';
    if (unlocked && !bought) {
      card.classList.toggle('affordable-no', state.clicks < u.cost);
    }
  }
}

function renderPrestige() {
  const btn = document.getElementById('btn-prestige');
  const badge = document.getElementById('prestige-badge');
  if (canPrestige()) {
    btn.style.display = 'block';
    const m = fmt(1 + (state.prestigeCount + 1) * 0.5);
    btn.textContent = t('prestige') + ' (×' + m + ')';
  } else {
    btn.style.display = 'none';
  }
  if (state.prestigeCount > 0) {
    badge.style.display = 'block';
    badge.textContent = '✦ ×' + fmt(state.prestigeMultiplier);
  }
}

function renderSaveInfo() {
  const el = document.getElementById('save-info');
  if (!state.lastSaveTime) { el.textContent = t('never'); return; }
  const d = new Date(state.lastSaveTime);
  el.textContent = t('saved') + d.toLocaleTimeString(CONFIG.language === 'he' ? 'he-IL' : 'en-US');
}

// ============================================================
// SECTION 16 — DOM BUILDERS
// ============================================================
function buildBuildingRows() {
  const panel = document.getElementById('buildings-panel');
  panel.innerHTML = '';
  for (const b of BUILDINGS) {
    const row = document.createElement('div');
    row.className = 'building-row';
    row.dataset.buildingId = b.id;

    const iconSrc = ASSETS.images.buildingIcons[b.id] || '';
    const iconContent = iconSrc
      ? `<img src="${iconSrc}" alt="">`
      : b.emoji;

    row.innerHTML = `
      <div class="b-icon">${iconContent}</div>
      <div class="b-name">${CONFIG.language === 'he' ? b.nameHe : b.nameEn}</div>
      <div class="b-count">0</div>
      <div class="b-cost"></div>
    `;
    panel.appendChild(row);
  }
}

function buildUpgradeCards() {
  const panel = document.getElementById('upgrades-panel');
  panel.innerHTML = '';
  for (const u of UPGRADES) {
    const card = document.createElement('div');
    card.className = 'upgrade-card';
    card.dataset.upgradeId = u.id;
    card.style.display = 'none';
    card.innerHTML = `
      <div class="u-name">${CONFIG.language === 'he' ? u.nameHe : u.nameEn}</div>
      <div class="u-desc">${CONFIG.language === 'he' ? u.descHe : u.descEn}</div>
      <div class="u-cost">${t('cost')}${fmt(u.cost)}</div>
    `;
    panel.appendChild(card);
  }
}

// ============================================================
// SECTION 17 — TOAST
// ============================================================
function showToast(text, icon = '🎉') {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span class="toast-icon">${icon}</span><span>${text}</span>`;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3700);
}

// ============================================================
// SECTION 18 — NEWS TICKER
// ============================================================
let newsIndex = 0;
function nextNews() {
  const lines = NEWS_LINES[CONFIG.language];
  document.getElementById('news-ticker').textContent = lines[newsIndex % lines.length];
  newsIndex++;
}

// ============================================================
// SECTION 19 — ASSETS INJECTION
// ============================================================
function applyAssets() {
  // Main object image
  if (ASSETS.images.mainObject) {
    const img = document.getElementById('main-object-img');
    img.src = ASSETS.images.mainObject;
    img.style.display = 'block';
    document.getElementById('main-object').classList.add('has-image');
  }
  // Audio sources
  ['click', 'purchase', 'milestone', 'ambient'].forEach(name => {
    const src = ASSETS.audio[name];
    const el  = document.getElementById('audio-' + name);
    if (src && el) el.src = src;
  });
  // Video background
  if (ASSETS.video.background) {
    const v = document.getElementById('bg-video');
    v.src = ASSETS.video.background;
    v.play().catch(() => {});
  }
}

// ============================================================
// SECTION 20 — SOUND
// ============================================================
function playSound(name) {
  const el = document.getElementById('audio-' + name);
  if (!el || !el.src || el.src === window.location.href) return;
  el.currentTime = 0;
  el.play().catch(() => {});
}

// ============================================================
// SECTION 21 — LANGUAGE
// ============================================================
function t(key) {
  return (STRINGS[CONFIG.language] || STRINGS.he)[key] || key;
}

function applyLanguage(lang) {
  CONFIG.language = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir  = lang === 'he' ? 'rtl' : 'ltr';
  document.getElementById('btn-lang').textContent = lang === 'he' ? 'EN' : 'עב';

  // Update all data-he / data-en text nodes
  document.querySelectorAll('[data-he]').forEach(el => {
    const val = lang === 'he' ? el.dataset.he : el.dataset.en;
    if (val !== undefined) el.textContent = val;
  });

  buildBuildingRows();
  buildUpgradeCards();
  renderAll();
  nextNews();
}

function toggleLanguage() {
  applyLanguage(CONFIG.language === 'he' ? 'en' : 'he');
}

// ============================================================
// SECTION 22 — NUMBER FORMAT
// ============================================================
function fmt(n) {
  if (n === undefined || n === null || isNaN(n)) return '0';
  if (n < 1000)   return Math.floor(n).toLocaleString();
  if (n < 1e6)    return (n / 1e3).toFixed(1) + 'K';
  if (n < 1e9)    return (n / 1e6).toFixed(1) + 'M';
  if (n < 1e12)   return (n / 1e9).toFixed(1) + 'B';
  if (n < 1e15)   return (n / 1e12).toFixed(1) + 'T';
  return (n / 1e15).toFixed(1) + 'Q';
}

function pad(n) { return String(n).padStart(2, '0'); }

// ============================================================
// SECTION 23 — EVENT LISTENERS
// ============================================================
function wireEventListeners() {
  document.getElementById('main-object').addEventListener('click', handleClick);

  document.getElementById('buildings-panel').addEventListener('click', e => {
    const row = e.target.closest('[data-building-id]');
    if (row) buyBuilding(row.dataset.buildingId);
  });

  document.getElementById('upgrades-panel').addEventListener('click', e => {
    const card = e.target.closest('[data-upgrade-id]');
    if (card) buyUpgrade(card.dataset.upgradeId);
  });

  document.getElementById('btn-save').addEventListener('click', saveGame);
  document.getElementById('btn-export').addEventListener('click', exportSave);
  document.getElementById('btn-import').addEventListener('click', importSave);
  document.getElementById('btn-reset').addEventListener('click', () => {
    if (confirm(t('resetConfirm'))) {
      localStorage.removeItem(CONFIG.saveKey);
      location.reload();
    }
  });
  document.getElementById('btn-lang').addEventListener('click', toggleLanguage);

  // Spacebar = click
  document.addEventListener('keydown', e => {
    if (e.code === 'Space' && e.target === document.body) {
      e.preventDefault();
      const obj = document.getElementById('main-object');
      const rect = obj.getBoundingClientRect();
      handleClick({ clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 });
    }
  });
}

// ============================================================
// SECTION 24 — OFFLINE EARNINGS
// ============================================================
function handleOfflineEarnings() {
  if (!state.lastSaveTime || state.cps <= 0) return;
  const elapsed = (Date.now() - state.lastSaveTime) / 1000;
  if (elapsed < 10) return;
  const cappedSec = Math.min(elapsed, CONFIG.offlineCapHours * 3600);
  const earned = state.cps * cappedSec * 0.5;
  state.clicks += earned;

  const hours = Math.floor(elapsed / 3600);
  const mins  = Math.floor((elapsed % 3600) / 60);
  const timeStr = hours > 0 ? `${hours}ש׳ ${mins}ד׳` : `${mins} ד׳`;
  showToast(t('offlineEarned').replace('{t}', timeStr).replace('{n}', fmt(earned)), '😴');
}

// ============================================================
// SECTION 25 — INIT
// ============================================================
function init() {
  applyAssets();
  loadGame();
  handleOfflineEarnings();
  buildBuildingRows();
  buildUpgradeCards();
  wireEventListeners();
  initParticlePool();

  // Add prestige button and badge to buildings sidebar
  const bSidebar = document.getElementById('sidebar-buildings');
  const badge = document.createElement('div');
  badge.id = 'prestige-badge';
  const btnPrestige = document.createElement('button');
  btnPrestige.id = 'btn-prestige';
  btnPrestige.addEventListener('click', doPrestige);
  bSidebar.insertBefore(badge, bSidebar.querySelector('#buildings-panel'));
  bSidebar.insertBefore(btnPrestige, bSidebar.querySelector('#buildings-panel'));

  recomputeCps();
  applyLanguage(CONFIG.language);
  renderAll();
  renderSaveInfo();

  // Game tick
  setInterval(tick, CONFIG.tickRateMs);
  // Autosave
  setInterval(saveGame, CONFIG.autosaveIntervalS * 1000);
  // News ticker
  nextNews();
  setInterval(nextNews, 32000);
  // Golden mode
  scheduleGolden();
}

document.addEventListener('DOMContentLoaded', init);
