import React, { useEffect, useState } from "react";
import "../styles/FilterInterface.css";
import artworksService from "../services/artworks.services";

function FilterInterface(props) {
  const { setArtworks } = props;

  const [city, setCity] = useState("");
  const [medium, setMedium] = useState("");
  const [genre, setGenre] = useState("");
  const [dimensions, setDimensions] = useState({ x: 100, y: 100, z: 0 });
  const [artist, setArtist] = useState("");

  const media = ["Photography", "Painting", "Installation", "Drawing"];
  const genres = [
    "Surreal",
    "Dada",
    "Minimalism",
    "Digital Art",
    "Abstract",
    "Figurative",
    "Conceptual Art"
  ];

  // Filtering
  useEffect(() => {
    let queryString = "?";
    queryString += `city=${city}&`;
    queryString += `medium=${medium}&`;
    queryString += `genre=${genre}&`;
    queryString += `dimensions-x=${dimensions.x}&`;
    queryString += `dimensions-y=${dimensions.y}&`;
    queryString += `dimensions-z=${dimensions.z}&`;
    queryString += `artist=${artist}`;
    // if (artist !== "") queryString += `artist=${artist}`;

    artworksService
      .getArtworkQuery(queryString)
      .then((response) => {
        console.log(response.data);
        setArtworks(response.data);
      })
      .catch((err) => console.log(err));

  }, [city, medium, genre, dimensions, artist]);

  function resetAll() {
    setCity("");
    setMedium("");
    setGenre("");
    setDimensions({ x: 100, y: 100, z: 0 });
    setArtist("");
  } 

  return (
    <div className="filterinterface-wrapper">
      <form action="" className="filterinterface-form">
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

        <label htmlFor="" className="filterinterface-form-label">
          Artist
          <input
            className="filterinterface-form-input"
            type="text"
            value={artist}
            onChange={(e) => {
              setArtist(e.target.value);
            }}
          />
        </label>

        <button type="button" onClick={resetAll} className="filterinterface-reset-button">
          Reset
        </button>
      </form>
    </div>
  );
}

export default FilterInterface;
