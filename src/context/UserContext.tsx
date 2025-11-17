// src/context/UserContext.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  registerRequest,
  updateUserRequest,
} from "../services/actions";

export interface UserData {
  id: number;
  name: string;
  email: string;
  token: string;
}

interface UserContextType {
  user: UserData | null;
  token: string | null;
  login: (email: string, password: string) => Promise<any>;
  register: (name: string, email: string, password: string) => Promise<any>;
  updateUser: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const storedUser = await AsyncStorage.getItem("@user");
      const storedToken = await AsyncStorage.getItem("@token");

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedToken) setToken(storedToken);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginRequest(email, password);

    await AsyncStorage.setItem("@user", JSON.stringify(data));
    await AsyncStorage.setItem("@token", data.token);

    setUser(data);
    setToken(data.token);

    return data;
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await registerRequest(name, email, password);

    await AsyncStorage.setItem("@user", JSON.stringify(data));
    await AsyncStorage.setItem("@token", data.token);

    setUser(data);
    setToken(data.token);

    return data;
  };

  const updateUser = async (payload: any) => {
    if (!token) return;

    const updated = await updateUserRequest(payload);

    const newData = { ...user, ...updated };
    await AsyncStorage.setItem("@user", JSON.stringify(newData));
    setUser(newData);
  };

  // LOGOUT
  const logout = async () => {
    await AsyncStorage.removeItem("@user");
    await AsyncStorage.removeItem("@token");

    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider
      value={{ user, token, login, register, updateUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("Usuário deve estar dentro do UserProvider");
  return context;
}