/*App.jsx*/
/App.jsx/
import React, { useEffect, useState } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from './api';

function App() {
  const [notes, setNotes] = useState([]);
  const [noteForm, setNoteForm] = useState({ title: '', content: '', tags: [] });
  const [tagInput, setTagInput] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tags = tagInput
      .split(',')
      .map((tag) => ({ name: tag.trim() }))
      .filter((tag) => tag.name);

    try {
      if (editingNoteId) {
        const updatedNote = await updateNote(editingNoteId, { ...noteForm, tags });
        setNotes(notes.map((note) => (note.id === editingNoteId ? updatedNote : note)));
        setEditingNoteId(null);
      } else {
        const newNote = await createNote({ ...noteForm, tags });
        setNotes([...notes, newNote]);
      }
      setNoteForm({ title: '', content: '', tags: [] });
      setTagInput('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (note) => {
    setNoteForm({ title: note.title, content: note.content });
    setTagInput(note.tags.map((tag) => tag.name).join(', '));
    setEditingNoteId(note.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Notes App</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={noteForm.title}
          onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          className="w-full p-2 border rounded"
          value={noteForm.content}
          onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full p-2 border rounded"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {editingNoteId ? 'Update Note' : 'Add Note'}
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{note.title}</h2>
            <p>{note.content}</p>
            <div className="mt-2">
              {note.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-block bg-gray-200 text-gray-700 px-2 py-1 mr-2 rounded"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(note)}
                className="text-sm text-green-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(note.id)}
                className="text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex justify-center items-center">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Tailwind CSS!
        </h1>
        <p className="text-gray-700 mb-6">
          This is a simple layout styled using Tailwind CSS. You can modify the
          design and explore more utilities to style your app.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300">
          Click Me
        </button>
      </div>
    </div>
  );
}

export default App;*/