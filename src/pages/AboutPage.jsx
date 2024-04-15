import React from "react";
import "../styles/About.css";

function AboutPage() {
  return (
    <div className="page-wrapper">
      <div className="about-info-wrapper">

        {/* INTRODUCTION / ABSTRACT */}
        <h1 className="about-headline">Open Storage</h1>
        <p className="about-description-text">
          Open Storage is a platform that connects artists and art lovers.
          {" "}
          <span className="highlight">Our vision</span> is to enable everyone to live with original art from their
          local creative scene.
        </p>

        {/* HELP / SUSTAINABLE */}
        <div className="about-icon-wrapper">
          <img src="/img/media.png" alt="" />
        </div>
        <p className="about-description-text">
          On one hand, we want to {" "}<span className="highlight">help artists</span> get their work out into the world
          and minimise their storage needs. On the other hand, we want to {" "}<span className="highlight">help
          you</span>, weather you are an artist or art lover, to lower the hurdle of
          living with art in your everyday life. It is Important for us to find 
          {" "}<span className="highlight">sustainable solutions</span> of sharing art in local communities.
        </p>

        {/* WHO ARE WE? */}
        <div className="about-icon-wrapper">
          <img src="/img/media.png" alt="" />
        </div>
        <p className="about-description-text">
          On one hand, we want to {" "}<span className="highlight">help artists</span> get their work out into the world
          and minimise their storage needs. On the other hand, we want to {" "}<span className="highlight">help
          you</span>, weather you are an artist or art lover, to lower the hurdle of
          living with art in your everyday life. It is Important for us to find 
          {" "}<span className="highlight">sustainable solutions</span> of sharing art in local communities.
        </p>

        {/* OUR TARGET GROUP */}
        <div className="about-icon-wrapper">
          <img src="/img/media.png" alt="" />
        </div>
        <p className="about-description-text">
          On one hand, we want to {" "}<span className="highlight">help artists</span> get their work out into the world
          and minimise their storage needs. On the other hand, we want to {" "}<span className="highlight">help
          you</span>, weather you are an artist or art lover, to lower the hurdle of
          living with art in your everyday life. It is Important for us to find 
          {" "}<span className="highlight">sustainable solutions</span> of sharing art in local communities.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
