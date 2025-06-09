const API = "http://localhost:5000/api";

export const getSessions = () =>
  fetch(`${API}/sessions`).then(r => r.json());

export const createSession = (payload) =>
  fetch(`${API}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(r => r.json());

export const addExercise = (sessionId, exercise) =>
  fetch(`${API}/sessions/${sessionId}/exercises`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(exercise)
  }).then(r => r.json());

export const deleteSession = (id) =>
  fetch(`${API}/sessions/${id}`, { method: "DELETE" });

export const deleteExercise = (sid, idx) =>
  fetch(`${API}/sessions/${sid}/exercises/${idx}`, { method: "DELETE" })
    .then(r => r.json());

