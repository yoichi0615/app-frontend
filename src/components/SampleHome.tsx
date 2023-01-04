import React from "react";
import { Link } from "react-router-dom";

export const SampleHome:React.FC =() => {
  return (
    <>
      <h1>Sample Home</h1>
      <nav>
        <ul>
          <li><Link to="calendar">家計簿カレンダー</Link></li>
        </ul>
      </nav>  
    </>
  );
}