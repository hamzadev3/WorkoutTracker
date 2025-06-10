import { useState } from "react";
import { useAuth }  from "../AuthContext";

export default function AuthModal({ onClose }) {
  const { login, signup } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail]   = useState("");
  const [pass,  setPass]    = useState("");
  const [err,   setErr]     = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      isSignup ? await signup(email, pass) : await login(email, pass);
      onClose();
    } catch (e) { setErr(e.message); }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form onSubmit={submit} className="bg-slate-800 p-8 rounded-xl w-full max-w-xs space-y-4 shadow-2xl">
        <h2 className="text-xl font-bold text-center">
          {isSignup ? "Create Account" : "Sign In"}
        </h2>

        <input value={email} onChange={e=>setEmail(e.target.value)}
               placeholder="Email" type="email"
               className="w-full p-2 rounded bg-slate-700" required />

        <input value={pass}  onChange={e=>setPass(e.target.value)}
               placeholder="Password" type="password"
               className="w-full p-2 rounded bg-slate-700" required />

        {err && <p className="text-rose-400 text-xs">{err}</p>}

        <button className="w-full bg-indigo-600 rounded p-2 font-semibold">
          {isSignup ? "Sign Up" : "Sign In"}
        </button>

        <p className="text-center text-xs">
          {isSignup ? "Already have an account?" : "Need an account?"}{" "}
          <button type="button" className="underline"
                  onClick={()=>setIsSignup(!isSignup)}>
            {isSignup ? "Sign in" : "Sign up"}
          </button>
        </p>

        <button type="button" onClick={onClose}
                className="absolute top-2 right-3 text-sm">✕</button>
      </form>
    </div>
  );
}
