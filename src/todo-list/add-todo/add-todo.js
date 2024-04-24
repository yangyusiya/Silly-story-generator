import React from 'react';
import { useState } from 'react';
import './add-todo.css';

export function AddTodo({ setTodos, themeColor }) {
  const className = 'add-todo';
  const [inputValue, setInputValue] = useState('');
  return (
    <div className={className} style={{ background: themeColor }}>
      <input value={inputValue} type='text' placeholder='add todo' onChange={(e) => setInputValue(e.target.value)} />
      <button
        onClick={() => {
          setTodos((todos) => [...todos, { id: todos.length + 1, text: inputValue, completed: false }]);
          setInputValue('');
        }}
      >
        Add
      </button>
    </div>
  );
}
