import React from "react";
import "../styles/styles-pages/HowTo.css";
import { useRef, useEffect } from "react";

function HowToPage() {
  const artistsRef = useRef(null);
  const artloversRef = useRef(null);
  const paymentRef = useRef(null);
  const currentRef = useRef(artistsRef);

  const handleClick = (refName) => {
    refName.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    currentRef.current = refName;
  };

  // DISABLE SCROLLING BEHAVIOR ON THIS PAGE
  useEffect(() => {
    const preventDefaultScroll = (event) => {
      event.preventDefault();
    };
    // add when mounted
    window.addEventListener("wheel", preventDefaultScroll, { passive: false });
    // remove when unmounted
    return () => {
      window.removeEventListener("wheel", preventDefaultScroll);
    };
  }, []);

  return (
    <div className="howto-page-wrapper page-wrapper">
      {/* nav buttons */}
      <section className="howto-nav-button-wrapper">
        <button
          onClick={() => {
            handleClick(artistsRef);
          }}
          className="howto-nav-button"
        >
          Artists
        </button>
        <button
          onClick={() => {
            handleClick(artloversRef);
          }}
          className="howto-nav-button"
        >
          Art Lovers
        </button>

        <button
          onClick={() => {
            handleClick(paymentRef);
          }}
          className="howto-nav-button"
        >
          Payment
        </button>
      </section>

      {/* FOR ARTISTS */}
      <section ref={artistsRef} className="howto-for-wrapper">
        <h2 className="howto-for-headline">Open Storage for Artists</h2>
        <ol className="howto-for-ol">
          <li className="howto-for-li">
            Sign Up and get verified for your personal Artist Account for free
          </li>
          <li className="howto-for-li">
            browse through your storage and choose works you would like to share
            with your local community
          </li>
          <li className="howto-for-li">
            Document your work and upload your images to your personal portfolio
          </li>
          <li className="howto-for-li">
            Wait for a rental request and make an appointment for delivery
          </li>
        </ol>
      </section>

      {/* FOR ART LOVERS */}
      <section ref={artloversRef} className="howto-for-wrapper">
        <h2 className="howto-for-headline">Open Storage for Art Lovers</h2>
        <ol className="howto-for-ol">
          <li className="howto-for-li">
            Sign Up for your personal Art Lover Account for free
          </li>
          <li className="howto-for-li">
            Brwose through our archive of local artists in your area and choose
            your favorite pieces
          </li>
          <li className="howto-for-li">
            Put it in your shopping cart and choose your payment method
          </li>
          <li className="howto-for-li">
            Pick up your favorite work or let it be delivered to your home
          </li>
        </ol>
      </section>

      {/* PAYMENT INFORMATION */}
      <section ref={paymentRef} className="artworks-paymentinfo-wrapper">
        <div className="artworks-paymentinfo-icon-wrapper">
          <img src="/img/handshake.png" alt="" />
        </div>
        <p className="artworks-paymentinfo-text">
          Our rental fees are fixed: no matter how famous, large or colourful,
          you pay <span className="highlight">€15 / month</span> for each work of art!
        </p>
      </section>
    </div>
  );
}

export default HowToPage;


//  trying to scroll automatically to next component
// idea: call handleScroll in event listener for scrolling

// const handleScroll = (event) => {
//   event.preventDefault(); // Prevent the default scrolling behavior

// find out if scrolled up or down
//   const delta = Math.max(-1, Math.min(1, event.deltaY)); // Get the direction of the scroll (up or down)

// *problem: how to know whats next or prev container?
//   if (delta < 0) {
//       // Scroll up - Go to the previous div container
//       scrollToPreviousContainer();
//   } else {
//       // Scroll down - Go to the next div container
//       scrollToNextContainer();
//   }
// };