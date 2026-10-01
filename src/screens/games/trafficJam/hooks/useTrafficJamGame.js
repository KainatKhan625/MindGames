import { useCallback, useMemo, useReducer } from "react";
import { buildGrid, getMoveRange, isSolved, moveVehicle } from "../logic/board";
import { generateLevel } from "../logic/generateLevel";

function createInitialState(level) {
  const puzzle = generateLevel(level);
  return { puzzle, vehicles: puzzle.vehicles, history: [] };
}

function reducer(state, action) {
  switch (action.type) {
    case "move":
      return {
        ...state,
        vehicles: moveVehicle(state.vehicles, action.id, action.delta),
        history: [...state.history, state.vehicles],
      };
    case "undo":
      if (state.history.length === 0) return state;
      return {
        ...state,
        vehicles: state.history[state.history.length - 1],
        history: state.history.slice(0, -1),
      };
    case "restart":
      return { ...state, vehicles: state.puzzle.vehicles, history: [] };
    default:
      return state;
  }
}

export default function useTrafficJamGame(level) {
  const [state, dispatch] = useReducer(reducer, level, createInitialState);
  const { puzzle, vehicles, history } = state;

  const grid = useMemo(
    () => buildGrid(puzzle.size, vehicles),
    [puzzle.size, vehicles],
  );
  const solved = isSolved(puzzle.size, vehicles);

  const getRange = useCallback(
    (id) => {
      const vehicle = vehicles.find((item) => item.id === id);
      return getMoveRange(grid, puzzle.size, vehicle);
    },
    [grid, puzzle.size, vehicles],
  );

  const move = useCallback(
    (id, delta) => dispatch({ type: "move", id, delta }),
    [],
  );
  const undo = useCallback(() => dispatch({ type: "undo" }), []);
  const restart = useCallback(() => dispatch({ type: "restart" }), []);

  return {
    puzzle,
    vehicles,
    moves: history.length,
    solved,
    canUndo: history.length > 0,
    getRange,
    move,
    undo,
    restart,
  };
}
