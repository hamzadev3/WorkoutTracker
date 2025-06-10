// ------------- src/api.js ----------------
import { auth } from "./firebase";

const BASE = "http://localhost:5000/api";

// -------- SESSIONS -----------------------
export async function getSessions() {
  const r = await fetch(`${BASE}/sessions`);
  return r.json();
}

export async function createSession(data) {
  if (!auth.currentUser) throw new Error("Not signed in");

  const body = { ...data, userId: auth.currentUser.uid };

  const r = await fetch(`${BASE}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return r.json();
}

export async function deleteSession(id) {
  if (!auth.currentUser) throw new Error("Not signed in");

  await fetch(`${BASE}/sessions/${id}`, { method: "DELETE" });
}

// -------- EXERCISES (inside a session) ---
export async function addExercise(sessionId, data) {
  if (!auth.currentUser) throw new Error("Not signed in");

  const r = await fetch(`${BASE}/sessions/${sessionId}/exercise`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return r.json();
}

export async function deleteExercise(sessionId, index) {
  if (!auth.currentUser) throw new Error("Not signed in");

  const r = await fetch(`${BASE}/sessions/${sessionId}/exercise/${index}`, {
    method: "DELETE"
  });
  return r.json();
}
