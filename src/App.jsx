import { useState } from "react";
import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route></Route>
        <Route></Route>
        <Route></Route>
      </Routes>
    </>
  );
}

export default App;
