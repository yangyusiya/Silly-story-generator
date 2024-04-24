import React from 'react';
import { useState } from 'react';

export const Child = () => {
  console.log('我不想重新渲染');

  return <div>我不想重新渲染</div>;
};

export const Demo2 = () => {
  const [count, setCount] = useState(0);

  return (
    <div className='wrapper'>
      <div onClick={() => setCount(count + 1)}>{count}</div>
      <Child />
    </div>
  );
};
