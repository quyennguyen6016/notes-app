import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:8000/api/notes/");
    setNotes(res.data);
  };

  const addNote = async () => {
    await axios.post("http://localhost:8000/api/notes/", {
      title,
      content: "Demo content",
    });
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Notes App</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addNote}>Add</button>

      {notes.map((n) => (
        <p key={n.id}>{n.title}</p>
      ))}
    </div>
  );
}

export default App;