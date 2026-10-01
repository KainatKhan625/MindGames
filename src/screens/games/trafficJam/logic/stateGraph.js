export function encode(positions, size) {
  let key = 0;
  for (let i = 0; i < positions.length; i += 1) key = key * size + positions[i];
  return key;
}

export function getNeighbors(size, vehicles, positions) {
  const grid = new Array(size * size).fill(-1);
  for (let i = 0; i < vehicles.length; i += 1) {
    const vehicle = vehicles[i];
    for (let k = 0; k < vehicle.length; k += 1) {
      const r = vehicle.orientation === "H" ? vehicle.row : positions[i] + k;
      const c = vehicle.orientation === "H" ? positions[i] + k : vehicle.col;
      grid[r * size + c] = i;
    }
  }

  const neighbors = [];
  for (let i = 0; i < vehicles.length; i += 1) {
    const vehicle = vehicles[i];
    const horizontal = vehicle.orientation === "H";
    const fixed = horizontal ? vehicle.row : vehicle.col;

    for (let direction = -1; direction <= 1; direction += 2) {
      let p =
        direction === -1 ? positions[i] - 1 : positions[i] + vehicle.length;
      let step = 1;
      while (p >= 0 && p < size) {
        const cell = horizontal ? fixed * size + p : p * size + fixed;
        if (grid[cell] !== -1) break;
        const candidate = positions.slice();
        candidate[i] = positions[i] + direction * step;
        neighbors.push(candidate);
        p += direction;
        step += 1;
      }
    }
  }
  return neighbors;
}

export function toPositions(vehicles) {
  return vehicles.map((vehicle) =>
    vehicle.orientation === "H" ? vehicle.col : vehicle.row,
  );
}

export function applyPositions(vehicles, positions) {
  return vehicles.map((vehicle, i) =>
    vehicle.orientation === "H"
      ? { ...vehicle, col: positions[i] }
      : { ...vehicle, row: positions[i] },
  );
}
