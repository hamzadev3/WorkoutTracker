import { useEffect, useState } from "react";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutList from "./components/WorkoutList";
import { fetchWorkouts, deleteWorkout } from "./api";

function App() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetchWorkouts().then(setWorkouts);
  }, []);

  const handleAdd = (newWorkout) => {
    setWorkouts([newWorkout, ...workouts]);
  };

  const handleDelete = async (id) => {
    await deleteWorkout(id);
    setWorkouts(workouts.filter(w => w._id !== id));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">🏋️ Workout Tracker</h1>
      <WorkoutForm onAdd={handleAdd} />
      <WorkoutList workouts={workouts} onDelete={handleDelete} />
    </div>
  );
}

export default App;
