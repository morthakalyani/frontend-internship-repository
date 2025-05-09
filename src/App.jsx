/*App.jsx*/
import React, { useEffect, useState } from 'react';
import { getNotes, createNote, deleteNote } from './api';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

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
    try {
      const note = await createNote(newNote);
      setNotes([...notes, note]);
      setNewNote({ title: '', content: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((n) => n.id !== id));
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
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          className="w-full p-2 border rounded"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Note</button>
      </form>

      <div className="mt-8 space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{note.title}</h2>
            <p>{note.content}</p>
            <button
              onClick={() => handleDelete(note.id)}
              className="mt-2 text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
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