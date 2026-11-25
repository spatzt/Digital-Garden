/** @typedef {{date: string, mood: string, stamina: number, constitution: number, willpower: number, note: string}} JournalEntry */
/** @typedef {{name: string, completed: number, total: number}} Quest */
/** @typedef {{level: number, xp: number, nextLevelXp: number, gald: number}} Progression */

export function resolveRoute(hash) {
  const path = hash.replace(/^#\/?/, '').replace(/\/$/, '') || 'daily';
  const routes = ['daily','check-in','journal','calendar','quests','home','workshop','vault','records','companions','echofield','settings','player'];
  const dated = /^journal\/(\d{4}-\d{2}-\d{2})$/.exec(path);
  if (dated) return {page:'journal', date:dated[1]};
  return {page:routes.includes(path) ? path : 'missing', date:null};
}

export function monthDays(year, month) {
  const first = new Date(Date.UTC(year, month, 1));
  const length = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return [
    ...Array(first.getUTCDay()).fill(null),
    ...Array.from({length}, (_, index) => new Date(Date.UTC(year, month, index + 1)).toISOString().slice(0,10))
  ];
}
