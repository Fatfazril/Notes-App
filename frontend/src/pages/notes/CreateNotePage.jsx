import { useState } from "react";
import { createNote } from "../../services/note.service";
import { useNavigate, Link } from "react-router-dom";

function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
        alert("Title cannot be empty");
        return;
    }

    try {
      setSaving(true);
      await createNote({ title, content });
      navigate("/");
    } catch (err) {
      console.error("Failed to create note", err);
      alert("Failed to create note");
      setSaving(false);
    }
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
          
          {/* Back Button */}
          <div className="mt-auto pt-4 border-t border-[#f0f2f4] dark:border-slate-800">
            <Link to="/" className="w-full flex items-center justify-center gap-2 text-[#616f89] hover:text-[#111318] dark:text-slate-400 dark:hover:text-white font-medium py-2 rounded-xl transition-all">
                <span className="material-symbols-outlined">arrow_back</span>
                <span className="text-sm">Cancel</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">

            {/* Top Navigation / Toolbar */}
            <header className="h-16 flex items-center justify-between px-8 border-b border-[#f0f2f4] dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 transition-colors duration-200 z-10">
            <div className="flex items-center gap-4">
                <Link to="/" className="md:hidden p-2 -ml-2 text-[#616f89] hover:bg-[#f0f2f4] dark:hover:bg-slate-800 rounded-lg transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <div className="flex items-center gap-2 text-[#616f89] dark:text-slate-400">
                    <span className="material-symbols-outlined text-[20px]">add_circle</span>
                    <span className="text-sm font-medium">New Note</span>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                 <span className="text-xs text-[#616f89] mr-2 hidden sm:block">
                    {title || content ? "Unsaved changes" : ""}
                 </span>
                <button 
                    type="submit" 
                    disabled={saving}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-70 text-white font-bold py-2 px-6 rounded-lg transition-all shadow-md shadow-primary/20"
                >
                    {saving ? (
                        <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <span className="material-symbols-outlined text-[20px]">save</span>
                    )}
                    <span>Create</span>
                </button>
            </div>
            </header>

            {/* Editor Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth bg-white dark:bg-zinc-900">
                <div className="max-w-4xl mx-auto h-full flex flex-col pt-4">
                    
                    <div className="flex flex-col gap-6 flex-1 animate-in fade-in zoom-in-95 duration-300">
                        {/* Title Input */}
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Note Title"
                            className="w-full text-4xl font-bold text-[#111318] dark:text-white bg-transparent border-none focus:ring-0 placeholder:text-gray-300 dark:placeholder:text-gray-700 px-0"
                            autoFocus
                        />

                        {/* Content Textarea */}
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Start typing your note here..."
                            className="w-full flex-1 resize-none text-lg leading-relaxed text-[#111318] dark:text-slate-300 bg-transparent border-none focus:ring-0 placeholder:text-gray-300 dark:placeholder:text-gray-700 px-0"
                            spellCheck="false"
                        />
                    </div>
                </div>
            </div>
        </form>
      </main>
    </div>
  );
}

export default CreateNotePage;
