// implement frontend heavy pagination. api dumps whole data

```javascript

import React, { useEffect, useState } from "react";
import "./styles.css";
const PAGE_SIZE = 10;

export default function App() {
  const [productData, setProdData] = useState([]);
  const [start, setStart] = useState(0);
  const end = start + PAGE_SIZE;

  const fetchData = async () => {
    try {
      const data = await fetch("https://dummyjson.com/products?limit=500");
      const jsonData = await data.json();
      setProdData(jsonData.products);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="pagination-container">
        <Pagination
          totalProductslength={productData.length}
          setStart={setStart}
          start={start}
        />
      </div>
      <div className="prouct-container">
        {productData.slice(start, end).map((ele) => {
          return <ProductCard thumbnail={ele.thumbnail} title={ele.title} />;
        })}
      </div>
    </div>
  );
}

const Pagination = ({ totalProductslength, setStart, start }) => {
  const totalPages = Math.ceil(totalProductslength / PAGE_SIZE);
  const lastPage = totalPages * 10;

  const hanclePageClick = (pageNumber) => {
    if (setStart) {
      setStart(pageNumber * 10);
    }
  };
  console.log("start-->", start);
  console.log("totalPages - PAGE_SIZE -->", totalPages);
  return (
    <div>
      <button
        disabled={start === 0}
        onClick={() => setStart((prev) => prev - 1)}
        className="page-box"
      >
        {" "}
        {"<"}{" "}
      </button>
      {Array(totalPages)
        .keys()
        .map((ele) => {
          return (
            <button
              onClick={() => hanclePageClick(ele)}
              key={ele}
              className="page-box"
            >
              {" "}
              {ele}{" "}
            </button>
          );
        })}
      <button
        disabled={start === lastPage - PAGE_SIZE}
        onClick={() => setStart((prev) => prev + 1)}
        className="page-box"
      >
        {" "}
        {">"}{" "}
      </button>
    </div>
  );
};

const ProductCard = ({ thumbnail, title }) => {
  return (
    <div className="product-card">
      <img src={thumbnail} alt="image" />
      {title}
    </div>
  );
};

```
```css
.prouct-container {
  font-family: sans-serif;
  text-align: center;

  display: flex;
  flex-wrap: wrap;
  padding: 30px;s
}

.product-card {
  width: 150px;
  display: flex;
  flex-direction: column;
  justfy-content: center;
  align-item: center;
}

.pagination-container {
  margin: 20px;
}
.page-box {
  margin-right: 2px;
  border: 1px solid gray;
  padding: 2px;
}
```