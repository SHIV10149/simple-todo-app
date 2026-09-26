import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  search: string;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export function TodoList({ todos, search, onToggle, onDelete }: Props) {
  const visible = todos.filter((t) => t.text.toLowerCase().includes(search.toLowerCase()));
  return (
    <ul>
      {visible.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
