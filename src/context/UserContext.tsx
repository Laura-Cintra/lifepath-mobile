import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface UserData {
  nome: string;
  email: string;
  goals?: string[];
  details?: string;
  senha?: string;
  priority?: "ALTA" | "MEDIA" | "BAIXA";
}

interface UserContextType {
  user: UserData | null;
  login: (data: UserData) => Promise<void>;
  updateUser: (data: Partial<UserData>) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("@user").then((stored) => {
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      }
    });
  }, []);

  const login = async (data: UserData) => {
    await AsyncStorage.setItem("@user", JSON.stringify(data));
    setUser(data);
  };

  const updateUser = async (data: Partial<UserData>) => {
    if (!user) return;

    const updatedUser: UserData = { ...user, ...data };

    await AsyncStorage.setItem("@user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("Usuário deve estar dentro do UserProvider");
  return context;
}