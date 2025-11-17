import MessageModal from "@/src/components/MessageModal";
import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiImage, MotiText, MotiView } from "moti";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FormInput from "../src/components/FormInput";
import { useUser } from "../src/context/UserContext";
import colors from "../src/theme/colors";

export default function CadastrarScreen() {
  const router = useRouter();
  const { register } = useUser();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      setModalMessage("Preencha todos os campos.");
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    try {
      await register(nome, email, senha);

      setIsSuccess(true);
      setModalMessage("Conta criada com sucesso!");
      setModalVisible(true);

      setTimeout(() => router.replace("/Onboarding"), 700);
    } catch (error: any) {
      setIsSuccess(false);
      setModalMessage(
        error.response?.data?.message || "Erro ao cadastrar."
      );
      setModalVisible(true);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.body}>
        <MotiView style={styles.header}>
          <MotiImage
            source={require("../assets/lifepath-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </MotiView>

        <MotiView style={styles.form}>
          <MotiText style={[styles.title, { color: colors.text }]}>
            Cadastro
          </MotiText>

          <FormInput
            label="Nome"
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
            icon={<FontAwesome5 name="user" size={21} color={colors.secondary} />}
          />

          <FormInput
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            icon={
              <MaterialIcons name="email" size={21} color={colors.secondary} />
            }
          />

          <FormInput
            label="Senha"
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite sua senha"
            secureTextEntry
            icon={<AntDesign name="lock" size={21} color={colors.secondary} />}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/")}>
            <Text style={[styles.link, { color: colors.textSecondary }]}>
              Já possui conta?
              <Text style={{ color: colors.primary }}> Fazer login</Text>
            </Text>
          </TouchableOpacity>
        </MotiView>
      </View>

      <MessageModal
        visible={modalVisible}
        message={modalMessage}
        isSuccess={isSuccess}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  body: {
    marginVertical: 120,
  },
  header: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 125,
  },
  form: {
    padding: 20,
    gap: 6,
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 14,
  },
});
