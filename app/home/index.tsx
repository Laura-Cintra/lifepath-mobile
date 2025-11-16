import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { MotiText, MotiView } from "moti";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HomeCard from "../../src/components/HomeCard";
import { useUser } from "../../src/context/UserContext";
import colors from "../../src/theme/colors";

export default function HomeScreen() {
  const { user } = useUser();
  const router = useRouter();
  const name = user?.nome || "Usuário";

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <MotiView
        from={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 500 }}
        style={styles.header}
      >
        <MotiText style={styles.title}>{`Olá, ${name}`}</MotiText>
        <Text style={styles.subtitle}>
          Como deseja avançar profissionalmente hoje?
        </Text>
      </MotiView>

      <MotiView
        style={styles.mainCard}
        from={{ opacity: 0, translateY: 15 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 200, duration: 500 }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.cardTitle}>Sua Jornada Profissional</Text>
          <Ionicons name="rocket-outline" size={24} color={colors.primary} />
        </View>

        <Text style={styles.progressText}>3 de 5 objetivos concluídos</Text>

        <View style={styles.progressBarBackground}>
          <MotiView
            from={{ width: "0%" }}
            animate={{ width: "60%" }}
            transition={{ duration: 900 }}
            style={styles.progressBarFill}
          />
        </View>
      </MotiView>

      <View style={styles.grid}>
        <HomeCard
          icon="sparkles-outline"
          label="Recomendações"
          onPress={() => router.push("/home/Dashboard")}
        />
        <HomeCard
          icon="checkmark-circle-outline"
          label="Meus Objetivos"
          onPress={() => router.push("/home/Objetivos")}
        />
        <HomeCard
          icon="school-outline"
          label="Desenvolver Habilidades"
          onPress={() => router.push("/home/Roteiro")}
        />
        <HomeCard
          icon="book-outline"
          label="Cursos Recomendados"
          onPress={() => router.push("/home/CursosRecomendados")}
        />
      </View>

      <MotiView
        style={styles.insight}
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 350 }}
      >
        <Ionicons name="bulb-outline" size={22} color={colors.primary} />
        <Text style={styles.insightText}>
          O mercado valoriza projetos autorais. Que tal atualizar seu portfólio
          hoje?
        </Text>
      </MotiView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/home/Roteiro")}
      >
        <Text style={styles.buttonText}>Continuar minha jornada →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.text,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 4,
    fontSize: 14,
  },
  mainCard: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 16,
    shadowColor: colors.black,
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    marginTop: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  progressText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 6,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    marginTop: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  insight: {
    flexDirection: "row",
    backgroundColor: colors.backgroundSecondary,
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 14,
    marginTop: 25,
    alignItems: "center",
    gap: 10,
  },
  insightText: {
    color: colors.text,
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  button: {
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});