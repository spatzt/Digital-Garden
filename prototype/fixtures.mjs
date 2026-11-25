export const sampleDate = '2026-11-25';
/** @type {import('./contracts.mjs').JournalEntry[]} */
export const journals = [
  {date:'2026-11-23', mood:'Calm', stamina:5, constitution:6, willpower:5, note:'I made a little room for quiet before starting the day.'},
  {date:'2026-11-25', mood:'Grounded', stamina:6, constitution:5, willpower:7, note:'A warm drink and one small plan were enough to get started.'},
  {date:'2026-11-28', mood:'Creative', stamina:7, constitution:6, willpower:8, note:'I spent a quiet hour sketching by the window.'}
];
/** @type {import('./contracts.mjs').Quest[]} */
export const quests = [
  {name:'Tend a small habit',completed:2,total:7},
  {name:'Make time for a creative project',completed:3,total:5},
  {name:'Rest and recharge',completed:4,total:5}
];
/** @type {import('./contracts.mjs').Progression} */
export const progression = {level:1,xp:120,nextLevelXp:200,gald:24};

export const sol = {
  greeting:'Welcome home. We can check in, pick up a quest, or take a quiet moment here.',
  choices:[
    {label:'Do a check-in', reply:'Take a moment to see where you are. A little honesty is enough to start.', path:'check-in', action:'Open check-in'},
    {label:'Look at my quests', reply:'Pick something that fits your energy. One small step counts.', path:'quests', action:'Open quests'},
    {label:'Rest here awhile', reply:'The lantern can keep us company for a bit. Take your time.'}
  ]
};
