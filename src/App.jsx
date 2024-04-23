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
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      {/* always srcoll to top of page when location changes */}
      <ScrollToTop />
      {/* all the visible things here --> */}
      <NavBar />
      <Routes>
      
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/manual" element={<HowToPage></HowToPage>}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/artworks" element={<ArtworksPage></ArtworksPage>}></Route>
        <Route path="/artworks/:id" element={<ArtworkDetailPage />} />

        {/* ANON ROUTES */}
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

        {/* PRIVATE ROUTES */}
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/artworks/:id/edit"
          element={
            <IsPrivate>
              <EditArtworkPage />
            </IsPrivate>
          }
        />
        <Route
          path="/artworks/create-artwork"
          element={
            <IsPrivate>
              <CreateArtworkPage />
            </IsPrivate>
          }
        />
        <Route
          path="/profile/edit-profile"
          element={
            <IsPrivate>
              <EditProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/request/:id"
          element={
            <IsPrivate>
              <RequestPage />
            </IsPrivate>
          }
        />
      </Routes>
      <FooterGeneral />
    </>
  );
}

export default App;
