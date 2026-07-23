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
// stable across reloads). Used only as a FALLBACK if no local photo file is found —
// see LOCAL PHOTO MAPPING below for how real local images are picked up.
function portraitFor(seed){
  return `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear`;
}

/* ------------------------------------------------------------------------
   LOCAL PHOTO MAPPING
   ------------------------------------------------------------------------
   Photos are pulled from local folders next to this HTML file, matched by
   filename. If a local file is missing, the <img> automatically falls back
   to the generated portrait (portraitFor) so the dashboard never breaks.

   Folder layout expected (create these next to the .html file):

     player-photos/
       A.CROSS1.jpg       <- named exactly after the player's gamertag
       P.NAIR2.jpg
       ...

     committee-photos/
       farah-idris.jpg    <- named after a slug of the member's full name
       grace-mwangi.jpg
       ...

   Accepted image extensions are tried in order: jpg, jpeg, png, webp.
   To point a specific player/committee member at a different filename or a
   remote URL instead, just set that person's "photo" field directly in the
   data below — an explicit "photo" always wins over the local-folder lookup.
   ------------------------------------------------------------------------ */

const LOCAL_PLAYER_DIR = 'media/players';
const LOCAL_COMMITTEE_DIR = 'media/committee';
const LOCAL_PHOTO_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

