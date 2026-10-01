import { getCells, getExitRow } from "./board";
import { getLevelConfig } from "./levelConfig";
import { distanceBuckets, solve } from "./solver";
import { applyPositions } from "./stateGraph";

const MAX_ATTEMPTS = 5;

const randomInt = (max) => Math.floor(Math.random() * max);

function fits(vehicles, candidate) {
  const occupied = new Set(
    vehicles.flatMap(getCells).map(({ r, c }) => `${r},${c}`),
  );
  return getCells(candidate).every(({ r, c }) => !occupied.has(`${r},${c}`));
}

function createSolvedBoard(size, blockerCount) {
  const exitRow = getExitRow(size);
  const vehicles = [
    {
      id: "target",
      row: exitRow,
      col: size - 2,
      length: 2,
      orientation: "H",
      isTarget: true,
    },
  ];

  let attempts = 0;
  while (vehicles.length - 1 < blockerCount && attempts < 300) {
    attempts += 1;
    const orientation = Math.random() < 0.6 ? "V" : "H";
    const length = size > 4 && Math.random() < 0.3 ? 3 : 2;
    const row = randomInt(orientation === "V" ? size - length + 1 : size);
    const col = randomInt(orientation === "H" ? size - length + 1 : size);

    if (orientation === "H" && row === exitRow) continue;

    const candidate = {
      id: `v${vehicles.length}`,
      row,
      col,
      length,
      orientation,
      isTarget: false,
    };
    if (fits(vehicles, candidate)) vehicles.push(candidate);
  }
  return vehicles;
}

export function generateLevel(level) {
  const { size, blockers, desiredPar } = getLevelConfig(level);

  let best = null;
  for (let attempt = 0; attempt < MAX_ATTEMPTS || !best; attempt += 1) {
    const base = createSolvedBoard(size, blockers);
    const { buckets, complete } = distanceBuckets(size, base, 15000);
    const depth = Math.min(desiredPar, buckets.length - 1);
    if (depth < 1) continue;

    const pool = buckets[depth];
    const vehicles = applyPositions(base, pool[randomInt(pool.length)]);
    const par = complete ? depth : (solve(size, vehicles, 45000) ?? depth);
    if (par === 0) continue;

    if (!best || par > best.par) best = { vehicles, par };
    if (par >= desiredPar) break;
  }

  return {
    level,
    size,
    exitRow: getExitRow(size),
    vehicles: best.vehicles,
    par: best.par,
  };
}
