import { api } from "./api";


// GET /api/notes
export const getAllNotes = () => {
  return api.get("/notes"); // ⬅️ BALIKIN FULL AXIOS RESPONSE
};

// GET /api/notes/:id
export const getNoteById = (id) => {
  return api.get(`/notes/${id}`);
};

// POST /api/notes
export const createNote = (data) => {
  // data = { title, content }
  return api.post("/notes", data);
};

// PUT /api/notes/:id
export const updateNote = (id, data) => {
  // data = { title, content }
  return api.put(`/notes/${id}`, data);
};

// DELETE /api/notes/:id
export const deleteNote = (id) => {
  return api.delete(`/notes/${id}`);
};
