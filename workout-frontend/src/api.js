import { auth } from "./firebase";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* ------------ sessions ---------------- */
export async function getCommunity(uid) {
  const url = uid
    ? `${BASE}/sessions?scope=community&userId=${uid}`
    : `${BASE}/sessions?scope=community`;
  const r = await fetch(url);
  return r.json();
}

export async function getMine(uid) {
  const r = await fetch(`${BASE}/sessions?scope=mine&userId=${uid}`);
  return r.json();
}

export async function createSession({ name, date, isPublic, displayName }) {
  if (!auth.currentUser) throw new Error("Not signed in");

  const body = {
    name,
    date,
    isPublic,
    userId:   auth.currentUser.uid,
    userName: (displayName || auth.currentUser.email.split("@")[0] || "Anonymous").trim()
  };

  const r = await fetch(`${BASE}/sessions`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body)
  });
  if (!r.ok) throw new Error("Failed to create session");
  return r.json();
}

export async function deleteSession(id) {
  await fetch(`${BASE}/sessions/${id}`, { method: "DELETE" });
}

/* ------------ exercises --------------- */
export async function addExercise(sessionId, data) {
  const r = await fetch(`${BASE}/sessions/${sessionId}/exercise`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body:   JSON.stringify(data)
  });
  if (!r.ok) throw new Error("Add exercise failed");
  return r.json();
}

export async function deleteExercise(sessionId, idx) {
  const r = await fetch(`${BASE}/sessions/${sessionId}/exercise/${idx}`, {
    method: "DELETE"
  });
  if (!r.ok) throw new Error("Delete exercise failed");
  return r.json();
}
