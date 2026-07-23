const committee = [
  { name:"Ihsan",         gamertag:"san",   role:"Football Manager 1" },
  { name:"Amirrul",        gamertag:"mirrul",   role:"Football Manager 2" },
  { name:"Jarmin",        gamertag:"jarmin",   role:"Referree" },
  { name:"Safuan",       gamertag:"powe",   role:"Medical Officer" },
].map(c => ({
  ...c,
  localCandidates: c.localCandidates || localPhotoCandidates(LOCAL_COMMITTEE_DIR, slugify(c.gamertag)),
  photo: c.photo || portraitFor(c.gamertag)
}));