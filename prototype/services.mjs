import {journals, quests, progression, sampleDate} from './fixtures.mjs';

export function createPreviewServices() {
  let checkIn = null;
  return {
    sampleDate,
    listJournals: () => [...journals],
    getJournal: date => journals.find(entry => entry.date === date) ?? null,
    getQuests: () => [...quests],
    getProgression: () => progression,
    getCheckIn: () => checkIn,
    saveCheckIn: mood => { checkIn = mood; },
    connection: name => ({available:false, message:name + ' is unavailable in this prototype.'})
  };
}
