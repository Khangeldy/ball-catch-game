export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function shuffle(arr) {
  return arr.sort(() => Math.random() > 0.5 ? 1 : -1);
}
