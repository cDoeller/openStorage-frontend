import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ArtworksPage.css";
import ArtworkCard from "../components/ArtworkCard";
import FilterInterface from "../components/FilterInterface";
import artworksService from "../services/artworks.services";
import userService from "../services/user.services";

function ArtworksPage() {
  const [artworks, setArtworks] = useState(null);
  const [showInterface, setShowInterface] = useState(false);
  const [allArtists, setAllArtists] = useState(null);
  const [allCities, setAllCities] = useState(null);

  function toggleFilterInterface() {
    setShowInterface(!showInterface);
  }

  useEffect(() => {
    artworksService
      .getAllArtworks()
      .then((response) => {
        // console.log(response.data);
        setArtworks(response.data);
      })
      .then(() => {
        userService
          .getAllArtistsWithWorks()
          .then((response) => {
            // console.log(response.data);
            setAllArtists(response.data);
          })
          .catch((err) => console.log(err));
      })
      .then(() => {
        artworksService
          .getArtworkCities()
          .then((response) => {
            // console.log(response.data);
            setAllCities(response.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page-wrapper">
      {/* FILTER INTERFACE */}
      <div
        className={
          showInterface
            ? "artworks-filterinterface-show"
            : "artworks-filterinterface-hide"
        }
      >
        <FilterInterface
          setArtworks={setArtworks}
          allArtists={allArtists}
          allCities={allCities}
        />
      </div>

      {/* FILTER INTERFACE BUTTON */}
      <div className="artworks-filterinterfacebutton-wrapper">
        <div
          onClick={toggleFilterInterface}
          className="artworks-filterinterfacebutton-wrapper-inner"
          id={showInterface ? "no-border-button" : ""}
        >
          <div className="artworks-filterinterfacebutton-icon-wrapper">
            <img
              src={showInterface ? "/img/esc.png" : "/img/filter.png"}
              alt=""
            />
          </div>
        </div>
      </div>

      {/* ARTWORKS PAGE */}
      <>
        {/* ARTWORKS CARDS */}
        <div className="artworks-artwork-cards">
          {artworks &&
            artworks.map((artwork) => {
              return (
                <Link to={`/artworks/${artwork._id}`} key={artwork._id}>
                  <ArtworkCard
                    name={artwork.artist.user_name}
                    title={artwork.title}
                    dimensions={
                      artwork.dimensions.x +
                      " x " +
                      artwork.dimensions.y +
                      (artwork.dimensions.z ? " x " + artwork.dimensions.z : "")
                    }
                    year={artwork.year}
                    img={artwork.images_url[0]}
                    medium={artwork.medium}
                  />
                </Link>
              );
            })}
        </div>
      </>
    </div>
  );
}

export default ArtworksPage;
