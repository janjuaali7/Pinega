import { LiteraryWork, CameraPreset } from '../types/brodsky';

export const BRODSKY_WORKS: LiteraryWork[] = [
  {
    id: 'less-than-one',
    title: 'Less Than One',
    russianTitle: 'Меньше единицы',
    year: 1986,
    genre: 'Essay & Prose',
    description: 'National Book Critics Circle Award winner. Masterful essays traversing Soviet Leningrad, Russian poetics, W.H. Auden, and the nature of tyranny and language.',
    quoteEn: 'There are worse crimes than burning books. One of them is not reading them.',
    quoteRu: 'Есть преступления хуже, чем сжигать книги. Одно из них — не читать их.',
    excerptEn: 'If an author has any value, it is not because he is unique, but because he is an instrument of the language he writes in.',
    excerptRu: 'Если автор и имеет какую-то ценность, то не потому, что он уникален, а потому, что он является орудием языка, на котором пишет.',
    significance: 'Established Brodsky as one of the twentieth century’s foremost essayists in the English language.',
    color: '#1d4b44' // Malachite teal
  },
  {
    id: 'a-part-of-speech',
    title: 'A Part of Speech',
    russianTitle: 'Часть речи',
    year: 1977,
    genre: 'Poetry Collection',
    description: 'Lyrical cycles composed during his transition from Soviet internal exile into American diaspora, meditating on geography, grammar, and winter.',
    quoteEn: 'I was born and grew up in the Baltic marshland by zinc-grey breakers that always came on in pairs...',
    quoteRu: 'Я родился и вырос в балтийских болотах, подле серых цинковых волн, что всегда наплывали по две...',
    excerptEn: 'Life is just a sketch of a bird against a blank sheet of winter sky.',
    excerptRu: 'Ниоткуда с любовью, надцатого мартобря, дорогой, уважаемый, милая, но не важно...',
    significance: 'Marked the poetic apex of his exploration of linguistic displacement and existential geometry.',
    color: '#8b2635' // Russian burgundy
  },
  {
    id: 'watermark',
    title: 'Watermark',
    russianTitle: 'Набережная неисцелимых',
    year: 1992,
    genre: 'Essay & Prose',
    description: 'An intimate, luminous hymn to Venice in winter—written in English and reflecting on water, light, time, and mortality across cold stone canals.',
    quoteEn: 'Water equals time and provides beauty with its double.',
    quoteRu: 'Вода равна времени и снабжает красоту ее двойником.',
    excerptEn: 'By rubbing shoulders with water, this city has turned the sun into a diamond cutter and the fog into spun silver.',
    excerptRu: 'Прикасаясь к воде, этот город превратил солнце в огранщика алмазов, а туман — в кружево из серебра.',
    significance: 'Brodsky visited Venice every winter until his death; he rests in the cemetery island of San Michele.',
    color: '#2a5c68' // Venetian canal cyan
  },
  {
    id: 'to-urania',
    title: 'To Urania',
    russianTitle: 'К Урании',
    year: 1988,
    genre: 'Poetry Collection',
    description: 'Published right after his Nobel Prize in Literature, dedicated to the muse of astronomy and geography, blending classical meters with modern exile.',
    quoteEn: 'Everything has its limit, including sorrow.',
    quoteRu: 'Все имеет предел, в том числе и печаль.',
    excerptEn: 'Leaves have fallen. The train departs for the empty station where nobody meets us.',
    excerptRu: 'Листья пали. Поезд уходит на пустую станцию, где никто не ждет.',
    significance: 'Showcases Brodsky’s own ambitious translations and English originals crafted in Michigan and New York.',
    color: '#c59b27' // Imperial amber gold
  },
  {
    id: 'so-forth',
    title: 'So Forth',
    russianTitle: 'В окрестностях Атлантиды',
    year: 1996,
    genre: 'Poetry Collection',
    description: 'The final volume published during his lifetime, collecting English and translated Russian poems of fierce stoicism, wit, and metaphysical lucidity.',
    quoteEn: 'Time is greater than space: space is a thing, whereas time is in fact the thought of a thing.',
    quoteRu: 'Время больше пространства: пространство — это вещь, а время — мысль о вещи.',
    excerptEn: 'Fin de siècle. The century departs leaving ink on our fingers and frost upon our coats.',
    excerptRu: 'Век уходит, оставляя чернила на пальцах и иней на воротниках.',
    significance: 'A profound testament to his poetic farewell and mastery over trans-Atlantic verse.',
    color: '#1a3344' // Midnight Baltic blue
  },
  {
    id: 'a-room-and-a-half',
    title: 'A Room and a Half',
    russianTitle: 'Полторы комнаты',
    year: 1985,
    genre: 'Essay & Prose',
    description: 'A heartbreaking autobiographical memoir recalling his family’s tiny partitioned room in the Muruzi House on Liteyny Prospect in Leningrad.',
    quoteEn: 'A room and a half was not just space; it was a state of mind, an acoustic shell for memory.',
    quoteRu: 'Полторы комнаты были не просто пространством, но состоянием духа, акустической раковиной памяти.',
    excerptEn: 'My parents died while I was far away. The Soviet authorities never allowed them to visit me, nor me to attend their funeral.',
    excerptRu: 'Мои родители умерли, когда я был на чужбине. Власти так и не позволили нам увидеться снова.',
    significance: 'Today, this exact address on Liteyny Prospect 24 houses the Joseph Brodsky Museum in St. Petersburg.',
    color: '#5c3a21' // Aged mahogany
  },
  {
    id: 'elegy-for-john-donne',
    title: 'Elegy for John Donne',
    russianTitle: 'Большая элегия Джону Донну',
    year: 1962,
    genre: 'Long Poem',
    description: 'The monumental breakthrough poem written when Brodsky was just 22 in Leningrad, imagining all of London asleep while Donne’s soul speaks in the night.',
    quoteEn: 'John Donne has sunk in sleep, and all around him sleeps: the walls, the bed, the floors...',
    quoteRu: 'Джон Донн уснул, уснуло все вокруг. Уснули стены, пол, постель, картины...',
    excerptEn: 'Sleep: books are asleep, and words inside the books have also closed their lids.',
    excerptRu: 'Уснули книги, и слова в тиши уснули тоже в глубине страниц.',
    significance: 'Caught the attention of Anna Akhmatova, who hailed young Brodsky as the miraculous heir of Russian verse.',
    color: '#34495e' // Slate charcoal
  },
  {
    id: 'nativity-poems',
    title: 'Nativity Poems',
    russianTitle: 'Рождественские стихи',
    year: 1993,
    genre: 'Poetry Collection',
    description: 'A lifelong cycle: starting in 1962, Brodsky vowed to compose one poem every Christmas as a personal metaphysical and spiritual tradition.',
    quoteEn: 'In the cold season, in a land used rather to cold than heat, a boy was born in a desert manger...',
    quoteRu: 'В холодную пору, в местности, привычной скорей к холоду, чем к теплу...',
    excerptEn: 'The star was looking into the cave. And that was the Father’s glance.',
    excerptRu: 'В пещеру глядела звезда. И это был взгляд Отца.',
    significance: 'One of the most moving continuous thematic cycles in twentieth-century literature.',
    color: '#702040' // Crimson velvet
  },
  {
    id: 'on-grief-and-reason',
    title: 'On Grief and Reason',
    russianTitle: 'О скорби и разуме',
    year: 1995,
    genre: 'Essay & Prose',
    description: 'Reflections on Robert Frost, Thomas Hardy, Stephen Spender, and the moral responsibilities of poetry in free societies.',
    quoteEn: 'A poet is an instrument of language, not the other way around.',
    quoteRu: 'Поэт — орудие языка, а не язык — орудие поэта.',
    excerptEn: 'The purpose of poetry is to give people an ethical imperative that transcends political dogmas.',
    excerptRu: 'Цель поэзии — дать человеку этический императив, стоящий выше политических догм.',
    significance: 'Brodsky’s final collection of essays, encapsulating his philosophy of aesthetics as the mother of ethics.',
    color: '#2d4739' // Deep pine
  },
  {
    id: 'the-end-of-a-beautiful-era',
    title: 'The End of a Beautiful Era',
    russianTitle: 'Конец прекрасной эпохи',
    year: 1977,
    genre: 'Poetry Collection',
    description: 'Poems composed between 1964 and 1971 in the Soviet Union—biting, melancholic portraits of Soviet stagnation before his forced exile in 1972.',
    quoteEn: 'The empire is a country for fools. But the snow falling over the capital is indifferent to borders.',
    quoteRu: 'Если выпало в Империи родиться, лучше жить в глухой провинции у моря...',
    excerptEn: 'If one must be born in an empire, it is best to dwell in a remote province by the sea.',
    excerptRu: 'И от цезаря далеко, и от вьюги. Лебезить не нужно, трусить, торопиться...',
    significance: 'Contains Brodsky’s legendary lines "Letters to a Roman Friend" and his trial defiance.',
    color: '#8c5028' // Antique Russian leather
  }
];

