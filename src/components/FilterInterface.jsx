import React, { useEffect, useState } from "react";
import "../styles/FilterInterface.css";
import artworksService from "../services/artworks.services";
import Select from "react-select";

function FilterInterface(props) {
  const { setArtworks, allArtists, allCities } = props;

  const [city, setCity] = useState("");
  const [medium, setMedium] = useState("");
  const [genre, setGenre] = useState("");
  const [dimensions, setDimensions] = useState({ x: 0, y: 0, z: 0 });
  const [artistId, setArtistId] = useState("");
  const [artistName, setArtistName] = useState("");

  // Filtering
  useEffect(() => {
    console.log(artistName);

    let queryString = "?";
    queryString += `city=${city}&`;
    queryString += `medium=${medium}&`;
    queryString += `genre=${genre}&`;
    if (dimensions.x) queryString += `dimensions-x=${dimensions.x}&`;
    if (dimensions.y) queryString += `dimensions-y=${dimensions.y}&`;
    if (dimensions.z) queryString += `dimensions-z=${dimensions.z}&`;
    queryString += `artist=${artistId}`;

    console.log(queryString);

    artworksService
      .getArtworkQuery(queryString)
      .then((response) => {
        // console.log(response.data);
        setArtworks(response.data);
      })
      .catch((err) => console.log(err));
  }, [city, medium, genre, dimensions, artistId]);

  function resetAll() {
    setCity("");
    setMedium("");
    setGenre("");
    setDimensions({ x: 0, y: 0, z: 0 });
    setArtistName("");
    setArtistId("");
  }

  // REACT SELECT OPTIONS
  let mediaOptions = [
    // { value: "", label: "- type / select -" },
    { value: "Photography", label: "Photography" },
    { value: "Painting", label: "Painting" },
    { value: "Installation", label: "Installation" },
    { value: "Drawing", label: "Drawing" },
  ];
  let genreOptions = [
    // { value: "", label: "- type / select -" },
    { value: "Surreal", label: "Surreal" },
    { value: "Dada", label: "Dada" },
    { value: "Minimalism", label: "Minimalism" },
    { value: "Digital Art", label: "Digital Art" },
    { value: "Abstract", label: "Abstract" },
    { value: "Figurative", label: "Figurative" },
    { value: "Conceptual Art", label: "Conceptual Art" },
  ];
  let cityOptions = [];
  if (allCities) {
    allCities.forEach((oneCity) => {
      cityOptions.push({ value: oneCity.name, label: oneCity.name });
    });
  }
  // artists: value = id
  let artistOptions = [];
  if (allArtists) {
    allArtists.forEach((oneArtist) => {
      artistOptions.push({ value: oneArtist._id, label: oneArtist.user_name });
    });
  }

  // REACT SELECT HANDLE SELECT FUNCTIONS
  function handleMediaSelectChange(selectedOption) {
    setMedium(selectedOption.value);
  }
  function handleGenreSelectChange(selectedOption) {
    setGenre(selectedOption.value);
  }
  function handleArtistSelectChange(selectedOption) {
    setArtistId(selectedOption.value);
    setArtistName(selectedOption.label);
  }
  function handleCitiesSelectChange(selectedOption) {
    setCity(selectedOption.value);
  }

  // REACT SELECT STYLING
  // https://react-select.com/styles#inner-components
  const selectStles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      border: "none",
      outline: "red",
      borderRadius: "0",
    }),
    container: (baseStyles, state) => ({
      ...baseStyles,
      outline: "red",
      border: "none",
      borderRadius: "0",
      borderBottom: "2px solid black",
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
          value={{ label: city }}
          styles={selectStles}
        />

        {/* MEDIUM */}
        <label htmlFor="" className="filterinterface-form-label">
          Medium
        </label>
        <Select
          options={mediaOptions}
          onChange={handleMediaSelectChange}
          value={{ label: medium }}
          styles={selectStles}
        />

        {/* GENRE */}
        <label htmlFor="" className="filterinterface-form-label">
          Genre
        </label>
        <Select
          options={genreOptions}
          onChange={handleGenreSelectChange}
          value={{ label: genre }}
          styles={selectStles}
        />

        {/* DIMENSIONS */}
        <label htmlFor="" className="filterinterface-form-label">
          Max Dimensions [cm]
          <div className="filterinterface-form-dimension-input-wrapper">
            <input
              className="filterinterface-form-input filterinterface-form-dimension-input"
              type="number"
              value={dimensions.x ? dimensions.x : ""}
              onChange={(e) => {
                const newDim = {
                  x: e.target.value,
                  y: dimensions.y,
                  z: dimensions.z,
                };
                setDimensions(newDim);
              }}
            />
            x
            <input
              className="filterinterface-form-input filterinterface-form-dimension-input"
              type="number"
              value={dimensions.y ? dimensions.y : ""}
              onChange={(e) => {
                const newDim = {
                  x: dimensions.x,
                  y: e.target.value,
                  z: dimensions.z,
                };
                setDimensions(newDim);
              }}
            />
            x
            <input
              className="filterinterface-form-input filterinterface-form-dimension-input"
              type="number"
              value={dimensions.z ? dimensions.z : ""}
              onChange={(e) => {
                const newDim = {
                  x: dimensions.x,
                  y: dimensions.y,
                  z: e.target.value,
                };
                setDimensions(newDim);
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
          value={{ label: artistName }}
          styles={selectStles}
        />

        {/* RESET BUTTON */}
        <button
          type="button"
          onClick={resetAll}
          className="filterinterface-reset-button"
        >
          Reset
        </button>
      </form>
    </div>
  );
}

export default FilterInterface;
