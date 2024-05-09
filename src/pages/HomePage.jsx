import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/styles-pages/HomePage.css";
import artworksService from "../services/artworks.services";
import RecentArtworks from "../components/RecentArtworks";

function HomePage() {
  const [recentArtworks, setRecentArtworks] = useState(null);
  const [popularGenres, setPopularGenres] = useState(null);

  useEffect(() => {
    artworksService
      .getRecentArtworks(5)
      .then((response) => {
        // console.log(response.data);
        setRecentArtworks(response.data);
        return artworksService.getPopularGenres();
      })
      .then((result) => {
        let popularGenres = result.data;
        const amount = 3;
        // only first n genres
        if (popularGenres.length > amount) {
          popularGenres = popularGenres.slice(0, amount);
        }
        // console.log(popularGenres);
        setPopularGenres(popularGenres);
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
    <div id="landing-wrapper" className="page-wrapper">
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
          Open Storage is a platform that connects artists and art lovers. Our
          vision is to give everyone the opportunity to live with original art
          from their local scene. To achieve this goal, we are <span className="highlight"> moving away from
          the concept of ownership and towards a culture of sharing</span>: art lovers
          can rent a work of art by their favourite artist for a certain period
          of time and at a reasonable monthly price.
        </p>
        <Link to="/about">
          <p className="landing-description-section-link">learn more</p>
        </Link>
      </section>

      {/* artworks section */}
      <section className="landing-artworks-section">
        <h3 className="landing-artworks-section-headline">Recently Added</h3>

        {recentArtworks && (
          <RecentArtworks artworks={recentArtworks}></RecentArtworks>
        )}

        <Link to="/artworks">
          <button className="landing-artworks-section-button button">
            BROWSE ARTWORKS
          </button>
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
        <div className="landing-genre-section-genre-wrapper">
          {popularGenres &&
            popularGenres.map((genre) => {
              return (
                <div
                  key={genre._id}
                  className="landing-genre-section-bullet-wrapper"
                >
                  <div className="landing-genre-section-bullet-icon-wrapper">
                    <img
                      src="/img/star.png"
                      alt=""
                      className="landing-genre-section-bullet-icon"
                    />
                  </div>
                  <Link to={`/artworks/?genre=${genre._id}`}>
                    <p className="landing-genre-section-bullet-text">
                      {genre._id}
                    </p>
                  </Link>
                </div>
              );
            })}
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