export const NOBEL_PRIZE_DETAILS = {
  year: 1987,
  category: 'Nobel Prize in Literature',
  awardedBy: 'The Nobel Foundation / Swedish Academy (Stockholm)',
  officialCitation: 'For an all-embracing authorship, imbued with clarity of thought and poetic intensity.',
  officialCitationRu: 'За всеобъемлющее авторство, проникнутое ясностью мысли и поэтической интенсивностью.',
  speechTitle: 'Nobel Lecture & Banquet Address, December 10, 1987',
  keyQuoteEn: 'For someone inclined toward freedom, a private library is a fortification, and aesthetic choice is the mother of ethics.',
  keyQuoteRu: 'Для человека, склонного к свободе, личная библиотека — это крепость, а эстетический выбор — мать этики.',
  addressExcerptEn: `If art teaches anything, it is the privateness of the human condition. Being the most ancient and the most literal form of private enterprise, it fosters in a man, knowingly or unwittingly, a sense of his uniqueness, of individuality, of separateness—thus turning him from a social animal into an autonomous "I". Language and, presumably, literature are things that are more ancient, more inevitable, and more durable than any form of social organization.`,
  addressExcerptRu: `Если искусство чему-то и учит, то именно приватности человеческого существования. Будучи наиболее древней и буквальной формой частного предпринимательства, оно вольно или невольно поощряет в человеке ощущение его неповторимости, отдельности — превращая его из общественного животного в личность. Язык и, думается, литература — вещи более древние, неизбежные и долговечные, чем любая форма социальной организации.`
};

