import {useState } from 'react';
function Component1(props) {
    const [count, setCount] = useState(0);
    return <div>{props.name}: {count}</div>;
  }
  
export default Component1;