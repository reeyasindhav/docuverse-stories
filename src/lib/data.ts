export type Chapter = {
  id: string;
  title: string;
  start: string;
  duration: string;
  summary: string;
};

export type Film = {
  slug: string;
  title: string;
  kind: "Feature" | "Series" | "Short";
  year: number;
  runtime: string;
  topic: string;
  topicSlug: string;
  tagline: string;
  synopsis: string;
  image: string;
  still: string;
  filmmaker: string;
  filmmakerSlug: string;
  rating: number;
  awards: string[];
  chapters: Chapter[];
};

export type Filmmaker = {
  slug: string;
  name: string;
  role: string;
  based: string;
  portrait: string;
  cover: string;
  bio: string;
  statement: string;
  films: string[];
  awards: string[];
};

export type Topic = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
};

export type Watchlist = {
  slug: string;
  title: string;
  curator: string;
  blurb: string;
  note: string;
  cover: string;
  films: string[];
};

const U = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const topics: Topic[] = [
  {
    slug: "climate",
    name: "Climate",
    blurb: "Ice cores, drought maps and the people keeping record of a changing planet.",
    image: U("1454496522488-7a8e488e8606"),
  },
  {
    slug: "oceans",
    name: "Oceans",
    blurb: "Kelp forests, deep trenches and the fragile blue majority of the world.",
    image: U("1518837695005-2083093ee35b"),
  },
  {
    slug: "culture",
    name: "Culture",
    blurb: "Archives, rituals and the quiet labour of keeping memory alive.",
    image: U("1493225457124-a3eb161ffa5f"),
  },
  {
    slug: "science",
    name: "Science",
    blurb: "Observatories, laboratories and the patient work of asking better questions.",
    image: U("1502134249126-9f3755a50d78"),
  },
  {
    slug: "people-and-place",
    name: "People & Place",
    blurb: "Portraits of communities shaped by the ground beneath them.",
    image: U("1529156069898-49953e39b3ac"),
  },
];

const chapters = (rows: [string, string, string, string][]): Chapter[] =>
  rows.map(([title, start, duration, summary], i) => ({
    id: `ch-${i + 1}`,
    title,
    start,
    duration,
    summary,
  }));

