import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/styles-pages/RequestPage.css";
import artworksService from "../services/artworks.services";
import { AuthContext } from "../context/auth.context";
import rentalsService from "../services/rentals.services";
import userService from "../services/user.services";
import Select from "react-select";

const minRentalWeeks = 4;

function RequestPage() {
  const [startDate, setStartDate] = useState(new Date().toJSON().slice(0, 10));
  const [endDate, setEndDate] = useState(
    addMinWeeks(new Date(startDate)).toJSON().slice(0, 10)
  );
  const [minEndDate, setMinEndDate] = useState("");
  const [transportation, setTransportation] = useState("delivery");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [artwork, setArtwork] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    artworksService
      .getArtwork(id)
      .then((response) => {
        setArtwork(response.data);
      })
      .catch((err) => console.log(err));

    // * PREFILL DELIVERY FORM
    userService
      .getUser(user._id)
      .then((response) => {
        if (response.data.contact) {
          if (!response.data.contact.address) return;
          setStreet(response.data.contact.address.street);
          setCity(response.data.contact.address.city);
          setCountry(response.data.contact.address.country);
          setPostalCode(response.data.contact.address.postal_code);
        }
      })
      .catch((err) => console.log(err));
  }, [id, user]);

  // * ERROR MESSAGE ELEMENT
  const errorMessageElement = (
    <h3 className="page-error-messages">{errorMessage}</h3>
  );

  // * DATES TO PICK
  const todayDate = new Date().toJSON().slice(0, 10);

  function addMinWeeks(date = new Date()) {
    date.setDate(date.getDate() + minRentalWeeks * 7);
    return date;
  }

  useEffect(() => {
    setMinEndDate(addMinWeeks(new Date(startDate)).toJSON().slice(0, 10));
    const startDatePlusTwoWeeks = addMinWeeks(new Date(startDate));
    // if end date less than startdate + 2 weeks, set end date: startdate + 2 weeks
    if (new Date(endDate).getTime() < startDatePlusTwoWeeks.getTime()) {
      setEndDate(addMinWeeks(new Date(startDate)).toJSON().slice(0, 10));
    }
  }, [startDate]);

  // * SUBMIT FORM
  function handleSubmit(e) {
    e.preventDefault();

    let transportation_details;
    transportation === "pickup"
      ? (transportation_details = {})
      : (transportation_details = {
          street: street,
          postal_code: postalCode,
          city: city,
          country: country,
        });

    const newRental = {
      artwork: artwork._id,
      user_borrowing: user._id,
      artist: artwork.artist._id,
      start_date: startDate,
      end_date: endDate,
      transportation: transportation,
      transportation_details: transportation_details,
      message: message,
      is_approved: false,
    };

    // create rental and notification
    rentalsService
      .createRental(newRental)
      .then((response) => {
        // console.log(response.data);
        const newNotification = {
          type: "new-request",
          text: `User ${user.user_name} would like
          to rent your artwork ${artwork.title} –
          click on the button below to view the request!`,
          message: "",
          request: response.data._id,
          new: true,
        };
        // create notification for artist
        return userService.createNotification(
          artwork.artist._id,
          newNotification
        );
      })
      .then(() => {
        navigate("/profile");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        console.log(err);
      });
  }

  // * DELIVERY ELEMENT
  const deliveryDetailsElement = (
    <>
      <label htmlFor="" className="request-artwork-form-label">
        Street / No.
        <input
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          type="text"
          required
          className="request-artwork-form-input input"
        ></input>
      </label>
      <label htmlFor="" className="request-artwork-form-label">
        Postal Code
        <input
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          type="number"
          required
          className="request-artwork-form-input input"
        ></input>
      </label>
      <label htmlFor="" className="request-artwork-form-label">
        City
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          required
          className="request-artwork-form-input input"
        ></input>
      </label>
      <label htmlFor="" className="request-artwork-form-label">
        Country
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          type="text"
          required
          className="request-artwork-form-input input"
        ></input>
      </label>
    </>
  );

  // React select transportation dropdown

  let transportOptions = [
    { value: "pickup", label: "pickup" },
    { value: "delivery", label: "delivery" },
  ];

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

  function handleTransportationSelectChange(selectedOption) {
    setTransportation(selectedOption.value);
  }

  return (
    <div className="page-wrapper request-wrapper">
      <h3 className="request-headline highlight">Request Details</h3>
      {/* ARTWORK DISPLAY */}
      {artwork && (
        <div className="request-artwork-info-wrapper-sale box-shadow">
          <div className="request-artwork-wrapper">
            <div className="request-artwork-image-wrapper">
              <img src={artwork.images_url[0]} alt="" />
            </div>
            <div className="request-artwork-info-wrapper">
              <p className="request-artwork-info-text">
                {artwork.artist.real_name}
              </p>
              <p className="request-artwork-info-text">
                {artwork.title}, {artwork.year}
              </p>
            </div>
          </div>
          {artwork.is_for_sale ? (
            <p className="request-artwork-info-text request-artwork-info-text-forSale">
              ✅ potentially for Sale
            </p>
          ) : (
            ""
          )}
        </div>
      )}

      {/* REQUEST FORM */}
      <form className="request-artwork-form" onSubmit={handleSubmit} action="">
        <div className="request-artwork-form-date-wrapper">
          {/* Start Date */}
          <label htmlFor="" className="request-artwork-form-label">
            Start Date
            <input
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              type="date"
              min={todayDate}
              required
              className="request-artwork-form-input-date request-artwork-form-input input"
            />
          </label>

          {/* End Date */}
          <label htmlFor="" className="request-artwork-form-label">
            End Date
            <input
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              type="date"
              min={minEndDate}
              required
              className="request-artwork-form-input-date request-artwork-form-input input"
            />
          </label>
        </div>

        {/* Transportation*/}
        <label htmlFor="" className="request-artwork-form-label">
          Transportation
        </label>
        <Select
          options={transportOptions}
          onChange={handleTransportationSelectChange}
          value={{ label: transportation }}
          styles={selectStles}
        />

        {/* Transportation Details*/}
        {transportation === "delivery" ? deliveryDetailsElement : ""}

        {/* Message*/}
        <label htmlFor="" className="request-artwork-form-label">
          Message
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="request-artwork-form-textarea textarea"
          ></textarea>
        </label>
        {errorMessage && errorMessageElement}
        <button className="request-artwork-form-button button" type="submit">
          Submit Request
        </button>
      </form>
    </div>
  );
}

export default RequestPage;
