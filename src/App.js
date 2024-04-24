// import { TodoList } from './todo-list/todo-list';
// import { Demo1 } from './hook-fiber/demo1';
// import { Demo2 } from './hook-fiber/demo2';
import { Demo3 } from './hook-fiber/demo3';
import { useState } from 'react';
// import { HookFiber } from './hook-fiber/hook-fiber';
// import { BlazingTodoList } from './todo-list/completed-todo';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className='App'>
      <div onClick={() => setCount(count + 1)}>{count}</div>
      {/* <TodoList /> */}
      {/* <BlazingTodoList /> */}
      {/* <HookFiber /> */}
      {/* <Demo1 /> */}
      {/* <Demo2 /> */}
      <Demo3 />
    </div>
  );
}

export default App;
