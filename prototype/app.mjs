import {resolveRoute} from './contracts.mjs';
import {sol} from './fixtures.mjs';
import {createPreviewServices} from './services.mjs';
import {calendar,dateLabel,dialogue,escape,link,panel} from './components.mjs';

const service = createPreviewServices();
const routes = [
  ['daily','Daily','☀'],['quests','Quests','◇'],['home','Home','⌂'],
  ['workshop','Workshop','✧'],['vault','Vault','▤'],['echofield','EchoField','❖']
];
const dailyLinks = [['check-in','Check-In'],['journal','Daily Journal'],['calendar','Calendar']];
const vaultLinks = [['records','Records'],['companions','Companion Vault']];
const gauges = ['Stamina','Constitution','Willpower','Mood','Money Clarity'];
const root = document.querySelector('main');
let picked = null;
let draft = '';
let calendarMonth = new Date(service.sampleDate+'T12:00:00Z');

function navigation(page) {
  const current = path => page === path ? 'aria-current="page"' : '';
  const nested = (items, name) => `<div class="subnav" aria-label="${name}">${items.map(([path,title])=>`<a href="#/${path}" ${current(path)}>${title}</a>`).join('')}</div>`;
  document.querySelector('#navigation').innerHTML = routes.map(([path,title,icon])=>{
    return `<a class="primary-nav" href="#/${path}" ${current(path)}><span aria-hidden="true">${icon}</span>${title}</a>` +
      (path==='daily' ? nested(dailyLinks,'Daily pages') : path==='vault' ? nested(vaultLinks,'Vault pages') : '');
  }).join('');
  for (const anchor of document.querySelectorAll('.masthead a')) {
    const path = anchor.hash.slice(2);
    if (path===page && path!=='daily') anchor.setAttribute('aria-current','page');
    else anchor.removeAttribute('aria-current');
  }
}

function questList() {
  return `<ul class="quest-list">${service.getQuests().map(quest=>`<li>
    <label>${escape(quest.name)}<progress value="${quest.completed}" max="${quest.total}">${quest.completed} of ${quest.total}</progress></label>
    <span>${quest.completed} / ${quest.total}</span></li>`).join('')}</ul>`;
}

function progression() {
  const {xp,nextLevelXp,gald} = service.getProgression();
  return `<div class="progression"><div><label>XP · ${xp} / ${nextLevelXp}<progress value="${xp}" max="${nextLevelXp}"></progress></label></div><div><strong>${gald}</strong> Gald</div></div>`;
}

function checkInPreview() {
  const mood = service.getCheckIn();
  return panel('Today’s Check-In', `<dl class="gauge-strip">${gauges.map(label=>`<div><dt>${label}</dt><dd>${mood?.[label] ?? '—'}</dd></div>`).join('')}</dl>
    ${link('check-in',mood ? 'Review check-in' : 'Open check-in','button filled')}`);
}

function daily() {
  const sample = new Date(service.sampleDate+'T12:00:00Z');
  return `<div class="daily-head"><div><p class="quiet">Daily</p><h1>Twilight Sanctuary</h1></div><p class="quiet">Sample day · ${dateLabel(service.sampleDate)}</p></div>
  <div class="dashboard">
    ${dialogue(sol)}
    <div class="side-panels">${checkInPreview()}${panel('Active Quests',questList()+link('quests','View quests','text-link'))}</div>
    ${panel('Garden Calendar',calendar(service.listJournals(),sample.getUTCFullYear(),sample.getUTCMonth(),false,service.sampleDate)+link('calendar','Open calendar','text-link'),'calendar-panel')}
    ${panel('EchoField',`<p>A gateway from the sanctuary to the wider world.</p>${link('echofield','Open EchoField','button')}`,'gateway')}
    ${panel('At a Glance',progression()+link('player','Open player profile','text-link'),'player-panel')}
  </div>`;
}

