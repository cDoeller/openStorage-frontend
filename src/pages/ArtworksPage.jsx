import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/styles-pages/ArtworksPage.css";
import ArtworkCard from "../components/ArtworkCard";
import FilterInterface from "../components/FilterInterface";
import artworksService from "../services/artworks.services";
import userService from "../services/user.services";

function ArtworksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlGenre = searchParams.get("genre");

  const [artworks, setArtworks] = useState(null);
  const [showInterface, setShowInterface] = useState(false);
  const [allArtists, setAllArtists] = useState(null);
  const [allCities, setAllCities] = useState(null);
  const [allGenres, setAllGenres] = useState(null);
  const [allMedia, setAllMedia] = useState(null);

  // FILTERING STATES UPLIFT
  const [city, setCity] = useState("");
  const [medium, setMedium] = useState("");
  const [genre, setGenre] = useState("");
  const [dimensions, setDimensions] = useState({ x: 0, y: 0, z: 0 });
  const [artistId, setArtistId] = useState("");
  const [artistName, setArtistName] = useState("");

  const filterStates = {
    city: { state: city, setter: setCity },
    medium: { state: medium, setter: setMedium },
    genre: { state: genre, setter: setGenre },
    dimensions: { state: dimensions, setter: setDimensions },
    artistId: { state: artistId, setter: setArtistId },
    artistName: { state: artistName, setter: setArtistName },
  };

  const fetchData = async () => {
    try {
      // get genre artworks if genre present
      if (urlGenre) {
        const genreQueryString = `?genre=${urlGenre}`;
        const filteredArtworks = await artworksService.getArtworkQuery(
          genreQueryString
        );

        setArtworks(filteredArtworks.data.artworks);
        setAllArtists(filteredArtworks.data.uniqueArtists);
        setAllCities(filteredArtworks.data.uniqueCities);
        setAllGenres(filteredArtworks.data.uniqueGenres);
        setAllMedia(filteredArtworks.data.uniqueMedia);
        
        setGenre(urlGenre);

        return;
      } else {
        // no prefilter: get all artworks
        const allArtworks = await artworksService.getAllArtworks();
        setArtworks(allArtworks.data.artworks);
        setAllArtists(allArtworks.data.uniqueArtists);
        setAllCities(allArtworks.data.uniqueCities);
        setAllGenres(allArtworks.data.uniqueGenres);
        setAllMedia(allArtworks.data.uniqueMedia);

      }
    } catch (err) {
      console.log(err);
    }
  };

  //  get artworks data
  useEffect(() => {
    fetchData();
  }, [urlGenre]);

  // show/hide filter interface
  function toggleFilterInterface() {
    setShowInterface(!showInterface);
  }

  return (
    <>
      {/* FILTER INTERFACE BUTTON */}
      <div className="artworks-filterinterfacebutton-wrapper">
        <div
          onClick={() => {
            window.scrollTo(0, 0);
            toggleFilterInterface();
          }}
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

      {showInterface ? (
        <FilterInterface
          setArtworks={setArtworks}
          allArtists={allArtists}
          allCities={allCities}
          allGenres={allGenres}
          allMedia={allMedia}
          setAllArtists={setAllArtists}
          setAllCities={setAllCities}
          setAllGenres={setAllGenres}
          setAllMedia={setAllMedia}
          filterStates={filterStates}
        />
      ) : (
        <div
          className={
            "page-wrapper mobile-dvh-general artworks-page " +
            (showInterface && "none")
          }
        >
          {/* ARTWORKS CARDS */}
          <div className="artworks-artwork-cards">
            {artworks &&
              artworks.map((artwork) => {
                return (
                  <Link to={`/artworks/${artwork._id}`} key={artwork._id}>
                    <ArtworkCard
                      name={artwork.artist.real_name}
                      title={artwork.title}
                      dimensions={
                        artwork.dimensions.x +
                        " x " +
                        artwork.dimensions.y +
                        (artwork.dimensions.z
                          ? " x " + artwork.dimensions.z
                          : "")
                      }
                      year={artwork.year}
                      img={artwork.images_url[0]}
                      medium={artwork.medium}
                    />
                  </Link>
                );
              })}
            {artworks && artworks.length === 0 && (
              <div className="artworks-no-artworks-wrapper">
                <div className="artworks-no-artworks-icon-wrapper">
                  <img src="/img/media.png" alt="" />
                </div>
                <h3 className="artworks-no-artworks-headline">
                  No Artworks Found
                </h3>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ArtworksPage;
