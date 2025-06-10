import { auth } from "./firebase";

const BASE = "http://localhost:5000/api";

/* ---------- sessions ---------- */
export async function getCommunity(uid) {
  const url = uid
    ? `${BASE}/sessions?scope=community&userId=${uid}`
    : `${BASE}/sessions?scope=community`;
  const r = await fetch(url);
  return r.json();
}

export async function getMine(uid) {
  if (!uid) throw new Error("Need uid for mine scope");
  const r = await fetch(`${BASE}/sessions?scope=mine&userId=${uid}`);
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
  await fetch(`${BASE}/sessions/${id}`, { method: "DELETE" });
}

/* ---------- exercises ---------- */
export async function addExercise(sessionId, data) {
  const r = await fetch(`${BASE}/sessions/${sessionId}/exercise`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body:   JSON.stringify(data)
  });
  return r.json();
}

export async function deleteExercise(sessionId, idx) {
  const r = await fetch(`${BASE}/sessions/${sessionId}/exercise/${idx}`, {
    method: "DELETE"
  });
  return r.json();
}
