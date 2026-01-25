import { useEffect, useState } from "react";
import { getAllNotes, deleteNote } from "../services/note.service";
import { Link } from "react-router-dom";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ambil data dari backend
  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getAllNotes();

      // ✅ VALIDASI RESPONSE
      if (res?.data?.data && Array.isArray(res.data.data)) {
        setNotes(res.data.data);
      } else {
        setNotes([]);
        console.warn("Format data tidak sesuai", res.data);
      }
    } catch (err) {
      console.error("FULL ERROR:", err);
      console.error("RESPONSE:", err?.response);
      console.error("MESSAGE:", err?.message);
      setError("Gagal mengambil data notes");
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // delete note
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin hapus note?");
    if (!confirmDelete) return;

    try {
      await deleteNote(id);
      fetchNotes();
    } catch (err) {
      console.error("Gagal hapus note", err);
      alert("Gagal menghapus note");
    }
  };

  // search filter (AMAN)
  const filteredNotes = Array.isArray(notes)
    ? notes.filter((note) =>
        note?.title?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="flex justify-between mb-4">
        <input
          className="border p-2 rounded w-2/3"
          placeholder="Search note..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link
          to="/create"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + New
        </Link>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-500">Loading...</p>
      )}

      {/* ERROR */}
      {!loading && error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && filteredNotes.length === 0 && (
        <p className="text-center text-gray-500">Tidak ada notes</p>
      )}

      {/* LIST NOTES */}
      {!loading &&
        !error &&
        filteredNotes.map((note) => (
          <div
            key={note._id}
            className="bg-white shadow p-4 mb-3 rounded flex justify-between"
          >
            <div>
              <h3 className="font-bold">{note.title}</h3>
              <p className="text-gray-600">{note.content}</p>
            </div>

            <div className="space-x-2">
              <Link
                to={`/notes/${note._id}`}
                className="text-blue-600"
              >
                View
              </Link>

              <Link
                to={`/edit/${note._id}`}
                className="text-yellow-600"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(note._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default NotesPage;
