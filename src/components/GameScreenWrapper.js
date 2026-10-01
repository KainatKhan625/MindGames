import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSettings } from "../context/SettingsContext";
import { layout, typography } from "../theme/colors";
import AnimatedPressable from "./AnimatedPressable";

export default function GameScreenWrapper({
  title,
  children,
  onBack,
  onSettings,
}) {
  const navigation = useNavigation();
  const { theme } = useAppSettings();
  const handleBack =
    onBack || (() => navigation.navigate("MainTabs", { screen: "Home" }));

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["top", "bottom"]}
    >
      <View style={styles.header}>
        <AnimatedPressable
          onPress={handleBack}
          accessibilityLabel="Back"
          style={[styles.iconButton, { backgroundColor: theme.primarySoft }]}
        >
          <Ionicons name="arrow-back" size={20} color={theme.text} />
        </AnimatedPressable>

        <Text
          style={[typography.title, styles.title, { color: theme.text }]}
          numberOfLines={1}
        >
          {title}
        </Text>

        {onSettings ? (
          <AnimatedPressable
            onPress={onSettings}
            accessibilityLabel="Game settings"
            style={[styles.iconButton, { backgroundColor: theme.primarySoft }]}
          >
            <Ionicons name="settings-outline" size={20} color={theme.text} />
          </AnimatedPressable>
        ) : (
          <View style={styles.iconButton} />
        )}
      </View>

      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: layout.spacing(2),
    paddingTop: layout.spacing(2),
    paddingBottom: layout.spacing(1),
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { flex: 1, textAlign: "center" },
  content: { flex: 1, paddingHorizontal: layout.spacing(2) },
});
