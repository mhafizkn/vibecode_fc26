/* ============================================================
   EDIT ZONE — swap in your real players, photos, and results
   ============================================================ */

// Palette used to auto-color avatar tiles (cycled per player)
const PALETTE = [
  'linear-gradient(135deg,#5cf03c,#2c6b1f)',
  'linear-gradient(135deg,#35e0d0,#1a7a70)',
  'linear-gradient(135deg,#f0b93c,#a5730f)',
  'linear-gradient(135deg,#f0473c,#8f231c)',
  'linear-gradient(135deg,#8a7cf0,#4a3ba8)',
  'linear-gradient(135deg,#3ca8f0,#1a5aa8)',
  'linear-gradient(135deg,#f03cb0,#8f2170)',
  'linear-gradient(135deg,#c8f03c,#6a8a15)'
];

// Solid accent color per group (A–H), used for group badges/dots
const GROUP_COLORS = ['#5cf03c','#35e0d0','#f0b93c','#f0473c','#8a7cf0','#3ca8f0','#f03cb0','#c8f03c'];
const GROUP_LETTERS = ['A','B','C','D','E','F','G','H'];

const IMAGE_BASE_PATH = './images/players/';
const IMAGE_EXTENSION = '.png';

// Generates an illustrated portrait per player (seeded on their gamertag, so it's
// stable across reloads). Swap any player's "photo" field for a real headshot URL
// once you have one — e.g. photo: "https://yourcompany.com/staff/aiden-cross.jpg"
function portraitFor(gamertag){
//   return `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear`;
  return `${IMAGE_BASE_PATH}${gamertag}${IMAGE_EXTENSION}`;
}

