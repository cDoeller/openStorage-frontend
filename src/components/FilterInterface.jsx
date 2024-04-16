import React, { useEffect, useState } from "react";
import "../styles/FilterInterface.css";
import artworksService from "../services/artworks.services";
import Select from "react-select";

function FilterInterface(props) {
  const { setArtworks, allArtists } = props;

  const [city, setCity] = useState("");
  const [medium, setMedium] = useState("");
  const [genre, setGenre] = useState("");
  const [dimensions, setDimensions] = useState({ x: 100, y: 100, z: 0 });
  const [artistId, setArtistId] = useState("");
  const [artistName, setArtistName] = useState("- type / select -");

  const media = ["Photography", "Painting", "Installation", "Drawing"];
  const genres = [
    "Surreal",
    "Dada",
    "Minimalism",
    "Digital Art",
    "Abstract",
    "Figurative",
    "Conceptual Art",
  ];

  // Filtering
  useEffect(() => {
    console.log(artistName);

    let queryString = "?";
    queryString += `city=${city}&`;
    queryString += `medium=${medium}&`;
    queryString += `genre=${genre}&`;
    queryString += `dimensions-x=${dimensions.x}&`;
    queryString += `dimensions-y=${dimensions.y}&`;
    queryString += `dimensions-z=${dimensions.z}&`;
    queryString += `artist=${artistId}`;

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
    setDimensions({ x: 100, y: 100, z: 0 });
    setArtistName("- type / select -");
    setArtistId("");
  }

  // ** react-select for artists
  let options = [{ value: "", label: "- type / select -" }];

  // make options array { value: "vanilla", label: "Vanilla" },
  if (allArtists) {
    allArtists.forEach((oneArtist) => {
      options.push({ value: oneArtist._id, label: oneArtist.user_name });
    });
  }

  function handleSelectChange(selectedOption) {
    setArtistId(selectedOption.value);
    setArtistName(selectedOption.label);
  }

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
          <input
            className="filterinterface-form-input"
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </label>

        {/* MEDIUM */}
        <label htmlFor="" className="filterinterface-form-label">
          Medium
          <select
            className="filterinterface-form-input"
            type="text"
            value={medium}
            onChange={(e) => {
              setMedium(e.target.value);
            }}
          >
            <option value={""}>-</option>
            {media.map((medium) => {
              return (
                <option value={medium} key={medium}>
                  {medium}
                </option>
              );
            })}
          </select>
        </label>

        {/* GENRE */}
        <label htmlFor="" className="filterinterface-form-label">
          Genre
          <select
            className="filterinterface-form-select"
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          >
            <option value={""}>-</option>
            {genres.map((genre) => {
              return (
                <option value={genre} key={genre}>
                  {genre}
                </option>
              );
            })}
          </select>
        </label>

        {/* DIMENSIONS */}
        <label htmlFor="" className="filterinterface-form-label">
          Dimensions [cm]
          <div className="filterinterface-form-dimension-input-wrapper">
            <input
              className="filterinterface-form-input filterinterface-form-dimension-input"
              type="text"
              value={dimensions.x}
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
              type="text"
              value={dimensions.y}
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
              type="text"
              value={dimensions.z}
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
          options={options}
          onChange={handleSelectChange}
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
