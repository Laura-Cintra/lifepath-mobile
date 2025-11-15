import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../theme/colors";

interface ObjectiveCardProps {
  title: string;
  icon: string;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

export default function ObjectiveCard({
  title,
  icon,
  isSelected,
  onSelect,
  index,
}: ObjectiveCardProps) {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "timing", duration: 350, delay: index * 80 }}
    >
      <TouchableOpacity
        onPress={onSelect}
        activeOpacity={0.8}
        style={[
          styles.card,
          isSelected ? styles.cardSelected : styles.cardDefault,
        ]}
      >
        <Ionicons
          name={icon as any}
          size={32}
          color={isSelected ? colors.white : colors.primary}
        />

        <Text
          style={[
            styles.title,
            { color: isSelected ? colors.white : colors.primary },
          ]}
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </MotiView>
  );
}

const card_size = 110;

const styles = StyleSheet.create({
  card: {
    width: card_size,
    height: card_size,
    borderRadius: card_size / 2,
    margin: 4,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  cardDefault: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  cardSelected: {
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 7,
  },
});