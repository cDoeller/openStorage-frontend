import React from "react";
import { Link } from "react-router-dom";
import "../styles/FooterProfile.css";

function FooterProfile() {
  return (
    <div className="footer-profile-wrapper">
      <Link to="#">
        <div className="footer-profile-icon-wrapper">
          <img src="/img/star-icon.png" alt="" />
        </div>
      </Link>
      <Link to="#">
        <div className="footer-profile-icon-wrapper">
          <img src="/img/bell-icon.png" alt="" />
        </div>
      </Link>
      <Link to="#">
        <div className="footer-profile-icon-wrapper">
          <img src="/img/question-icon.png" alt="" />
        </div>
      </Link>
      <div className="footer-profile-icon-wrapper">
        <img src="/img/more-icon.png" alt="" />
      </div>
    </div>
  );
}

export default FooterProfile;
