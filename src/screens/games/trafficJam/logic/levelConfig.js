export function getLevelConfig(level) {
  const size = 6;
  const blockers = Math.min(8 + Math.floor(level / 5), 10);
  const desiredPar = Math.min(6 + Math.floor(level * 0.7), 24);
  return { size, blockers, desiredPar };
}
