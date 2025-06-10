import { auth } from "./firebase";

const BASE = "http://localhost:5000/api";

/* -------- SESSIONS --------------------------------------- */
export async function getSessions(uid) {
  const url = uid ? `${BASE}/sessions?userId=${uid}` : `${BASE}/sessions`;
  const r   = await fetch(url);
  return r.json();
}

export async function createSession({ name, date, isPublic }) {
  if (!auth.currentUser) throw new Error("Not signed in");

  const body = {
    name,
    date,
    isPublic,
    userId:   auth.currentUser.uid,
    userName: auth.currentUser.email.split("@")[0]
  };

  const r = await fetch(`${BASE}/sessions`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body)
  });
  return r.json();
}

export async function deleteSession(id) {
  if (!auth.currentUser) throw new Error("Not signed in");
  await fetch(`${BASE}/sessions/${id}`, { method: "DELETE" });
}

/* -------- EXERCISES -------------------------------------- */
export async function addExercise(sessionId, data) {
  if (!auth.currentUser) throw new Error("Not signed in");

  const r = await fetch(`${BASE}/sessions/${sessionId}/exercise`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(data)
  });
  return r.json();
}

export async function deleteExercise(sessionId, idx) {
  if (!auth.currentUser) throw new Error("Not signed in");

  const r = await fetch(`${BASE}/sessions/${sessionId}/exercise/${idx}`, {
    method: "DELETE"
  });
  return r.json();
}