function slugify(name){
  return name
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // strip accents
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Builds the ordered list of candidate local paths to try for a given base filename
// (gamertag for players, slug for committee), e.g. ["player-photos/A.CROSS1.jpg", ...]
function localPhotoCandidates(dir, baseName){
  return LOCAL_PHOTO_EXTENSIONS.map(ext => `${dir}/${baseName}.${ext}`);
}

// Wires an <img> (already in the DOM) to try each local candidate in turn, then
// the generated portrait, and — if even that fails to load (e.g. offline) —
// swaps the <img> out for an initials tile so it's never left blank/broken.
// Called from an inline onerror="nextPhotoSrc(this)" attribute on the <img> tag.
function nextPhotoSrc(img){
  const candidates = JSON.parse(img.dataset.candidates || '[]');
  const idx = parseInt(img.dataset.idx || '0', 10) + 1;
  if(idx < candidates.length){
    img.dataset.idx = idx;
    img.src = candidates[idx];
    return;
  }
  if(img.dataset.fallbackTried !== '1'){
    // local files exhausted — try the generated portrait once
    img.dataset.fallbackTried = '1';
    img.onerror = function(){ showInitialsFallback(img); };
    img.src = img.dataset.fallback;
    return;
  }
  showInitialsFallback(img);
}

// Final fallback: no local file and the generated portrait couldn't load either
// (e.g. no internet access) — show the person's initials instead of a blank image.
function showInitialsFallback(img){
  const name = img.dataset.name || '';
  const initialsText = name.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const size = img.dataset.size;
  const fill = img.dataset.fill === '1';
  const tile = document.createElement('div');
  tile.className = 'avatar-tile';
  tile.textContent = initialsText;
  tile.style.background = img.dataset.bg;
  if(fill){
    tile.style.cssText += `position:absolute;inset:0;width:100%;height:100%;border-radius:0;font-size:64px;`;
  } else {
    tile.style.cssText += `width:${size}px;height:${size}px;font-size:${Math.round(size * 0.35)}px;`;
  }
  img.replaceWith(tile);
}

//Each CORES department fields one squad of 4 = one group (A–H).
const players = [
  // Group A
  { name:"Hasif",           gamertag:"hasif",          number:1,  dept:"CORES/ESONS",  country:"Norway",  flag:"Oslo", iso2:"no", group:"A" },
  { name:"Wan Nashrul",     gamertag:"ahmadmustajab",  number:2,  dept:"GENCO",        country:"Japan",   flag:"Tokyo", iso2:"jp", group:"A" },
  { name:"Alif Abaqri",     gamertag:"Alif",           number:3,  dept:"CORES/CSAD",   country:"Iran",    flag:"Tehran", iso2:"ir", group:"A" },
  { name:"Hisham Asri",     gamertag:"MHBAA",          number:4,  dept:"CORES/ESONS",  country:"Korea",   flag:"Seoul", iso2:"kr", group:"A" },
  // Group B
  { name:"Azlul Shkib",     gamertag:"Arslan",    number:5,  dept:"CORES",        country:"England",          flag:"London", iso2:"gb-eng",   group:"B" },
  { name:"Hasnun Ali",      gamertag:"Hasnun",  number:6,  dept:"CORES/OTSOS",  country:"German",           flag:"Berlin", iso2:"de",   group:"B" },
  { name:"Nasrullah Omar",  gamertag:"Nas",    number:7,  dept:"CORES/OTSOS",  country:"Czech Republic",   flag:"Prague", iso2:"cz",   group:"B" },
  { name:"Isfaruzi",        gamertag:"aSr",     number:8,  dept:"CORES/ESONS",  country:"Türkiye",          flag:"Ankara", iso2:"tr",   group:"B" },
  // Group C
  { name:"Ahmad Nabil",         gamertag:"NabilRizal",   number:9,  dept:"ERP",          country:"Morocco",   flag:"Rabat", iso2:"ma",    group:"C" },
  { name:"Adib Afifi",          gamertag:"ggson",         number:10, dept:"DCT/Retail",   country:"Egypt",   flag:"Cairo", iso2:"eg",    group:"C" },
  { name:"Idzuan Naim",         gamertag:"idzuan",        number:11, dept:"CORES/OTD",    country:"Portugal",   flag:"Lisbon", iso2:"pt",    group:"C" },
  { name:"Syahmi Zulkarnain",   gamertag:"K1",           number:12, dept:"CORES/OTSOS",  country:"Scotland",   flag:"Edinburgh", iso2:"gb-sct",    group:"C" },
  // Group D
  { name:"Faliq Fadzil",      gamertag:"Faliqqi",  number:13, dept:"CORES/OTSOS",    country:"Cape Verde",   flag:"Praia", iso2:"cv",         group:"D" },
  { name:"Amirul Chandi",   gamertag:"Cee", number:14, dept:"CORES/OTSOS",    country:"Argentina",   flag:"Buenos Aires", iso2:"ar" ,group:"D" },
  { name:"Amzar",    gamertag:"Jimmy",  number:15, dept:"SPTX/CVM",   country:"Paraguay",   flag:"Asunción", iso2:"py",       group:"D" },
  { name:"Nor Azwin",     gamertag:"Azwin",  number:16, dept:"TA",    country:"Algeria",   flag:"Algiers", iso2:"dz",      group:"D" },
  // Group E
  { name:"Azan",                gamertag:"AJEY", number:17, dept:"CORES/OTSOS",       country:"Ecuador",   flag:"Quito", iso2:"ec",      group:"E" },
  { name:"Hafiz",                 gamertag:"migiyelhamelton", number:18, dept:"CORES/OTD",       country:"Mexico",   flag:"Mexico City", iso2:"mx",          group:"E" },
  { name:"Syaaban",                 gamertag:"Ban",  number:19, dept:"CORES/CSAD",       country:"New Zealand",   flag:"Wellington", iso2:"nz",           group:"E" },
  { name:"Ahmad Hafifi",                gamertag:"fifoz", number:20, dept:"CORES/OTSOS",       country:"Spain",   flag:"Madrid", iso2:"es",        group:"E" },
  // Group F
  { name:"Izzuddin Ali",             gamertag:"Izz Sp",  number:21, dept:"IO/IPNOC",     country:"Senegal",   flag:"Dakar", iso2:"sn",     group:"F" },
  { name:"Aidiin Najmi",             gamertag:"Drayden",  number:22, dept:"CORES/ESONS",     country:"Saudi Arabia",  flag:"Riyadh", iso2:"sa",       group:"F" },
  { name:"Haiman Azam",         gamertag:"Herman",  number:23, dept:"IO/IPNOC",     country:"Austria",  flag:"Vienna", iso2:"at",           group:"F" },
  { name:"Akhimullah Kaswan",   gamertag:"AkeemKaswan",  number:24, dept:"ERP",     country:"United States",  flag:"Washington D.C.", iso2:"us",          group:"F" },
  // Group G
  { name:"Kamal Azharan",       gamertag:"KamalSutra", number:25,dept:"CORES/OTD", country:"Belgium",   flag:"Brussels", iso2:"be",   group:"G" },
  { name:"Hazwan Kamaruddin",   gamertag:"Awe",   number:26, dept:"CORES/ESONS", country:"Switzerland",   flag:"Bern", iso2:"ch",      group:"G" },
  { name:"Azri Hafiz",          gamertag:"Azroykuat",number:27, dept:"TNS/Telco", country:"Canada",   flag:"Ottawa", iso2:"ca",    group:"G" },
  { name:"Yusri",               gamertag:"use_mo",   number:28, dept:"IO/IPNOC", country:"Netherlands",   flag:"Amsterdam", iso2:"nl",      group:"G" },
  // Group H — Admin & Records
  { name:"Zulfikar Ramli",      gamertag:"zulvaldes",   number:29, dept:"CORES/OTSOS",   country:"France",   flag:"Paris", iso2:"fr",         group:"H" },
  { name:"Shaiful Rizal",       gamertag:"shaifulr",   number:30, dept:"CORES/CSAD",    country:"Uruguay",   flag:"Montevideo", iso2:"uy",        group:"H" },
  { name:"Luqman Harriz",       gamertag:"Manwest",   number:31, dept:"CORES/CSAD",      country:"Brazil",   flag:"Brasília", iso2:"br",       group:"H" },
  { name:"Ikhwan Kamarudin",    gamertag:"Khwan", number:32, dept:"CORES/CSAD",     country:"Croatia",   flag:"Zagreb", iso2:"hr",   group:"H" }
].map(p => ({
  ...p,
  localCandidates: p.localCandidates || localPhotoCandidates(LOCAL_PLAYER_DIR, p.gamertag),
  photo: p.photo || portraitFor(p.gamertag)
}));


const committee = [  
  { name:"Ahmad Hafifi",             gamertag:"fifisr",     role:"Advisor" },
  { name:"Amirul Chandi",            gamertag:"mirulc",     role:"Event Coordinator" },
  { name:"Kamal Azharan",            gamertag:"azharan",    role:"Co-Event Coordinator" },
  { name:"Hasif Salim",              gamertag:"sif",        role:"Logistic" },
  { name:"Safuan Sulaiman",          gamertag:"powe",       role:"Logistic" },
  { name:"Idzuan Naim",              gamertag:"wan",        role:"Logistic" },
  { name:"Luqman",                   gamertag:"man",        role:"Digital Content" },
  { name:"Syaaban",                  gamertag:"ban",        role:"Digital Content" },
  { name:"Zulfikar Ramli",           gamertag:"zul",        role:"Food & Beverage" },
  { name:"Wan Nashrul Syafiq",       gamertag:"nash",       role:"Food & Beverage" },
  { name:"Azan Jusoh",               gamertag:"ajey",       role:"Awards and Recognition" },
  { name:"Hazwan",                   gamertag:"awe",        role:"Awards and Recognition" },
  { name:"Hafiz",                    gamertag:"noi",        role:"Event Secretariat" },
  
  { name:"Ihsan",                    gamertag:"san",        role:"Football Manager 1" },
  { name:"Amirrul",                  gamertag:"mirrul",     role:"Football Manager 2" },
  { name:"Jarmin",                   gamertag:"jarmin",     role:"Referree" },  
].map(c => ({
  ...c,
  localCandidates: c.localCandidates || localPhotoCandidates(LOCAL_COMMITTEE_DIR, slugify(c.gamertag)),
  photo: c.photo || portraitFor(c.gamertag)
}));

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
    const candidates = player.localCandidates || [];
    const initialSrc = candidates.length ? candidates[0] : player.photo;
    const onerror = `onerror="nextPhotoSrc(this)"`;
    const dataAttrs = `data-candidates='${JSON.stringify(candidates)}' data-idx="0" data-fallback="${player.photo}" data-name="${player.name}" data-bg="${avatarStyle(idx)}" data-size="${size}"`;
    return `<img src="${initialSrc}" ${dataAttrs} ${onerror} alt="${player.name}" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;${ring}position:relative;z-index:1;background:var(--bg-panel-2);">`;
  }
  return `<div class="avatar-tile" style="background:${avatarStyle(idx)};width:${size}px;height:${size}px;font-size:${size*0.35}px;">${initials(player.name)}</div>`;
}
// Large slideshow portrait — fills the .slide-photo container edge-to-edge (not circular).
function mainPhotoHTML(player, idx){
  if(player.photo){
    const candidates = player.localCandidates || [];
    const initialSrc = candidates.length ? candidates[0] : player.photo;
    const onerror = `onerror="nextPhotoSrc(this)"`;
    const dataAttrs = `data-candidates='${JSON.stringify(candidates)}' data-idx="0" data-fallback="${player.photo}" data-name="${player.name}" data-bg="${avatarStyle(idx)}" data-fill="1"`;
    return `<img class="main-photo" src="${initialSrc}" ${dataAttrs} ${onerror} alt="${player.name}">`;
  }
  return `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">${avatarHTML(player, idx, 150)}</div>`;
}

