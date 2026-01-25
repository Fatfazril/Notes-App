import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNoteById, updateNote } from "../services/note.service";

function EditNotePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getNoteById(id).then((res) => {
      setTitle(res.data.data.title);
      setContent(res.data.data.content);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateNote(id, { title, content });
    navigate(`/notes/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Note</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="submit">Save</button>
    </form>
  );
}

export default EditNotePage;
