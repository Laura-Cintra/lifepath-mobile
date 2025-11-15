import { MotiView } from "moti";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../theme/colors";

type MessageModalProps = {
  visible: boolean;
  message: string;
  isSuccess?: boolean;
  onClose: () => void;
};

export default function MessageModal({
  visible,
  message,
  isSuccess = false,
  onClose,
}: MessageModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <MotiView
          from={{ opacity: 0, scale: 0.8, translateY: 10 }}
          animate={{ opacity: 1, scale: 1, translateY: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "timing", duration: 50 }}
          style={[
            styles.modalContent,
            isSuccess ? styles.successModal : styles.errorModal,
          ]}
        >
          <Text style={styles.modalText}>{message}</Text>

          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </MotiView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  successModal: {
    backgroundColor: colors.modalGreen,
  },
  errorModal: {
    backgroundColor: colors.modalRed,
  },
  modalText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
  },
});