// ---- Hover sneak-peek preview ----
// Shows a floating full-size preview of a player/committee photo near the
// cursor when hovering over a thumbnail. Skipped entirely on touch devices
// (no real hover), so it never gets "stuck" open after a tap.
const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const hoverPreview = document.getElementById('hoverPreview');
const hoverPreviewMedia = document.getElementById('hoverPreviewMedia');
const hoverPreviewCaption = document.getElementById('hoverPreviewCaption');

function positionHoverPreview(e){
  const margin = 18;
  const panelW = hoverPreview.offsetWidth || 260;
  const panelH = hoverPreview.offsetHeight || 300;
  let x = e.clientX + margin;
  let y = e.clientY + margin;
  if(x + panelW > window.innerWidth - 10) x = e.clientX - panelW - margin;
  if(y + panelH > window.innerHeight - 10) y = window.innerHeight - panelH - 10;
  if(y < 10) y = 10;
  hoverPreview.style.left = x + 'px';
  hoverPreview.style.top = y + 'px';
}

// Builds the preview content by mirroring whatever the thumbnail is actually
// showing RIGHT NOW — a successfully-loaded photo, or (if every photo source
// failed) the initials tile — rather than re-guessing a file path that might
// not exist. Returns true if there's something to show.
function fillHoverPreview(el){
  hoverPreviewMedia.innerHTML = '';
  const img = el.querySelector('img');
  if(img && img.naturalWidth > 0){
    const big = document.createElement('img');
    big.src = img.currentSrc || img.src;
    big.alt = img.alt || '';
    hoverPreviewMedia.appendChild(big);
    return true;
  }
  const tile = el.querySelector('.avatar-tile');
  if(tile){
    const bigTile = document.createElement('div');
    bigTile.className = 'preview-tile';
    bigTile.style.background = tile.style.background;
    bigTile.textContent = tile.textContent;
    hoverPreviewMedia.appendChild(bigTile);
    return true;
  }
  return false;
}

// Attaches hover-to-preview behavior to a thumbnail element. Re-checks the
// element's current photo/initials state on every hover, so it stays correct
// even if a photo finishes loading (or falls back) after page load.
function attachHoverPreview(el, caption){
  if(!supportsHover) return;
  el.addEventListener('mouseenter', (e) => {
    if(!fillHoverPreview(el)) return;
    hoverPreviewCaption.textContent = caption || '';
    hoverPreview.classList.add('visible');
    positionHoverPreview(e);
  });
  el.addEventListener('mousemove', (e) => {
    if(hoverPreview.classList.contains('visible')) positionHoverPreview(e);
  });
  el.addEventListener('mouseleave', () => {
    hoverPreview.classList.remove('visible');
  });
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
    <div class="mini-name" style="font-size:10px">${p.gamertag}</div>
    <div class="group-badge"><span class="dot" style="background:${groupColor}"></span><div style="font-size:10px">Group ${p.group}</div></div>
  `;
  thumb.addEventListener('click', () => goTo(i));
  rosterStrip.appendChild(thumb);
  attachHoverPreview(thumb, `${p.gamertag} · ${p.name}`);
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
  attachHoverPreview(card, `${c.gamertag} · ${c.name}`);
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