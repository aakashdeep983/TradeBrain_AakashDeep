import React from "react";
import ReactDOM from "react-dom";
import Home from "./Components/Home";
import WatchList from "./Components/WatchList";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <div className="App">
              <Home placeholder="Search company name and its share price..." />{" "}
            </div>
          }
        />
        <Route
          path="watchList"
          element={
            <div className="App">
              <WatchList />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
reportWebVitals();
