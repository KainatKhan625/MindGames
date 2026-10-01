import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../../../../components/IconButton";
import { useAppSettings } from "../../../../context/SettingsContext";
import { layout, typography } from "../../../../theme/colors";
import useTrafficJamGame from "../hooks/useTrafficJamGame";
import Board from "./Board";

export default function GameView({ level, onSolved }) {
  const { theme } = useAppSettings();
  const {
    puzzle,
    vehicles,
    moves,
    solved,
    canUndo,
    getRange,
    move,
    undo,
    restart,
  } = useTrafficJamGame(level);

  useEffect(() => {
    if (solved) onSolved(moves);
  }, [solved]);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View
          style={[
            styles.pill,
            { backgroundColor: theme.card, borderColor: theme.cardBorder },
          ]}
        >
          <Text style={[typography.cardLabel, { color: theme.text }]}>
            Level {level}
          </Text>
        </View>
        <Text style={[typography.body, { color: theme.textMuted }]}>
          Moves: {moves}
        </Text>
      </View>

      <Board
        size={puzzle.size}
        exitRow={puzzle.exitRow}
        vehicles={vehicles}
        getRange={getRange}
        onMove={move}
        enabled={!solved}
      />

      <View style={styles.controls}>
        <IconButton
          icon="arrow-undo-outline"
          label="Undo"
          onPress={undo}
          disabled={!canUndo || solved}
        />
        <IconButton
          icon="refresh-outline"
          label="Restart"
          onPress={restart}
          disabled={moves === 0 || solved}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: layout.spacing(3),
    paddingHorizontal: layout.spacing(1),
  },
  pill: {
    paddingHorizontal: layout.spacing(2),
    paddingVertical: layout.spacing(1),
    borderRadius: layout.radius,
    borderWidth: 1,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: layout.spacing(4),
  },
});
