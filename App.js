import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
    SettingsProvider,
    useAppSettings,
} from "./src/context/SettingsContext";
import RootNavigator from "./src/navigation/RootNavigator";

function AppContent() {
  const { theme, loaded } = useAppSettings();
  if (!loaded) return null;

  return (
    <NavigationContainer>
      <StatusBar style={theme.mode === "dark" ? "light" : "dark"} />
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
