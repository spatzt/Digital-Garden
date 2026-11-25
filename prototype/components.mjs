import {monthDays} from './contracts.mjs';

export const escape = value => String(value).replace(/[&<>"']/g, char => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
}[char]));
export const link = (path, label, kind = 'button') => `<a class="${kind}" href="#/${path}">${label}</a>`;
export const dateLabel = date => new Intl.DateTimeFormat('en-US',{
  dateStyle:'long', timeZone:'UTC'
}).format(new Date(date + 'T12:00:00Z'));

export function panel(title, content, className = '') {
  return `<section class="paper ${className}"><h2>${title}</h2>${content}</section>`;
}

export function dialogue(character) {
  return `<section class="sanctuary" aria-label="Twilight Sanctuary with Sol">
    <img class="scene-art" src="./assets/sanctuary.webp" alt="" data-art>
    <img class="sol-sprite" src="./assets/sol.webp" alt="Sol, a fox-featured humanoid with dark plum hair" data-art>
    <div class="scene-heading"><span aria-hidden="true">✧</span> Twilight Sanctuary</div>
    <div class="dialogue">
      <div class="speaker"><h2>Sol</h2><span>Garden companion · Scripted companion</span></div>
      <p id="sol-line" aria-live="polite">${escape(character.greeting)}</p>
      <div id="sol-action"></div>
      <div class="choices" aria-label="Dialogue choices">
        ${character.choices.map((choice, index)=>`<button type="button" data-choice="${index}">${escape(choice.label)}</button>`).join('')}
      </div>
      <form id="custom-reply">
        <label for="reply">Custom reply</label>
        <div class="reply-row"><input id="reply" name="reply" maxlength="500" required placeholder="Write a reply"><button>Keep draft</button></div>
        <p class="quiet">Live replies unavailable.</p><p id="reply-status" class="quiet" role="status"></p>
      </form>
    </div>
  </section>`;
}

export function calendar(entries, year, month, full = false, selected = '') {
  const available = new Set(entries.map(entry=>entry.date));
  const monthName = new Intl.DateTimeFormat('en-US',{month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(Date.UTC(year,month,1)));
  return `<div class="month-heading">${full?'<button data-month="-1" aria-label="Previous month">‹</button>':''}<h3>${monthName}</h3>${full?'<button data-month="1" aria-label="Next month">›</button>':''}</div>
  <div class="month-grid" aria-label="${monthName}">
    ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day=>`<span class="weekday">${day}</span>`).join('')}
    ${monthDays(year,month).map(date=> !date ? '<span></span>' : available.has(date)
      ? `<a class="day has-entry" ${date===selected?'aria-current="date" ':''}href="#/journal/${date}" aria-label="Open sample journal for ${dateLabel(date)}">${Number(date.slice(-2))}<span aria-hidden="true">▤</span></a>`
      : `<span class="day" ${date===selected?'aria-current="date"':''}>${Number(date.slice(-2))}</span>`).join('')}
  </div><p class="quiet calendar-key"><span aria-hidden="true">▤</span> Sample journal entry</p>`;
}
