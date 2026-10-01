import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GameCard from "../components/GameCard";
import { useAppSettings } from "../context/SettingsContext";
import { GAMES } from "../navigation/gamesRegistry";
import { layout, typography } from "../theme/colors";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { theme } = useAppSettings();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["top"]}
    >
      <Text style={[typography.title, styles.heading, { color: theme.text }]}>
        MindGames
      </Text>
      <Text
        style={[typography.body, styles.subheading, { color: theme.textMuted }]}
      >
        Pick a game to relax with
      </Text>

      <View style={styles.listWrap}>
        <FlatList
          data={GAMES}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <GameCard
              title={item.title}
              icon={item.icon}
              accentColor={theme[item.accentColorKey]}
              onPress={() => navigation.navigate(item.routeName)}
            />
          )}
        />
        <LinearGradient
          pointerEvents="none"
          colors={[`${theme.background}00`, theme.background]}
          style={styles.fade}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heading: { textAlign: "center", marginTop: layout.spacing(2) },
  subheading: {
    textAlign: "center",
    marginTop: layout.spacing(0.5),
    marginBottom: layout.spacing(1),
  },
  listWrap: { flex: 1 },
  grid: {
    paddingHorizontal: layout.spacing(1),
    paddingBottom: layout.spacing(6),
  },
  row: { justifyContent: "center" },
  fade: { position: "absolute", left: 0, right: 0, bottom: 0, height: 48 },
});
