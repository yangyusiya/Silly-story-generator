import React from 'react';
import { useEffect, useRef, useState } from 'react';

export const HookFiber = () => {
  const [num, setNum] = useState(111);
  const ref = useRef(1);

  useEffect(() => {
    setTimeout(() => {
      setNum(333);
    }, 2000);
  }, []);

  return (
    <div>
      {num}
      {ref.current}
    </div>
  );
};
