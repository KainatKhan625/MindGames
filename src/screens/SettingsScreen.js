import { StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSettings } from "../context/SettingsContext";
import { layout, typography } from "../theme/colors";

export default function SettingsScreen() {
  const { soundEnabled, toggleSound, themeName, toggleTheme, theme } =
    useAppSettings();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["top"]}
    >
      <Text style={[typography.title, styles.heading, { color: theme.text }]}>
        Settings
      </Text>

      <View
        style={[
          styles.row,
          { backgroundColor: theme.card, borderColor: theme.cardBorder },
        ]}
      >
        <View style={styles.rowText}>
          <Text style={[typography.subtitle, { color: theme.text }]}>
            Sound
          </Text>
          <Text style={[typography.body, { color: theme.textMuted }]}>
            Play sound effects during games
          </Text>
        </View>
        <Switch
          value={soundEnabled}
          onValueChange={toggleSound}
          thumbColor={theme.surface}
          trackColor={{ false: theme.cardBorder, true: theme.primary }}
        />
      </View>

      <View
        style={[
          styles.row,
          { backgroundColor: theme.card, borderColor: theme.cardBorder },
        ]}
      >
        <View style={styles.rowText}>
          <Text style={[typography.subtitle, { color: theme.text }]}>
            Dark theme
          </Text>
          <Text style={[typography.body, { color: theme.textMuted }]}>
            {themeName === "dark" ? "Currently on" : "Currently off"}
          </Text>
        </View>
        <Switch
          value={themeName === "dark"}
          onValueChange={toggleTheme}
          thumbColor={theme.surface}
          trackColor={{ false: theme.cardBorder, true: theme.primary }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: layout.spacing(2) },
  heading: { marginTop: layout.spacing(2), marginBottom: layout.spacing(3) },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: layout.radius,
    borderWidth: 1,
    padding: layout.spacing(2),
    marginBottom: layout.spacing(2),
  },
  rowText: { flex: 1, marginRight: layout.spacing(2) },
});
