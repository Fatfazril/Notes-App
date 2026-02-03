/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getNoteById, deleteNote } from "../services/note.service";

function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNote();
  }, [id]);

  const fetchNote = async () => {
    try {
      setLoading(true);
      const res = await getNoteById(id);
      if (res?.data?.data) {
        setNote(res.data.data);
      } else {
        setError("Note not found");
      }
    } catch (err) {
      console.error("Error fetching note:", err);
      setError("Failed to load note");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    
    try {
      await deleteNote(id);
      navigate("/");
    } catch (err) {
      console.error("Failed to delete note", err);
      alert("Failed to delete note");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };


  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-[#111318] dark:text-white transition-colors duration-200">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-[#f0f2f4] dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 transition-colors duration-200">
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
            <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#616f89] dark:text-slate-400 hover:text-[#111318] dark:hover:text-slate-200 hover:bg-[#f0f2f4] dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-[22px]">description</span>
              <span className="text-sm font-medium">All Notes</span>
            </Link>
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
           <div className="flex items-center gap-4">
              <Link to="/" className="p-2 -ml-2 text-[#616f89] hover:bg-[#f0f2f4] dark:hover:bg-slate-800 rounded-lg transition-colors" title="Back to Notes">
                <span className="material-symbols-outlined">arrow_back</span>
              </Link>
              <div className="h-6 w-px bg-[#f0f2f4] dark:bg-slate-800 mx-1"></div>
               {/* Breadcrumbs or Title could go here */}
               <span className="text-sm font-medium text-[#616f89] dark:text-slate-400">Note Details</span>
           </div>
          
          <div className="flex items-center gap-4 ml-6">
            <button className="p-2 text-[#616f89] hover:bg-[#f0f2f4] dark:hover:bg-slate-800 rounded-lg transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="h-8 w-px bg-[#f0f2f4] dark:bg-slate-800 mx-1"></div>
            <div className="flex items-center gap-3 pl-2">
                 <div className="size-9 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-sm">
                    U
                 </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
            <div className="max-w-4xl mx-auto">
                
                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center h-64">
                         <div className="animate-spin size-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
                         <p className="text-gray-500">Loading note...</p>
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="bg-red-50 text-red-600 p-6 rounded-xl flex flex-col items-center justify-center text-center">
                        <span className="material-symbols-outlined text-4xl mb-2">error</span>
                        <h3 className="font-bold text-lg mb-1">{error}</h3>
                        <Link to="/" className="text-primary hover:underline mt-2">Go back to all notes</Link>
                    </div>
                )}

                {/* Note Content */}
                {!loading && note && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Note Header */}
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 pb-8 border-b border-[#f0f2f4] dark:border-slate-800">
                            <div className="flex-1">
                                <h1 className="text-3xl md:text-4xl font-bold text-[#111318] dark:text-white mb-4 leading-tight">
                                    {note.title}
                                </h1>
                                <div className="flex items-center gap-4 text-sm text-[#616f89] dark:text-slate-400">
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                                        {formatDate(note.createdAt)}
                                    </span>
                                    {note.updatedAt !== note.createdAt && (
                                         <span className="flex items-center gap-1" title={formatDate(note.updatedAt)}>
                                            <span className="material-symbols-outlined text-[18px]">update</span>
                                            Edited
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 shrink-0">
                                <Link 
                                    to={`/edit/${id}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors font-medium border border-indigo-100 dark:border-transparent"
                                >
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                    Edit
                                </Link>
                                <button 
                                    onClick={handleDelete}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors font-medium border border-red-100 dark:border-transparent"
                                >
                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                    Delete
                                </button>
                            </div>
                        </div>

                        {/* Note Body */}
                        <div className="prose prose-lg dark:prose-invert max-w-none text-[#111318] dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {note.content}
                        </div>
                    </div>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}

export default NoteDetailPage;
