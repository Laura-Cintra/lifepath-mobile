import { ReactElement } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import colors from "../theme/colors";

interface FormInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  icon?: ReactElement;
}

export default function FormInput({
  label,
  value,
  onChangeText,
  icon,
  ...props
}: FormInputProps) {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>

      <View
        style={[styles.inputContainer, { borderColor: colors.textSecondary }]}
      >
        {icon && <View style={styles.icon}>{icon}</View>}

        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={colors.textSecondary}
          {...props}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
});