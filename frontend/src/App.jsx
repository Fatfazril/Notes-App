import { BrowserRouter, Routes, Route } from "react-router-dom";

import NotesPage from "./pages/notes/NotesPage";
import CreateNotePage from "./pages/notes/CreateNotePage";
import NoteDetailPage from "./pages/notes/NoteDetailPage";
import EditNotePage from "./pages/notes/EditNotePage";

import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* NOTES */}
        <Route path="/" element={<NotesPage />} />
        <Route path="/create" element={<CreateNotePage />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} />
        <Route path="/edit/:id" element={<EditNotePage />} />

        {/* AUTH */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;