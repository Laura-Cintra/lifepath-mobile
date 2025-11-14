import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FormInput from "../src/components/FormInput";
import { useUser } from "../src/context/UserContext";
import colors from "../src/theme/colors";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useUser();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) return;
    await login(email);
    router.replace("/home");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.body}>
        <View style={styles.header}>
          <Image
            source={require("../assets/lifepath-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.form}>
          <Text style={[styles.title, { color: colors.text }]}>Login</Text>

          <FormInput
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            icon={
              <MaterialIcons name="email" size={22} color={colors.secondary} />
            }
          />

          <FormInput
            label="Senha"
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite sua senha"
            secureTextEntry
            icon={<AntDesign name="lock" size={22} color={colors.secondary} />}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/CadastrarScreen")}>
            <Text style={[styles.link, { color: colors.textSecondary }]}>
              Não possui conta?
              <Text style={{ color: colors.primary }}> Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  body: {
    marginVertical: 150,
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
    backgroundColor: colors.primary,
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