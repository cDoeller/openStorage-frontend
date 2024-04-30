import React, { useState, useEffect, useContext } from "react";
import "../styles/RequestDetailsPage.css";
import "../styles/RequestPage.css";
import { useParams, useNavigate } from "react-router-dom";
import rentalsService from "../services/rentals.services";
import artworksService from "../services/artworks.services";
import userService from "../services/user.services";
import { AuthContext } from "../context/auth.context";

function RequestDetailsPage() {
  const [request, setRequest] = useState(null);
  const [state, setState] = useState("");
  const [message, setMessage] = useState("");

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    rentalsService
      .getRental(id)
      .then((response) => {
        console.log(response.data);
        setRequest(response.data);
        return response.data;
      })
      .then((response) => {
        setState(response.state);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  //  * BUTTONS
  function renderActionButtons() {
    // if user is the artist
    if (user._id === request.artist._id) {
      // 1) if work is rented, show "cancel rental" button
      if (request.artwork.is_borrowed) {
        return cancelRentalElement;
      }
      // 2) if work is free, show "accept/reject" buttons
      if (request.state === "cancelled") {
        return "";
      }
      // 3) if work is free, show "accept/reject" buttons
      return acceptRejectButtonElement;
    }
    // if user is the borrower
    if (user._id === request.user_borrowing._id) {
      // 3) if work is rented, show "cancel rental" button
      if (request.artwork.is_borrowed) {
        return cancelRentalElement;
      }
      // 4) if work is free, show "cancel request" button
      return cancelRequestElement;
    }
  }

  //   button elements
  const acceptRejectButtonElement = (
    <>
      <label htmlFor="">
        Message
        <textarea
          className="request-message-textarea"
          name=""
          id=""
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></textarea>
      </label>
      <div className="request-button-wrapper">
        <button
          onClick={() => {
            handleButtonClick("request-accepted");
          }}
          className="request-button accepted"
        >
          accept
        </button>
        <button
          onClick={() => {
            handleButtonClick("request-rejected");
          }}
          className="request-button rejected"
        >
          reject
        </button>
      </div>
    </>
  );

  const cancelRequestElement = (
    <div className="request-button-wrapper">
      <button
        onClick={() => {
          handleButtonClick("request-cancelled");
        }}
        className="request-button"
      >
        cancel request
      </button>
    </div>
  );

  const cancelRentalElement = (
    <div className="request-button-wrapper">
      <label htmlFor="">
        Message
        <textarea
          className="request-message-textarea"
          name=""
          id=""
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></textarea>
      </label>
      <button
        onClick={() => {
          handleButtonClick("retnal-cancelled");
        }}
        className="request-button"
      >
        cancel rental
      </button>
    </div>
  );

  // button cancel / reject / accept functionality
  // message <--------- continue here and tidy up
  // request-accepted
  // request-rejected
  // request-cancelled
  // retnal-cancelled
  // enum: ["new-request", "change-request", "confirm"]

  function handleButtonClick(action) {
    // 1) request-cancelled
    if (action === "request-cancelled") {
      // 1.1) make a notification to the artist
      const cancelledNotification = {
        type: "confirm",
        request: request._id,
        message: `The Request for your Artwork ${request.artwork.title} from user ${request.user_borrowing.user_name} has been cancelled.`,
      };
      console.log(cancelledNotification);
      userService
        .createNotification(request.artist._id, cancelledNotification)
        .then((response) => {
          console.log(response);
          // 1.2) update the request to be cancelled <-------
          // NOTIFICATION WILL CHANGE, CONDITIONAL RENDER
          return rentalsService.updateRental(request._id, {
            state: "cancelled",
          });
        })
        .then(() => {
          navigate("/profile");
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }

    rentalsService
      .updateRental(id, { state: action })
      .then((response) => {
        console.log(response.data);
        setState(action);
      })
      .then(() => {
        // * NOTIFICATION IF REJECTED, DELETED AFTER NOTIFICATION
        const borrowed = action === "rejected" ? false : true;
        artworksService
          .updateArtwork(request.artwork._id, { is_borrowed: borrowed })
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .then(() => {
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="page-wrapper">
      {request && state && (
        <div className="page-wrapper request-wrapper">
          <h3 className="request-headline">Request Details</h3>

          {/* ARTWORK DISPLAY */}
          <div className="request-artwork-info-wrapper-sale">
            <div className="request-artwork-wrapper">
              <div className="request-artwork-image-wrapper">
                <img src={request.artwork.images_url[0]} alt="" />
              </div>
              <div className="request-artwork-info-wrapper">
                <p className="request-artwork-info-text">
                  {request.artist.real_name}
                </p>
                <p className="request-artwork-info-text">
                  {request.artwork.title}, {request.artwork.year}
                </p>
              </div>
            </div>
            {request.artwork.is_for_sale ? (
              <p className="request-artwork-info-text request-artwork-info-text-forSale">
                ✅ potentially for Sale
              </p>
            ) : (
              ""
            )}
          </div>

          {/* REQUEST STATE */}
          <h2 className={`request-details-request-state ${state}`}>{state}</h2>

          {/* REQUEST INFOS */}
          <h3 className="request-details-request-infos-headline">
            Requested by
          </h3>
          <p className="request-details-request-infos-text">
            {request.user_borrowing.user_name}
          </p>
          {/* rental period */}
          <h3 className="request-details-request-infos-headline">
            Rental Period
          </h3>
          <p className="request-details-request-infos-text">
            {request.start_date
              .slice(0, 10)
              .replace("-", "/")
              .replace("-", "/") +
              " – " +
              request.start_date
                .slice(0, 10)
                .replace("-", "/")
                .replace("-", "/")}
          </p>
          {/* transportation */}
          <h3 className="request-details-request-infos-headline">
            Transportation
          </h3>
          <p className="request-details-request-infos-text">
            {request.transportation}
          </p>
          {/* delivery details */}
          {request.transportation === "delivery" ? (
            <>
              <h3 className="request-details-request-infos-headline">
                Delivery Details
              </h3>
              <p className="request-details-request-infos-text">
                {request.transportation_details.street}
              </p>
              <p className="request-details-request-infos-text">
                {request.transportation_details.postal_code +
                  " " +
                  request.transportation_details.city}
              </p>
              <p className="request-details-request-infos-text">
                {request.transportation_details.country}
              </p>
            </>
          ) : (
            ""
          )}
          {/* Message */}
          {request.message && (
            <>
              <h3 className="request-details-request-infos-headline">
                Message
              </h3>
              <p className="request-details-request-infos-text">
                {request.message}
              </p>
            </>
          )}
          {/* buttons */}
          {user && renderActionButtons()}
        </div>
      )}
    </div>
  );
}

export default RequestDetailsPage;
