import { useEffect, useState } from "react";
import { getAllNotes, deleteNote } from "../../services/note.service";
import { Link } from "react-router-dom";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getAllNotes();

      if (res?.data?.data && Array.isArray(res.data.data)) {
        setNotes(res.data.data);
      } else {
        setNotes([]);
        console.warn("Format data tidak sesuai", res.data);
      }
    } catch (err) {
      console.error("FULL ERROR:", err);
      setError("Gagal mengambil data notes");
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

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

  const filteredNotes = Array.isArray(notes)
    ? notes.filter((note) =>
        note?.title?.toLowerCase().includes(search.toLowerCase()) ||
        note?.content?.toLowerCase().includes(search.toLowerCase())
      )
    : [];
    
  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Determine if date is valid
    if (isNaN(date.getTime())) return "";
    
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-[#111318] dark:text-white transition-colors duration-200">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col border-r border-[#f0f2f4] dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 transition-colors duration-200">
        <div className="p-6 flex flex-col h-full">
          {/* App Logo/Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary text-white shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined">edit_note</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-[#111318] dark:text-white text-base font-bold leading-none">Noted</h1>
              <p className="text-[#616f89] dark:text-slate-400 text-xs font-normal mt-1">Personal Workspace</p>
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 grow">
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium transition-colors">
              <span className="material-symbols-outlined text-[22px]">description</span>
              <span className="text-sm">All Notes</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#616f89] dark:text-slate-400 hover:text-[#111318] dark:hover:text-slate-200 hover:bg-[#f0f2f4] dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-[22px]">star</span>
              <span className="text-sm font-medium">Favorites</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#616f89] dark:text-slate-400 hover:text-[#111318] dark:hover:text-slate-200 hover:bg-[#f0f2f4] dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-[22px]">delete</span>
              <span className="text-sm font-medium">Trash</span>
            </a>
            
            <div className="mt-6 mb-2">
              <p className="px-3 text-[10px] font-bold text-[#616f89] dark:text-slate-500 uppercase tracking-wider">Folders</p>
            </div>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#616f89] dark:text-slate-400 hover:text-[#111318] dark:hover:text-slate-200 hover:bg-[#f0f2f4] dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-[22px]">folder</span>
              <span className="text-sm font-medium">Work Projects</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#616f89] dark:text-slate-400 hover:text-[#111318] dark:hover:text-slate-200 hover:bg-[#f0f2f4] dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-[22px]">folder</span>
              <span className="text-sm font-medium">Personal</span>
            </a>
          </nav>
          
          {/* New Note Button */}
          <Link to="/create" className="mt-auto w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95">
            <span className="material-symbols-outlined">add</span>
            <span className="text-sm">New Note</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-[#f0f2f4] dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 transition-colors duration-200">
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[#616f89] text-xl group-focus-within:text-primary transition-colors">search</span>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border-none bg-[#f0f2f4] dark:bg-slate-800 rounded-lg text-sm placeholder-[#616f89] focus:ring-2 focus:ring-primary/50 dark:text-white transition-all outline-none"
                placeholder="Search your notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-6">
            <button className="p-2 text-[#616f89] hover:bg-[#f0f2f4] dark:hover:bg-slate-800 rounded-lg transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="h-8 w-px bg-[#f0f2f4] dark:bg-slate-800 mx-1"></div>
            <div className="flex items-center gap-3 pl-2">
                 {/* Placeholder Avatar */}
                 <div className="size-9 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-sm">
                    U
                 </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#111318] dark:text-white">All Notes</h2>
                <p className="text-sm text-[#616f89] mt-1">
                  {loading ? 'Syncing...' : `${filteredNotes.length} notes stored in your workspace`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 bg-white dark:bg-slate-900 border border-[#f0f2f4] dark:border-slate-800 rounded-lg shadow-sm text-primary">
                  <span className="material-symbols-outlined">grid_view</span>
                </button>
                <button className="p-2 bg-white dark:bg-slate-900 border border-[#f0f2f4] dark:border-slate-800 rounded-lg shadow-sm text-[#616f89] hover:text-[#111318] dark:hover:text-white transition-colors">
                  <span className="material-symbols-outlined">list</span>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined">error</span>
                    {error}
                </div>
            )}

            {/* Loading State */}
            {loading && filteredNotes.length === 0 && (
                <div className="text-center py-20">
                     <div className="animate-spin size-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                     <p className="text-gray-500">Loading your notes...</p>
                </div>
            )}
            
            {/* Empty State */}
            {!loading && filteredNotes.length === 0 && !error && (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                    <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">note_add</span>
                    <p className="text-gray-500">No notes found. Create your first note!</p>
                </div>
            )}

            {/* Masonry Layout */}
            <div className="masonry-grid">
               {filteredNotes.map((note) => (
                   <div key={note._id} className="masonry-item group relative bg-white dark:bg-slate-900 border border-[#f0f2f4] dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300">
                       
                       {/* Actions (visible on hover) */}
                       <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-lg shadow-sm border border-gray-100 dark:border-slate-800 p-1 index-10">
                            <Link to={`/edit/${note._id}`} className="p-1.5 text-slate-400 hover:text-blue-500 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" title="Edit">
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                            </Link>
                            <button onClick={(e) => { e.preventDefault(); handleDelete(note._id); }} className="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" title="Delete">
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                       </div>

                       <Link to={`/notes/${note._id}`} className="block">
                           <h3 className="font-bold text-[#111318] dark:text-white mb-2 pr-6 text-lg">{note.title}</h3>
                           <p className="text-sm text-[#616f89] dark:text-slate-400 leading-relaxed mb-4 line-clamp-6 text-pretty">
                               {note.content}
                           </p>
                           
                           <div className="flex items-center justify-between mt-2 pt-3 border-t border-[#f0f2f4] dark:border-slate-800">
                               <span className="text-[10px] font-bold uppercase tracking-wider text-[#9aa4b2] dark:text-slate-600">
                                  {note.createdAt ? formatDate(note.createdAt) : 'Just now'}
                               </span>
                           </div>
                       </Link>
                   </div>
               ))}
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotesPage;
