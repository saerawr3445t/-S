'use strict';

// ============================================================
// SECTION 1 — ASSETS & CONFIGURATION
// כדי להוסיף תמונה/אודיו/וידאו: מלא את הנתיב המתאים כאן
// ============================================================
const ASSETS = {
  images: {
    mainObject:   '',         // דוגמה: 'assets/images/main.png'
    background:   '',         // דוגמה: 'assets/images/bg.jpg'
    goldenCookie: '',         // דוגמה: 'assets/images/golden.png'
    buildingIcons: {
      cursor:   '',
      farm:     '',
      mine:     '',
      factory:  '',
      bank:     '',
      temple:   '',
      wizard:   '',
      shipment: '',
      alchemy:  '',
    }
  },
  audio: {
    click:     '',            // דוגמה: 'assets/audio/click.mp3'
    purchase:  '',
    milestone: '',
    ambient:   '',
    golden:    '',            // דוגמה: 'assets/audio/golden.mp3'
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
    goldenAppear:       '✨ עוגיית זהב! לחץ מהר!',
    goldenClickFrenzy:  '🖱️ קליק טורף! ×777 לקליק ל-13 שניות!',
    goldenFrenzy:       '⚡ הזיה! ×7 ייצור ל-77 שניות!',
    goldenLucky:        '🍀 מזל! +{n}!',
    goldenFrenzyActive: '⚡ הזיה פעילה',
    goldenClickFrenzyActive: '🖱️ קליק טורף פעיל',
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
    goldenAppear:       '✨ Golden cookie! Click fast!',
    goldenClickFrenzy:  '🖱️ Click Frenzy! ×777 clicks for 13s!',
    goldenFrenzy:       '⚡ Frenzy! ×7 production for 77s!',
    goldenLucky:        '🍀 Lucky! +{n}!',
    goldenFrenzyActive: '⚡ Frenzy active',
    goldenClickFrenzyActive: '🖱️ Click Frenzy active',
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
  {
    id: 'temple',
    nameHe: 'מקדש', nameEn: 'Temple',
    descHe: 'האלים מתגמלים את הנאמנים.', descEn: 'The gods reward the faithful.',
    emoji: '🛕', baseCps: 260,  baseCost: 20000000, costScale: 1.15,
  },
  {
    id: 'wizard',
    nameHe: 'מגדל קוסמים', nameEn: 'Wizard Tower',
    descHe: 'קסם טהור הופך לקליקים.', descEn: 'Pure magic converted into clicks.',
    emoji: '🔮', baseCps: 1600, baseCost: 330000000, costScale: 1.15,
  },
  {
    id: 'shipment',
    nameHe: 'משלוח', nameEn: 'Shipment',
    descHe: 'קליקים מגיעים מהחלל החיצון.', descEn: 'Clicks shipped in from outer space.',
    emoji: '🚀', baseCps: 10000, baseCost: 5100000000, costScale: 1.15,
  },
  {
    id: 'alchemy',
    nameHe: 'מעבדת אלכימיה', nameEn: 'Alchemy Lab',
    descHe: 'הופך ברזל לקליקים טהורים.', descEn: 'Turns base metals into pure clicks.',
    emoji: '⚗️', baseCps: 65000, baseCost: 75000000000, costScale: 1.15,
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
  // --- מקדש ---
  {
    id: 'temple_2',
    nameHe: 'פולחן עמוק', nameEn: 'Deep Worship',
    descHe: 'מקדשים פי 2.', descEn: 'Temples ×2.',
    cost: 40000000,
    unlockWhen: s => (s.buildings.temple || 0) >= 1,
    apply: s => { s.buildingMult.temple = (s.buildingMult.temple || 1) * 2; }
  },
  {
    id: 'temple_3',
    nameHe: 'ברכת האלים', nameEn: 'Divine Blessing',
    descHe: 'מקדשים פי 5.', descEn: 'Temples ×5.',
    cost: 500000000,
    unlockWhen: s => (s.buildings.temple || 0) >= 10,
    apply: s => { s.buildingMult.temple = (s.buildingMult.temple || 1) * 5; }
  },
  // --- מגדל קוסמים ---
  {
    id: 'wizard_2',
    nameHe: 'לחשים עוצמתיים', nameEn: 'Power Spells',
    descHe: 'מגדלים פי 2.', descEn: 'Wizard towers ×2.',
    cost: 700000000,
    unlockWhen: s => (s.buildings.wizard || 0) >= 1,
    apply: s => { s.buildingMult.wizard = (s.buildingMult.wizard || 1) * 2; }
  },
  {
    id: 'wizard_3',
    nameHe: 'קסם אינסופי', nameEn: 'Infinite Magic',
    descHe: 'מגדלים פי 5.', descEn: 'Wizard towers ×5.',
    cost: 8000000000,
    unlockWhen: s => (s.buildings.wizard || 0) >= 10,
    apply: s => { s.buildingMult.wizard = (s.buildingMult.wizard || 1) * 5; }
  },
  // --- משלוח ---
  {
    id: 'shipment_2',
    nameHe: 'טיל מהיר', nameEn: 'Faster Rockets',
    descHe: 'משלוחים פי 2.', descEn: 'Shipments ×2.',
    cost: 10000000000,
    unlockWhen: s => (s.buildings.shipment || 0) >= 1,
    apply: s => { s.buildingMult.shipment = (s.buildingMult.shipment || 1) * 2; }
  },
  {
    id: 'shipment_3',
    nameHe: 'ניווט בין-גלקטי', nameEn: 'Intergalactic Nav',
    descHe: 'משלוחים פי 5.', descEn: 'Shipments ×5.',
    cost: 120000000000,
    unlockWhen: s => (s.buildings.shipment || 0) >= 10,
    apply: s => { s.buildingMult.shipment = (s.buildingMult.shipment || 1) * 5; }
  },
  // --- אלכימיה ---
  {
    id: 'alchemy_2',
    nameHe: 'אבן החכמים', nameEn: "Philosopher's Stone",
    descHe: 'מעבדות פי 2.', descEn: 'Alchemy labs ×2.',
    cost: 150000000000,
    unlockWhen: s => (s.buildings.alchemy || 0) >= 1,
    apply: s => { s.buildingMult.alchemy = (s.buildingMult.alchemy || 1) * 2; }
  },
  {
    id: 'alchemy_3',
    nameHe: 'מטריקס מולקולרי', nameEn: 'Molecular Matrix',
    descHe: 'מעבדות פי 5.', descEn: 'Alchemy labs ×5.',
    cost: 1500000000000,
    unlockWhen: s => (s.buildings.alchemy || 0) >= 10,
    apply: s => { s.buildingMult.alchemy = (s.buildingMult.alchemy || 1) * 5; }
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
  {
    id: 'global_5x',
    nameHe: 'שכר עצום', nameEn: 'Massive Payout',
    descHe: 'כל הייצור פי 5.', descEn: 'All production ×5.',
    cost: 500000000,
    unlockWhen: s => s.totalClicks >= 50000000,
    apply: s => { s.globalMultiplier *= 5; }
  },
  {
    id: 'click_10x',
    nameHe: 'יד של ענק', nameEn: 'Giant Hand',
    descHe: 'קליקים שווים פי 10.', descEn: 'Clicks worth ×10.',
    cost: 100000000,
    unlockWhen: s => s.totalClicks >= 10000000,
    apply: s => { s.clickMultiplier *= 10; }
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
  { id: 'own_temple',   nameHe: 'מקדש ראשון',     nameEn: 'First Temple',   icon: '🛕', check: s => (s.buildings.temple||0) >= 1 },
  { id: 'own_wizard',   nameHe: 'מגדל ראשון',     nameEn: 'First Tower',    icon: '🔮', check: s => (s.buildings.wizard||0) >= 1 },
  { id: 'own_shipment', nameHe: 'משלוח ראשון',    nameEn: 'First Shipment', icon: '🚀', check: s => (s.buildings.shipment||0) >= 1 },
  { id: 'own_alchemy',  nameHe: 'מעבדה ראשונה',   nameEn: 'First Lab',      icon: '⚗️', check: s => (s.buildings.alchemy||0) >= 1 },
  { id: 'golden_5',     nameHe: '5 עוגיות זהב',   nameEn: '5 Golden Cookies', icon: '🍪', check: s => s.goldenClicks >= 5 },
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
  goldenClicks:          0,
  clickFrenzyEndTime:    0,
  frenzyEndTime:         0,
  prestigeCount:         0,
  prestigeMultiplier: 1,
  startTime:        Date.now(),
  lastSaveTime:     null,
  lastTickTime:     Date.now(),
  // Quest system
  quests:           [],
  questMultEndTime: 0,
  questMult:        1,
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
    total += b.baseCps * owned * mult * getSynergy(b.id);
  }
  const now        = Date.now();
  const frenzyMult = (state.frenzyEndTime     > 0 && now < state.frenzyEndTime)     ? 7 : 1;
  const questMult  = (state.questMultEndTime  > 0 && now < state.questMultEndTime)  ? (state.questMult || 1) : 1;
  state.cps = total * state.globalMultiplier * state.prestigeMultiplier * frenzyMult * questMult;

  // Recompute click value
  state.clickValue = Math.max(1, Math.floor(
    CONFIG.baseClickValue * state.clickMultiplier * state.prestigeMultiplier
  ));
}

// ============================================================
// SECTION 29 — BUILDING SYNERGIES
// ============================================================
function getSynergy(id) {
  const b   = state.buildings;
  const tot = totalBuildings(state);
  switch (id) {
    case 'cursor':   return 1 + 0.01  * Math.floor((b.farm     || 0) / 5);   // +1% per 5 farms
    case 'farm':     return 1 + 0.01  * Math.floor((b.cursor   || 0) / 5);   // +1% per 5 cursors
    case 'mine':     return 1 + 0.02  * (b.temple   || 0);                   // +2% per temple
    case 'factory':  return 1 + 0.01  * Math.floor((b.mine     || 0) / 10);  // +1% per 10 mines
    case 'bank':     return 1 + 0.005 * tot;                                  // +0.5% per building
    case 'temple':   return 1 + 0.03  * (b.wizard   || 0);                   // +3% per wizard tower
    case 'wizard':   return 1 + 0.05  * (b.shipment || 0);                   // +5% per shipment
    case 'shipment': return 1 + 0.02  * (b.alchemy  || 0);                   // +2% per lab
    case 'alchemy':  return 1 + 0.01  * Math.floor(tot / 10);                // +1% per 10 buildings
    default:         return 1;
  }
}

// Human-readable synergy hint for each building (shown in tooltip)
const SYNERGY_HINT = {
  he: {
    cursor:   'פארמות מגבירות סמנים (+1% / 5 פארמות)',
    farm:     'סמנים מגבירים פארמות (+1% / 5 סמנים)',
    mine:     'מקדשים מגבירים מכרות (+2% / מקדש)',
    factory:  'מכרות מגבירים מפעלים (+1% / 10 מכרות)',
    bank:     'כל בניין מגביר בנקים (+0.5% / בניין)',
    temple:   'מגדלי קוסמים מגבירים מקדשים (+3% / מגדל)',
    wizard:   'משלוחים מגבירים מגדלי קוסמים (+5% / משלוח)',
    shipment: 'מעבדות מגבירות משלוחים (+2% / מעבדה)',
    alchemy:  'כל 10 בניינים מגבירים מעבדות (+1% / 10)',
  },
  en: {
    cursor:   'Farms boost cursors (+1% per 5 farms)',
    farm:     'Cursors boost farms (+1% per 5 cursors)',
    mine:     'Temples boost mines (+2% per temple)',
    factory:  'Mines boost factories (+1% per 10 mines)',
    bank:     'All buildings boost banks (+0.5% each)',
    temple:   'Wizard towers boost temples (+3% each)',
    wizard:   'Shipments boost wizard towers (+5% each)',
    shipment: 'Alchemy labs boost shipments (+2% each)',
    alchemy:  'Every 10 buildings boost labs (+1%)',
  }
};

function buyBuilding(id) {
  const b = BUILDINGS.find(x => x.id === id);
  if (!b) return;
  const cost = getCost(b);
  if (state.clicks < cost) return;
  state.clicks -= cost;
  state.buildings[id] = (state.buildings[id] || 0) + 1;
  recomputeCps();
  playSound('purchase');
  fireTunnelEvent(id);
  // Quest tracking: buy_n and own_n_of
  if (state.quests) {
    state.quests.forEach(q => {
      if (!q || q.completed) return;
      if (q.type === 'buy_n') {
        q.progress = Math.min(q.progress + 1, q.target);
        if (q.progress >= q.target) q.completed = true;
      }
      if (q.type === 'own_n_of' && q.bId === id) {
        q.progress = state.buildings[id];
        if (q.progress >= q.target) q.completed = true;
      }
    });
    renderQuests();
  }
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

  // Check frenzy expiration
  if (state.frenzyEndTime > 0 && now > state.frenzyEndTime) {
    state.frenzyEndTime = 0;
    recomputeCps();
  }
  // Check quest mult expiration
  if (state.questMultEndTime > 0 && now > state.questMultEndTime) {
    state.questMultEndTime = 0;
    state.questMult = 1;
    recomputeCps();
  }

  if (state.cps > 0) {
    state.clicks += state.cps * delta;
    scheduleRender();
  }

  renderActiveEffects();

  // Building tick flash — flash once per second per building
  for (const b of BUILDINGS) {
    const owned = state.buildings[b.id] || 0;
    if (owned === 0) continue;
    const lastFlash = lastBuildingFlash[b.id] || 0;
    if (now - lastFlash >= 1000) {
      lastBuildingFlash[b.id] = now;
      const row = document.querySelector(`[data-building-id="${b.id}"]`);
      if (row) {
        const work = row.querySelector('.b-work');
        if (work) work.classList.remove('bw-produce');
        row.classList.remove('tick-flash');
        void row.offsetWidth;
        row.classList.add('tick-flash');
        if (work) work.classList.add('bw-produce');
      }
    }
  }

  checkAchievements();
}

// ============================================================
// SECTION 11 — CLICK HANDLER
// ============================================================
// ── Combo + Critical hit state ──────────────────────────────
let _combo = 0;
let _comboTimer = null;
const MILESTONE_THRESHOLDS = [100, 1e3, 1e4, 1e5, 1e6, 1e9, 1e12];
let _milestoneIdx = 0;

function clickCombo() {
  clearTimeout(_comboTimer);
  _combo = Math.min(_combo + 1, 10);
  _comboTimer = setTimeout(() => { _combo = 0; renderComboDisplay(); }, 1600);
  renderComboDisplay();
}

function comboMult() {
  if (_combo < 5)  return 1;
  if (_combo < 8)  return 2;
  if (_combo < 10) return 3;
  return 4;
}

function renderComboDisplay() {
  const el = document.getElementById('combo-counter');
  if (!el) return;
  el.className = '';
  if (_combo < 5) { el.textContent = ''; return; }
  const m = comboMult();
  if (m === 4) { el.className = 'combo-x4'; el.textContent = `⚡ ×4 MEGA COMBO!`; }
  else if (m === 3) { el.className = 'combo-x3'; el.textContent = `🔥 ×3 COMBO (${_combo})`; }
  else              { el.className = 'combo-x2'; el.textContent = `×2 combo (${_combo})`; }
}

function checkMilestones() {
  while (_milestoneIdx < MILESTONE_THRESHOLDS.length &&
         state.totalClicks >= MILESTONE_THRESHOLDS[_milestoneIdx]) {
    const n = MILESTONE_THRESHOLDS[_milestoneIdx];
    const flash = document.getElementById('milestone-flash');
    if (flash) { flash.classList.remove('boom'); void flash.offsetWidth; flash.classList.add('boom'); }
    showToast(
      CONFIG.language === 'he' ? `🏆 ${fmt(n)} קליקים!` : `🏆 ${fmt(n)} clicks!`,
      '🎊'
    );
    fireTunnelEvent('temple');
    _milestoneIdx++;
  }
}

function handleClick(e) {
  const frenzyActive = state.clickFrenzyEndTime > 0 && Date.now() < state.clickFrenzyEndTime;
  const isCrit       = !frenzyActive && Math.random() < 0.07;
  clickCombo();
  const mult   = frenzyActive ? 777 : (comboMult() * (isCrit ? 5 : 1));
  const gained = Math.ceil(state.clickValue * mult);

  state.clicks       += gained;
  state.totalClicks  += 1;
  state.manualClicks += 1;

  // Quest tracking: click_n
  if (state.quests) {
    state.quests.forEach(q => {
      if (!q || q.completed || q.type !== 'click_n') return;
      q.progress = Math.min(q.progress + 1, q.target);
      if (q.progress >= q.target) q.completed = true;
    });
  }

  if (isCrit) {
    const obj = document.getElementById('main-object');
    obj.classList.remove('crit-anim');
    void obj.offsetWidth;
    obj.classList.add('crit-anim');
    spawnParticles(e, '⚡' + fmt(gained));
  } else {
    spawnParticles(e, '+' + fmt(gained));
  }

  checkMilestones();
  triggerClickAnim();
  playSound('click');
  scheduleRender();
  checkAchievements();
}

function triggerClickAnim() {
  const obj = document.getElementById('main-object');
  obj.classList.remove('click-squish');
  void obj.offsetWidth;
  obj.classList.add('click-squish');

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
// SECTION 13 — GOLDEN COOKIE
// ============================================================
let goldenCookieDismissTimer = null;

function scheduleGoldenCookie() {
  const delay = CONFIG.goldenMinMs + Math.random() * (CONFIG.goldenMaxMs - CONFIG.goldenMinMs);
  setTimeout(spawnGoldenCookie, delay);
}

function spawnGoldenCookie() {
  const el = document.getElementById('golden-cookie');
  if (!el) return;

  const pad = 80;
  const x = pad + Math.random() * (window.innerWidth  - pad * 2);
  const y = pad + Math.random() * (window.innerHeight - pad * 2);
  el.style.left = x + 'px';
  el.style.top  = y + 'px';

  if (ASSETS.images.goldenCookie) {
    el.style.backgroundImage = `url(${ASSETS.images.goldenCookie})`;
    el.style.backgroundSize  = 'cover';
    el.textContent = '';
  } else {
    el.style.backgroundImage = '';
    el.textContent = '🍪';
  }

  el.classList.add('visible');
  playSound('golden');
  showToast(t('goldenAppear'), '✨');

  goldenCookieDismissTimer = setTimeout(dismissGoldenCookie, CONFIG.goldenDurationMs);
}

function dismissGoldenCookie() {
  clearTimeout(goldenCookieDismissTimer);
  const el = document.getElementById('golden-cookie');
  if (el) el.classList.remove('visible');
  scheduleGoldenCookie();
}

function claimGoldenCookie() {
  clearTimeout(goldenCookieDismissTimer);
  state.goldenClicks++;

  const roll = Math.random();
  if (roll < 0.34) {
    // Click Frenzy
    state.clickFrenzyEndTime = Date.now() + 13000;
    showToast(t('goldenClickFrenzy'), '🖱️');
  } else if (roll < 0.67) {
    // Lucky — 13 minutes of current CPS
    const earned = state.cps * 13 * 60;
    state.clicks += Math.max(earned, state.clickValue * 100);
    showToast(t('goldenLucky').replace('{n}', fmt(earned || state.clickValue * 100)), '🍀');
  } else {
    // Frenzy — ×7 all production for 77 seconds
    state.frenzyEndTime = Date.now() + 77000;
    recomputeCps();
    showToast(t('goldenFrenzy'), '⚡');
  }

  playSound('milestone');
  const el = document.getElementById('golden-cookie');
  if (el) el.classList.remove('visible');
  scheduleGoldenCookie();
  checkAchievements();
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
  renderActiveEffects();
}

function renderActiveEffects() {
  const el = document.getElementById('active-effects');
  if (!el) return;
  const now = Date.now();
  const parts = [];
  if (state.frenzyEndTime > 0 && now < state.frenzyEndTime) {
    const sec = Math.ceil((state.frenzyEndTime - now) / 1000);
    parts.push(t('goldenFrenzyActive') + ' ' + sec + 's');
  }
  if (state.clickFrenzyEndTime > 0 && now < state.clickFrenzyEndTime) {
    const sec = Math.ceil((state.clickFrenzyEndTime - now) / 1000);
    parts.push(t('goldenClickFrenzyActive') + ' ' + sec + 's');
  }
  el.textContent = parts.join('  |  ');
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
  // Compute best-buy: highest CPS-gain per cost right now
  let bestId = null, bestRatio = -1;
  for (const b of BUILDINGS) {
    const cost    = getCost(b);
    const cpsGain = b.baseCps * (state.buildingMult[b.id] || 1) * getSynergy(b.id);
    const ratio   = cpsGain / cost;
    if (ratio > bestRatio) { bestRatio = ratio; bestId = b.id; }
  }

  for (const b of BUILDINGS) {
    const row = document.querySelector(`[data-building-id="${b.id}"]`);
    if (!row) continue;
    const owned = state.buildings[b.id] || 0;
    const cost  = getCost(b);
    row.querySelector('.b-count').textContent = owned;
    row.querySelector('.b-cost').textContent  = t('cost') + fmt(cost);
    row.classList.toggle('affordable-no', state.clicks < cost);
    row.classList.toggle('owned', owned > 0);
    row.classList.toggle('best-buy', b.id === bestId);

    // Synergy display
    const synEl = row.querySelector('.b-syn');
    if (synEl) {
      const syn = getSynergy(b.id);
      if (syn > 1.001) {
        synEl.textContent = `⚡ +${Math.round((syn - 1) * 100)}%`;
        synEl.style.opacity = '1';
      } else {
        synEl.textContent = '';
        synEl.style.opacity = '0';
      }
    }
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

// HTML content for each building's mini work-area scene
const WORK_AREA_HTML = {
  cursor:   '<span class="bw-ptr">🖱️</span><span class="bw-dot"></span>',
  farm:     '<span class="bw-plant p1">🌱</span><span class="bw-plant p2">🌿</span><span class="bw-plant p3">🌾</span>',
  mine:     '<span class="bw-pick">⛏️</span><span class="bw-ore">🪨</span>',
  factory:  '<span class="bw-belt"></span><span class="bw-box">📦</span>',
  bank:     '<span class="bw-coin">🪙</span>',
  temple:   '<span class="bw-flame">🕯️</span><span class="bw-smoke sm1"></span><span class="bw-smoke sm2"></span><span class="bw-smoke sm3"></span>',
  wizard:   '<span class="bw-star st1">✨</span><span class="bw-star st2">⭐</span><span class="bw-star st3">🌟</span>',
  shipment: '<span class="bw-stars"></span><span class="bw-rocket">🚀</span>',
  alchemy:  '<span class="bw-flask">⚗️</span><span class="bw-bub bu1"></span><span class="bw-bub bu2"></span><span class="bw-bub bu3"></span>',
};

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

    const hint = (SYNERGY_HINT[CONFIG.language] || SYNERGY_HINT.he)[b.id] || '';
    row.title = hint;
    row.innerHTML = `
      <div class="b-icon">${iconContent}</div>
      <div class="b-name">${CONFIG.language === 'he' ? b.nameHe : b.nameEn}</div>
      <div class="b-count">0</div>
      <div class="b-cost"></div>
      <div class="b-syn"></div>
    `;
    // Work area (mini production scene, shown when owned)
    const work = document.createElement('div');
    work.className = 'b-work';
    work.innerHTML = WORK_AREA_HTML[b.id] || '';
    row.appendChild(work);

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
  ['click', 'purchase', 'milestone', 'ambient', 'golden'].forEach(name => {
    const src = ASSETS.audio[name];
    const el  = document.getElementById('audio-' + name);
    if (src && el) el.src = src;
  });
  // Video background — hides the canvas tunnel when active
  if (ASSETS.video.background) {
    const v = document.getElementById('bg-video');
    v.src = ASSETS.video.background;
    v.play().catch(() => {});
    document.body.classList.add('has-video');
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas) bgCanvas.style.display = 'none';
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

  const goldenEl = document.getElementById('golden-cookie');
  if (goldenEl) goldenEl.addEventListener('click', claimGoldenCookie);

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
// SECTION 25 — TUNNEL EVENT ANIMATIONS
// ============================================================

// Per-building event definitions
const TUNNEL_EVENTS = {
  cursor:   { main: '🖱️', type: 'trail',   extras: ['🖱️','🖱️','🖱️','🖱️'] },
  farm:     { main: '🌾', type: 'sprout',  extras: ['🌾','🌻','🌾','🌾','🌻','🌾','🌿'] },
  mine:     { main: '⛏️', type: 'explode', extras: ['🪨','💎','🪨','🪨','💎','🪨','🪨','💥'] },
  factory:  { main: '🏭', type: 'factory', extras: ['☁️','☁️','☁️','⚙️'] },
  bank:     { main: '🏦', type: 'coins',   extras: ['🪙','💰','🪙','🪙','💰','🪙','🪙','💰','🪙','🪙','💰','🪙'] },
  temple:   { main: '🛕', type: 'rays',    extras: [] },
  wizard:   { main: '🔮', type: 'orbit',   extras: ['✨','⭐','✨','🌟','✨','⭐','✨','🌟'] },
  shipment: { main: '🚀', type: 'rocket',  extras: ['🔥','🔥','✨','🔥','🔥'] },
  alchemy:  { main: '⚗️', type: 'bubbles', extras: ['🔵','🟢','🟡','🟠','🔴','🟣'] },
};

function fireTunnelEvent(buildingId) {
  const layer = document.getElementById('tunnel-event-layer');
  if (!layer) return;
  const ev = TUNNEL_EVENTS[buildingId];
  if (!ev) return;

  const W  = window.innerWidth;
  const H  = window.innerHeight;
  const cx = W / 2;
  const cy = H / 2;

  // Container for this event — removed after longest animation
  const container = document.createElement('div');
  container.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
  layer.appendChild(container);

  // Helper: create one emoji element
  function piece(emoji, x, y, animClass, delay, cssVars) {
    const el = document.createElement('div');
    el.className = 'te ' + animClass;
    el.textContent = emoji;
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
    if (delay) el.style.animationDelay = delay + 'ms';
    if (cssVars) {
      for (const [k, v] of Object.entries(cssVars)) {
        el.style.setProperty(k, v);
      }
    }
    container.appendChild(el);
    return el;
  }

  switch (ev.type) {

    // Cursor: 5 copies trail out like motion-blur streaks from depth
    case 'trail': {
      for (let i = 0; i < 5; i++) {
        const p = piece(ev.main, cx + (i - 2) * 4, cy + (i - 2) * 4, 'te-zoom', i * 55);
        p.style.filter = `blur(${i * 0.5}px)`;
        p.style.opacity = String(1 - i * 0.16);
      }
      break;
    }

    // Farm: main zooms out while wheat stalks scatter like seeds
    case 'sprout': {
      piece(ev.main, cx, cy, 'te-zoom', 0);
      ev.extras.forEach((emoji, i) => {
        const angle = (i / ev.extras.length) * Math.PI * 2 - Math.PI / 2;
        const dist  = 18 + i * 6;
        piece(emoji, cx, cy, 'te-scatter', 80 + i * 55, {
          '--tx': (Math.cos(angle) * dist) + 'px',
          '--ty': (Math.sin(angle) * dist) + 'px',
        });
      });
      break;
    }

    // Mine: center explosion + 8 rocks scatter in all directions
    case 'explode': {
      piece(ev.main, cx, cy, 'te-zoom', 0);
      ev.extras.forEach((emoji, i) => {
        const angle = (i / ev.extras.length) * Math.PI * 2;
        const dist  = 16 + (i % 3) * 10;
        piece(emoji, cx, cy, 'te-scatter-fast', i * 28, {
          '--tx': (Math.cos(angle) * dist) + 'px',
          '--ty': (Math.sin(angle) * dist) + 'px',
        });
      });
      break;
    }

    // Factory: spins in while smoke puffs drift upward
    case 'factory': {
      piece(ev.main, cx, cy, 'te-zoom-spin', 0);
      ev.extras.forEach((emoji, i) => {
        const xOff = (i - ev.extras.length / 2) * 26;
        piece(emoji, cx + xOff, cy - 10, 'te-float-up', 250 + i * 180, {
          '--tx': (xOff * 0.3) + 'px',
        });
      });
      break;
    }

    // Bank: coin fountain arcs up from center then rains down
    case 'coins': {
      piece(ev.main, cx, cy, 'te-zoom', 0);
      ev.extras.forEach((emoji, i) => {
        const spread = (i - ev.extras.length / 2) * 22;
        piece(emoji, cx, cy, 'te-coin-fall', i * 55, {
          '--tx':  spread + 'px',
          '--rot': (Math.random() * 50 - 25) + 'deg',
        });
      });
      break;
    }

    // Temple: 8 golden sun-ray beams burst outward, then main emoji zooms
    case 'rays': {
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * 360;
        const ray   = document.createElement('div');
        ray.className = 'te te-ray-beam';
        ray.style.left = cx + 'px';
        ray.style.top  = cy + 'px';
        ray.style.setProperty('--rot', angle + 'deg');
        ray.style.animationDelay = (i * 35) + 'ms';
        container.appendChild(ray);
      }
      piece(ev.main, cx, cy, 'te-zoom', 220);
      break;
    }

    // Wizard: main spins in while 8 stars spiral outward
    case 'orbit': {
      piece(ev.main, cx, cy, 'te-zoom-spin', 0);
      ev.extras.forEach((emoji, i) => {
        const baseAngle = (i / ev.extras.length) * 360;
        piece(emoji, cx, cy, 'te-orbit-out', i * 75, {
          '--rot': baseAngle + 'deg',
          '--r':   (36 + i * 11) + 'px',
        });
      });
      break;
    }

    // Shipment: rocket streaks from tunnel center outward, fire trail follows
    case 'rocket': {
      piece(ev.main, cx, cy, 'te-rocket', 0);
      ev.extras.forEach((emoji, i) => {
        piece(emoji, cx, cy, 'te-trail', 60 + i * 65, {
          '--tx': (-i * 18) + 'px',
          '--ty':  (i * 18) + 'px',
        });
      });
      break;
    }

    // Alchemy: colored bubbles float up from center like boiling liquid
    case 'bubbles': {
      piece(ev.main, cx, cy, 'te-zoom', 0);
      ev.extras.forEach((emoji, i) => {
        const xOff = (Math.random() - 0.5) * 90;
        piece(emoji, cx, cy, 'te-bubble-up', 100 + i * 110, {
          '--tx': xOff + 'px',
        });
      });
      break;
    }
  }

  // Remove container after all animations finish (~2.4s)
  setTimeout(() => container.remove(), 2500);
}

// ============================================================
// SECTION 30 — QUEST SYSTEM
// ============================================================
const QUEST_DURATION_S = 180; // 3 minutes per quest

// Quest generators — each returns a fresh quest object
const QUEST_GEN = [
  // Click N times manually
  () => {
    const t = [30, 60, 120, 250, 500][Math.floor(Math.random() * 5)];
    return {
      id: Math.random().toString(36).slice(2),
      type: 'click_n', target: t, progress: 0,
      textHe: `לחץ ${t} פעמים`, textEn: `Click ${t} times`,
      rewardType: 'clicks',
      rewardN: Math.max(t * 50, 500),
    };
  },
  // Reach a CPS goal
  () => {
    const base = Math.max(state.cps || 1, 1);
    const target = Math.ceil(base * (1.5 + Math.random() * 2));
    return {
      id: Math.random().toString(36).slice(2),
      type: 'reach_cps', target, progress: state.cps,
      textHe: `הגע ל-${fmt(target)} לשנ׳`, textEn: `Reach ${fmt(target)} CPS`,
      rewardType: 'mult_temp',
      rewardMult: 2, rewardDurS: 30,
    };
  },
  // Buy N buildings total
  () => {
    const n = 2 + Math.floor(Math.random() * 4);
    return {
      id: Math.random().toString(36).slice(2),
      type: 'buy_n', target: n, progress: 0,
      textHe: `קנה ${n} בניינים`, textEn: `Buy ${n} buildings`,
      rewardType: 'golden_now',
    };
  },
  // Own N of a specific building
  () => {
    const pool = BUILDINGS.slice(0, Math.min(5, BUILDINGS.length));
    const b    = pool[Math.floor(Math.random() * pool.length)];
    const cur  = state.buildings[b.id] || 0;
    const need = cur + 3 + Math.floor(Math.random() * 5);
    return {
      id: Math.random().toString(36).slice(2),
      type: 'own_n_of', target: need, bId: b.id, progress: cur,
      textHe: `קנה ${need} ${b.nameHe}`,
      textEn: `Own ${need} ${b.nameEn}`,
      rewardType: 'cps_boost',
      rewardMult: 1.5, rewardDurS: 60,
    };
  },
];

function generateQuest() {
  const gen = QUEST_GEN[Math.floor(Math.random() * QUEST_GEN.length)];
  const q   = gen();
  q.expiresAt = Date.now() + QUEST_DURATION_S * 1000;
  return q;
}

function initQuests() {
  if (!state.quests || state.quests.length === 0) {
    state.quests = [generateQuest(), generateQuest(), generateQuest()];
  } else {
    // Refresh stale/expired quests from a saved state
    state.quests = state.quests.map(q =>
      (q && q.expiresAt > Date.now()) ? q : generateQuest()
    );
    // Ensure exactly 3 slots
    while (state.quests.length < 3) state.quests.push(generateQuest());
  }
  buildQuestPanel();
}

// Called every second from setInterval
function tickQuests() {
  if (!state.quests) return;
  let changed = false;
  const now = Date.now();

  state.quests = state.quests.map(q => {
    if (!q) return generateQuest();

    // Passive progress checks
    if (q.type === 'reach_cps' && !q.completed) {
      q.progress = state.cps;
      if (q.progress >= q.target) { q.completed = true; changed = true; }
    }
    if (q.type === 'own_n_of' && !q.completed) {
      q.progress = state.buildings[q.bId] || 0;
      if (q.progress >= q.target) { q.completed = true; changed = true; }
    }

    // Expire uncompleted quests
    if (!q.completed && now > q.expiresAt) {
      changed = true;
      return generateQuest();
    }
    return q;
  });

  if (changed) renderQuests();
  else _questRenderTick();   // just update the countdown timers
}

// Lightweight tick just to refresh countdowns
function _questRenderTick() {
  const panel = document.getElementById('quest-panel');
  if (!panel || !state.quests) return;
  state.quests.forEach((q, i) => {
    if (!q) return;
    const card = panel.children[i + 1]; // +1 for header
    if (!card) return;
    const timeEl = card.querySelector('.quest-time');
    if (!timeEl || q.completed) return;
    const left = Math.max(0, Math.ceil((q.expiresAt - Date.now()) / 1000));
    const m = Math.floor(left / 60), s = left % 60;
    timeEl.textContent = `${m}:${pad(s)}`;
    timeEl.classList.toggle('quest-urgent', left < 30);
  });
}

function claimQuest(idx) {
  const q = state.quests[idx];
  if (!q || !q.completed || q.claimed) return;
  q.claimed = true;

  switch (q.rewardType) {
    case 'clicks': {
      state.clicks += q.rewardN;
      showToast(
        CONFIG.language === 'he' ? `🎁 משימה! +${fmt(q.rewardN)}` : `🎁 Quest! +${fmt(q.rewardN)}`,
        '✅'
      );
      break;
    }
    case 'mult_temp':
    case 'cps_boost': {
      state.questMultEndTime = Date.now() + q.rewardDurS * 1000;
      state.questMult = q.rewardMult;
      recomputeCps();
      showToast(
        CONFIG.language === 'he'
          ? `⚡ ×${q.rewardMult} ייצור ל-${q.rewardDurS}שנ׳!`
          : `⚡ ×${q.rewardMult} production for ${q.rewardDurS}s!`,
        '🚀'
      );
      break;
    }
    case 'golden_now': {
      clearTimeout(goldenCookieDismissTimer);
      spawnGoldenCookie();
      showToast(
        CONFIG.language === 'he' ? '🍪 עוגיית זהב מיידית!' : '🍪 Instant golden cookie!',
        '✨'
      );
      break;
    }
  }

  playSound('milestone');
  scheduleRender();
  checkAchievements();

  // Swap this slot for a fresh quest after 2 s
  setTimeout(() => {
    state.quests[idx] = generateQuest();
    renderQuests();
  }, 2000);
}

function getRewardLabel(q) {
  const lang = CONFIG.language;
  switch (q.rewardType) {
    case 'clicks':     return `+${fmt(q.rewardN)}`;
    case 'mult_temp':  return `×${q.rewardMult} / ${q.rewardDurS}s`;
    case 'cps_boost':  return `×${q.rewardMult} / ${q.rewardDurS}s`;
    case 'golden_now': return lang === 'he' ? '🍪 עוגייה' : '🍪 Cookie';
    default:           return '?';
  }
}

function renderQuests() {
  const panel = document.getElementById('quest-panel');
  if (!panel || !state.quests) return;
  panel.innerHTML = '';

  const hdr = document.createElement('div');
  hdr.className = 'quest-header';
  hdr.textContent = CONFIG.language === 'he' ? '📋 משימות' : '📋 Quests';
  panel.appendChild(hdr);

  state.quests.forEach((q, i) => {
    if (!q) return;
    const card = document.createElement('div');
    card.className = 'quest-card' +
      (q.completed && !q.claimed ? ' quest-claimable' : '') +
      (q.claimed               ? ' quest-claimed'   : '');

    const pct      = Math.min(Math.round((q.progress / q.target) * 100), 100);
    const left     = Math.max(0, Math.ceil((q.expiresAt - Date.now()) / 1000));
    const m        = Math.floor(left / 60), s = left % 60;
    const timeStr  = `${m}:${pad(s)}`;
    const text     = CONFIG.language === 'he' ? q.textHe : q.textEn;
    const reward   = getRewardLabel(q);
    const doneText = CONFIG.language === 'he' ? '✅ לחץ לקבלה' : '✅ Click to claim';
    const claimedText = CONFIG.language === 'he' ? '✔ נלקח' : '✔ Claimed';

    card.innerHTML = `
      <div class="quest-text">${text}</div>
      <div class="quest-bar"><div class="quest-fill" style="width:${pct}%"></div></div>
      <div class="quest-meta">
        <span class="quest-time${left < 30 && !q.completed ? ' quest-urgent' : ''}">
          ${q.claimed ? claimedText : q.completed ? doneText : timeStr}
        </span>
        <span class="quest-reward">🎁 ${reward}</span>
      </div>
    `;

    if (q.completed && !q.claimed) {
      card.addEventListener('click', (e) => { e.stopPropagation(); claimQuest(i); });
      card.style.cursor = 'pointer';
    }

    panel.appendChild(card);
  });
}

function buildQuestPanel() {
  renderQuests();
}

// ============================================================
// SECTION 27 — SPIRAL TUNNEL BACKGROUND
// ============================================================
function initTunnelBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Resize canvas to fill window
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Tunnel config
  const NUM_RINGS  = 22;   // number of concentric rings
  const NUM_SPOKES = 8;    // lines connecting rings
  const SPEED      = 0.38; // zoom-through speed (rings per second)
  const TWIST      = 0.55; // spiral rotation speed (rad/sec)

  // Precompute spoke offsets so they stay stable per ring index
  function drawFrame(ts) {
    const t  = ts / 1000;
    const W  = canvas.width;
    const H  = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const maxR = Math.hypot(W, H) * 0.56;

    // ── Background fill (dark, with motion-blur trail) ────
    ctx.fillStyle = 'rgba(6, 6, 15, 0.94)';
    ctx.fillRect(0, 0, W, H);

    // ── Rings (drawn innermost → outermost) ───────────────
    for (let i = 0; i < NUM_RINGS; i++) {
      // phase 0 = far center, 1 = near edge
      const raw   = ((i / NUM_RINGS) + t * SPEED) % 1.0;
      // ease-in-quad: slow near centre (depth compression)
      const phase = raw * raw;
      const r     = maxR * phase;
      // Each ring rotates; outer rings have accumulated more rotation
      const rot   = t * TWIST + i * (Math.PI / NUM_RINGS);

      // Color: cycles blue → purple → gold to match game palette
      const hue   = 205 + Math.sin(t * 0.2 + i * 0.4) * 40; // 165‥245
      const sat   = 75 + phase * 20;
      const light = 38  + phase * 38;                          // dim far, bright near
      const alpha = 0.25 + phase * 0.72;

      ctx.save();
      ctx.translate(cx, cy);

      // ── Ring circle ─────────────────────────────────────
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
      ctx.lineWidth   = 1.5 + phase * 2.5;
      ctx.stroke();

      // ── Spokes (connect this ring to the next one) ──────
      if (i < NUM_RINGS - 1) {
        const raw2    = (((i + 1) / NUM_RINGS) + t * SPEED) % 1.0;
        const phase2  = raw2 * raw2;
        const r2      = maxR * phase2;
        const rot2    = t * TWIST + (i + 1) * (Math.PI / NUM_RINGS);

        for (let s = 0; s < NUM_SPOKES; s++) {
          const a1 = rot  + (s / NUM_SPOKES) * Math.PI * 2;
          const a2 = rot2 + (s / NUM_SPOKES) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(Math.cos(a1) * r,  Math.sin(a1) * r);
          ctx.lineTo(Math.cos(a2) * r2, Math.sin(a2) * r2);
          ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha * 0.45})`;
          ctx.lineWidth   = 0.8;
          ctx.stroke();
        }
      }

      ctx.restore();
    }

    // ── Central vanishing-point glow (golden, matches game) ─
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.35);
    g.addColorStop(0,   'rgba(200, 164, 90, 0.35)');
    g.addColorStop(0.3, 'rgba(200, 164, 90, 0.10)');
    g.addColorStop(1,   'rgba(0, 0, 0, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // ── Dark vignette at edges (depth) ───────────────────
    const v = ctx.createRadialGradient(cx, cy, maxR * 0.35, cx, cy, maxR);
    v.addColorStop(0, 'rgba(0,0,0,0)');
    v.addColorStop(1, 'rgba(0,0,0,0.82)');
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, W, H);

    requestAnimationFrame(drawFrame);
  }

  requestAnimationFrame(drawFrame);
}

// ============================================================
// SECTION 26 — INIT
// ============================================================
function init() {
  initTunnelBackground();
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
  // Golden cookie
  scheduleGoldenCookie();
  // Quests
  initQuests();
  setInterval(tickQuests, 1000);
  // Mobile nav
  initMobileNav();
}

/* ── SECTION 28: Mobile Nav ─────────────────────────────────────── */
function initMobileNav() {
  const nav = document.getElementById('mobile-nav');
  if (!nav) return;
  const backdrop = document.getElementById('mobile-backdrop');
  const sideUpg  = document.getElementById('sidebar-upgrades');
  const sideBld  = document.getElementById('sidebar-buildings');
  const tabs     = nav.querySelectorAll('.mobile-tab');
  let openPanel  = null;

  function closeAll() {
    sideUpg.classList.remove('mobile-open');
    sideBld.classList.remove('mobile-open');
    if (backdrop) backdrop.classList.remove('visible');
    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-pressed','false'); });
    openPanel = null;
  }

  function activateGame() {
    closeAll();
    const gt = nav.querySelector('[data-panel="game"]');
    if (gt) { gt.classList.add('active'); gt.setAttribute('aria-pressed','true'); }
  }

  function openSidebar(panel) {
    closeAll();
    if (panel === 'upgrades') sideUpg.classList.add('mobile-open');
    else if (panel === 'buildings') sideBld.classList.add('mobile-open');
    if (backdrop) backdrop.classList.add('visible');
    openPanel = panel;
    const tab = nav.querySelector(`[data-panel="${panel}"]`);
    if (tab) { tab.classList.add('active'); tab.setAttribute('aria-pressed','true'); }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const panel = tab.dataset.panel;
      if (panel === 'game') { activateGame(); return; }
      if (openPanel === panel) { activateGame(); return; }
      openSidebar(panel);
    });
  });

  if (backdrop) backdrop.addEventListener('click', activateGame);
  activateGame();
}

document.addEventListener('DOMContentLoaded', init);
