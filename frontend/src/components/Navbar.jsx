import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">Notes App</h1>

      <div className="flex gap-4">
        <Link
          to="/"
          className="hover:text-slate-300 transition"
        >
          Notes
        </Link>

        <Link
          to="/create"
          className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          + Create
        </Link>
      </div>
    </nav>
  );
}
