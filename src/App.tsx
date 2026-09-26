import React, { useState } from 'react';
import { Todo } from './types/Todo';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [search, setSearch] = useState('');
  let nextId = 1;

  const addTodo = (data: Omit<Todo, 'id' | 'completed'>) => {
    setTodos([...todos, { ...data, id: nextId++, completed: false }]);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  }).filter(todo => {
    if (priorityFilter !== 'all' && todo.priority !== priorityFilter) return false;
    return true;
  });

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (a.priority && b.priority) {
      const priorityOrder: Record<string, number> = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  return (
    <div>
      <h1>Todo Search</h1>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search todos..." />
      <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
        <option value="all">All priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <TodoForm onAdd={addTodo} />
      <TodoList
        todos={sortedTodos}
        search={search}
        onToggle={(id) => setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))}
        onDelete={(id) => setTodos(todos.filter(t => t.id !== id))}
      />
    </div>
  );
}
