import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useAppSettings } from "../context/SettingsContext";
import AnimatedPressable from "./AnimatedPressable";

export default function IconButton({ icon, onPress, label, disabled = false }) {
  const { theme } = useAppSettings();

  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={label}
      style={[
        styles.button,
        {
          backgroundColor: theme.card,
          borderColor: theme.cardBorder,
          shadowColor: theme.shadow,
        },
      ]}
    >
      <Ionicons name={icon} size={26} color={theme.iconTint} />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3,
  },
});
