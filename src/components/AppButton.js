import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text } from "react-native";
import { useAppSettings } from "../context/SettingsContext";
import { layout, typography } from "../theme/colors";
import AnimatedPressable from "./AnimatedPressable";

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  icon,
  style,
}) {
  const { theme } = useAppSettings();
  const isPrimary = variant === "primary";
  const backgroundColor = isPrimary ? theme.buttonPrimary : theme.primarySoft;
  const color = isPrimary ? theme.onButtonPrimary : theme.text;

  return (
    <AnimatedPressable
      onPress={onPress}
      accessibilityLabel={title}
      style={[styles.button, { backgroundColor }, style]}
    >
      {icon && (
        <Ionicons name={icon} size={22} color={color} style={styles.icon} />
      )}
      <Text style={[typography.cardLabel, styles.label, { color }]}>
        {title}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: layout.radius,
  },
  icon: { marginRight: 8 },
  label: { fontSize: 18 },
});
