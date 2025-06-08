import { useState } from "react";
import { createSession } from "../api";

export default function NewSessionModal({ onCreate, onClose }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const s = await createSession({ name, date });
    onCreate(s);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl bg-slate-800 p-8 shadow-2xl space-y-5"
      >
        <h2 className="text-xl font-bold text-center">New Workout Session</h2>

        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Session name"
          className="w-full p-2 rounded bg-slate-700"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 rounded bg-slate-700"
        />

        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 border rounded p-2">
            Cancel
          </button>
          <button type="submit" className="flex-1 bg-indigo-600 rounded p-2 font-semibold">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
