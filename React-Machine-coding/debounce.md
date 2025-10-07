import React, { useState } from "react";
import "./styles.css";
import { useDebounce } from "./useDebounce";

export default function App() {
  const [value, setVal] = useState("");
  const debouncedVal = useDebounce(value);
  // now use debouncedVal for any api calling
  return (
    <div>
      Hello World +{debouncedVal}
      <div styles={{ margin: "10px" }}>
        <input onChange={(e) => setVal(e.target.value)} value={value} />
      </div>
    </div>
  );
}


import { useState, useEffect } from "react";
const debounceTime = 500;
export const useDebounce = (debounceVal) => {
  const [debouncedVal, setDebouncedVal] = useState("");

  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      setDebouncedVal(debounceVal);
    }, debounceTime);
    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [debounceVal]);

  return debouncedVal;
};