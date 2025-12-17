"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

type User = {
  name?: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  loggedIn: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  fetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const fetchUser = async () => {
    setLoading(true);

    try {
      // 1️⃣ Profile check
      const res = await fetch("/api/profile", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setLoggedIn(true);
        return;
      }

      // 2️⃣ Access token expired → refresh
      if (res.status === 401) {
        const refreshRes = await fetch("/api/refresh", {
          method: "POST", // ✅ FIX
          credentials: "include",
        });

        if (refreshRes.ok) {
          // 3️⃣ Retry profile
          const retryRes = await fetch("/api/profile", {
            credentials: "include",
          });

          if (retryRes.ok) {
            const retryData = await retryRes.json();
            setUser(retryData.user);
            setLoggedIn(true);
            return;
          }
        }
      }

      // 4️⃣ Not logged in
      setUser(null);
      setLoggedIn(false);
    } catch {
      setUser(null);
      setLoggedIn(false);
    } finally {
      setLoading(false); // ✅ ALWAYS executed
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, loggedIn, setUser, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
