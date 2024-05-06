import React, { useState } from "react";
import "../styles/styles-components/Popup.css";

function Popup(props) {
  const { showPopup, setShowPopup, headline, text, button } = props;

  return (
    <div className={showPopup ? "popup-wrapper" : "none"}>
      <div className="popup-content">
        <div className="popup-header-wrapper">
          <h3 className="popup-headline">{headline}</h3>
          <h3
            className="popup-headline popup-escape"
            onClick={() => {
              setShowPopup(false);
            }}
          >
            X
          </h3>
        </div>
        <p className="popup-text">{text}</p>
        {button}
      </div>
    </div>
  );
}

export default Popup;
