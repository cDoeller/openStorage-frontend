import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/RequestPage.css";
import artworksService from "../services/artworks.services";
import { AuthContext } from "../context/auth.context";

function RequestPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transportation, setTransportation] = useState("delivery");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // const [pickupDetails, setPickupDetails] = useState("");
  const [message, setMessage] = useState("");
  const [artwork, setArtwork] = useState(null);

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate ();

  useEffect(() => {
    artworksService
      .getArtwork(id)
      .then((response) => {
        setArtwork(response.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    let transportation_details;
    transportation === "pickup"
      ? (transportation_details = {})
      : (transportation_details = {
        street: street,
        postal_code: postalCode,
        city: city,
        country: country
      });

    const newRequest = {
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

    console.log(newRequest);

    // POST NEW REQUEST

    // NAVIGATE
    // navigate("/profile")
  }

  const deliveryDetailsElement = (
    <>
    <label htmlFor="" className="request-artwork-form-label">
      Street / No.
      <input
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        type="text"
        required
        className="request-artwork-form-input"
      ></input>
    </label>
    <label htmlFor="" className="request-artwork-form-label">
      Postal Code
      <input
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        type="text"
        required
        className="request-artwork-form-input"
      ></input>
    </label>
    <label htmlFor="" className="request-artwork-form-label">
      City
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        type="text"
        required
        className="request-artwork-form-input"
      ></input>
    </label>
    <label htmlFor="" className="request-artwork-form-label">
      Country
      <input
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        type="text"
        required
        className="request-artwork-form-input"
      ></input>
    </label>
    </>
  );

  return (
    <div className="page-wrapper request-wrapper">
      <h3 className="request-headline">Request Details</h3>
      {/* ARTWORK DISPLAY */}
      {artwork && (
        <div className="request-artwork-info-wrapper-sale">
          <div className="request-artwork-wrapper">
            <div className="request-artwork-image-wrapper">
              <img src={artwork.images_url[0]} alt="" />
            </div>
            <div className="request-artwork-info-wrapper">
              <p className="request-artwork-info-text">
                {artwork.artist.user_name}
              </p>
              <p className="request-artwork-info-text">
                {artwork.title}, {artwork.year}
              </p>
            </div>
          </div>
          <p className="request-artwork-info-text request-artwork-info-text-forSale">
            {artwork.isForSale ? "✅ potentially for Sale" : ""}
          </p>
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
              required
              className="request-artwork-form-input-date request-artwork-form-input"
            />
          </label>

          {/* End Date */}
          <label htmlFor="" className="request-artwork-form-label">
            End Date
            <input
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              type="date"
              required
              className="request-artwork-form-input-date request-artwork-form-input"
            />
          </label>
        </div>

        {/* Transportation*/}
        <label htmlFor="" className="request-artwork-form-label">
          Transportation
          <select
            value={transportation}
            onChange={(e) => setTransportation(e.target.value)}
            type="select"
            required
            className="request-artwork-form-input"
          >
            <option
              className="request-artwork-form-select-option"
              value="pickup"
            >
              Pickup
            </option>
            <option
              className="request-artwork-form-select-option"
              value="delivery"
            >
              Delivery
            </option>
          </select>
        </label>

        {/* Transportation Details*/}
        {transportation === "delivery"
          ? deliveryDetailsElement
          : ""}

        {/* Message*/}
        <label htmlFor="" className="request-artwork-form-label">
          Message
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="request-artwork-form-textarea"
          ></textarea>
        </label>
        <button className="request-artwork-form-button" type="submit">
          Submit Request
        </button>
      </form>
    </div>
  );
}

export default RequestPage;