// Each CORES department fields one squad of 4 = one group (A–H).
const players = [
  // Group A
  { name:"Hasif",           gamertag:"hasif",          number:1,  dept:"CORES/ESONS",  country:"Norway",  flag:"Oslo", iso2:"no", group:"A" },
  { name:"Wan Nashrul",     gamertag:"ahmadmustajab",  number:2,  dept:"GENCO",        country:"Japan",   flag:"Tokyo", iso2:"jp", group:"A" },
  { name:"Alif Abaqri",     gamertag:"Alif",           number:3,  dept:"CORES/CSAD",   country:"Iran",    flag:"Tehran", iso2:"ir", group:"A" },
  { name:"Hisham Asri",     gamertag:"MHBAA",          number:4,  dept:"CORES/ESONS",  country:"Korea",   flag:"Seoul", iso2:"kr", group:"A" },
  // Group B
  { name:"Azlul Shkib",     gamertag:"Arslan",  number:5,  dept:"CORES",        country:"England",          flag:"London", iso2:"gb-eng",   group:"B" },
  { name:"Hasnun Ali",      gamertag:"Hasnun",  number:6,  dept:"CORES/OTSOS",  country:"German",           flag:"GER", iso2:"de",   group:"B" },
  { name:"Nasrullah Omar",  gamertag:"Nas",    number:7,  dept:"CORES/OTSOS",  country:"Czech Republic",   flag:"Berlin", iso2:"cz",   group:"B" },
  { name:"Isfaruzi",        gamertag:"aSr",     number:8,  dept:"CORES/ESONS",  country:"Türkiye",          flag:"Ankara", iso2:"tr",   group:"B" },
  // Group C
  { name:"Ahmad Nabil",         gamertag:"NabilRizal",   number:9,  dept:"ERP",          country:"Morocco",   flag:"Rabat", iso2:"ma",    group:"C" },
  { name:"Adib Afifi",          gamertag:"ggson",         number:10, dept:"DCT/Retail",   country:"Egypt",   flag:"Cairo", iso2:"eg",    group:"C" },
  { name:"Idzuan Naim",         gamertag:"idzuan",        number:11, dept:"CORES/OTD",    country:"Portugal",   flag:"Lisbon", iso2:"pt",    group:"C" },
  { name:"Syahmi Zulkarnain",   gamertag:"K1",           number:12, dept:"CORES/OTSOS",  country:"Scotland",   flag:"Edinburgh", iso2:"gb-sct",    group:"C" },
  // Group D
  { name:"Faliq Fadzil",  gamertag:"Faliqqi",  number:13, dept:"CORES/OTSOS",    country:"Cape Verde",   flag:"Praia", iso2:"cv",         group:"D" },
  { name:"Amirul Chandi",   gamertag:"Cee", number:14, dept:"CORES/OTSOS",    country:"Argentina",   flag:"Buenos Aires", iso2:"ar" ,group:"D" },
  { name:"Amzar",    gamertag:"Jimmy",  number:15, dept:"SPTX/CVM",   country:"Paraguay",   flag:"Asunción", iso2:"py",       group:"D" },
  { name:"Nor Azwin",     gamertag:"Azwin",  number:16, dept:"TA",    country:"Algeria",   flag:"Algiers", iso2:"dz",      group:"D" },
  // Group E
  { name:"Azan",   gamertag:"AJEY", number:17, dept:"CORES/OTSOS",       country:"Ecuador",   flag:"Quito", iso2:"ec",      group:"E" },
  { name:"Hafiz",   gamertag:"migiyelhamelton", number:18, dept:"CORES/OTD",       country:"Mexico",   flag:"Mexico City", iso2:"mx",          group:"E" },
  { name:"Syaaban",   gamertag:"Ban",  number:19, dept:"CORES/CSAD",       country:"New Zealand",   flag:"Wellington", iso2:"nz",           group:"E" },
  { name:"Ahmad Hafifi",   gamertag:"fifoz", number:20, dept:"CORES/OTSOS",       country:"Spain",   flag:"Madrid", iso2:"es",        group:"E" },
  // Group F
  { name:"Izzuddin Ali",     gamertag:"Izz Sp",  number:21, dept:"IO/IPNOC",     country:"Senegal",   flag:"Dakar", iso2:"sn",     group:"F" },
  { name:"Aidiin Najmi",    gamertag:"Drayden",  number:22, dept:"CORES/ESONS",     country:"Saudi Arabia",  flag:"Riyadh", iso2:"sa",       group:"F" },
  { name:"Haiman Azam",    gamertag:"Herman",  number:23, dept:"IO/IPNOC",     country:"Austria",  flag:"Vienna", iso2:"at",           group:"F" },
  { name:"Akhimullah Kaswan",   gamertag:"AkeemKaswan",  number:24, dept:"ERP",     country:"United States",  flag:"Washington D.C.", iso2:"us",          group:"F" },
  // Group G
  { name:"Kamal Azharan", gamertag:"KamalSutra", number:25,dept:"CORES/OTD", country:"Belgium",   flag:"Brussels", iso2:"be",   group:"G" },
  { name:"Hazwan Kamaruddin",     gamertag:"Awe",   number:26, dept:"CORES/ESONS", country:"Switzerland",   flag:"Bern", iso2:"ch",      group:"G" },
  { name:"Azri Hafiz",  gamertag:"Azroykuat",number:27, dept:"TNS/Telco", country:"Canada",   flag:"Ottawa", iso2:"ca",    group:"G" },
  { name:"Yusri",      gamertag:"use_mo",   number:28, dept:"IO/IPNOC", country:"Netherlands",   flag:"Amsterdam", iso2:"nl",      group:"G" },
  // Group H — Admin & Records
  { name:"Zulfikar Ramli",     gamertag:"zulvaldes",   number:29, dept:"CORES/OTSOS",   country:"France",   flag:"Paris", iso2:"fr",         group:"H" },
  { name:"Shaiful Rizal",      gamertag:"shaifulr",   number:30, dept:"CORES/CSAD",    country:"Uruguay",   flag:"Montevideo", iso2:"uy",        group:"H" },
  { name:"Luqman Harriz",     gamertag:"Manwest",   number:31, dept:"CORES/CSAD",      country:"Brazil",   flag:"Brasília", iso2:"br",       group:"H" },
  { name:"Ikhwan Kamarudin",  gamertag:"Khwan", number:32, dept:"CORES/CSAD",     country:"Croatia",   flag:"Zagreb", iso2:"hr",   group:"H" }
].map(p => ({ ...p, photo: p.photo || portraitFor(p.gamertag) }));

const committee = [
  { name:"Ihsan",         gamertag:"san",   role:"Football Manager 1" },
  { name:"Amirrul",        gamertag:"mirrul",   role:"Football Manager 2" },
  { name:"Jarmin",        gamertag:"jarmin",   role:"Referree" },
  { name:"Safuan",       gamertag:"powe",   role:"Medical Officer" },
//   { name:"Tom Baxter",          gamertag:"zul-3",   role:"IT & Console Setup" },
//   { name:"Hassan Al-Sayed",     gamertag:"zul-3",   role:"Referee Lead" },
//   { name:"Elena Vasquez",       gamertag:"zul-3",   role:"Broadcast & Streaming" },
//   { name:"Connor Whitfield",    gamertag:"zul-3",   role:"Prize & Sponsorship" },
//   { name:"Meera Iyer",          gamertag:"zul-3",   role:"Facilities Coordinator" },
//   { name:"Patrick Nguyen",      gamertag:"zul-3",   role:"Health & Safety Officer" },
//   { name:"Astrid Johansson",    gamertag:"zul-3",   role:"Finance & Budget" },
//   { name:"Jamal Thompson",      gamertag:"zul-3",   role:"Volunteer Coordinator" },
//   { name:"Ling Zhou",           gamertag:"zul-3",   role:"Photography & Media" }
].map(c => ({ ...c, photo: c.photo || portraitFor(c.gamertag) }));

/* ============================================================
   RENDER LOGIC — no need to touch below this line
   ============================================================ */

