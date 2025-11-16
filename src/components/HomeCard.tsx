import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../src/theme/colors";

interface Props {
  icon: string;
  label: string;
  onPress?: () => void;
}

export default function HomeCard({ icon, label, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.iconWrapper}>
        <Ionicons name={icon as any} size={26} color={colors.primary} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "47%",
    backgroundColor: colors.white,
    paddingVertical: 22,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  iconWrapper: {
    marginBottom: 10,
    backgroundColor: colors.backgroundSecondary,
    padding: 12,
    borderRadius: 50,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});