import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getNoteById } from "../services/note.service";

function NoteDetailPage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    getNoteById(id).then((res) => {
      setNote(res.data.data);
    });
  }, [id]);

  if (!note) return <p>Loading...</p>;

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>

      <Link to={`/notes/${id}/edit`}>Edit</Link>
    </div>
  );
}

export default NoteDetailPage;
