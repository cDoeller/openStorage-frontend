import React from "react";
import "../styles/styles-components/Loading.css"

function Loading() {
  return (
    <div className="loading-wrapper mobile-dvh">
      <div className="loading-logo-wrapper rotating">
        <img src="../../public/img/spinner.png" alt="" className="loading-logo"/>
      </div>
      {/* <h3 className="loading-text">loading..</h3> */}
    </div>
  );
}

export default Loading;
