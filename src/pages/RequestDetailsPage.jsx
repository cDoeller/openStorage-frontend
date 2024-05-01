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
        // console.log(response.data);
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

  //  * ACTION ELEMENTS
  function renderActions() {
    //  user == artist
    if (user._id === request.artist._id) {
      if (request.artwork.is_borrowed) {
        return ongoingRentalElement;
        // return cancelRentalElement;
      }
      return acceptRejectElement;
    }
    // user == borrower
    if (user._id === request.user_borrowing._id) {
      if (request.artwork.is_borrowed) {
        return ongoingRentalElement;
        // return cancelRentalElement;
      }
      return cancelRequestElement;
    }
  }

  //   Action Elements JSX
  const ongoingRentalElement = (
    <>
      <h3 className="request-status-headline">Ongoing Rental</h3>
    </>
  );

  const acceptRejectElement = (
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
    </>
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

  // Action Buttons Functionality
  function handleButtonClick(action) {
    switch (action) {
      case "cancelled":
        cancelRequest();
        return;
      case "accepted":
        acceptRequest();
        return;
      case "rejected":
        rejectRequest();
        return;
    }
  }

  function rejectRequest() {
    // 1) make new notification for borrower
    const rejectedNotification = {
      type: "confirm",
      request: request._id,
      text: `Unfortunately, your request for the artwork ${request.artwork.title} has been rejected by the artist.`,
      message: message,
      new: true,
    };
    userService
      .createNotification(request.user_borrowing._id, rejectedNotification)
      .then(() => {
        // 2) get the notification id in artist
        return userService.getNotificationForRequest(
          request.artist._id,
          request._id
        );
      })
      .then((response) => {
        // 3) update notification in the artist user
        const notificationId = response.data._id;
        const updatedNotification = {
          type: "confirm",
          request: request._id,
          text: `The request for your artwork ${request.artwork.title} has been successfully rejected.`,
          message: "",
          new: true,
        };
        return userService.updateNotification(
          request.artist._id,
          notificationId,
          updatedNotification
        );
      })
      .then(() => {
        // 4) delete the rental
        return rentalsService.deleteRental(request._id);
      })
      .then(() => {
        navigate("/profile");
      })
      .catch((err) => console.log(err));
  }

  function acceptRequest() {
    // 1) make new notification for borrower
    const acceptedNotification = {
      type: "new-rental",
      request: request._id,
      text: `Congratulations – You are now renting the artwork ${request.artwork.title}!`,
      message: message,
      new: true,
    };
    userService
      .createNotification(request.user_borrowing._id, acceptedNotification)
      .then(() => {
        // 2) get and delete the notification for new request in artist
        return userService.getNotificationForRequest(
          request.artist._id,
          request._id
        );
      })
      .then((response) => {
        return userService.deleteNotification(
          request.artist._id,
          response.data._id
        );
      })
      .then(() => {
        // 3) change the rental state
        return rentalsService.updateRental(request._id, { state: "accepted" });
      })
      .then(() => {
        // 4) change the artwork is_borrowed value
        return artworksService.updateArtwork(request.artwork._id, {
          is_borrowed: true,
        });
      })
      .then(() => {
        navigate("/profile");
      })
      .catch((err) => console.log(err));
  }

  function cancelRequest() {
    // 1) make new notification
    const updatedNotification = {
      type: "confirm",
      request: request._id,
      text: `The Request for your Artwork ${request.artwork.title} from user ${request.user_borrowing.user_name} has been cancelled.`,
      message: "",
      new: true,
    };
    // 2) find corresponding notification in artist
    userService
      .getNotificationForRequest(request.artist._id, request._id)
      .then((response) => {
        const notificationId = response.data._id;
        // 3) update notification in the artist user
        return userService.updateNotification(
          request.artist._id,
          notificationId,
          updatedNotification
        );
      })
      .then(() => {
        //  4) delete the rental
        return rentalsService.deleteRental(request._id);
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
      {user && request && state && (
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

          {/* Action Elements */}
          {renderActions()}
        </div>
      )}
    </div>
  );
}

export default RequestDetailsPage;
