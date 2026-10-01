import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getJSON(key, fallback = null) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw != null ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn("storage getJSON failed for", key, e);
    return fallback;
  }
}

export async function setJSON(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("storage setJSON failed for", key, e);
  }
}

const progressKey = (gameId) => `mindgames:progress:${gameId}`;

export async function getGameProgress(gameId) {
  return getJSON(progressKey(gameId), { unlockedLevel: 1, bestScore: 0 });
}

export async function setGameProgress(gameId, progress) {
  await setJSON(progressKey(gameId), progress);
}

export async function completeLevel(gameId, level, score = 0) {
  const current = await getGameProgress(gameId);
  const unlockedLevel = Math.max(current.unlockedLevel, level + 1);
  const bestScore = Math.max(current.bestScore, score);
  const updated = { unlockedLevel, bestScore };
  await setGameProgress(gameId, updated);
  return updated;
}

export async function resetGameProgress(gameId) {
  await setGameProgress(gameId, { unlockedLevel: 1, bestScore: 0 });
}

const SETTINGS_KEY = "mindgames:settings";

export async function getSettings() {
  return getJSON(SETTINGS_KEY, { soundEnabled: true, theme: "light" });
}

export async function setSettings(settings) {
  await setJSON(SETTINGS_KEY, settings);
}
