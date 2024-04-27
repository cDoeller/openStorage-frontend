import { useState, useContext } from "react";
import "./styles/App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import { AuthContext } from "./context/auth.context";

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
import RequestDetailsPage from "./pages/RequestDetailsPage";
import AboutPage from "./pages/AboutPage";
import EditArtworkPage from "./pages/EditArtworkPage";
import CreateArtworkPage from "./pages/CreateArtworkPage";
import ScrollToTop from "./components/ScrollToTop";
import FooterProfile from "./components/FooterProfile";
import FAQPage from "./pages/FAQPage";
import NotificationsPage from "./pages/NotificationsPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  const { user, isLoggedIn } = useContext(AuthContext);

  const location = useLocation();
  let { pathname } = location;

  function cleanUpPathName(path) {
    if (path === "/") path = "/home";
    path = path.split("/")[1];
    return path;
  }

  // change path name of
  // /artworks/:id/edit
  // /artworks/create-artwork
  // /artworks/:id/request
  const cleanPathname = cleanUpPathName(pathname);

  const generalFooterPages = [
    "home",
    "manual",
    "about",
    "artworks",
    "faq",
    "signup",
    "login",
  ];
  const profileFooterPages = ["profile", "request", "notifications"];

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
        <Route path="/faq" element={<FAQPage />} />

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
          path="/profile/edit-artwork/:id/"
          element={
            <IsPrivate>
              <EditArtworkPage />
            </IsPrivate>
          }
        />
        <Route
          path="/profile/create-artwork"
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
          path="/artworks/:id/request"
          element={
            <IsPrivate>
              <RequestPage />
            </IsPrivate>
          }
        />
        <Route
          path="/request/:id/details"
          element={
            <IsPrivate>
              <RequestDetailsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/notifications"
          element={
            <IsPrivate>
              <NotificationsPage />
            </IsPrivate>
          }
        />
                <Route
          path="/favorites"
          element={
            <IsPrivate>
              <FavoritesPage />
              </IsPrivate>
          }
        />
        <Route
          path="/profile/faq"
          element={
            <IsPrivate>
              <FAQPage />
            </IsPrivate>
          }
        />
      </Routes>

      {generalFooterPages.includes(cleanPathname) ? (
        <FooterGeneral />
      ) : (
        <FooterProfile />
      )}
    </>
  );
}

export default App;
