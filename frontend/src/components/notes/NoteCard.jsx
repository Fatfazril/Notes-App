// components/notes/NoteCard.jsx
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

function NoteCard({ note, onDelete }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm">
      <div className="flex justify-between">
        <h3 className="font-bold">{note.title}</h3>

        <div className="flex gap-2">
          <Link to={`/edit/${note._id}`}>Edit</Link>
          <button onClick={() => onDelete(note._id)}>Delete</button>
        </div>
      </div>

      <p className="text-sm mt-2">{note.content}</p>

      <span className="text-xs text-gray-400">
        {formatDate(note.createdAt)}
      </span>
    </div>
  );
}

export default NoteCard;