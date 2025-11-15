import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiText, MotiView } from "moti";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ObjectiveItem from "../src/components/ObjectiveItem";
import { objetivos } from "../src/data/objetivos";
import colors from "../src/theme/colors";

export default function OnboardingObjetivos() {
  const router = useRouter();
  const [selectedObjectives, setSelectedObjectives] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleObjectiveSelection = (id: number) => {
    setSelectedObjectives((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((objectiveId) => objectiveId !== id)
        : [...prevSelected, id]
    );
  };

  const filteredObjectives = objetivos.filter((objective) =>
    objective.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <MotiText
        from={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 400 }}
        style={styles.title}
      >
        Escolha 3 ou mais objetivos
      </MotiText>

      <MotiView
        from={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 400 }}
        style={styles.searchContainer}
      >
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
        data={filteredObjectives}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <ObjectiveItem
            title={item.nome}
            icon={item.icone}
            isSelected={selectedObjectives.includes(item.id)}
            onSelect={() => toggleObjectiveSelection(item.id)}
            index={index}
          />
        )}
      />

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 300 }}
      >
        <TouchableOpacity
          disabled={selectedObjectives.length < 3}
          style={[
            styles.button,
            { opacity: selectedObjectives.length < 3 ? 0.4 : 1 },
          ]}
          onPress={() => router.replace("/home")}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </MotiView>
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