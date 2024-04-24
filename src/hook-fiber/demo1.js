import React from 'react';
import { useMemo, useState } from 'react';

export const Demo1 = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('yys');

  const expensiveCalculation = useMemo(() => {
    console.log('计算中...');
    return count * 2;
  }, [count]);

  return (
    <div>
      <form>
        <label htmlFor='num'>Your name:</label>
        <input
          type='number'
          value={count}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </form>
      <p>name: {name}</p>
      <p>count：{expensiveCalculation}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
};
