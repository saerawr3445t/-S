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
  saveKey:           'clicker_save_v2',
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
  offlineCapHours:   24,
  // Combo
  comboDecayMs:      2500,    // זמן לפני איפוס קומבו
  comboMax:          10,      // קומבו מקסימלי
  comboThresholds:   [3,5,8,10], // קומבו לשיפור מכפיל
  // Critical
  critChance:        0.08,    // 8% סיכוי לקריטי
  critMultiplier:    5,       // ×5 נזק בסיסי
  critSuperChance:   0.02,    // 2% סיכוי לסופר-קריטי
  critSuperMult:     20,      // ×20
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
    comboActive:        '⚡ קומבו ×{m}!',
    comboBreak:         '💔 קומבו אבד',
    critHit:            '💥 קריטי! ×{m}',
    milestone1k:        '🎉 אלף קליקים! המשחק מתחיל!',
    milestone1m:        '🔥 מיליון! אתה בוער!',
    milestone1b:        '🚀 מיליארד! אלוף!',
    milestone1t:        '👑 טריליון! אגדי!',
    nextGoal:           'יעד: {n}',
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
    comboActive:        '⚡ Combo ×{m}!',
    comboBreak:         '💔 Combo lost',
    critHit:            '💥 Critical! ×{m}',
    milestone1k:        '🎉 1K clicks! Game on!',
    milestone1m:        '🔥 1 Million! You\'re on fire!',
    milestone1b:        '🚀 1 Billion! Legend!',
    milestone1t:        '👑 1 Trillion! Godlike!',
    nextGoal:           'Goal: {n}',
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
  // --- קומבו / קריטי (שדרוגים מיוחדים) ---
  {
    id: 'combo_booster',
    nameHe: 'אצבעות מהירות', nameEn: 'Quick Fingers',
    descHe: 'זמן קומבו ×1.5 ארוך יותר.', descEn: 'Combo window lasts ×1.5 longer.',
    cost: 2000,
    unlockWhen: s => s.totalClicks >= 50,
    apply: s => { s.comboWindowMult = (s.comboWindowMult || 1) * 1.5; }
  },
  {
    id: 'crit_chance_up',
    nameHe: 'עין חדה', nameEn: 'Sharp Eye',
    descHe: 'סיכוי קריטי +5%.', descEn: 'Critical chance +5%.',
    cost: 50000,
    unlockWhen: s => s.totalClicks >= 500,
    apply: s => { s.bonusCritChance = (s.bonusCritChance || 0) + 0.05; }
  },
  {
    id: 'crit_mult_up',
    nameHe: 'מכה עצומה', nameEn: 'Mega Strike',
    descHe: 'קריטי פי 2 חזק יותר.', descEn: 'Critical hits are ×2 stronger.',
    cost: 500000,
    unlockWhen: s => s.totalClicks >= 10000,
    apply: s => { s.critMultBonus = (s.critMultBonus || 1) * 2; }
  },
  {
    id: 'cps_10pct_click',
    nameHe: 'פסיבי פעיל', nameEn: 'Passive Punch',
    descHe: '10% מה-CPS נוסף לכל קליק.', descEn: '10% of CPS added per click.',
    cost: 150000,
    unlockWhen: s => s.cps >= 10,
    apply: s => { s.cpsTapBonus = (s.cpsTapBonus || 0) + 0.10; }
  },
  {
    id: 'every50clicks',
    nameHe: 'קצב קבוע', nameEn: 'Steady Rhythm',
    descHe: 'כל 50 קליקים = בונוס פי 3.', descEn: 'Every 50 clicks gives a ×3 bonus.',
    cost: 25000,
    unlockWhen: s => s.totalClicks >= 200,
    apply: s => { s.every50bonus = true; }
  },
  {
    id: 'combo_crit_synergy',
    nameHe: 'סינרגיה', nameEn: 'Synergy',
    descHe: 'קומבו מגדיל סיכוי קריטי.', descEn: 'Combo increases crit chance.',
    cost: 5000000,
    unlockWhen: s => s.totalClicks >= 100000,
    apply: s => { s.comboCritSynergy = true; }
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
  critCount:        0,
  maxCombo:         0,
  goldenClicks:          0,
  clickFrenzyEndTime:    0,
  frenzyEndTime:         0,
  prestigeCount:         0,
  prestigeMultiplier:    1,
  // special upgrade flags
  comboWindowMult:  1,
  bonusCritChance:  0,
  critMultBonus:    1,
  cpsTapBonus:      0,
  every50bonus:     false,
  comboCritSynergy: false,
  // milestone tracking
  milestonesSeen:   {},
  startTime:        Date.now(),
  lastSaveTime:     null,
  lastTickTime:     Date.now(),
};

