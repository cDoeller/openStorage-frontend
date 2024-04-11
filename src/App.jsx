import { useState } from "react";
import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/profile/:id" element={ <ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
