import { useState } from 'react';

export default function TodoInput({ onAdd, editingId, editingTitle }) {
  const [title, setTitle] = useState(editingTitle || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({ id: editingId || crypto.randomUUID(), title: title.trim(), completed: false, createdAt: editingId ? null : new Date() });
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        className="todo-input"
        autoFocus
      />
      <button type="submit" className="add-btn">
        {editingId ? 'Update' : 'Add'}
      </button>
    </form>
  );
}
