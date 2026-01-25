import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import CreateNotePage from "./pages/CreateNotePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import EditNotePage from "./pages/EditNotePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<NotesPage />} />
          <Route path="/create" element={<CreateNotePage />} />
          <Route path="/notes/:id" element={<NoteDetailPage />} />
          <Route path="/edit/:id" element={<EditNotePage />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;


