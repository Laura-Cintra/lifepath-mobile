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
import colors from "../../src/theme/colors";

export default function Roteiro() {
  const router = useRouter();
  const progress = 0.4; // 40% do roteiro concluído

  const etapas = [
    {
      icon: "school-outline",
      title: "Aprender Lógica e Fundamentos",
      desc: "Base essencial para qualquer área de tecnologia.",
      completed: true,
    },
    {
      icon: "code-slash-outline",
      title: "Dominar Front-End",
      desc: "Aprender React, componentes e boas práticas.",
      completed: false,
    },
    {
      icon: "briefcase-outline",
      title: "Criar Portfólio Profissional",
      desc: "Projetos reais para destacar suas habilidades.",
      completed: false,
    },
    {
      icon: "people-outline",
      title: "Preparar Networking",
      desc: "Criar presença profissional online.",
      completed: false,
    },
  ];

  return (
    <ScrollView
      style={[styles.container]}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <MotiView
        style={styles.header}
        from={{ opacity: 0, translateY: -15 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 500 }}
      >
        <MotiText style={styles.title}>Seu Roteiro Profissional</MotiText>
        <Text style={styles.subtitle}>
          Um caminho personalizado para alcançar seus objetivos.
        </Text>
      </MotiView>

      {/* PROGRESSO */}
      <View style={styles.progressWrapper}>
        <Text style={styles.progressText}>Progresso geral</Text>
        <View style={styles.progressBarBackground}>
          <MotiView
            style={styles.progressFill}
            from={{ width: "0%" }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 800 }}
          />
        </View>
      </View>

      <View style={styles.timeline}>
        {etapas.map((etapa, index) => (
          <MotiView
            key={index}
            from={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 120, duration: 400 }}
            style={styles.timelineRow}
          >
            <View style={styles.timelineLine} />

            <View
              style={[
                styles.timelineDot,
                etapa.completed && { backgroundColor: colors.primary },
              ]}
            />

            <View style={styles.stepCard}>
              <Ionicons
                name={etapa.icon as any}
                size={24}
                color={etapa.completed ? colors.primary : colors.text}
                style={{ marginBottom: 4 }}
              />
              <Text style={styles.stepTitle}>{etapa.title}</Text>
              <Text style={styles.stepDesc}>{etapa.desc}</Text>

              {etapa.completed && (
                <View style={styles.badgeCompleted}>
                  <Ionicons
                    name="checkmark-outline"
                    size={14}
                    color={colors.white}
                  />
                  <Text style={styles.badgeText}>Concluído</Text>
                </View>
              )}
            </View>
          </MotiView>
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/home/Objetivos")}
      >
        <Text style={styles.buttonText}>Revisar meus objetivos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  progressWrapper: {
    marginBottom: 25,
  },
  progressText: {
    color: colors.text,
    fontWeight: "600",
    marginBottom: 6,
  },
  progressBarBackground: {
    width: "100%",
    height: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  timeline: {
    marginTop: 10,
    gap: 30,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    position: "relative",
  },
  timelineLine: {
    position: "absolute",
    width: 2,
    backgroundColor: colors.gray,
    height: "128%",
    left: 10,
  },
  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.background,
    zIndex: 1,
    marginRight: 20,
  },
  stepCard: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 14,
    width: "85%",
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  stepTitle: {
    fontWeight: "700",
    fontSize: 15,
    color: colors.text,
  },
  stepDesc: {
    marginTop: 4,
    color: colors.textSecondary,
    fontSize: 13,
  },
  badgeCompleted: {
    marginTop: 8,
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  button: {
    marginTop: 30,
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});