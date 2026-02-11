import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-8 bg-white">
      
      <h2 className="text-lg font-semibold">All Notes</h2>

      <div className="flex items-center gap-4">
        <button className="text-gray-600">Notifications</button>

        <Link
          to="/login"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Login
        </Link>
      </div>

    </header>
  );
}

export default Navbar;