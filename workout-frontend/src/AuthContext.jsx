import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword,
         createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

const AuthCtx = createContext();

export function useAuth()   { return useContext(AuthCtx); }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() =>
    onAuthStateChanged(auth, u => { setUser(u); setLoading(false); }),
  []);

  const login  = (email, pass) => signInWithEmailAndPassword(auth, email, pass);
  const signup = (email, pass) => createUserWithEmailAndPassword(auth, email, pass);
  const logout = () => signOut(auth);

  return (
    <AuthCtx.Provider value={{ user, login, signup, logout }}>
      {loading ? null : children}
    </AuthCtx.Provider>
  );
}
