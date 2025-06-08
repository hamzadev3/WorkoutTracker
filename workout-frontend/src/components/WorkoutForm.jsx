import { useState } from "react";
import { addWorkout } from "../api";

export default function WorkoutForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newWorkout = await addWorkout({ title, reps, sets, weight });
    onAdd(newWorkout);
    setTitle(""); setReps(""); setSets(""); setWeight("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Workout name" className="w-full p-2 border rounded" required />
      <input value={reps} onChange={e => setReps(e.target.value)} placeholder="Reps" type="number" className="w-full p-2 border rounded" required />
      <input value={sets} onChange={e => setSets(e.target.value)} placeholder="Sets" type="number" className="w-full p-2 border rounded" required />
      <input value={weight} onChange={e => setWeight(e.target.value)} placeholder="Weight (lbs)" type="number" className="w-full p-2 border rounded" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Workout</button>
    </form>
  );
}