export const BIOGRAPHY_DETAILS = {
  fullName: 'Iosif Aleksandrovich Brodsky (Иосиф Александрович Бродский)',
  lifespan: 'May 24, 1940 (Leningrad) – January 28, 1996 (New York City)',
  restingPlace: 'San Michele Island Cemetery, Venice, Italy',
  majorHonors: [
    'Nobel Prize in Literature (1987) — 5th Russian-born laureate',
    'United States Poet Laureate Consultant in Poetry (1991–1992)',
    'MacArthur Fellowship ("Genius Grant", 1981)',
    'French Legion of Honor (Chevalier de la Légion d’Honneur)',
    'Honorary Doctor of Letters from Oxford, Yale, and Columbia Universities'
  ],
  trialQuote: {
    judge: 'And who enrolled you in the ranks of poets?',
    brodsky: 'I think... it was God.',
    judgeRu: 'А кто это признал, что вы поэт? Кто причислил вас к поэтам?',
    brodskyRu: 'Я думаю... это от Бога.',
    year: 1964,
    place: 'Leningrad Dzerzhinsky District Court'
  },
  overview: `Born into a Jewish family in Leningrad during the siege era, Joseph Brodsky survived the blockade as an infant. Self-taught in Polish, English, and world literature, he became the spiritual protégé of Anna Akhmatova. In 1964, Soviet authorities tried him for "social parasitism" and sentenced him to five years of hard labor in northern Arkhangelsk. Expelled from the USSR in 1972, he arrived in the United States, teaching at the University of Michigan, Mount Holyoke, Columbia, and Cambridge. As U.S. Poet Laureate, he championed poetry in public places—hotels, airports, and subway stations—believing that verse must be as accessible as telephone directories.`
};

export const CAMERA_PRESETS: CameraPreset[] = [
  {
    id: 'overview',
    label: 'Grand Library',
    description: 'Wide view of the 90s stage, bookshelves, and honors',
    position: [0, 2.6, 6.2],
    target: [0, 1.4, 0]
  },
  {
    id: 'brodsky',
    label: 'Joseph Brodsky',
    description: 'Close portrait of the poet, spectacles, and woolen scarf',
    position: [0, 1.7, 2.4],
    target: [0, 1.45, 0]
  },
  {
    id: 'nobel',
    label: 'Nobel Medal',
    description: 'Detailed inspection of the 1987 gold medal on the stool',
    position: [-1.2, 1.25, 1.4],
    target: [-0.95, 0.85, 0.05]
  },
  {
    id: 'bookshelves',
    label: 'Poetry Shelves',
    description: 'Etched volumes and classical Russian book stacks',
    position: [2.5, 2.2, 3.2],
    target: [2.2, 1.6, -1.0]
  },
  {
    id: 'desk',
    label: 'Writing Desk',
    description: 'Typewriter, tea with lemon in podstakannik, and green lamp',
    position: [1.8, 1.5, 2.0],
    target: [1.6, 0.9, 0.5]
  }
];

export const ATMOSPHERE_MODES = [
  {
    id: 'twilight' as const,
    name: 'Saint Petersburg Twilight',
    subtitle: 'Neva canal dusk, teal shadows & warm reading incandescent',
    ambientColor: '#172828',
    spotColor: '#ffeaae',
    rimColor: '#538d99',
    windowColor: '#3d6170'
  },
  {
    id: 'amber' as const,
    name: '90s Reading Room',
    subtitle: 'Rich walnut wood, incandescent glow & antique paper tones',
    ambientColor: '#281a14',
    spotColor: '#ffd799',
    rimColor: '#e69a47',
    windowColor: '#4a3b32'
  },
  {
    id: 'stockholm' as const,
    name: '1987 Nobel Gala',
    subtitle: 'Swedish Academy gold, radiant spotlight & burgundy velvet',
    ambientColor: '#1e1624',
    spotColor: '#fff1c4',
    rimColor: '#f3c959',
    windowColor: '#2b2b45'
  },
  {
    id: 'venice' as const,
    name: 'Venetian Solitude',
    subtitle: 'Misty winter lagoon, fog on marble, and silent waters',
    ambientColor: '#142226',
    spotColor: '#e0f0f4',
    rimColor: '#7faeb8',
    windowColor: '#476f78'
  }
];
