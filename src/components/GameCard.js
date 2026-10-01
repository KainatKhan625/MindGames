import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { useAppSettings } from "../context/SettingsContext";
import { layout, typography } from "../theme/colors";
import AnimatedPressable from "./AnimatedPressable";

export default function GameCard({ title, icon, accentColor, onPress }) {
  const { theme } = useAppSettings();

  return (
    <AnimatedPressable onPress={onPress} accessibilityLabel={`Open ${title}`}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.cardBorder,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <LinearGradient
          colors={[accentColor, shade(accentColor)]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconWrap}
        >
          <Ionicons name={icon} size={30} color={theme.iconTint} />
        </LinearGradient>

        <Text
          style={[typography.cardLabel, styles.label, { color: theme.text }]}
          numberOfLines={2}
        >
          {title}
        </Text>
      </View>
    </AnimatedPressable>
  );
}

// Slightly darkens a hex color to build a 2-tone gradient from one accent color.
function shade(hex, amount = 18) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max((num >> 16) - amount, 0);
  const g = Math.max(((num >> 8) & 0x00ff) - amount, 0);
  const b = Math.max((num & 0x0000ff) - amount, 0);
  return `rgb(${r}, ${g}, ${b})`;
}

const styles = StyleSheet.create({
  card: {
    width: 156,
    height: 168,
    borderRadius: layout.radius + 4,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    padding: 14,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 4,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  label: { textAlign: "center" },
});
