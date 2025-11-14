import { StyleSheet, Text, View } from "react-native";
import colors from "../../src/theme/colors";

export default function CursosRecomendados() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cursos Recomendados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 22,
    color: colors.text,
  },
});