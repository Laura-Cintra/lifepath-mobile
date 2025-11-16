import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiText, MotiView } from "moti";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../theme/colors";

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  mensagem: string;
}

export default function ConfirmarExclusaoModal({
  visible,
  onClose,
  onConfirm,
  mensagem,
}: Props) {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        {visible && (
          <MotiView
            from={{ opacity: 0, translateY: 40 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 40 }}
            transition={{ type: "timing", duration: 350 }}
            style={[styles.modalContainer, { backgroundColor: colors.white }]}
          >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <MaterialCommunityIcons
                name="close"
                size={22}
                color={colors.text}
              />
            </TouchableOpacity>

            <MotiText
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 100 }}
              style={[styles.title, { color: colors.text }]}
            >
              Confirmar ação
            </MotiText>

            <Text style={[styles.message, { color: colors.text }]}>
              {mensagem}
            </Text>

            <Text style={[styles.messageWarn, { color: colors.modalRed }]}>
              Essa ação não poderá ser desfeita.
            </Text>

            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.modalRed }]}
                onPress={onConfirm}
              >
                <Text style={[styles.buttonText, { color: colors.white }]}>
                  Confirmar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.gray }]}
                onPress={onClose}
              >
                <Text style={[styles.buttonText, { color: colors.white }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </MotiView>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    borderRadius: 12,
    padding: 26,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 8,
  },
  messageWarn: {
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    right: 12,
    top: 12,
    padding: 4,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
});