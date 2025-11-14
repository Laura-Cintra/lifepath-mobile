import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: string | null;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("@user").then((stored) => {
      if (stored) setUser(stored);
    });
  }, []);

  const login = async (username: string) => {
    await AsyncStorage.setItem("@user", username);
    setUser(username);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("Usuário deve estar dentro do UserProvider");
  return context;
}