function initials(name){
  return name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
}
function avatarStyle(i){ return PALETTE[i % PALETTE.length]; }
function avatarHTML(player, idx, size){
  if(player.photo){
    const ring = size >= 100
      ? `border:3px solid rgba(255,255,255,0.15);box-shadow:0 0 0 8px rgba(255,255,255,0.03);`
      : `border:2px solid rgba(255,255,255,0.12);`;
    return `<img src="${player.photo}" alt="${player.gamertag}" onerror="this.onerror=null; this.parentElement.innerHTML='${initials(player.name)}';" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;${ring}position:relative;z-index:1;background:var(--bg-panel-2);">`;
  }
  return `<div class="avatar-tile" style="background:${avatarStyle(idx)};width:${size}px;height:${size}px;font-size:${size*0.35}px;">${initials(player.name)}</div>`;
}
// Large slideshow portrait — fills the .slide-photo container edge-to-edge (not circular).
function mainPhotoHTML(player, idx){
  if(player.photo){
    return `<img class="main-photo" src="${player.photo}" alt="${player.gamertag}">`;
  }
  return `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">${avatarHTML(player, idx, 150)}</div>`;
}

// ---- Page 1: slideshow ----
let current = 0;
const track = document.getElementById('slideTrack');
const dotsWrap = document.getElementById('dots');
const rosterStrip = document.getElementById('rosterStrip');

players.forEach((p, i) => {
  const groupColor = GROUP_COLORS[GROUP_LETTERS.indexOf(p.group)];

  const slide = document.createElement('div');
  slide.className = 'slide' + (i === 0 ? ' current' : '');
  slide.innerHTML = `
    <div class="slide-photo">
      ${mainPhotoHTML(p, i)}
      <div class="jersey-badge">Capital city: ${p.flag}</div>
    </div>
    <div class="slide-info">
      <div class="slide-number">Player No. ${p.number}</div>
      <div class="slide-gamertag">${p.gamertag}</div>
      <div class="slide-realname">${p.name}</div>
      <div class="slide-meta">
        <div class="meta-item">
            <div class="k">Country</div>
            <div class="v">
                <img class="flag-icon" src="https://flagcdn.com/w40/${p.iso2}.png" srcset="https://flagcdn.com/w80/${p.iso2}.png 2x" alt="${p.country} flag">${p.country}
            </div>
        </div>
        <div class="meta-item"><div class="k">Department</div><div class="v">${p.dept}</div></div>
      </div>
      <div class="group-badge"><span class="dot" style="background:${groupColor}"></span>Group ${p.group}</div>
    </div>
  `;
  track.appendChild(slide);

  // Archive line
  /* <div class="meta-item"><div class="k">Country</div><div class="v">${p.country}</div></div> */

  const dot = document.createElement('button');
  dot.className = i === 0 ? 'active' : '';
  dot.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(dot);

  const thumb = document.createElement('div');
  thumb.className = 'roster-thumb' + (i === 0 ? ' active' : '');
  thumb.innerHTML = `
    ${avatarHTML(p, i, 55)}
    <div class="mini-name"><div style="font-size:11px">${p.gamertag}</div></div>
    <div class="group-badge"><span class="dot" style="background:${groupColor}"></span><div style="font-size:10px">Group ${p.group}</div></div>
  `;
  thumb.addEventListener('click', () => goTo(i));
  rosterStrip.appendChild(thumb);
});

const slideEls = document.querySelectorAll('.slide');
const dotEls = document.querySelectorAll('.dots button');
const thumbEls = document.querySelectorAll('.roster-thumb');

function goTo(i){
  current = (i + players.length) % players.length;
  slideEls.forEach((s, idx) => s.classList.toggle('current', idx === current));
  dotEls.forEach((d, idx) => d.classList.toggle('active', idx === current));
  thumbEls.forEach((t, idx) => t.classList.toggle('active', idx === current));
}
document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

let autoplay = setInterval(() => goTo(current + 1), 5500);
document.querySelector('.slideshow').addEventListener('mouseenter', () => clearInterval(autoplay));
document.querySelector('.slideshow').addEventListener('mouseleave', () => { autoplay = setInterval(() => goTo(current + 1), 5500); });

// ---- Page 2: group standings + fixtures are now embedded live from score7.io (see page-groups HTML) ----

// ---- Page 3: committee ----
const committeeGrid = document.getElementById('committeeGrid');
committee.forEach((c,i) => {
  const card = document.createElement('div');
  card.className = 'committee-card';
  card.innerHTML = `
    ${avatarHTML(c, i + 3, 200)}
    <div class="cname">${c.name}</div>
    <div class="crole">${c.role}</div>
  `;
  committeeGrid.appendChild(card);
});

// ---- Nav switching ----
const navButtons = document.querySelectorAll('#mainNav button');
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + btn.dataset.page).classList.add('active');
    window.scrollTo({top:0, behavior:'smooth'});
  });
});