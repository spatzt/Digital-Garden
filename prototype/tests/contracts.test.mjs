import test from 'node:test';
import assert from 'node:assert/strict';
import { monthDays, resolveRoute } from '../contracts.mjs';
import { createPreviewServices } from '../services.mjs';
import { calendar, dialogue } from '../components.mjs';
import { sol } from '../fixtures.mjs';

test('all navigation routes and dated journal links resolve', () => {
  for (const page of ['daily','check-in','journal','calendar','quests','home','workshop','vault','records','companions','echofield','settings','player']) {
    assert.equal(resolveRoute('#/'+page).page,page);
  }
  assert.deepEqual(resolveRoute('#/journal/2026-11-23'),{page:'journal',date:'2026-11-23'});
  assert.equal(resolveRoute('#/journal/unknown').page,'missing');
});

test('sample calendar marks exactly the dates with journal entries', () => {
  const data = createPreviewServices();
  const html = calendar(data.listJournals(),2026,10,true,data.sampleDate);
  const dates = [...html.matchAll(/href="#\/journal\/([^"]+)"/g)].map(match=>match[1]);
  assert.deepEqual(dates,data.listJournals().map(entry=>entry.date));
  for (const date of dates) assert.equal(data.getJournal(resolveRoute('#/journal/'+date).date).date,date);
  assert.equal(data.getJournal('2026-11-24'),null);
  assert.equal(monthDays(2028,1).filter(Boolean).length,29);
});

test('scripted companion and sample services have isolated state', () => {
  assert.equal(sol.choices.length,3);
  assert.match(dialogue(sol),/Scripted companion/);
  assert.match(dialogue(sol),/Custom reply/);
  const a = createPreviewServices(), b = createPreviewServices();
  a.saveCheckIn('Calm');
  assert.equal(a.getCheckIn(),'Calm');
  assert.equal(b.getCheckIn(),null);
  assert.equal(a.connection('Frame').available,false);
  assert.deepEqual(a.getProgression(),b.getProgression());
});
