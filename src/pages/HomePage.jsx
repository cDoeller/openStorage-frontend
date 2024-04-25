import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import artworksService from "../services/artworks.services";
import RecentArtworks from "../components/RecentArtworks";

function HomePage() {
  const [recentArtworks, setRecentArtworks] = useState(null);

  useEffect(() => {
    artworksService
      .getRecentArtworks(5)
      .then((response) => {
        console.log(response.data);
        setRecentArtworks(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const functionalityConetent = [
    {
      text: "browse through the storages of your favorite local artists",
      img_url: "/img/location.png",
      id: 1,
    },
    {
      text: "filter your search by a variety of media and genres",
      img_url: "/img/media.png",
      id: 2,
    },
    {
      text: "Find artworks with the right dimensions for your home",
      img_url: "/img/dimensions.png",
      id: 3,
    },
  ];

  return (
    <div className="landing-wrapper page-wrapper">
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
            src="/img/living-room-artwork-2213465-hero-61361ba604da49818f8ce9996b12b183.jpg"
            alt=""
          />
        </div>
      </header>

      {/* description section */}
      <section className="landing-description-section">
        <div className="landing-description-section-logo-wrapper">
          <img
            src="/img/logo-V1.png"
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
        <h3 className="landing-artworks-section-headline">Recently Added</h3>

        {recentArtworks && (
          <div className="landing-artworks-section-gallery-wrapper">
            {recentArtworks.map((artwork) => {
              return (
                <RecentArtworks
                  artwork={artwork}
                  key={artwork._id}
                ></RecentArtworks>
              );
            })}
          </div>
        )}

        <Link to="/artworks">
          <button className="landing-artworks-section-button">ARTWORKS</button>
        </Link>
      </section>

      {/* functionality section */}
      <section className="landing-functionality-section">
        <p className="landing-functionality-section-text">
          We help art lovers support the local scene and find the perfect
          artwork for their home
        </p>
        {functionalityConetent.map((oneFunctionality) => {
          return (
            <div
              className="landing-functionality-section-bullet-wrapper"
              key={oneFunctionality.id}
            >
              <div className="landing-functionality-section-bullet-icon-wrapper">
                <img
                  src={oneFunctionality.img_url}
                  alt=""
                  className="landing-functionality-section-bullet-icon"
                />
              </div>
              <p className="landing-functionality-section-bullet-text">
                {oneFunctionality.text}
              </p>
            </div>
          );
        })}
      </section>

      {/* genre section */}
      <section className="landing-genre-section">
        <p className="landing-genre-section-text">
          Check out the works of our most popular genres
        </p>
        <div className="landing-genre-section-bullet-wrapper">
          <div className="landing-genre-section-bullet-icon-wrapper">
            <img
              src="/img/star.png"
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
            src="/img/newsletter.png"
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
