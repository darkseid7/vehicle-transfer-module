"use client";

import React, { createContext, useContext } from "react";
import type { User } from "@supabase/supabase-js";

interface UserContextType {
  user: User | null;
  role: string | null;
}

const UserContext = createContext<UserContextType>({
  user: null,
  role: null,
});

interface UserProviderProps {
  children: React.ReactNode;
  user: User;
  role: string;
}

export function UserProvider({ children, user, role }: UserProviderProps) {
  return (
    <UserContext.Provider value={{ user, role }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
