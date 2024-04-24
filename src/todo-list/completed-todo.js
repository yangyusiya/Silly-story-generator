import React from 'react';
import { useState, useCallback, useMemo } from 'react';
import { AddTodo } from './add-todo/add-todo';
import { Radio, ColorPicker } from 'antd';
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

let filteredTime = 0;
const getFiltered = (todos, visibility) => {
  filteredTime += 1;
  switch (visibility) {
    case 'completed':
      return todos.filter((todo) => todo.completed);
    case 'active':
      return todos.filter((todo) => !todo.completed);
    case 'all':
      return todos;
    default:
      return todos;
  }
};

export function TodoList({ visibility, themeColor }) {
  const className = 'todo-list';
  const [todos, setTodos] = useState(initialTodos);
  const handleChange = useCallback((todo) => setTodos((todos) => getUpdated(todos, todo)), []);
  const filtered = useMemo(() => getFiltered(todos, visibility), [todos, visibility]);

  return (
    <div className={className} style={{ backgroundColor: themeColor }}>
      <ul>
        {filtered.map((todo) => (
          <Todo key={todo.id} todo={todo} onChange={handleChange} />
        ))}
      </ul>
      <AddTodo setTodos={setTodos} themeColor={themeColor} />
    </div>
  );
}

export function BlazingTodoList() {
  const [visibility, setVisibility] = useState('all');
  const [themeColor, setThemeColor] = useState('#594848');

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div>{filteredTime}</div>
        <ColorPicker value={themeColor} onChange={(color) => setThemeColor(color.toHexString())} />
        <Radio.Group onChange={(e) => setVisibility(e.target.value)} value={visibility}>
          <Radio value='all'>all</Radio>
          <Radio value='active'>active</Radio>
          <Radio value='completed'>completed</Radio>
        </Radio.Group>
      </div>
      <TodoList visibility={visibility} themeColor={themeColor} />
    </div>
  );
}
