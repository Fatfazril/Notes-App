// hooks/useNotes.js
import { useEffect, useState } from "react";
import { getAllNotes, deleteNote } from "../services/note.service";

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await getAllNotes();
      setNotes(Array.isArray(data?.data) ? data.data : []);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Gagal mengambil notes");
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const removeNote = async (id) => {
    await deleteNote(id);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    loading,
    error,
    removeNote,
    refetch: fetchNotes,
  };
}
