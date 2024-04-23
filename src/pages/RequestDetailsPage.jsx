import React, { useState, useEffect, useContext } from "react";
import "../styles/RequestDetailsPage.css";
import "../styles/RequestPage.css";
import { useParams, useNavigate } from "react-router-dom";
import rentalsService from "../services/rentals.services";
import artworksService from "../services/artworks.services";
import { AuthContext } from "../context/auth.context";

function RequestDetailsPage() {
  const [request, setRequest] = useState(null);
  const [state, setState] = useState("");

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
    if (user._id === request.artist._id) {
      if (request.artwork.is_borrowed) {
        return cancelRentalElement;
      }
      return acceptRejectButtonElement;
    }
    if (user._id === request.user_borrowing._id) {
      if (request.artwork.is_borrowed) {
        return cancelRentalElement;
      }
      return cancelRequestElement;
    }
  }

  //   button elements
  const acceptRejectButtonElement = (
    <div className="request-button-wrapper">
      <button
        onClick={() => {
          handleButtonClick("accepted");
        }}
        className="request-button accepted"
      >
        accept
      </button>
      <button
        onClick={() => {
          handleButtonClick("rejected");
        }}
        className="request-button rejected"
      >
        reject
      </button>
    </div>
  );
  const cancelRequestElement = (
    <div className="request-button-wrapper">
      <button
        onClick={() => {
          handleButtonClick("cancelled");
        }}
        className="request-button"
      >
        cancel request
      </button>
    </div>
  );
  const cancelRentalElement = (
    <div className="request-button-wrapper">
      <button
        onClick={() => {
          // THIS IS AN EXTRA
          // NOTIFICATION 
          // state: cancelled?
        }}
        className="request-button"
      >
        cancel rental
      </button>
    </div>
  );

  // button cancel / reject / accept functionality
  function handleButtonClick(action) {
    if (action === "cancelled") {
      rentalsService
        .deleteRental(id)
        .then(() => {
          navigate("/profile");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      rentalsService
        .updateRental(id, { state: action })
        .then((response) => {
          console.log(response.data);
          setState(action);
        })
        .then(() => {
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
                  {request.artist.user_name}
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
                {request.user_borrowing.user_name}
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
