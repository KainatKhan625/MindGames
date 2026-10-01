export function getExitRow(size) {
  return Math.floor((size - 1) / 2);
}

export function getCells(vehicle) {
  return Array.from({ length: vehicle.length }, (_, i) => ({
    r: vehicle.orientation === "V" ? vehicle.row + i : vehicle.row,
    c: vehicle.orientation === "H" ? vehicle.col + i : vehicle.col,
  }));
}

export function buildGrid(size, vehicles) {
  const grid = Array.from({ length: size }, () => Array(size).fill(null));
  vehicles.forEach((vehicle) => {
    getCells(vehicle).forEach(({ r, c }) => {
      grid[r][c] = vehicle.id;
    });
  });
  return grid;
}

export function getMoveRange(grid, size, vehicle) {
  const dr = vehicle.orientation === "V" ? 1 : 0;
  const dc = vehicle.orientation === "H" ? 1 : 0;

  let back = 0;
  let r = vehicle.row - dr;
  let c = vehicle.col - dc;
  while (r >= 0 && c >= 0 && grid[r][c] === null) {
    back += 1;
    r -= dr;
    c -= dc;
  }

  let forward = 0;
  r = vehicle.row + dr * vehicle.length;
  c = vehicle.col + dc * vehicle.length;
  while (r < size && c < size && grid[r][c] === null) {
    forward += 1;
    r += dr;
    c += dc;
  }

  return { back, forward };
}

export function moveVehicle(vehicles, id, delta) {
  return vehicles.map((vehicle) => {
    if (vehicle.id !== id) return vehicle;
    return vehicle.orientation === "H"
      ? { ...vehicle, col: vehicle.col + delta }
      : { ...vehicle, row: vehicle.row + delta };
  });
}

export function isSolved(size, vehicles) {
  const target = vehicles.find((vehicle) => vehicle.isTarget);
  return target.col + target.length === size;
}
