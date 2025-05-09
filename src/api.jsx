/*api.jsx*/
const BASE_URL = 'http://localhost:8000/api/notes/';

export const getNotes = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch notes');
  return await res.json();
};

export const createNote = async (note) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  if (!res.ok) {
    console.error("Create note failed:", await res.text());
    throw new Error('Failed to create note');
  }
  return await res.json();
};

export const deleteNote = async (id) => {
  const res = await fetch(`${BASE_URL}${id}/`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete note');
};

export const updateNote = async (id, note) => {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error('Failed to update note');
  return await res.json();
};

