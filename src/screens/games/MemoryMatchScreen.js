import { StyleSheet, Text, View } from "react-native";
import GameScreenWrapper from "../../components/GameScreenWrapper";
import { useAppSettings } from "../../context/SettingsContext";
import { typography } from "../../theme/colors";

export default function MemoryMatchScreen() {
  const { theme } = useAppSettings();
  return (
    <GameScreenWrapper title="Memory Match">
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
