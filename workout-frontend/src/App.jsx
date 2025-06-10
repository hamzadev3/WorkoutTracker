import { useEffect, useState } from "react";
import { getCommunity, getMine, deleteSession } from "./api";
import SessionCard     from "./components/SessionCard";
import NewSessionModal from "./components/NewSessionModal";
import SessionPage     from "./components/SessionPage";
import AuthModal       from "./components/AuthModal";
import { useAuth }     from "./AuthContext";

const demoSessions = [
  { _id:"demo1", name:"Demo Push Day", date:new Date(), exercises:[] },
  { _id:"demo2", name:"Demo Pull Day", date:new Date(), exercises:[] }
];

export default function App() {
  const [tab, setTab]       = useState("community"); // community | mine
  const [sessions, setSes ] = useState([]);
  const [showNew, setNew ]  = useState(false);
  const [open,    setOpen]  = useState(null);
  const [showAuth,setAuth ] = useState(false);

  const { user, logout } = useAuth();

  /* load whenever tab or auth changes */
  useEffect(()=>{
    const load = async () => {
      if (tab==="mine") {
        if (!user) return setSes([]);
        const data = await getMine(user.uid);
        setSes(data);
      } else {
        const data = await getCommunity(user?.uid);
        if (data.length) setSes(data);
        else if (!user)  setSes(demoSessions);
        else             setSes([]);
      }
    };
    load();
  },[tab,user]);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* top bar */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">🏋️ Workout Tracker</h1>

        <div className="space-x-3">
          <button onClick={()=> user ? setNew(true) : setAuth(true)}
                  className="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500">
            New Session
          </button>

          {user ? (
            <button onClick={logout} className="text-sm underline">Sign out</button>
          ) : (
            <button onClick={()=>setAuth(true)} className="text-sm underline">Sign in</button>
          )}
        </div>
      </header>

      {/* tab switcher */}
      <div className="mb-8 flex gap-2">
        <button
          className={`px-3 py-1 rounded-full text-sm ${tab==="community"
            ? "bg-indigo-600" : "bg-slate-600/40"}`}
          onClick={()=>setTab("community")}>
          Community
        </button>
        <button
          className={`px-3 py-1 rounded-full text-sm ${tab==="mine"
            ? "bg-indigo-600" : "bg-slate-600/40"}`}
          onClick={()=> user ? setTab("mine") : setAuth(true)}>
          My Workouts
        </button>
      </div>

      {/* list */}
      <div className="space-y-4">
        {sessions.map(s=>(
          <SessionCard key={s._id}
                       session={s}
                       onOpen={()=>setOpen(s)}
                       onDelete={async()=>{
                         await deleteSession(s._id);
                         setSes(sessions.filter(x=>x._id!==s._id));
                       }}/>
        ))}

        {sessions.length===0 && (
          <p className="text-center text-slate-400">
            {tab==="mine"
              ? "No personal workouts yet."
              : "No community workouts yet."}
          </p>
        )}
      </div>

      {showNew && (
        <NewSessionModal
          onCreate={s=>setSes([s,...sessions])}
          onClose={()=>setNew(false)}/>
      )}

      {open && (
        <SessionPage
          session={open}
          onUpdate={upd=>{
            setSes(sessions.map(s=>s._id===upd._id?upd:s));
            setOpen(upd);
          }}
          onClose={()=>setOpen(null)} />
      )}

      {showAuth && <AuthModal onClose={()=>setAuth(false)} />}
    </div>
  );
}
