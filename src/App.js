import DropDown from "./Components/DropDown";
import { useState } from "react";
//import And from './Components/And';
 
function App() {
  const [val, setVal] = useState([{ name: "My Arg", value: "false" }]);
  const [result, setResult] = useState("undefined");
  const handleAdd = () => {
    setVal([...val, { name: "newarg", value: "false" }]);
  };
 
  const handleResultChange = (value) => {
    setResult(value);
  };
 
  const handleChange = (e, index) => {
    const newVal = val;
    newVal[index].name = e.target.value;
    setVal(newVal);
  };
 
  const toggleChange = (e, index) => {
    const newVal = val;
 
    if (e.target.value === "true") newVal[index].value = "true";
    else newVal[index].value = "false";
    setVal(newVal);
  };
 
  return (
    <div className="App">
      {val.map((data, index) => {
        return (
          <>
            <input
              onChange={(e) => {
                handleChange(e, index);
              }}
              defaultValue={data.name}
            />
            <select
              onChange={(e) => {
                toggleChange(e, index);
              }}
              defaultValue={data.value}
            >
              <option>true</option>
              <option>false</option>
            </select>
            <br />
          </>
        );
      })}
      <button onClick={() => handleAdd()}>+ add arg</button>
      <br />
      <br />
      <br />
 
      <DropDown setResult={handleResultChange} args={val} />
      <h4>Result: {result}</h4>
    </div>
  );
}
 
export default App;