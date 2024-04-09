import { useState } from "react";
import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/signup" element={<SignUpPage></SignUpPage>}>
        </Route>
        <Route></Route>
        <Route></Route>
      </Routes>
    </>
  );
}

export default App;
