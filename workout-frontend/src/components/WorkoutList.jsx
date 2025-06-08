import { deleteWorkout } from "../api";

export default function WorkoutList({ workouts, onDelete }) {
  return (
    <ul className="space-y-4">
      {workouts.map((w) => (
        <li key={w._id} className="border p-4 rounded shadow flex justify-between items-center">
          <div>
            <strong>{w.title}</strong><br />
            {w.sets} sets × {w.reps} reps @ {w.weight} lbs
          </div>
          <button onClick={() => onDelete(w._id)} className="text-red-600 hover:underline">Delete</button>
        </li>
      ))}
    </ul>
  );
}
