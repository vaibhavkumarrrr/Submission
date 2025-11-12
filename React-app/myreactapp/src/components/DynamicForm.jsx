import React, { useState } from "react";
 
/*const DynamicForm = ({ feilds, onSubmit}) => {
  const initialState = object.fromEntries(feilds.map(feild=>[feild.name,""]))
    const [formData, setformData] = useState(feilds.reduce((acc,feild)=>{acc[feild.name]='';
    return acc;}));
    const handleChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Dynamic Form with {count} Inputs</h2>

      {values.map((val, index) => (
        <div key={index}>
          <label>Input {index + 1}:</label>
          <input
            type="text"
            value={val}
            onChange={(e) => handleChange(index, e)}
            placeholder={`Enter value ${index + 1}`}
            
          />
        </div>
      ))}

      <button type="submit">
        Submit
      </button>
    </form>
  );
};
*/

//export default DynamicForm;
