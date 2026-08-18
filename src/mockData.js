/** Fictional demo data — not from production servers. */

export const PLACEHOLDER_SCREENSHOT = 'https://placehold.co/640x360/1a1b1e/888888?text=Screenshot';

export const MOCK_REPORTS = [
  {
    id: 1042,
    playername: 'Alex Morgan',
    status: 'checking',
    type: 1,
  },
  {
    id: 1041,
    playername: 'Jordan Lee',
    status: 'waiting',
    type: 0,
  },
  {
    id: 1039,
    playername: 'Sam Rivera',
    status: 'resolved',
    type: 2,
  },
  {
    id: 1037,
    playername: 'Casey Brooks',
    status: 'waiting',
    type: 1,
  },
  {
    id: 1035,
    playername: 'Taylor Quinn',
    status: 'checking',
    type: 1,
  },
];

export const MOCK_REPORT_DETAILS = {
  1042: {
    id: 1042,
    playername: 'Alex Morgan',
    title: 'Vehicle despawned unexpectedly',
    type: 'Bug',
    desc: 'After parking near the downtown garage, the vehicle disappeared within two minutes without any error message.',
    status: 'checking',
    img: PLACEHOLDER_SCREENSHOT,
  },
  1041: {
    id: 1041,
    playername: 'Jordan Lee',
    title: 'RDM at Legion Square',
    type: 'Player',
    desc: 'Another player opened fire without prior interaction. Multiple witnesses were present at the scene.',
    status: 'waiting',
    img: 'none',
  },
  1039: {
    id: 1039,
    playername: 'Sam Rivera',
    title: 'How do I claim daily rewards?',
    type: 'Question',
    desc: 'I cannot find the daily reward menu after the latest update. Where should I look?',
    status: 'resolved',
    img: PLACEHOLDER_SCREENSHOT,
  },
  1037: {
    id: 1037,
    playername: 'Casey Brooks',
    title: 'Inventory stacking issue',
    type: 'Bug',
    desc: 'Stackable items split into separate slots after relogging into the server.',
    status: 'waiting',
    img: 'none',
  },
  1035: {
    id: 1035,
    playername: 'Taylor Quinn',
    title: 'Voice chat drops in apartments',
    type: 'Bug',
    desc: 'Proximity voice completely stops working when entering owned apartment interiors.',
    status: 'checking',
    img: PLACEHOLDER_SCREENSHOT,
  },
};

export const MOCK_ADMINS = [
  { id: 1, name: 'Staff Member A', reports: 128 },
  { id: 2, name: 'Staff Member B', reports: 96 },
  { id: 3, name: 'Staff Member C', reports: 74 },
  { id: 4, name: 'Staff Member D', reports: 51 },
  { id: 5, name: 'Staff Member E', reports: 39 },
];

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
