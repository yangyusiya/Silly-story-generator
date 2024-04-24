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

const memoCache = [];
export function TodoList({ visibility, themeColor }) {
  const className = 'todo-list';
  const [todos, setTodos] = useState(initialTodos);

  let hasVisibilityChanged, hasThemeColorChanged, hasTodoChanged;

  if (hasVisibilityChanged || hasTodoChanged || hasThemeColorChanged) {
    const handleChange = memoCache[0] || (memoCache[0] = (todo) => setTodos((todos) => getUpdated(todos, todo)));

    let filtered, jsx_todos;
    if (hasVisibilityChanged || hasTodoChanged) {
      filtered = memoCache[1] = getFiltered(todos, visibility);
      jsx_todos = memoCache[2] = (
        <ul>
          {filtered.map((todo) => (
            <Todo key={todo.id} todo={todo} onChange={handleChange} />
          ))}
        </ul>
      );
    } else {
      filtered = memoCache[1];
      jsx_todos = memoCache[2];
    }

    const jsx_addTodo = hasThemeColorChanged
      ? (memoCache[3] = <AddTodo setTodos={setTodos} themeColor={themeColor} />)
      : memoCache[3];

    return (memoCache[4] = (
      <div className={className} style={{ backgroundColor: themeColor }}>
        {jsx_todos}
        {jsx_addTodo}
        {/* <AddTodo setTodos={setTodos} themeColor={themeColor} /> */}
      </div>
    ));
  } else {
    return memoCache[4];
  }
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
