import { useState } from 'react';
import TodoList from '../components/TodoList';
import FilterTabs from '../components/FilterTabs';
import useLocalStorage from '../hooks/useLocalStorage';
import TodoInput from '../components/Todoinput';

export default function Home() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  const handleAdd = (newTodo) => {
    if (editingId) {
      // Update existing
      setTodos(todos.map((t) => (t.id === editingId ? newTodo : t)));
      setEditingId(null);
      setEditingTitle('');
    } else {
      // Add new
      setTodos([newTodo, ...todos]);
    }
  };

  const handleToggle = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditingTitle('');
    }
  };

  return (
    <div className="home">
      <h1>Todo App</h1>
      <TodoInput
        onAdd={handleAdd}
        editingId={editingId}
        editingTitle={editingTitle}
      />
      <FilterTabs activeFilter={filter} onFilterChange={setFilter} />
      <TodoList
        todos={todos}
        filter={filter}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
