import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";

const API_BASE_URL =
  Platform.OS === "android" ? "http://10.0.2.2:8080" : "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Enviar o token automaticamente
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("@token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// === Autenticação ===

export const loginRequest = async (email: string, password: string) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export const registerRequest = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await api.post("/register", { name, email, password });
  return response.data;
};

//  === Objetivos ===

export const getGoals = async () => {
  const response = await api.get("/goals");
  return response.data;
};

export const postOnboarding = async (payload: {
  selectedGoals: number[];
  details: string;
  priority: "ALTA" | "MEDIA" | "BAIXA";
}) => {
  const response = await api.post("/onboarding", payload);
  return response.data;
};

// === Usuário ===

export const deleteAccount = async () => {
  const response = await api.delete("/user");
  return response.data;
};

export const updateUserRequest = async (payload: any) => {
  const response = await api.put("/user", payload);
  return response.data;
};

export default api;