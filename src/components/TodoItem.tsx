import React from 'react';
import { Todo } from '../types/Todo';

type Props = { todo: Todo; onToggle: (id: number) => void; onDelete: (id: number) => void };

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'red';
    case 'medium': return 'orange';
    case 'low': return 'green';
    default: return 'gray';
  }
};

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li style={{ color: getPriorityColor(todo.priority || 'medium') }}>
      <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <span>{todo.text}</span>
      {todo.dueDate && (
        <span className="due-date">Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
      )}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}
