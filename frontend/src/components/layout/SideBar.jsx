import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r h-screen p-6 flex flex-col">
      
      <h1 className="text-xl font-bold mb-8">Noted</h1>

      <nav className="flex flex-col gap-2 flex-1">
        <Link to="/" className="font-medium">All Notes</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/trash">Trash</Link>

        <div className="mt-6 text-xs text-gray-400 uppercase">
          Folders
        </div>

        <Link to="/work">Work</Link>
        <Link to="/personal">Personal</Link>
      </nav>

      <Link
        to="/create"
        className="mt-auto bg-black text-white py-2 rounded-lg text-center"
      >
        + New Note
      </Link>

    </aside>
  );
}

export default Sidebar;