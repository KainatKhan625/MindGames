import { encode, getNeighbors, toPositions } from "./stateGraph";

export function solve(size, vehicles, maxStates = 20000) {
  const targetIndex = vehicles.findIndex((vehicle) => vehicle.isTarget);
  const targetLength = vehicles[targetIndex].length;
  const isGoal = (positions) => positions[targetIndex] + targetLength === size;

  const start = toPositions(vehicles);
  if (isGoal(start)) return 0;

  const seen = new Set([encode(start, size)]);
  let frontier = [start];
  let depth = 0;

  while (frontier.length > 0) {
    depth += 1;
    const next = [];
    for (const positions of frontier) {
      for (const candidate of getNeighbors(size, vehicles, positions)) {
        const key = encode(candidate, size);
        if (seen.has(key)) continue;
        if (isGoal(candidate)) return depth;
        seen.add(key);
        if (seen.size > maxStates) return null;
        next.push(candidate);
      }
    }
    frontier = next;
  }
  return null;
}

export function distanceBuckets(size, vehicles, maxStates = 5000) {
  const targetIndex = vehicles.findIndex((vehicle) => vehicle.isTarget);
  const goalPosition = size - vehicles[targetIndex].length;

  const start = toPositions(vehicles);
  const states = new Map([[encode(start, size), start]]);
  const queue = [start];
  for (
    let head = 0;
    head < queue.length && states.size < maxStates;
    head += 1
  ) {
    for (const candidate of getNeighbors(size, vehicles, queue[head])) {
      const key = encode(candidate, size);
      if (!states.has(key)) {
        states.set(key, candidate);
        queue.push(candidate);
      }
    }
  }

  const distance = new Map();
  let frontier = [];
  states.forEach((positions, key) => {
    if (positions[targetIndex] === goalPosition) {
      distance.set(key, 0);
      frontier.push(positions);
    }
  });

  const buckets = [frontier];
  while (frontier.length > 0) {
    const next = [];
    for (const positions of frontier) {
      const current = distance.get(encode(positions, size));
      for (const candidate of getNeighbors(size, vehicles, positions)) {
        const key = encode(candidate, size);
        if (!states.has(key) || distance.has(key)) continue;
        distance.set(key, current + 1);
        next.push(candidate);
      }
    }
    if (next.length === 0) break;
    buckets.push(next);
    frontier = next;
  }

  return { buckets, complete: states.size < maxStates };
}
