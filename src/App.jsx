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
import HowToPage from "./pages/HowToPage";
import EditProfilePage from "./pages/EditProfilePage";
import RequestPage from "./pages/RequestPage";
import AboutPage from "./pages/AboutPage";
import EditArtworkPage from "./pages/EditArtworkPage";
import CreateArtworkPage from "./pages/CreateArtworkPage";

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
        <Route path="/manual" element={<HowToPage></HowToPage>}></Route>
        <Route path="/about" element={<AboutPage/>}></Route>
        <Route path="/artworks" element={<ArtworksPage></ArtworksPage>}></Route>
        <Route path="/profile" element={ <ProfilePage />} />
        <Route path="/artworks/:id" element={ <ArtworkDetailPage />} />
        <Route path="/profile/edit-profile" element={ <EditProfilePage />} />
        <Route path="/profile/edit-artwork/:id" element={ <EditArtworkPage />} />
        <Route path="/profile/create-artwork" element={ <CreateArtworkPage />} />
        <Route path="/request/:id" element={ <RequestPage />} />

      </Routes>
      <FooterGeneral/>
    </>
  );
}

export default App;
