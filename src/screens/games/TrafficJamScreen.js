import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text } from "react-native";
import AppButton from "../../components/AppButton";
import GameScreenWrapper from "../../components/GameScreenWrapper";
import { useAppSettings } from "../../context/SettingsContext";
import { layout, typography } from "../../theme/colors";
import {
  completeLevel,
  getGameProgress,
  resetGameProgress,
} from "../../utils/storage";
import GameView from "./trafficJam/components/GameView";
import IntroView from "./trafficJam/components/IntroView";

const GAME_ID = "trafficJam";

export default function TrafficJamScreen() {
  const { theme } = useAppSettings();
  const [mode, setMode] = useState("intro");
  const [level, setLevel] = useState(1);
  const [session, setSession] = useState(0);
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [settingsVisible, setSettingsVisible] = useState(false);

  useEffect(() => {
    getGameProgress(GAME_ID).then((progress) =>
      setUnlockedLevel(progress.unlockedLevel),
    );
  }, []);

  const startLevel = (lvl) => {
    setLevel(lvl);
    setSession((s) => s + 1);
    setMode("playing");
  };

  const backToIntro = () => setMode("intro");

  const handleSolved = async (moves) => {
    const progress = await completeLevel(GAME_ID, level);
    setUnlockedLevel(progress.unlockedLevel);
    console.log(
      `Level ${level} solved in ${moves} moves. Next unlocked: ${progress.unlockedLevel}`,
    );
    setTimeout(backToIntro, 1200);
  };

  const handleReset = async () => {
    await resetGameProgress(GAME_ID);
    setUnlockedLevel(1);
    setSettingsVisible(false);
    setMode("intro");
  };

  return (
    <GameScreenWrapper
      title="Traffic Jam"
      onBack={mode === "playing" ? backToIntro : undefined}
      onSettings={() => setSettingsVisible(true)}
    >
      {mode === "intro" && (
        <IntroView unlockedLevel={unlockedLevel} onPlay={startLevel} />
      )}
      {mode === "playing" && (
        <GameView key={session} level={level} onSolved={handleSolved} />
      )}

      <Modal
        visible={settingsVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSettingsVisible(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setSettingsVisible(false)}
        >
          <Pressable style={[styles.sheet, { backgroundColor: theme.card }]}>
            <Text
              style={[
                typography.title,
                { color: theme.text, textAlign: "center" },
              ]}
            >
              Traffic Jam settings
            </Text>
            <Text
              style={[
                typography.body,
                styles.description,
                { color: theme.textMuted },
              ]}
            >
              Currently on Level {unlockedLevel}
            </Text>

            <AppButton
              title="Reset progress"
              icon="refresh"
              variant="soft"
              onPress={handleReset}
            />
            <AppButton
              title="Close"
              variant="soft"
              onPress={() => setSettingsVisible(false)}
              style={styles.closeButton}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </GameScreenWrapper>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    padding: layout.spacing(3),
  },
  sheet: {
    width: "100%",
    borderRadius: layout.radius,
    padding: layout.spacing(3),
  },
  description: {
    textAlign: "center",
    marginTop: layout.spacing(1),
    marginBottom: layout.spacing(3),
  },
  closeButton: { marginTop: layout.spacing(2) },
});
