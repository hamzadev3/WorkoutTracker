const API_BASE = "http://localhost:5000/api/workouts";

export async function fetchWorkouts() {
  const res = await fetch(API_BASE);
  return res.json();
}

export async function addWorkout(workout) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(workout),
  });
  return res.json();
}

export async function deleteWorkout(id) {
  return fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
}
