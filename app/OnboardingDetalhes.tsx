import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MotiText, MotiView } from "moti";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MessageModal from "../src/components/MessageModal";
import colors from "../src/theme/colors";

export default function OnboardingDetalhes() {
  const router = useRouter();
  const { goals } = useLocalSearchParams();
  const selectedGoals: string[] = goals ? JSON.parse(goals as string) : [];

  const [details, setDetails] = useState("");
  const [priority, setPriority] = useState<"ALTA" | "MEDIA" | "BAIXA" | "">("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    if (!details || !priority) {
      setModalMsg("Preencha todos os campos antes de continuar.");
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    setIsSuccess(true);
    setModalMsg("Objetivos registrados!");
    setModalVisible(true);

    setTimeout(() => {
      router.replace("/home");
    }, 900);
  };

  return (
    <ScrollView style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 500 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <MotiText style={styles.title}>Detalhe seus objetivos</MotiText>
        <Text style={styles.subtitle}>
          Isso nos ajuda a montar um plano personalizado para você.
        </Text>
      </MotiView>

      <View style={styles.objectiveContainer}>
        {selectedGoals.map((goal, index) => (
          <MotiView
            key={index}
            from={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 120 }}
            style={styles.objective}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={18}
              color={colors.primary}
            />
            <Text style={styles.objectiveText}>{goal}</Text>
          </MotiView>
        ))}
      </View>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 300 }}
      >
        <Text style={styles.label}>Descreva melhor seu objetivo</Text>

        <TextInput
          value={details}
          onChangeText={setDetails}
          placeholder="Ex: Quero migrar para front-end..."
          placeholderTextColor={colors.textSecondary}
          multiline
          style={styles.input}
        />
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 450 }}
      >
        <Text style={styles.label}>Prioridade</Text>

        <View style={styles.priorityRow}>
          {["ALTA", "MEDIA", "BAIXA"].map((p) => (
            <TouchableOpacity
              key={p}
              style={[
                styles.priorityButton,
                priority === p && styles.prioritySelected,
              ]}
              onPress={() => setPriority(p as any)}
            >
              <Text
                style={[
                  styles.priorityText,
                  priority === p && { color: colors.white },
                ]}
              >
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </MotiView>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Concluir</Text>
      </TouchableOpacity>

      <MessageModal
        visible={modalVisible}
        message={modalMsg}
        isSuccess={isSuccess}
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    paddingVertical: 30,
  },
  header: {
    marginBottom: 10,
  },
   backButton: {
    position: "absolute",
    left: -10,
    top: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginTop: 30,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  objectiveContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 15,
  },
  objective: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  objectiveText: {
    marginLeft: 6,
    color: colors.text,
    fontSize: 14,
  },
  label: {
    color: colors.text,
    fontWeight: "600",
    marginVertical: 8,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    height: 120,
    textAlignVertical: "top",
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  priorityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  priorityButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 10,
    alignItems: "center",
  },
  prioritySelected: {
    backgroundColor: colors.primary,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 28,
    marginBottom: 40,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});