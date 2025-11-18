import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiText, MotiView } from "moti";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ObjectiveItem from "../src/components/ObjectiveItem";
import { objetivosIcones } from "../src/data/objetivos";
import { getGoals } from "../src/services/actions";
import colors from "../src/theme/colors";

export default function OnboardingObjetivos() {
  const router = useRouter();

  const [goals, setGoals] = useState<
    { id: number; title: string; icon: string }[]
  >([]);

  const [selectedObjectives, setSelectedObjectives] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const data = await getGoals();

      const objetivosMapeados = data.map((goal: any) => ({
        ...goal,
        icon: objetivosIcones[goal.id] ?? "ellipse-outline",
      }));

      setGoals(objetivosMapeados);
    } catch (error) {
      console.log("Erro ao buscar objetivos:", error);
    }
  };

  const toggleObjectiveSelection = (id: number) => {
    setSelectedObjectives((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((objectiveId) => objectiveId !== id)
        : [...prevSelected, id]
    );
  };

  const filtered = goals.filter((objective) =>
    objective.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <MotiText style={styles.title}>Escolha 3 ou mais objetivos</MotiText>

      <MotiView style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={colors.textSecondary}
        />
        <TextInput
          placeholder="Buscar objetivos"
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </MotiView>

      <FlatList
        data={filtered}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <ObjectiveItem
            title={item.title}
            icon={item.icon}
            isSelected={selectedObjectives.includes(item.id)}
            onSelect={() => toggleObjectiveSelection(item.id)}
            index={index}
          />
        )}
      />

      <TouchableOpacity
        disabled={selectedObjectives.length < 3}
        style={[
          styles.button,
          { opacity: selectedObjectives.length < 3 ? 0.4 : 1 },
        ]}
        onPress={() =>
          router.push({
            pathname: "/OnboardingDetalhes",
            params: { goals: JSON.stringify(selectedObjectives) },
          })
        }
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
    color: colors.text,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.text,
  },
  listContent: {
    paddingBottom: 120,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 25,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});