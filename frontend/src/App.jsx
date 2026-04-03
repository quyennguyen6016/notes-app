import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
  const appName = import.meta.env.VITE_APP_NAME || "";

  const fetchNotes = async () => {
    const res = await axios.get(`${apiBaseUrl}/api/notes/`);
    setNotes(res.data);
  };

  const addNote = async () => {
    await axios.post(`${apiBaseUrl}/api/notes/`, {
      title,
      content,
    });
    setTitle("");
    setContent("");
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h1>{appName}</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button onClick={addNote}>Add</button>

      {notes.map((n) => (
        <p key={n.id}>{n.title}</p>
      ))}
    </div>
  );
}

export default App;