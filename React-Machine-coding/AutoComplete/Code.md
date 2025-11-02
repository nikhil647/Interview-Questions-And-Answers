```javascript
import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [inputVal, setVal] = useState("");
  const [results, setResults] = useState([]);
  const [cache, setCache] = useState({});
  const [showResultContainer, setResultContiner] = useState(false);

  const fetchAPI = async () => {
    try {
      if (cache[inputVal]) {
        setResults(cache[inputVal]);
        return;
      }
      if (inputVal) {
        const api = `https://dummyjson.com/recipes/search?q=${inputVal}`;
        const results = await fetch(api);
        const rec = await results.json();

        setResults(rec.recipes);
        setCache((prev) => ({ ...prev, [inputVal]: rec.recipes }));
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAPI();
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [inputVal]);

  return (
    <div className="main-container">
      <div className="input-container">
        <input
          onFocus={() => setResultContiner(true)}
          onBlur={() => {
            setResultContiner(false);
          }}
          value={inputVal}
          onChange={(e) => setVal(e.target.value)}
        />
      </div>
      {showResultContainer && (
        <div className="result-container">
          {results?.map((ele) => {
            return (
              <div className="result-item" key={ele.id}>
                {" "}
                {ele.name}{" "}
              </div>
            );
          })}
          {results?.length === 0 ? <div> No result found </div> : null}
        </div>
      )}
    </div>
  );
}
```

```css
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.input-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.input-container > input {
  width: 500px;
  padding: 10px;
}

.result-container {
  justify-content: center;

  width: 520px;
  margin: 0 auto;
  text-align: left;
  border: 1px solid black;

  max-height: 500px;
  overflow: scroll;
}

.result-item {
  padding: 10px;
  border: 1px solid black;
}

.result-item:hover {
  background-color: pink;
}
```