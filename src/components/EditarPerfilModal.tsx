import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useEffect, useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useUser } from "../context/UserContext";
import colors from "../theme/colors";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function EditarPerfilModal({ visible, onClose }: Props) {
  const { user, updateUser } = useUser();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (user && visible) {
      setNome(user.nome);
      setEmail(user.email);
      setSenha("");
      setConfirmSenha("");
      setError("");
    }
  }, [visible]);

  const handleSalvar = async () => {
    if (!nome.trim() || !email.trim()) {
      setError("Nome e email não podem estar vazios.");
      return;
    }

    if (senha.trim() || confirmSenha.trim()) {
      if (senha.length < 6) {
        setError("A senha deve ter no mínimo 6 caracteres.");
        return;
      }

      if (senha !== confirmSenha) {
        setError("As senhas não coincidem.");
        return;
      }
    }

    await updateUser({
      nome,
      email,
      ...(senha ? { senha } : {}),
    });

    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 300 }}
          style={styles.modalContainer}
        >
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialCommunityIcons
              name="close"
              size={22}
              color={colors.text}
            />
          </TouchableOpacity>

          <Text style={styles.title}>Editar Perfil</Text>

          {error.length > 0 && <Text style={styles.error}>{error}</Text>}

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu nome"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu e-mail"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Nova Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua nova senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            secureTextEntry
            value={confirmSenha}
            onChangeText={setConfirmSenha}
          />

          <TouchableOpacity style={styles.button} onPress={handleSalvar}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </MotiView>
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
    width: "90%",
    backgroundColor: colors.white,
    padding: 22,
    borderRadius: 12,
  },
  closeButton: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 10,
    padding: 12,
    color: colors.text,
  },
  error: {
    backgroundColor: "#ffe5e5",
    color: colors.modalRed,
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "600",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 12,
    marginTop: 24,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});