import { useState } from "react";
import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import Loading from "./components/Loading";
import ArtworksPage from "./pages/ArtworksPage";
import FooterGeneral from "./components/FooterGeneral";
import ArtworkDetailPage from "./pages/ArtworkDetailPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignUpPage />
            </IsAnon>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        ></Route>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/artworks" element={<ArtworksPage></ArtworksPage>}></Route>
        <Route path="/profile/:id" element={ <ProfilePage />} />
        <Route path="/artwork/:id" element={ <ArtworkDetailPage />} />
      </Routes>
      <FooterGeneral/>
    </>
  );
}

export default App;
