import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import Select from "react-select";
import cityService from "../services/city.services";

function CreateArtworkPage() {
  const { isLoggedIn, user } = useContext(AuthContext);

  const [cityOptions, setCityOptions] = useState();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState(new Date());
  const [images, setImages] = useState([]);
  const [city, setCity] = useState("");
  const [dimensionsX, setDimensionsX] = useState(0);
  const [dimensionsY, setDimensionsY] = useState(0);
  const [dimensionsZ, setDimensionsZ] = useState(0);
  const [medium, setMedium] = useState("");
  const [genre, setGenre] = useState("");

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

  // REACT SELECT HANDLE SELECT FUNCTIONS
  function handleMediaSelectChange(selectedOption) {
    setMedium(selectedOption.value);
  }
  function handleGenreSelectChange(selectedOption) {
    setGenre(selectedOption.value);
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

  useEffect(() => {
    cityService.getAllCities().then((response) => {
      let cityNames = response.data.map((oneCity) => {
        return { value: oneCity.name, label: oneCity.name };
      });
      console.log(cityNames);
      setCityOptions(cityNames);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div id="CreateArtworkPage" className="page-wrapper">
      <h1>Create Artwork</h1>
      <form className="create-artwork-form">
        <label htmlFor="title">Title</label>
        <input
          name="title"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <h5>Year</h5>
        <input
          className="edit-artwork-input"
          value={year}
          type="number"
          onChange={(e) => {
            setYear(e.target.value);
          }}
        />

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

        <h5>Dimensions</h5>
        <div className="edit-dimensions">
          <input
            className="edit-artwork-input"
            type="number"
            value={dimensionsX}
            onChange={(e) => {
              setDimensionsX(e.target.value);
            }}
          />
          x
          <input
            className="edit-artwork-input"
            type="number"
            value={dimensionsY}
            onChange={(e) => {
              setDimensionsY(e.target.value);
            }}
          />
          y
          <input
            className="edit-artwork-input"
            type="number"
            value={dimensionsZ}
            onChange={(e) => {
              setDimensionsZ(e.target.value);
            }}
          />
          z
        </div>

        <div className="artwork-details-img">
          <label htmlFor="images">Images</label>
          <input name="images" type="text" />
          <button>Upload Image</button>
          <div className="artwork-thumbnail-wrapper">
            {images &&
              images.map((oneImage, index) => {
                return (
                  <div key={index} className="artwork-thumbnail">
                    <img src={oneImage} alt={title} />
                  </div>
                );
              })}
          </div>
        </div>
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
            <button>Submit</button>
      </form>
    </div>
  );
}

export default CreateArtworkPage;
