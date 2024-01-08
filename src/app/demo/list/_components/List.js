"use client";
import React, { useState, useEffect } from "react";

function List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/goods")
      .then((res) => res.json())
      .then((res) => setData(res.data));
  }, []);
  return (
    <div className="list">
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default List;
