import { StyleSheet, Text, View } from "react-native";
import GameScreenWrapper from "../../components/GameScreenWrapper";
import { useAppSettings } from "../../context/SettingsContext";
import { typography } from "../../theme/colors";

export default function SnakesLaddersScreen() {
  const { theme } = useAppSettings();
  return (
    <GameScreenWrapper title="Snakes & Ladders">
      <View style={styles.center}>
        <Text
          style={[
            typography.subtitle,
            { color: theme.textMuted, textAlign: "center" },
          ]}
        >
          Coming soon 🙂{"\n"}This game hasn't been built yet.
        </Text>
      </View>
    </GameScreenWrapper>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
