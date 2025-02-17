import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <h1>NC News</h1>
        <Routes>
          <Route path="/" element={<h2>Homepage will go here</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
