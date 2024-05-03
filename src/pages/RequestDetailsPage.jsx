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
  const [extensionIsRequested, setExtensionIsRequested] = useState(false);
  const [newEndDate, setNewEndDate] = useState(null);

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

  // * request for an extension of end date
  const extendRentalElement = (
    <>
      <div className="request-extension-wrapper">
        <div className="request-extension-interface-wrapper">
          <input
            className="request-extension-interface-checkbox"
            name="extension"
            type="checkbox"
            onChange={() => {
              setExtensionIsRequested(!extensionIsRequested);
              setNewEndDate(new Date(request.end_date).toJSON().slice(0, 10));
            }}
          />
          <label
            className="request-extension-interface-label"
            htmlFor="extension"
          >
            Change Return Date
          </label>
        </div>
        {extensionIsRequested && (
          <div className="request-extension-newdate-wrapper">
            <label
              className="request-extension-interface-label"
              htmlFor="newEndDate"
            >
              Desired Return Date
            </label>
            <input
              className="request-extension-newdate-datepicker"
              name="newEndDate"
              type="date"
              // min={new Date(request.end_date).toJSON().slice(0, 10)}
              min={new Date().toJSON().slice(0, 10)}
              value={newEndDate}
              required
              onChange={(e) => {
                setNewEndDate(e.target.value);
              }}
            />
          </div>
        )}
      </div>
    </>
  );

  const changeRequestInfoElement = (
    <div className="change-request-infos-for-artist">
      <h3 className="request-details-request-infos-headline">
        Requested Return Date
      </h3>
      <p>
        {request &&
          request.change_request.change_requested &&
          request.change_request.new_end_date
            .slice(0, 10)
            .replace("-", "/")
            .replace("-", "/")}
      </p>
    </div>
  );

  // * calc days until rental ends
  function getDaysLeft() {
    if (request) {
      const todayDate = new Date();
      const endDate = new Date(request.end_date);
      const differenceMillis = endDate.getTime() - todayDate.getTime();
      const daysLeft = Math.floor(differenceMillis / (1000 * 60 * 60 * 24));
      return daysLeft;
    }
  }

  //  * ACTION ELEMENTS
  function renderActions() {
    //  user == artist
    if (user._id === request.artist._id) {
      if (request.artwork.is_borrowed) {
        if (request.change_request.change_requested) return acceptRejectElement;
        return "";
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
    <div className="request-status-renting-wrapper">
      <h3 className="request-status-days-left">
        Return Artwork in {state === "accepted" && getDaysLeft()} Days
      </h3>
      {extensionIsRequested &&
        newEndDate !== new Date(request.end_date).toJSON().slice(0, 10) && (
          <button
            onClick={() => {
              handleButtonClick("extension");
            }}
            className="request-button accepted"
          >
            request change
          </button>
        )}
    </div>
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
        if (request && request.change_request.change_requested) {
          acceptChange();
        } else {
          acceptRequest();
        }
        return;
      case "rejected":
        if (request && request.change_request.change_requested) {
          rejectChange();
        } else {
          rejectRequest();
        }
        return;
      case "extension":
        requestExtension();
        return;
    }
  }

  function acceptChange() {
    // 1) make new notification, find notification in user and update
    const newNotification = {
      type: "confirm",
      request: request._id,
      text: `Your Request for changing the return date of the Artwork ${request.artwork.title} from artist ${request.artist.real_name} has been accepted.`,
      message: message,
      new: true,
    };
    userService
      .createNotification(request.user_borrowing._id, newNotification)
      // 2) find and delete the notification in artist
      .then(() => {
        return userService.getNotificationForRequest(
          request.artist._id,
          request._id
        );
      })
      .then((response) => {
        const notificationId = response.data._id;
        return userService.deleteNotification(
          request.artist._id,
          notificationId
        );
      })
      // 3) update the rental: new end date, reset change request
      .then(() => {
        const updatedRental = {
          change_request: {
            change_requested: false,
          },
          end_date: request.change_request.new_end_date
        };
        return rentalsService.updateRental(request._id, updatedRental);
      })
      .then(() => {
        navigate("/profile")
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function rejectChange() {
    console.log("rejected change");
    // 1) find the notification in user and update
    // 2) find the notification in artist and update
    // 3) update the rental: reset change request
  }

  function requestExtension() {
    // 1) make new notification
    const newNotification = {
      type: "new-request",
      request: request._id,
      text: `User ${request.user_borrowing.user_name} would like to change the return date of your Artwork ${request.artwork.title}.`,
      message: "",
      new: true,
    };
    // 2) make new notification in artist
    userService
      .createNotification(request.artist._id, newNotification)
      .then(() => {
        // 3) uopdate rental with extension request
        const updatedRental = {
          change_request: {
            change_requested: true,
            new_end_date: newEndDate,
          },
        };
        return rentalsService.updateRental(request._id, updatedRental);
      })
      .then(() => {
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
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
              request.end_date.slice(0, 10).replace("-", "/").replace("-", "/")}
          </p>

          {/* CHANGE REQUEST */}
          {user._id === request.user_borrowing._id &&
            !request.change_request.change_requested &&
            extendRentalElement}

          {user._id === request.artist._id &&
            request.change_request.change_requested &&
            changeRequestInfoElement}

          {user._id === request.user_borrowing._id &&
            request.change_request.change_requested &&
            changeRequestInfoElement}

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
