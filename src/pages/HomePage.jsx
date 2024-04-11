import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

function HomePage() {
  return (
    <div className="landing-wrapper">
      {/* header */}
      <header className="landing-header">
        <div className="landing-header-info-wrapper">
          <h1 className="landing-header-info-title">Open Storage</h1>
          <p className="landing-header-info-text">
            Bringing together artists with a lack of storage and art-lovers with
            a small budget
          </p>
        </div>
        <div className="landing-header-image-wrapper">
          <img
            className="landing-header-image"
            src="../../public/img/living-room-artwork-2213465-hero-61361ba604da49818f8ce9996b12b183.jpg"
            alt=""
          />
        </div>
      </header>

      {/* description section */}
      <section className="landing-description-section">
        <div className="landing-description-section-logo-wrapper">
          <img
            src="../../public/img/logo-placeholder-image.png"
            alt=""
            className="landing-description-section-logo-img"
          />
        </div>
        <p className="landing-description-section-text">
          Open Storage is a platform that brings artists and art lovers
          together. Our vision is to enable everyone to live with original art
          from their local scene. We not only want to help artists get their
          work out into the world and minimise their storage needs. We also want
          to help you to lower the hurdle of living with art in your everyday
          life.
        </p>
        <Link to="/about">
          <p className="landing-description-section-link">learn more</p>
        </Link>
      </section>

      {/* artworks section */}
      <section className="landing-artworks-section">
        <div className="landing-artworks-section-gallery-wrapper">
          <div className="landing-artworks-section-gallery-image-wrapper"></div>
          <img
            src="../../public/img/christian-doeller-replay-pyramid-4.jpg"
            alt=""
            className="landing-artworks-section-gallery-image-img"
          />
          <div className="landing-artworks-section-gallery-caption-wrapper">
            <p className="landing-artworks-section-gallery-caption-left">{`<`}</p>
            <p className="landing-artworks-section-gallery-caption-text">
              Christian Doeller, Inkjet-Print <br /> 45 x 32 cm, 2018
            </p>
            <p className="landing-artworks-section-gallery-caption-right">{`>`}</p>
          </div>
        </div>
        <button className="landing-artworks-section-button">ARTWORKS</button>
      </section>

      {/* functionality section */}
      <section className="landing-functionality-section">
        <p className="landing-functionality-section-text">
          We help art lovers support the local scene and find the perfect
          artwork for their home
        </p>
        <div className="landing-functionality-section-bullet-wrapper">
          <div className="landing-functionality-section-bullet-icon-wrapper">
            <img
              src="../../public/img/location.png"
              alt=""
              className="landing-functionality-section-bullet-icon"
            />
          </div>
          <p className="landing-functionality-section-bullet-text">
            browse through the storages of your favorite local artists
          </p>
        </div>
      </section>

      {/* genre section */}
      <section className="landing-genre-section">
        <p className="landing-genre-section-text">
          Check out the works of our most popular genres
        </p>
        <div className="landing-genre-section-bullet-wrapper">
          <div className="landing-genre-section-bullet-icon-wrapper">
            <img
              src="../../public/img/star.png"
              alt=""
              className="landing-genre-section-bullet-icon"
            />
          </div>
          <p className="landing-genre-section-bullet-text">surreal </p>
        </div>
      </section>

      {/* newsletter section */}
      <section className="landing-newsletter-section">
        <div className="landing-newsletter-section-icon-wrapper">
          <img
            src="../../public/img/newsletter.png"
            alt=""
            className="landing-newsletter-section-icon"
          />
        </div>
        <p className="landing-newsletter-section-text">
          Subscribe to our newsletter and stay up to date on the latest open
          storages in your area!
        </p>
      </section>

      {/* footer */}
    </div>
  );
}

export default HomePage;
