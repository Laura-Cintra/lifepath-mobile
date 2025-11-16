import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { MotiText, MotiView } from "moti";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../context/UserContext";
import colors from "../theme/colors";
import ConfirmarExclusaoModal from "./ConfirmarExclusaoModal";
import EditarPerfilModal from "./EditarPerfilModal";

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ProfileModal({ visible, onClose }: ProfileModalProps) {
  const { user, logout } = useUser();

  const goals = user?.goals ?? [];

  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const handleExcluirConta = async () => {
    await AsyncStorage.removeItem("@user");
    await logout();
    router.replace("/");
  };

  return (
    <>
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
          <MotiView
            from={{ opacity: 0, translateY: 80 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 80 }}
            transition={{ type: "timing", duration: 300 }}
            style={styles.modalContainer}
          >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={22} color={colors.text} />
            </TouchableOpacity>

            <Ionicons
              name="person-circle-outline"
              size={80}
              color={colors.secondary}
              style={{ alignSelf: "center", marginBottom: 12 }}
            />

            <MotiText
              style={styles.name}
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {user?.nome}
            </MotiText>

            <Text style={styles.email}>{user?.email}</Text>

            <Text style={styles.sectionTitle}>Objetivos Escolhidos</Text>

            <View style={styles.goalList}>
              {goals.map((goal: string, index: number) => (
                <View key={index} style={styles.goalObjective}>
                  <Feather
                    name="check-circle"
                    size={16}
                    color={colors.primary}
                  />
                  <Text style={styles.goalText}>{goal}</Text>
                </View>
              ))}
            </View>

            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setEditVisible(true);
                }}
              >
                <Feather name="edit" size={18} color={colors.primary} />
                <Text style={styles.editText}>Editar Perfil</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  setDeleteVisible(true);
                }}
              >
                <Feather name="trash-2" size={18} color={colors.modalRed} />
                <Text style={styles.deleteText}>Excluir Conta</Text>
              </TouchableOpacity>
            </View>
          </MotiView>
        </View>
      </Modal>

      <EditarPerfilModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
      />

      <ConfirmarExclusaoModal
        visible={deleteVisible}
        onClose={() => setDeleteVisible(false)}
        mensagem="Tem certeza que deseja excluir sua conta?"
        onConfirm={handleExcluirConta}
      />
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: colors.white,
    padding: 22,
    borderRadius: 16,
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
  },
  email: {
    textAlign: "center",
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  goalList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  goalObjective: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
  },
  goalText: {
    marginLeft: 6,
    color: colors.text,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    padding: 12,
    backgroundColor: "#E9F5FF",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
    marginRight: 6,
  },
  deleteButton: {
    padding: 12,
    backgroundColor: "#FFE9E9",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
    marginLeft: 6,
  },
  editText: {
    color: colors.primary,
    fontWeight: "bold",
  },
  deleteText: {
    color: colors.modalRed,
    fontWeight: "bold",
  },
});