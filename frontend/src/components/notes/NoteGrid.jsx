// components/notes/NoteGrid.jsx
import NoteCard from "./NoteCard";

function NoteGrid({ notes, onDelete }) {
  return (
    <div className="masonry-grid">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default NoteGrid;