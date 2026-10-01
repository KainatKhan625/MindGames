import BreathingScreen from "../screens/games/BreathingScreen";
import Game2048Screen from "../screens/games/Game2048Screen";
import MemoryMatchScreen from "../screens/games/MemoryMatchScreen";
import NumberTapScreen from "../screens/games/NumberTapScreen";
import QuickMathScreen from "../screens/games/QuickMathScreen";
import SnakesLaddersScreen from "../screens/games/SnakesLaddersScreen";
import SudokuScreen from "../screens/games/SudokuScreen";
import TicTacToeScreen from "../screens/games/TicTacToeScreen";
import TrafficJamScreen from "../screens/games/TrafficJamScreen";
import WordSearchScreen from "../screens/games/WordSearchScreen";

// icon = Ionicons name (https://icons.expo.fyi to browse all of them)
export const GAMES = [
  {
    id: "trafficJam",
    routeName: "TrafficJam",
    title: "Traffic Jam",
    icon: "car-sport-outline",
    accentColorKey: "primarySoft",
    phase: 1,
    component: TrafficJamScreen,
  },
  {
    id: "game2048",
    routeName: "Game2048",
    title: "2048",
    icon: "grid-outline",
    accentColorKey: "mint",
    phase: 1,
    component: Game2048Screen,
  },
  {
    id: "ticTacToe",
    routeName: "TicTacToe",
    title: "Tic Tac Toe",
    icon: "close-circle-outline",
    accentColorKey: "lavender",
    phase: 1,
    component: TicTacToeScreen,
  },
  {
    id: "memoryMatch",
    routeName: "MemoryMatch",
    title: "Memory Match",
    icon: "albums-outline",
    accentColorKey: "peach",
    phase: 1,
    component: MemoryMatchScreen,
  },
  {
    id: "wordSearch",
    routeName: "WordSearch",
    title: "Word Search",
    icon: "text-outline",
    accentColorKey: "butter",
    phase: 1,
    component: WordSearchScreen,
  },
  {
    id: "quickMath",
    routeName: "QuickMath",
    title: "Quick Math",
    icon: "flash-outline",
    accentColorKey: "primarySoft",
    phase: 2,
    component: QuickMathScreen,
  },
  {
    id: "numberTap",
    routeName: "NumberTap",
    title: "Number Tap",
    icon: "keypad-outline",
    accentColorKey: "mint",
    phase: 2,
    component: NumberTapScreen,
  },
  {
    id: "breathing",
    routeName: "Breathing",
    title: "Zen Breathing",
    icon: "leaf-outline",
    accentColorKey: "lavender",
    phase: 2,
    component: BreathingScreen,
  },
  {
    id: "sudoku",
    routeName: "Sudoku",
    title: "Mini Sudoku",
    icon: "apps-outline",
    accentColorKey: "peach",
    phase: 2,
    component: SudokuScreen,
  },
  {
    id: "snakesLadders",
    routeName: "SnakesLadders",
    title: "Snakes & Ladders",
    icon: "dice-outline",
    accentColorKey: "butter",
    phase: 2,
    component: SnakesLaddersScreen,
  },
];
