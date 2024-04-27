import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import userService from "../services/user.services";
import cityService from "../services/city.services";
import artworksService from "../services/artworks.services";
import uploadService from "../services/file-upload.services";
import Select from "react-select";
import "../styles/Forms.css";

function BecomeArtistPage() {
  const { user, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const [artistStatement, setArtistStatement] = useState("");
  const [realName, setRealName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postcode, setPostcode] = useState(null);

  const [title, setTitle] = useState("");
  const [year, setYear] = useState(2024);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [imageToUpload, setImageToUpload] = useState("")
  const [uploadedImages, setUploadedImages] = useState([])
  const [artworkCity, setArtworkCity] = useState("");
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

  function handleArtworkCitiesSelectChange(selectedOption) {
    setArtworkCity(selectedOption.value)
  }

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

  const [cityOptions, setCityOptions] = useState();

  useEffect(() => {
    cityService.getAllCities().then((response) => {
      let cityNames = response.data.map((oneCity) => {
        return { value: oneCity.name, label: oneCity.name };
      });
      // console.log(cityNames);
      setCityOptions(cityNames);
    });
  }, []);

  useEffect(() => {
    userService.getUser(user._id).then((response) => {
      const initialData = response.data;
      setRealName(initialData.real_name);
      setStreet(initialData.contact.address.street);
      setCity(initialData.contact.address.city);
      setCountry(initialData.contact.address.country);
      setPostcode(initialData.contact.address.postal_code);
    });
  }, [user]);

  function handleDeleteImage(e,index){
    e.preventDefault()
    const copiedImages = [...uploadedImages]
    copiedImages.splice(index, 1)
    setUploadedImages(copiedImages)
  }

  function handleImagesUpload(e){
    e.preventDefault()
    // const copiedImages = [imageToUpload,...localImagesUrl]
    // setLocalImagesUrl(copiedImages)
    // console.log(copiedImages)
    let uploadData = new FormData()
      uploadData.append("imageUrl", imageToUpload)
      
      // performs the action of sending the data
      uploadService.uploadImage(uploadData)
        .then((response) => {
          console.log("response is: ", response);
          // response carries "fileUrl" which we can use to update the state
          let copiedArray = [...uploadedImages, response.data.fileUrl]
          setUploadedImages(copiedArray)
        })
        .catch((err) => console.log("Error while uploading the file: ", err));
      
  }

  function handleSubmit(e) {
    e.preventDefault();

    // upload images to cloudinary
    // handleFilesUpload(localImagesUrl)
    // console.log("returned url array from file upload", uploadedImages)
    // get the URLs back and put them into an array

    const newArtwork = {
        title:title,
        year:year,
        artist:user._id,
        city:city,
        dimensions:{
            x:dimensionsX,
            y:dimensionsY,
            z:dimensionsZ
        },
        images_url:uploadedImages,
        medium:medium,
        genre:genre
    }

    userService.updateUser(user._id, {isArtist:true})
    .then((response)=>{
        console.log(response.data)
    })
    .catch((err)=>{
        console.log(err)
    })

    artworksService.createArtwork(newArtwork)
    .then((response)=>{
        console.log("successfully created a new artwork")
        const newArtwork = response.data.newArtwork
        navigate(`/artworks/${newArtwork._id}`)
    })
    .catch((err)=>{
        console.log(err)
    })

  }

  return (
    <div className="page-wrapper mobile-dvh">
      <div className="heading-wrapper">
        <h1>Become an Artist</h1>
        <button
          className="back-button"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          {"< Back"}
        </button>
      </div>
      <form className="form" onSubmit={(e)=>{handleSubmit(e)}}>
        <label htmlFor="real name">Real Name</label>
        <input
          className="input"
          type="text"
          name="real name"
          value={realName}
          onChange={(e) => {
            setRealName(e.target.value);
          }}
        />

        <label htmlFor="artist statement">Artist Statement</label>
        <textarea
          className="textarea"
          name="artist statement"
          value={artistStatement}
          onChange={(e) => {
            setArtistStatement(e.target.value);
          }}
          placeholder="Write a short description of your artistic practice"
        />

        <h4>Contact Information</h4>
        <label htmlFor="street">Street name and number</label>
        <input
          name="street"
          type="text"
          className="input"
          value={street}
          onChange={(e) => {
            setStreet(e.target.value);
          }}
        />

        {/* City select */}
        <Select
          options={cityOptions}
          onChange={handleCitiesSelectChange}
          value={{ label: city }}
          styles={selectStles}
        />

        <label htmlFor="">Country</label>

        <label htmlFor="">Postal Code</label>

        <h4>Upload Artwork</h4>

        <label htmlFor="title">Title</label>
        <input
          name="title"
          type="text"
          className="input"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <label htmlFor="year">Year</label>
        <input
          name="year"
          type="number"
          className="input"
          value={year}
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
          onChange={handleArtworkCitiesSelectChange}
          value={{ label: city }}
          styles={selectStles}
        />

        <label htmlFor="">Images</label>
        <input type="file" className="input" onChange={(e)=>{setImageToUpload(e.target.files[0])}} />
        <button onClick={(e)=>{handleImagesUpload(e)}}>Upload Image</button>
        {uploadedImages &&
              uploadedImages.map((oneImage, index) => {
                return (
                  <div key={index} className="create-artwork-img-wrapper">
                    <img src={oneImage} alt={title} />
                    <button className="create-artwork-delete-img-button" onClick={(e)=>{handleDeleteImage(e,index)}}>x</button>
                  </div>
                );
              })}

        <label htmlFor="">Dimensions</label>
        <div className="create-dimensions-wrapper">
          <input
            className="create-artwork-input"
            type="number"
            value={dimensionsX}
            onChange={(e) => {
              setDimensionsX(e.target.value);
            }}
          />
          x
          <input
            className="create-artwork-input"
            type="number"
            value={dimensionsY}
            onChange={(e) => {
              setDimensionsY(e.target.value);
            }}
          />
          y
          <input
            className="create-artwork-input"
            type="number"
            value={dimensionsZ}
            onChange={(e) => {
              setDimensionsZ(e.target.value);
            }}
          />
          z
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

export default BecomeArtistPage;