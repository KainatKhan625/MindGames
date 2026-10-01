import { StyleSheet, useWindowDimensions, View } from "react-native";
import { useAppSettings } from "../../../../context/SettingsContext";
import { layout } from "../../../../theme/colors";
import Vehicle from "./Vehicle";

const VEHICLE_COLORS = ["primary", "mint", "lavender", "peach", "butter"];

export default function Board({
  size,
  exitRow,
  vehicles,
  getRange,
  onMove,
  enabled,
}) {
  const { theme } = useAppSettings();
  const { width } = useWindowDimensions();
  const boardSize = Math.min(width - layout.spacing(4), 420);
  const cell = boardSize / size;

  return (
    <View
      style={[
        styles.board,
        { width: boardSize, height: boardSize, backgroundColor: theme.asphalt },
      ]}
    >
      {Array.from({ length: size - 1 }, (_, i) => (
        <View
          key={`v-${i}`}
          style={[
            styles.laneLineV,
            { left: (i + 1) * cell - 1, backgroundColor: theme.laneLine },
          ]}
        />
      ))}
      {Array.from({ length: size - 1 }, (_, i) => (
        <View
          key={`h-${i}`}
          style={[
            styles.laneLineH,
            { top: (i + 1) * cell - 1, backgroundColor: theme.laneLine },
          ]}
        />
      ))}

      <View
        style={[
          styles.exit,
          {
            top: exitRow * cell + cell / 2 - 14,
            backgroundColor: theme.target,
          },
        ]}
      />

      {vehicles.map((vehicle, index) => (
        <Vehicle
          key={vehicle.id}
          vehicle={vehicle}
          color={
            vehicle.isTarget
              ? theme.target
              : theme[VEHICLE_COLORS[index % VEHICLE_COLORS.length]]
          }
          cell={cell}
          getRange={getRange}
          onMove={onMove}
          enabled={enabled}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    borderRadius: layout.radius,
    alignSelf: "center",
    overflow: "hidden",
  },
  laneLineV: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 2,
    opacity: 0.5,
  },
  laneLineH: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    opacity: 0.5,
  },
  exit: {
    position: "absolute",
    right: -5,
    width: 6,
    height: 28,
    borderRadius: 3,
  },
});