export const films: Film[] = [
  {
    slug: "the-last-glacier",
    title: "The Last Glacier",
    kind: "Feature",
    year: 2024,
    runtime: "1h 42m",
    topic: "Climate",
    topicSlug: "climate",
    tagline: "A four-year record of one vanishing body of ice.",
    synopsis:
      "For four winters, a small survey team returns to the same valley to measure what is left. What begins as a data-gathering exercise becomes a study of attention: how you keep looking at something that is disappearing while you watch.",
    image: U("1454496522488-7a8e488e8606"),
    still: U("1531366936337-7c912a4589a7"),
    filmmaker: "Ines Halvorsen",
    filmmakerSlug: "ines-halvorsen",
    rating: 4.8,
    awards: ["Grand Jury Prize, Northlight 2024", "Best Cinematography, Reelframe"],
    chapters: chapters([
      ["Arrival", "00:00", "14m", "The team drives in at first light and sets the season's first stakes."],
      ["The Measure", "14:00", "21m", "How you weigh a glacier: stakes, cores and a decade of notebooks."],
      ["Melt Season", "35:00", "26m", "Water moves where it never used to. The valley reshapes in weeks."],
      ["The Village Below", "61:00", "19m", "Downstream, a farming community reads the same data differently."],
      ["Last Light", "80:00", "22m", "A final survey, and the question of what a record is worth."],
    ]),
  },
  {
    slug: "below-the-surface",
    title: "Below the Surface",
    kind: "Series",
    year: 2023,
    runtime: "6 episodes",
    topic: "Oceans",
    topicSlug: "oceans",
    tagline: "Six dives into the kelp forests holding a coastline together.",
    synopsis:
      "A six-part series filmed almost entirely underwater, following the divers, ecologists and fishers whose lives depend on a canopy most people never see.",
    image: U("1518837695005-2083093ee35b"),
    still: U("1559827260-dc66d52bef19"),
    filmmaker: "Marcus Bell",
    filmmakerSlug: "marcus-bell",
    rating: 4.6,
    awards: ["Best Series, Blue Planet Festival"],
    chapters: chapters([
      ["The Canopy", "00:00", "42m", "An introduction to the kelp forest as architecture."],
      ["Grazers", "00:00", "39m", "Urchin barrens and the collapse of balance."],
      ["The Divers", "00:00", "44m", "The volunteers who count what cannot be counted from shore."],
      ["Harvest", "00:00", "41m", "Fisheries, quotas and a coastline's economy."],
      ["Replanting", "00:00", "38m", "Restoration work, one holdfast at a time."],
      ["Tideline", "00:00", "46m", "What recovery actually looks like over ten years."],
    ]),
  },
  {
    slug: "the-memory-keepers",
    title: "The Memory Keepers",
    kind: "Feature",
    year: 2024,
    runtime: "1h 20m",
    topic: "Culture",
    topicSlug: "culture",
    tagline: "Inside the darkrooms rescuing a century of lost film.",
    synopsis:
      "In a red-lit basement archive, a handful of technicians restore decaying nitrate reels. Each frame recovered is a small argument against forgetting.",
    image: U("1518152006812-edab29b069ac"),
    still: U("1493225457124-a3eb161ffa5f"),
    filmmaker: "Nadia Okonjo",
    filmmakerSlug: "nadia-okonjo",
    rating: 4.7,
    awards: ["Audience Award, Archive Doc Week"],
    chapters: chapters([
      ["Red Light", "00:00", "16m", "The daily ritual of the restoration room."],
      ["Nitrate", "16:00", "23m", "Why the medium is actively destroying itself."],
      ["Found Footage", "39:00", "20m", "A wedding reel from 1938 returns to a family."],
      ["The Ledger", "59:00", "21m", "What gets saved, and who decides."],
    ]),
  },
  {
    slug: "listening-to-the-stars",
    title: "Listening to the Stars",
    kind: "Short",
    year: 2025,
    runtime: "48 min",
    topic: "Science",
    topicSlug: "science",
    tagline: "One night shift at a mountaintop observatory.",
    synopsis:
      "A single-night portrait of the astronomers, engineers and cooks who keep a remote observatory running between dusk and dawn.",
    image: U("1502134249126-9f3755a50d78"),
    still: U("1520769945061-0a448c463865"),
    filmmaker: "Ines Halvorsen",
    filmmakerSlug: "ines-halvorsen",
    rating: 4.5,
    awards: ["Best Short, Reelframe 2025"],
    chapters: chapters([
      ["Dusk", "00:00", "12m", "The dome opens and the night's list is set."],
      ["Signal", "12:00", "18m", "Three hours on a single faint reading."],
      ["Dawn", "30:00", "18m", "Shutting down, and what the data might mean."],
    ]),
  },
  {
    slug: "dry-season",
    title: "Dry Season",
    kind: "Feature",
    year: 2023,
    runtime: "1h 34m",
    topic: "Climate",
    topicSlug: "climate",
    tagline: "A river town learns to live without its river.",
    synopsis:
      "Three families in a shrinking delta town negotiate water rights, memory and the decision to stay.",
    image: U("1509316785289-025f5b846b35"),
    still: U("1470071459604-3b5ec3a7fe05"),
    filmmaker: "Tomas Reyes",
    filmmakerSlug: "tomas-reyes",
    rating: 4.4,
    awards: ["Special Mention, Northlight"],
    chapters: chapters([
      ["The Gauge", "00:00", "20m", "A single measuring post and forty years of marks."],
      ["Allocation", "20:00", "28m", "Council meetings, quotas, and a town divided."],
      ["Leaving", "48:00", "24m", "One family packs. Another refuses."],
      ["Rain", "72:00", "22m", "A storm arrives, and changes almost nothing."],
    ]),
  },
  {
    slug: "the-quiet-canopy",
    title: "The Quiet Canopy",
    kind: "Feature",
    year: 2022,
    runtime: "1h 28m",
    topic: "People & Place",
    topicSlug: "people-and-place",
    tagline: "Old-growth forest, and the people who count its rings.",
    synopsis:
      "A slow, patient film about a forest survey crew and the century-scale time they work inside.",
    image: U("1441974231531-c6227db76b6e"),
    still: U("1448375240586-882707db888b"),
    filmmaker: "Nadia Okonjo",
    filmmakerSlug: "nadia-okonjo",
    rating: 4.6,
    awards: ["Best Editing, Greenframe"],
    chapters: chapters([
      ["Understory", "00:00", "22m", "Walking a transect at dawn."],
      ["Rings", "22:00", "25m", "Reading three hundred years in a core sample."],
      ["The Cut Line", "47:00", "20m", "Where the survey meets the logging boundary."],
      ["After", "67:00", "21m", "What a second-growth forest becomes."],
    ]),
  },
  {
    slug: "night-shift-city",
    title: "Night Shift City",
    kind: "Series",
    year: 2025,
    runtime: "4 episodes",
    topic: "People & Place",
    topicSlug: "people-and-place",
    tagline: "Four episodes on the people who keep a city awake.",
    synopsis:
      "Bakers, dispatchers, cleaners and nurses — a series composed entirely between midnight and six.",
    image: U("1519501025264-65ba15a82390"),
    still: U("1444723121867-7a241cacace9"),
    filmmaker: "Marcus Bell",
    filmmakerSlug: "marcus-bell",
    rating: 4.3,
    awards: ["Official Selection, Urban Doc"],
    chapters: chapters([
      ["Midnight", "00:00", "38m", "The handover between two working days."],
      ["Dispatch", "00:00", "36m", "A night on the emergency line."],
      ["Ovens", "00:00", "34m", "Bread as a 3am industry."],
      ["Six", "00:00", "40m", "Sunrise and the walk home."],
    ]),
  },
  {
    slug: "salt-and-iron",
    title: "Salt and Iron",
    kind: "Short",
    year: 2024,
    runtime: "36 min",
    topic: "Oceans",
    topicSlug: "oceans",
    tagline: "The last working shipyard on a disappearing coast.",
    synopsis:
      "A short, tactile portrait of welders and shipwrights maintaining a fleet nobody is building anymore.",
    image: U("1520333789090-1afc82db536a"),
    still: U("1516569422361-b5f5db8dcfef"),
    filmmaker: "Tomas Reyes",
    filmmakerSlug: "tomas-reyes",
    rating: 4.2,
    awards: [],
    chapters: chapters([
      ["Drydock", "00:00", "12m", "A hull comes out of the water."],
      ["The Trade", "12:00", "12m", "Apprenticeship in a shrinking craft."],
      ["Launch", "24:00", "12m", "One more season on the water."],
    ]),
  },
];

