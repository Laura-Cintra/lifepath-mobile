import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiImage, MotiText, MotiView } from "moti";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

        <MotiView
          from={{ opacity: 0, translateY: -25 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600 }}
          style={styles.header}
        >
          <MotiImage
            source={require("../assets/lifepath-logo.png")}
            style={styles.logo}
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", delay: 200 }}
            resizeMode="contain"
          />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 350 }}
          style={styles.form}
        >
          <MotiText
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 450 }}
            style={[styles.title, { color: colors.text }]}
          >
            Login
          </MotiText>

          <MotiView
            from={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 550 }}
          >
            <FormInput
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              icon={<MaterialIcons name="email" size={22} color={colors.secondary} />}
            />
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 700 }}
          >
            <FormInput
              label="Senha"
              value={senha}
              onChangeText={setSenha}
              placeholder="Digite sua senha"
              secureTextEntry
              icon={<AntDesign name="lock" size={22} color={colors.secondary} />}
            />
          </MotiView>

          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", delay: 900 }}
          >
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </MotiView>

          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1100 }}
          >
            <TouchableOpacity onPress={() => router.push("/CadastrarScreen")}>
              <Text style={[styles.link, { color: colors.textSecondary }]}>
                Não possui conta?
                <Text style={{ color: colors.primary }}> Cadastre-se</Text>
              </Text>
            </TouchableOpacity>
          </MotiView>

        </MotiView>
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