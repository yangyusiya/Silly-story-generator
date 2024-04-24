import React from 'react';
import { useState, useCallback } from 'react';
import { AddTodo } from './add-todo/add-todo';
import './todo-list.css';

const times = {};

function InnerTodo({ todo, onChange }) {
  times[todo.id] = times[todo.id] ? times[todo.id] + 1 : 1;
  return (
    <li>
      <div>
        <input type='checkbox' checked={todo.completed} onChange={() => onChange(todo)} />
        {todo.text}
      </div>
      <div>{times[todo.id]}</div>
    </li>
  );
}

const Todo = React.memo(InnerTodo);

const initialTodos = [{ id: 1, text: 'Learn React', completed: true }];

const getUpdated = (todos, todo) => {
  return todos.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t));
};

export function TodoList() {
  const className = 'todo-list';
  const [todos, setTodos] = useState(initialTodos);
  const handleChange = useCallback((todo) => setTodos((todos) => getUpdated(todos, todo)), []);

  return (
    <div className={className}>
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} onChange={handleChange} />
        ))}
      </ul>
      <AddTodo setTodos={setTodos} />
    </div>
  );
}
