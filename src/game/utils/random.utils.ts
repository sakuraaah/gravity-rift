export function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function randomCenteredBias() {
  return Math.random() + Math.random() - 1;
}

export function randomInteger(maxExclusive: number) {
  return Math.floor(Math.random() * maxExclusive);
}
