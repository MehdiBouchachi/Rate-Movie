import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import StartRating from "./StartRating";
import App from "./App-v3";
/*
function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StartRating maxRating={5} onRating={setMovieRating} />
      <p>This movie was rated {movieRating} star </p>
    </div>
  );
}*/
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <StartRating maxRating={5} />
    <StartRating
      maxRating={5}
      color="orange"
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StartRating maxRating={5} size={40} color="blue" className="test" />
    <StartRating
      maxRating={5}
      size={40}
      color="red"
      className="test"
      defaultRating={5}
    />
    <Test />
*/}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