export const filmmakers: Filmmaker[] = [
  {
    slug: "ines-halvorsen",
    name: "Ines Halvorsen",
    role: "Director & Cinematographer",
    based: "Tromsø, Norway",
    portrait: U("1494790108377-be9c29b29330", 800),
    cover: U("1454496522488-7a8e488e8606"),
    bio: "Ines Halvorsen shoots in cold places over long periods. Her films tend to return to the same location across years, letting change do the narrative work.",
    statement:
      "I don't think a documentary should be in a hurry. If you stay somewhere long enough, the place tells you what the film is.",
    films: ["the-last-glacier", "listening-to-the-stars"],
    awards: ["Grand Jury Prize, Northlight 2024", "Best Short, Reelframe 2025"],
  },
  {
    slug: "marcus-bell",
    name: "Marcus Bell",
    role: "Director & Underwater DP",
    based: "Cape Town, South Africa",
    portrait: U("1507003211169-0a1dd7228f2d", 800),
    cover: U("1518837695005-2083093ee35b"),
    bio: "A former marine ecologist who moved to film after a decade of survey diving. Marcus builds series that treat ecosystems as characters.",
    statement: "Science gives you the structure. The film has to give you the reason to care.",
    films: ["below-the-surface", "night-shift-city"],
    awards: ["Best Series, Blue Planet Festival"],
  },
  {
    slug: "nadia-okonjo",
    name: "Nadia Okonjo",
    role: "Director",
    based: "Lagos, Nigeria",
    portrait: U("1438761681033-6461ffad8d80", 800),
    cover: U("1518152006812-edab29b069ac"),
    bio: "Nadia works with archives, restorers and the physical residue of memory. Her films are quiet, precise and often shot indoors.",
    statement: "Every archive is an argument about what deserves to survive. I film the argument.",
    films: ["the-memory-keepers", "the-quiet-canopy"],
    awards: ["Audience Award, Archive Doc Week", "Best Editing, Greenframe"],
  },
  {
    slug: "tomas-reyes",
    name: "Tomás Reyes",
    role: "Director & Producer",
    based: "Valparaíso, Chile",
    portrait: U("1500648767791-00dcc994a43e", 800),
    cover: U("1509316785289-025f5b846b35"),
    bio: "Tomás makes films about labour and water — the two things he says every community argues about eventually.",
    statement: "I want the audience to leave knowing how something actually works.",
    films: ["dry-season", "salt-and-iron"],
    awards: ["Special Mention, Northlight"],
  },
];

export const watchlists: Watchlist[] = [
  {
    slug: "feel-small",
    title: "For when you need to feel small",
    curator: "Docuverse Editorial",
    blurb: "A quiet collection of films about vast landscapes, deep time, and the forces that shape us.",
    note: "Watch these late, with the lights off. They work best in the order listed.",
    cover: U("1441974231531-c6227db76b6e"),
    films: ["the-quiet-canopy", "listening-to-the-stars", "the-last-glacier"],
  },
  {
    slug: "water-rights",
    title: "Water, and who owns it",
    curator: "Guest curator — Tomás Reyes",
    blurb: "Four films on scarcity, allocation and the politics that follow a river.",
    note: "Start with Dry Season. It sets the vocabulary the rest of the list uses.",
    cover: U("1509316785289-025f5b846b35"),
    films: ["dry-season", "below-the-surface", "salt-and-iron"],
  },
  {
    slug: "night-work",
    title: "Made after midnight",
    curator: "Docuverse Editorial",
    blurb: "Films shot in the hours most of us sleep through.",
    note: "A short list, deliberately. Two sittings is enough.",
    cover: U("1502134249126-9f3755a50d78"),
    films: ["night-shift-city", "listening-to-the-stars", "the-memory-keepers"],
  },
];

export const getFilm = (slug: string) => films.find((f) => f.slug === slug);
export const getFilmmaker = (slug: string) => filmmakers.find((f) => f.slug === slug);
export const getWatchlist = (slug: string) => watchlists.find((w) => w.slug === slug);
export const getTopic = (slug: string) => topics.find((t) => t.slug === slug);
export const filmsByTopic = (slug: string) => films.filter((f) => f.topicSlug === slug);
export const filmsByMaker = (slug: string) => films.filter((f) => f.filmmakerSlug === slug);
