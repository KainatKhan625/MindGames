import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../../../components/AppButton";
import { useAppSettings } from "../../../../context/SettingsContext";
import { layout, typography } from "../../../../theme/colors";

function getDifficultyLabel(level) {
  if (level <= 3) return "Easy";
  if (level <= 10) return "Medium";
  return "Hard";
}

export default function IntroView({ unlockedLevel, onPlay }) {
  const { theme } = useAppSettings();
  const difficulty = getDifficultyLabel(unlockedLevel);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.primary, theme.primarySoft]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.banner}
      >
        <Ionicons name="car-sport-outline" size={56} color={theme.iconTint} />
      </LinearGradient>

      <Text style={[typography.title, styles.title, { color: theme.text }]}>
        Traffic Jam
      </Text>

      <Text
        style={[
          typography.body,
          styles.description,
          { color: theme.textMuted },
        ]}
      >
        Slide the cars out of the way to clear a path, then drive the red car
        out through the exit.
      </Text>

      <View
        style={[
          styles.badge,
          { backgroundColor: theme.card, borderColor: theme.cardBorder },
        ]}
      >
        <Text style={[typography.cardLabel, { color: theme.text }]}>
          {difficulty}
        </Text>
      </View>

      <AppButton
        title={`Play — Level ${unlockedLevel}`}
        icon="play"
        onPress={() => onPlay(unlockedLevel)}
        style={styles.playButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  banner: {
    width: 128,
    height: 128,
    borderRadius: 64,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: layout.spacing(3),
  },
  title: { textAlign: "center" },
  description: {
    textAlign: "center",
    marginTop: layout.spacing(1.5),
    marginBottom: layout.spacing(2),
    paddingHorizontal: layout.spacing(3),
  },
  badge: {
    paddingHorizontal: layout.spacing(2.5),
    paddingVertical: layout.spacing(1),
    borderRadius: layout.radius,
    borderWidth: 1,
    marginBottom: layout.spacing(4),
  },
  playButton: { minWidth: 240 },
});
