import React from 'react';
import { useState, memo, useMemo } from 'react';
// function Change() {
//   const [count, setCount] = useState(0);

//   return <div onClick={() => setCount(count + 1)}>{count}</div>;
// }

// export const Child = () => {
//   console.log('我不想重新渲染');

//   return <div>我不想重新渲染</div>;
// };

// export const Demo3 = () => {
//   return (
//     <div className='wrapper'>
//       <Change />
//       <Child />
//     </div>
//   );
// };

function Child() {
  console.log('我不想重新渲染');

  return <div>我不想重新渲染</div>;
}

// var Child = memo(_Child);

// export const Demo3 = () => {
//   const [count, setCount] = useState(0);
//   return (
//     <div className='wrapper'>
//       <div onClick={() => setCount(count + 1)}>{count}</div>
//       <Child />
//     </div>
//   );
// };

export const Demo3 = () => {
  const [count, setCount] = useState(0);

  const _child = useMemo(() => {
    return <Child />;
  }, []);

  return (
    <div className='wrapper'>
      <div onClick={() => setCount(count + 1)}>{count}</div>
      {_child}
    </div>
  );
};
