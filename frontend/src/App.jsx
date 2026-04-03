import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Routes, Route } from "react-router-dom";
import "./App.css";

function NotesPage({ apiBaseUrl, appName }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
  }, [apiBaseUrl]);

  return (
    <section className="card">
      <h1>{appName}</h1>
      <div className="formRow">
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
      </div>
      <div className="noteList">
        {notes.map((n) => (
          <article className="noteItem" key={n.id}>
            <h3>{n.title}</h3>
            <p>{n.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutPage({ apiBaseUrl }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/about`);
        setProfile(res.data);
      } catch {
        setError("Khong the tai thong tin about.");
      }
    };
    fetchAbout();
  }, [apiBaseUrl]);

  return (
    <section className="card">
      <h1>About</h1>
      {error && <p className="errorText">{error}</p>}
      {profile && (
        <div className="aboutGrid">
          <p>
            <strong>Ho ten sinh vien:</strong> {profile.ho_ten_sinh_vien}
          </p>
          <p>
            <strong>Ma so sinh vien:</strong> {profile.ma_so_sinh_vien}
          </p>
          <p>
            <strong>Lop:</strong> {profile.lop}
          </p>
        </div>
      )}
    </section>
  );
}

function App() {
  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
  const appName = import.meta.env.VITE_APP_NAME || "Notes App";

  return (
    <main className="container">
      <nav className="topNav">
        <NavLink to="/" end>
          Notes
        </NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<NotesPage apiBaseUrl={apiBaseUrl} appName={appName} />} />
        <Route path="/about" element={<AboutPage apiBaseUrl={apiBaseUrl} />} />
      </Routes>
    </main>
  );
}

export default App;