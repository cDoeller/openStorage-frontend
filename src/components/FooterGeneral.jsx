import React from "react";
import "../styles/FooterGeneral.css";
import { Link, useLocation } from "react-router-dom";

function FooterGeneral() {

    const location = useLocation();
    let { pathname } = location;
    if (pathname === "/") pathname = "home"

  const navigationContent = [
    "Home",
    "About",
    "Artworks",
    "Profile",
    "Sign up",
    "Log in",
  ];

  const linksCollection = ["FAQ", "AGB", "contact", "cookies", "imprint"];

  return (
    <footer className="footer">
      <h3 className="footer-general-headline">Open Storage {`> ` + pathname }</h3>
      {/* navigation list */}
      <div className="footer-general-navigation-container">
        {navigationContent.map((page) => {
          return (
            <div key={page} className="footer-general-navigation-row">
              <Link to={`${page.trim().toLowerCase()}`}>
                <p className="footer-general-navigation-page">{page}</p>{" "}
              </Link>
              <p className="footer-general-navigation-arrow">{`>`}</p>
            </div>
          );
        })}
      </div>
      {/* follow us */}
      <div className="footer-general-follow-container">
        <p className="footer-general-follow-followus">Follow us</p>
        <div className="footer-general-follow-icons-container">
          <div className="footer-general-follow-icons-wrapper">
            <img src="../../public/img/instagram.png" alt="" />
          </div>
          <div className="footer-general-follow-icons-wrapper">
            <img src="../../public/img/tiktok.png" alt="" />
          </div>
          <div className="footer-general-follow-icons-wrapper">
            <img src="../../public/img/x.png" alt="" />
          </div>
        </div>
      </div>
      {/* links */}
      <ul className="footer-general-links-ul">
        {linksCollection.map((link) => {
          return (
            <li key={link} className="footer-general-links">
              {link}
            </li>
          );
        })}
      </ul>
    </footer>
  );
}

export default FooterGeneral;