function unavailable(name) {
  return `<p class="unavailable">${escape(service.connection(name).message)}</p>`;
}
function pageView(title, content) {
  return `<div class="inner"><h1>${title}</h1>${panel('Preview',content)}</div>`;
}
function journal(date) {
  const entry = date && service.getJournal(date);
  const archive = `<ul class="journal-links">${service.listJournals().map(item=>`<li>${link('journal/'+item.date,dateLabel(item.date),'text-link')}</li>`).join('')}</ul>`;
  if (!date) return pageView('Daily Journal', archive);
  return pageView('Daily Journal', entry ?
    `<h3>${dateLabel(entry.date)}</h3><dl class="ratings"><div><dt>Mood</dt><dd>${escape(entry.mood)}</dd></div><div><dt>Stamina</dt><dd>${entry.stamina}</dd></div><div><dt>Constitution</dt><dd>${entry.constitution}</dd></div><div><dt>Willpower</dt><dd>${entry.willpower}</dd></div></dl><p>${escape(entry.note)}</p>${link('calendar','Back to calendar')}` :
    '<p>No sample entry exists for this date.</p>'+link('calendar','Back to calendar'));
}
function checkIn() {
  return pageView('Check-In', `<form id="check-in">
    <fieldset><legend>Rate any gauge from 1 to 10</legend><div class="gauge-fields">${gauges.map(label=>`<label>${label}<input name="${label}" type="number" min="1" max="10" step="1" value="${service.getCheckIn()?.[label] ?? ''}"></label>`).join('')}</div></fieldset>
    <button class="filled">Save sample check-in</button><p id="check-in-status" role="status"></p>
  </form>`);
}
function render(moveFocus = false) {
  const {page,date} = resolveRoute(location.hash);
  navigation(page);
  document.body.dataset.page = page;
  const {level,xp,nextLevelXp,gald}=service.getProgression();
  document.querySelector('#header-progress').innerHTML = `<span>Level ${level}</span><progress aria-label="Sample XP" value="${xp}" max="${nextLevelXp}"></progress><span>${xp} / ${nextLevelXp} XP</span><strong>${gald} Gald</strong>`;
  const views = {
    daily,
    'check-in':checkIn,
    journal:()=>journal(date),
    calendar:()=>pageView('Calendar',calendar(service.listJournals(),calendarMonth.getUTCFullYear(),calendarMonth.getUTCMonth(),true,service.sampleDate)),
    quests:()=>pageView('Quests',questList()),
    home:()=>pageView('Home',unavailable('Cottage customization and household services')),
    workshop:()=>pageView('Workshop',unavailable('Connected creative projects')),
    vault:()=>pageView('Vault',link('records','Records')+' '+link('companions','Companion Vault')),
    records:()=>pageView('Records',`<p>Sample journal archive</p>${link('journal','Browse dated entries')}${unavailable('Private records')}`),
    companions:()=>pageView('Companion Vault',unavailable('Authenticated Frame character packages')),
    echofield:()=>pageView('EchoField',unavailable('The connected EchoField world')+link('daily','Return to the sanctuary')),
    settings:()=>pageView('Settings',unavailable('Connected settings and services')),
    player:()=>pageView('Player Avatar',progression()+unavailable('Avatar customization and inventory')),
    missing:()=>pageView('Page unavailable',link('daily','Return to Daily'))
  };
  root.innerHTML = views[page]();
  for (const art of root.querySelectorAll('[data-art]')) {
    const hide = () => { art.hidden = true; };
    art.addEventListener('error',hide,{once:true});
    if (art.complete && !art.naturalWidth) hide();
  }
  if (page==='daily') {
    if (picked!==null) applyChoice(picked);
    document.querySelector('#reply').value = draft;
  }
  if (moveFocus) {
    root.focus({preventScroll:true});
    window.scrollTo(0,0);
  }
}
function applyChoice(index) {
  const choice = sol.choices[index];
  if (!choice) return;
  picked=index;
  document.querySelector('#sol-line').textContent=choice.reply;
  document.querySelector('#sol-action').innerHTML=choice.path ? link(choice.path,choice.action,'text-link') : '';
  for (const button of root.querySelectorAll('[data-choice]')) button.setAttribute('aria-pressed',String(Number(button.dataset.choice)===index));
}

root.addEventListener('click',event=>{
  const choice = event.target.closest('[data-choice]');
  if (choice) applyChoice(Number(choice.dataset.choice));
  const month = event.target.closest('[data-month]');
  if (month) {
    calendarMonth = new Date(Date.UTC(calendarMonth.getUTCFullYear(),calendarMonth.getUTCMonth()+Number(month.dataset.month),1));
    render();
    root.querySelector(`[data-month="${month.dataset.month}"]`)?.focus();
  }
});
root.addEventListener('input',event=>{ if (event.target.id==='reply') draft=event.target.value; });
root.addEventListener('submit',event=>{
  event.preventDefault();
  const data = new FormData(event.target);
  if (event.target.id==='custom-reply') {
    draft=String(data.get('reply'));
    document.querySelector('#reply-status').textContent='Draft kept for this tab. Live replies are unavailable.';
  }
  if (event.target.id==='check-in') {
    const ratings = Object.fromEntries(gauges.flatMap(label=>data.get(label) ? [[label,Number(data.get(label))]] : []));
    if (!Object.keys(ratings).length) {
      document.querySelector('#check-in-status').textContent='Enter at least one rating.';
      return;
    }
    service.saveCheckIn(ratings);
    document.querySelector('#check-in-status').textContent='Sample check-in saved for this tab.';
  }
});
document.querySelector('.skip').addEventListener('click', event => {
  event.preventDefault();
  root.focus();
});
window.addEventListener('hashchange',()=>render(true));
render();
