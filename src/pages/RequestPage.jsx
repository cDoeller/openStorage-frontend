import React, { useState } from "react";
import "../styles/RequestPage.css";

function RequestPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transportation, setTransportation] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState("");
  const [pickupDetails, setPickupDetails] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="page-wrapper request-wrapper">
      {/* ARTWORK DISPLAY */}
      <h3 className="request-headline">Request Details</h3>
      <div className="request-artwork-wrapper">
        <div className="request-artwork-image-wrapper">
          <img src="/img/barbara.jpg" alt="" />
        </div>
        <div className="request-artwork-info-wrapper">
          <p className="request-artwork-info-text">text</p>
          <p className="request-artwork-info-text">text</p>
          <p className="request-artwork-info-text">text</p>
          <p className="request-artwork-info-text">text</p>
        </div>
      </div>

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

        {/* Pickup Details*/}
        <label htmlFor="" className="request-artwork-form-label">
          Delivery Details
          <input
            value={deliveryDetails}
            onChange={(e) => setDeliveryDetails(e.target.value)}
            type="text"
            className="request-artwork-form-input"
          ></input>
        </label>

        {/* Pickup Details*/}
        <label htmlFor="" className="request-artwork-form-label">
          Pickup Details
          <input
            value={pickupDetails}
            onChange={(e) => setPickupDetails(e.target.value)}
            type="text"
            className="request-artwork-form-input"
          ></input>
        </label>

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
