import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { darkTheme, lightTheme } from "../theme/colors";
import { getSettings, setSettings as persistSettings } from "../utils/storage";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [themeName, setThemeName] = useState("light");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await getSettings();
      setSoundEnabled(saved.soundEnabled);
      setThemeName(saved.theme);
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    persistSettings({ soundEnabled, theme: themeName });
  }, [soundEnabled, themeName, loaded]);

  const toggleSound = () => setSoundEnabled((p) => !p);
  const toggleTheme = () =>
    setThemeName((p) => (p === "light" ? "dark" : "light"));
  const theme = useMemo(
    () => (themeName === "dark" ? darkTheme : lightTheme),
    [themeName],
  );

  return (
    <SettingsContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        themeName,
        toggleTheme,
        theme,
        loaded,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useAppSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx)
    throw new Error("useAppSettings must be used inside SettingsProvider");
  return ctx;
}