// ── Combo runtime (not saved) ──
let combo = 0;
let comboTimer = null;
let lastComboTime = 0;

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
  const frenzyMult = (state.frenzyEndTime > 0 && Date.now() < state.frenzyEndTime) ? 7 : 1;
  state.cps = total * state.globalMultiplier * state.prestigeMultiplier * frenzyMult;

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
  tunnelAnimate(id, b.emoji);
  screenFlash('flash-gold');
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
      tunnelAnimate('achievement', a.icon);
    }
  }
  checkMilestones();
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

  if (state.cps > 0) {
    state.clicks += state.cps * delta;
    scheduleRender();
  }

  renderActiveEffects();

  // Building tick flash + tunnel animation (throttled per building)
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
      // Tunnel anim: show every N seconds based on building speed
      const animInterval = Math.max(3000, 8000 - owned * 200);
      const lastAnim = (lastBuildingFlash['_anim_' + b.id] || 0);
      if (now - lastAnim >= animInterval) {
        lastBuildingFlash['_anim_' + b.id] = now;
        tunnelAnimate(b.id, b.emoji);
      }
    }
  }

  checkAchievements();
}

// ============================================================
// SECTION 11 — CLICK HANDLER
// ============================================================
function handleClick(e) {
  const now = Date.now();

  // ── Click Frenzy ──
  const clickFrenzyActive = state.clickFrenzyEndTime > 0 && now < state.clickFrenzyEndTime;

  // ── Combo ──
  const comboWindow = CONFIG.comboDecayMs * (state.comboWindowMult || 1);
  if (now - lastComboTime < comboWindow) {
    combo = Math.min(combo + 1, CONFIG.comboMax);
  } else {
    combo = 1;
  }
  lastComboTime = now;
  clearTimeout(comboTimer);
  comboTimer = setTimeout(() => {
    if (combo > 2) showToast(t('comboBreak'), '💔');
    combo = 0;
    renderCombo();
  }, comboWindow);
  if (combo > state.maxCombo) state.maxCombo = combo;

  // Combo multiplier: 1→1× | 3→1.5× | 5→2× | 8→3× | 10→5×
  const comboMult = combo >= 10 ? 5 : combo >= 8 ? 3 : combo >= 5 ? 2 : combo >= 3 ? 1.5 : 1;

  // ── Critical ──
  let critMult = 1;
  let isCrit = false;
  let isSuperCrit = false;
  const effectiveCritChance = CONFIG.critChance + (state.bonusCritChance || 0)
    + (state.comboCritSynergy ? combo * 0.005 : 0);
  const roll = Math.random();
  if (roll < CONFIG.critSuperChance) {
    critMult = CONFIG.critSuperMult * (state.critMultBonus || 1);
    isSuperCrit = true; isCrit = true;
  } else if (roll < effectiveCritChance) {
    critMult = CONFIG.critMultiplier * (state.critMultBonus || 1);
    isCrit = true;
  }
  if (isCrit) state.critCount = (state.critCount || 0) + 1;

  // ── CPS tap bonus ──
  const cpsTap = state.cps * (state.cpsTapBonus || 0);

  // ── Base value ──
  let base = state.clickValue + cpsTap;
  if (clickFrenzyActive) base *= 777;

  // ── Every-50-clicks bonus ──
  let every50gain = 0;
  if (state.every50bonus && state.manualClicks > 0 && (state.manualClicks + 1) % 50 === 0) {
    every50gain = base * 3;
  }

  let gained = Math.ceil(base * comboMult * critMult) + every50gain;

  state.clicks       += gained;
  state.totalClicks  += 1;
  state.manualClicks += 1;

  // ── Particles & Animations ──
  const label = isCrit ? '💥' + fmt(gained) : '+' + fmt(gained);
  spawnParticles(e, label);

  if (isSuperCrit) {
    tunnelAnimate('critical', '💥');
    showToast(t('critHit').replace('{m}', fmt(critMult)), '💥');
    screenFlash('flash-gold');
    shakeScreen();
  } else if (isCrit) {
    shakeScreen();
  }

  if (comboMult > 1) {
    const el = document.getElementById('combo-mult');
    if (el) { el.textContent = '×' + comboMult; }
    if (combo === 3 || combo === 5 || combo === 8 || combo === 10) {
      showToast(t('comboActive').replace('{m}', comboMult), '⚡');
    }
  }

  renderCombo();
  triggerClickAnim(isCrit);
  playSound('click');
  scheduleRender();
  checkAchievements();
}

