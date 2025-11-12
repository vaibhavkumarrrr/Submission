import { useState } from "react";

function ParentCount() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <h2>No of times you clicked the below button is : {counter}</h2>
      <ChildCount counter= {counter} onIncrement={() => setCounter(counter + 1)} />
    </div>
  );
}


function ChildCount({ onIncrement }) {
  return <button onClick={onIncrement}>Increment button</button>;
}

export default ParentCount;
