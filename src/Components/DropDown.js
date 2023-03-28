import React, { useState, useEffect, useRef } from "react";
const DropDown = ({ setResult, args }) => {
  const [mode, setMode] = useState(null);
  let val = useRef();
  useEffect(() => {
    val.current = ["undefined", "undefined"];
  }, []);
  useEffect(() => {
    if (mode === "constant") setResult("false");
    if (mode === "argument") setResult(args[0].value);
  }, [mode]);
 
  const handleClear = () => {
    setMode(null);
    setResult("undefined");
  };
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };
  const handleSetResult = (m, i, v) => {
    val.current[i] = v;
    let result;
    if (m === "and") {
      result = true;
      val.current.forEach((e) => {
        result = result & !(e === "false");
      });
    } else {
      result = false;
      val.current.forEach((e) => {
        result = result || e === "true";
      });
    }
    setResult(result ? "true" : "false");
  };
 
  return (
    <div>
      {!mode && (
        <div>
          <select onChange={handleModeChange}>
            <option selected>select...</option>
            <option>constant</option>
            <option>argument</option>
            <option>and</option>
            <option>or</option>
          </select>
          <button onClick={handleClear}>x</button>
        </div>
      )}
      {mode === "constant" && (
        <div>
          <select
            onChange={(e) => {
              setResult(e.target.value);
            }}
          >
            <option>true</option>
            <option selected>false</option>
          </select>
          <button onClick={handleClear}>x</button>
        </div>
      )}
      {mode === "argument" && (
        <div>
          <select
            onChange={(e) => {
              setResult(args[e.target.value].value);
            }}
          >
            {args.map((arg, index) => (
              <option value={index} selected={index === 0}>
                {arg.name}
              </option>
            ))}
          </select>
          <button onClick={handleClear}>x</button>
        </div>
      )}
 
      {mode === "and" && (
        <div>
          <select>
            <option>and</option>
            <option>or</option>
          </select>
          <button onClick={handleClear}>x</button>
          <DropDown
            setResult={(value) => {
              handleSetResult("and", 0, value);
            }}
            args={args}
          />
          <DropDown
            setResult={(value) => {
              handleSetResult("and", 1, value);
            }}
            args={args}
          />
          <br />
          <button>+ add op</button>
        </div>
      )}
    </div>
  );
};
export default DropDown;