function triggerClickAnim(isCrit = false) {
  const ring = document.getElementById('pulse-ring');
  ring.classList.remove('active');
  void ring.offsetWidth;
  ring.classList.add('active');

  const counter = document.getElementById('click-counter');
  counter.classList.remove('bump', 'crit');
  void counter.offsetWidth;
  counter.classList.add(isCrit ? 'crit' : 'bump');
}

function shakeScreen() {
  const app = document.getElementById('app');
  app.classList.remove('shake');
  void app.offsetWidth;
  app.classList.add('shake');
}

function screenFlash(cls) {
  const el = document.getElementById('screen-flash');
  if (!el) return;
  el.className = '';
  void el.offsetWidth;
  el.className = cls;
}

function renderCombo() {
  const display = document.getElementById('combo-display');
  const fill    = document.getElementById('combo-decay-fill');
  const multEl  = document.getElementById('combo-mult');
  const iconEl  = document.getElementById('combo-icon');
  if (!display) return;
  if (combo < 2) {
    display.style.display = 'none';
    return;
  }
  display.style.display = 'flex';
  const comboMult = combo >= 10 ? 5 : combo >= 8 ? 3 : combo >= 5 ? 2 : combo >= 3 ? 1.5 : 1;
  if (multEl) multEl.textContent = '×' + comboMult;
  if (iconEl) iconEl.textContent = combo >= 8 ? '🔥' : combo >= 5 ? '⚡' : '💫';
  // decay bar
  const comboWindow = CONFIG.comboDecayMs * (state.comboWindowMult || 1);
  const elapsed = Date.now() - lastComboTime;
  const pct = Math.max(0, 100 - (elapsed / comboWindow) * 100);
  if (fill) fill.style.width = pct + '%';
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
  tunnelAnimate('golden', '🍪');
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
  tunnelAnimate('prestige', '✦');
  screenFlash('flash-blue');
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
  renderNextGoal();
  renderCombo();
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
  const mcEl = document.getElementById('stat-maxcombo');
  if (mcEl) mcEl.textContent = state.maxCombo || 0;
  const crEl = document.getElementById('stat-crits');
  if (crEl) crEl.textContent = state.critCount || 0;

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
// SECTION 25a — MILESTONE SYSTEM
// ============================================================
const MILESTONES = [
  { id: 'm1k',  threshold: 1e3,  key: 'milestone1k', flash: 'flash-gold' },
  { id: 'm1m',  threshold: 1e6,  key: 'milestone1m', flash: 'flash-gold' },
  { id: 'm1b',  threshold: 1e9,  key: 'milestone1b', flash: 'flash-blue' },
  { id: 'm1t',  threshold: 1e12, key: 'milestone1t', flash: 'flash-gold' },
];

function checkMilestones() {
  for (const m of MILESTONES) {
    if (!state.milestonesSeen[m.id] && state.totalClicks >= m.threshold) {
      state.milestonesSeen[m.id] = true;
      showToast(t(m.key), '🏆');
      screenFlash(m.flash);
      shakeScreen();
      playSound('milestone');
      tunnelAnimate('golden', '🏆');
    }
  }
}

// ============================================================
// SECTION 25b — NEXT GOAL PROGRESS BAR
// ============================================================
const GOAL_THRESHOLDS = [
  100, 500, 1000, 5000, 10000, 50000, 1e5, 5e5,
  1e6, 5e6, 1e7, 5e7, 1e8, 5e8, 1e9, 5e9,
  1e10, 5e10, 1e11, 5e11, 1e12
];

function renderNextGoal() {
  const label = document.getElementById('next-goal-label');
  const fill  = document.getElementById('next-goal-fill');
  if (!label || !fill) return;
  const tc = state.totalClicks;
  const next = GOAL_THRESHOLDS.find(g => g > tc);
  if (!next) { label.textContent = ''; fill.style.width = '100%'; return; }
  const prev = GOAL_THRESHOLDS[GOAL_THRESHOLDS.indexOf(next) - 1] || 0;
  const pct  = Math.min(100, ((tc - prev) / (next - prev)) * 100);
  label.textContent = t('nextGoal').replace('{n}', fmt(next));
  fill.style.width  = pct + '%';
}

// ============================================================
// SECTION 25 — SPIRAL TUNNEL BACKGROUND
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
// SECTION 27 — TUNNEL EVENT ANIMATIONS
// ============================================================
const TUNNEL_CONFIG = {
  cursor:      { cls: 'te-cursor',   dur: 650,  sats: 'dots' },
  farm:        { cls: 'te-farm',     dur: 1100, sats: 'wheat' },
  mine:        { cls: 'te-mine',     dur: 950,  sats: 'sparks', shake: true },
  factory:     { cls: 'te-factory',  dur: 1000, sats: 'gears' },
  bank:        { cls: 'te-bank',     dur: 900,  sats: 'coins' },
  temple:      { cls: 'te-temple',   dur: 1100, sats: 'beams' },
  wizard:      { cls: 'te-wizard',   dur: 1000, sats: 'stars', flash: true },
  shipment:    { cls: 'te-shipment', dur: 750,  sats: 'flames' },
  alchemy:     { cls: 'te-alchemy',  dur: 1100, sats: 'orbs' },
  achievement: { cls: 'te-achievement', dur: 1200, sats: 'dots' },
  golden:      { cls: 'te-golden',   dur: 1000, sats: 'goldDots' },
  critical:    { cls: 'te-critical', dur: 900,  sats: 'sparks' },
  prestige:    { cls: null,          dur: 1600, sats: 'prestige' },
};

function tunnelAnimate(type, emoji) {
  const cfg = TUNNEL_CONFIG[type];
  if (!cfg) return;
  const layer = document.getElementById('tunnel-anim-layer');
  if (!layer) return;

  const nodes = [];

  // Prestige: special full-screen treatment
  if (type === 'prestige') {
    const overlay = document.createElement('div');
    overlay.className = 'te-prestige-overlay';
    layer.appendChild(overlay);
    nodes.push(overlay);
    // Stars imploding from edges
    for (let i = 0; i < 14; i++) {
      const s = document.createElement('div');
      s.className = 'te-prestige-star';
      s.textContent = '⭐';
      const angle = (i / 14) * Math.PI * 2;
      const dist  = 200 + Math.random() * 150;
      s.style.setProperty('--px', Math.cos(angle) * dist + 'px');
      s.style.setProperty('--py', Math.sin(angle) * dist + 'px');
      s.style.setProperty('--delay', (i * 60) + 'ms');
      s.style.left = '50%'; s.style.top = '50%';
      layer.appendChild(s); nodes.push(s);
    }
    cleanup(nodes, cfg.dur + 200); return;
  }

  // Main emoji
  const el = document.createElement('div');
  el.className = 'tunnel-emoji ' + (cfg.cls || '');
  el.textContent = emoji;
  layer.appendChild(el); nodes.push(el);

  // Screen effects
  if (cfg.shake) shakeScreen();
  if (cfg.flash) {
    const fl = document.createElement('div');
    fl.style.cssText = 'position:fixed;inset:0;background:#fff;pointer-events:none;z-index:3;animation:te-wizard-flash 800ms forwards;opacity:0;';
    layer.appendChild(fl); nodes.push(fl);
  }

  // Satellite factory
  spawnSatellites(cfg.sats, layer, nodes);
  cleanup(nodes, cfg.dur + 100);
}

function spawnSatellites(type, layer, nodes) {
  const mk = (tag, cls) => { const e = document.createElement(tag); e.className = 'te-particle ' + cls; layer.appendChild(e); nodes.push(e); return e; };

  if (type === 'dots') {
    for (let i = 0; i < 5; i++) {
      const d = mk('div', 'te-dot');
      const a = Math.random() * Math.PI * 2;
      const r = 40 + Math.random() * 50;
      d.style.setProperty('--tx', Math.cos(a) * r + 'px');
      d.style.setProperty('--ty', Math.sin(a) * r + 'px');
      d.style.setProperty('--delay', (i * 80) + 'ms');
      d.style.setProperty('--life', '650ms');
    }
  } else if (type === 'wheat') {
    [-35, 0, 35].forEach((angle, i) => {
      const w = mk('span', '');
      w.textContent = '🌾'; w.style.fontSize = '1.6rem'; w.style.position = 'absolute';
      w.style.left = '50%'; w.style.top = '50%';
      w.style.animation = `te-dot-fly 1100ms ease-out ${i * 120}ms forwards`;
      w.style.setProperty('--tx', Math.sin((angle * Math.PI / 180)) * 60 + 'px');
      w.style.setProperty('--ty', -80 - Math.abs(angle) * 0.5 + 'px');
      w.style.setProperty('--delay', (i * 100) + 'ms');
    });
  } else if (type === 'sparks') {
    for (let i = 0; i < 8; i++) {
      const s = mk('div', 'te-spark');
      s.style.setProperty('--a', (i * 45) + 'deg');
      s.style.setProperty('--delay', (i * 30) + 'ms');
    }
  } else if (type === 'gears') {
    ['⚙️','⚙️','⚙️'].forEach((g, i) => {
      const gear = mk('span', '');
      gear.textContent = g; gear.style.fontSize = '1.2rem';
      gear.style.position = 'absolute'; gear.style.left = '50%'; gear.style.top = '50%';
      const a = (i / 3) * Math.PI * 2;
      gear.style.animation = `te-coin-fly 1000ms ease-out ${i * 100}ms forwards`;
      gear.style.setProperty('--a', (i * 120) + 'deg');
      gear.style.setProperty('--r', (50 + i * 15) + 'px');
      gear.style.setProperty('--delay', (i * 100) + 'ms');
    });
  } else if (type === 'coins') {
    for (let i = 0; i < 5; i++) {
      const c = mk('span', 'te-coin');
      c.textContent = '🪙';
      c.style.setProperty('--a', (i * 72) + 'deg');
      c.style.setProperty('--r', (50 + Math.random() * 25) + 'px');
      c.style.setProperty('--delay', (i * 80) + 'ms');
    }
  } else if (type === 'beams') {
    for (let i = 0; i < 4; i++) {
      const b = mk('div', 'te-beam');
      b.style.setProperty('--a', (i * 90) + 'deg');
      b.style.position = 'absolute'; b.style.left = '50%'; b.style.top = '50%';
    }
  } else if (type === 'stars') {
    for (let i = 0; i < 6; i++) {
      const s = mk('span', 'te-star');
      s.textContent = '⭐';
      s.style.setProperty('--a', (i * 60) + 'deg');
      s.style.setProperty('--delay', (i * 70) + 'ms');
    }
  } else if (type === 'flames') {
    for (let i = 0; i < 5; i++) {
      const f = mk('div', 'te-flame');
      f.style.setProperty('--ty', (i * 10 - 20) + 'px');
      f.style.setProperty('--delay', (i * 60) + 'ms');
    }
  } else if (type === 'orbs') {
    const colors = ['#a0ffb0','#80c0ff','#ffb0e0','#ffe080','#c0a0ff','#80ffe0'];
    for (let i = 0; i < 6; i++) {
      const o = mk('div', 'te-orb');
      o.style.setProperty('--a', (i * 60) + 'deg');
      o.style.setProperty('--c', colors[i]);
      o.style.setProperty('--delay', (i * 80) + 'ms');
    }
  } else if (type === 'goldDots') {
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const r = 60 + Math.random() * 60;
      const d = mk('div', 'te-gold-dot');
      d.style.setProperty('--tx', Math.cos(a) * r + 'px');
      d.style.setProperty('--ty', Math.sin(a) * r + 'px');
      d.style.setProperty('--delay', (i * 50) + 'ms');
    }
  }
}

function cleanup(nodes, ms) {
  setTimeout(() => nodes.forEach(n => n.parentNode && n.parentNode.removeChild(n)), ms);
}

// ============================================================
// SECTION 28 — MOBILE NAVIGATION
// ============================================================
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

// ============================================================
// SECTION 29 — INIT
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
  // Combo decay bar: refresh every 100ms while combo is active
  setInterval(() => { if (combo > 0) renderCombo(); }, 100);
  // Mobile nav
  initMobileNav();
}

document.addEventListener('DOMContentLoaded', init);
