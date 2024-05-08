import React, { useEffect, useState } from "react";
import "../styles/styles-components/FilterInterface.css";
import artworksService from "../services/artworks.services";
import Select from "react-select";

function FilterInterface(props) {
  const {
    setArtworks,
    filterStates,
    allArtists,
    allCities,
    allGenres,
    allMedia,
    setAllArtists,
    setAllCities,
    setAllGenres,
    setAllMedia,
  } = props;
  const { city, medium, genre, dimensions, artistId, artistName } =
    filterStates;

  // Filtering
  useEffect(() => {
    let queryString = "?";
    if (city.state) queryString += `city=${city.state}&`;
    if (medium.state) queryString += `medium=${medium.state}&`;
    if (genre.state) queryString += `genre=${genre.state}&`;
    if (dimensions.state.x)
      queryString += `dimensions_x=${dimensions.state.x}&`;
    if (dimensions.state.y)
      queryString += `dimensions_y=${dimensions.state.y}&`;
    if (dimensions.state.z)
      queryString += `dimensions_z=${dimensions.state.z}&`;
    if (artistId.state) queryString += `artist=${artistId.state}`;

    // console.log(queryString);

    artworksService
      .getArtworkQuery(queryString)
      .then((response) => {
        console.log(response.data);
        setArtworks(response.data.artworks);
        setAllArtists(response.data.uniqueArtists);
        setAllCities(response.data.uniqueCities);
        setAllGenres(response.data.uniqueGenres);
        setAllMedia(response.data.uniqueMedia);
      })
      .catch((err) => console.log(err));
  }, [city.state, medium.state, genre.state, dimensions.state, artistId.state]);

  function resetAll() {
    city.setter("");
    medium.setter("");
    genre.setter("");
    dimensions.setter({ x: 0, y: 0, z: 0 });
    artistName.setter("");
    artistId.setter("");
  }

  // REACT SELECT OPTIONS
  let genreOptions = [{ value: "", label: "-" }];
  if (allGenres) {
    console.log();
    allGenres.forEach((oneGenre) => {
      genreOptions.push({ value: oneGenre, label: oneGenre });
    });
  }
  let mediaOptions = [{ value: "", label: "-" }];
  if (allMedia) {
    allMedia.forEach((oneMedium) => {
      mediaOptions.push({ value: oneMedium, label: oneMedium });
    });
  }
  let cityOptions = [{ value: "", label: "-" }];
  if (allCities) {
    allCities.forEach((oneCity) => {
      cityOptions.push({ value: oneCity, label: oneCity });
    });
  }
  // artists: value = id
  let artistOptions = [{ value: "", label: "-" }];
  if (allArtists) {
    allArtists.forEach((oneArtist) => {
      artistOptions.push({ value: oneArtist._id, label: oneArtist.real_name });
    });
  }

  // REACT SELECT HANDLE SELECT FUNCTIONS
  function handleMediaSelectChange(selectedOption) {
    medium.setter(selectedOption.value);
  }
  function handleGenreSelectChange(selectedOption) {
    genre.setter(selectedOption.value);
  }
  function handleArtistSelectChange(selectedOption) {
    artistId.setter(selectedOption.value);
    artistName.setter(selectedOption.label);
  }
  function handleCitiesSelectChange(selectedOption) {
    city.setter(selectedOption.value);
  }

  // REACT SELECT STYLING
  // https://react-select.com/styles#inner-components
  const selectStles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      border: "0",
      outline: "red",
      borderRadius: "10px",
      boxShadow: "0 0 1rem var(--greydark)",
      padding: "0.2rem",
    }),
    container: (baseStyles, state) => ({
      ...baseStyles,
      outline: "red",
      border: "none",
      borderRadius: "0",
    }),
    dropdownIndicator: (baseStyles, state) => ({
      ...baseStyles,
      border: "none",
      outline: "none",
      color: "black",
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      margin: "0",
      borderRadius: "0",
      maxHeight: "7rem",
      overflow: "scroll",
    }),
  };

  return (
    <div className="filterinterface-wrapper">
      <form action="" className="filterinterface-form">
        {/* CITY */}
        <label htmlFor="" className="filterinterface-form-label">
          City
        </label>
        <Select
          options={cityOptions}
          onChange={handleCitiesSelectChange}
          value={{ label: city.state }}
          styles={selectStles}
        />

        {/* MEDIUM */}
        <label htmlFor="" className="filterinterface-form-label">
          Medium
        </label>
        <Select
          options={mediaOptions}
          onChange={handleMediaSelectChange}
          value={{ label: medium.state }}
          styles={selectStles}
        />

        {/* GENRE */}
        <label htmlFor="" className="filterinterface-form-label">
          Genre
        </label>
        <Select
          options={genreOptions}
          onChange={handleGenreSelectChange}
          value={{ label: genre.state }}
          styles={selectStles}
        />

        {/* DIMENSIONS */}
        <label
          htmlFor=""
          className="filterinterface-form-label filterinterface-dimensions"
        >
          Max Dimensions [cm]
          <div className="filterinterface-form-dimension-input-wrapper">
            <input
              className="filterinterface-form-input filterinterface-form-dimension-input"
              type="number"
              value={dimensions.state.x ? dimensions.state.x : ""}
              onChange={(e) => {
                const newDim = {
                  x: e.target.value,
                  y: dimensions.state.y,
                  z: dimensions.state.z,
                };
                dimensions.setter(newDim);
              }}
            />
            x
            <input
              className="filterinterface-form-input filterinterface-form-dimension-input"
              type="number"
              value={dimensions.state.y ? dimensions.state.y : ""}
              onChange={(e) => {
                const newDim = {
                  x: dimensions.state.x,
                  y: e.target.value,
                  z: dimensions.state.z,
                };
                dimensions.setter(newDim);
              }}
            />
            x
            <input
              className="filterinterface-form-input filterinterface-form-dimension-input"
              type="number"
              value={dimensions.state.z ? dimensions.state.z : ""}
              onChange={(e) => {
                const newDim = {
                  x: dimensions.state.x,
                  y: dimensions.state.y,
                  z: e.target.value,
                };
                dimensions.setter(newDim);
              }}
            />
          </div>
        </label>

        {/* ARTIST */}
        {/* npm install --global yarn */}
        {/* yarn add react-select */}
        <label
          htmlFor=""
          className="filterinterface-form-label filterinterface-form-input-autosuggest-label"
        >
          Artist
        </label>
        <Select
          options={artistOptions}
          onChange={handleArtistSelectChange}
          value={{ label: artistName.state }}
          styles={selectStles}
        />

        {/* RESET BUTTON */}
        <button
          type="button"
          onClick={resetAll}
          className="filterinterface-reset-button button"
        >
          Reset Filters
        </button>
      </form>
    </div>
  );
}

export default FilterInterface;
