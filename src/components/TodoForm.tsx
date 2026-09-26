import React, { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = { onAdd: (todo: Omit<Todo, 'id' | 'completed'>) => void };

export function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Task text is required');
      return;
    }
    if (dueDate && new Date(dueDate) < new Date()) {
      setError('Due date cannot be in the past');
      return;
    }
    onAdd({ text, priority: priority as Todo['priority'], dueDate });
    setText('');
    setPriority('medium');
    setDueDate('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Search or add todo..." />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      {error && <span>{error}</span>}
      <button type="submit">Add</button>
    </form>
  );
}
