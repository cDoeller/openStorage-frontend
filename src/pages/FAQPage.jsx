import React from "react";
import "../styles/styles-pages/FAQPage.css";
import FAQQuestion from "../components/FAQQuestion";

function FAQPage() {
  const answer =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit nisi excepturi voluptate natus in, ipsam vel. Aliquam qui earum culpa dolore voluptates possimus cum harum in quibusdam. Dicta, cumque provident?";
  return (
    <div className="page-wrapper mobile-dvh">
      <div className="faq-questions-wrapper">
        <FAQQuestion question={"How can I get veryfied as an artist?"} answer={answer}></FAQQuestion>
        <FAQQuestion question={"Can I change the return date of my rental?"} answer={answer}></FAQQuestion>
        <FAQQuestion question={"Can I buy an artwork?"} answer={answer}></FAQQuestion>
        <FAQQuestion question={"How much does it cost to rent an artwork?"} answer={answer}></FAQQuestion>
        <FAQQuestion question={"Are there different rates for private and commercial customers?"} answer={answer}></FAQQuestion>
        <FAQQuestion question={"What happens if my parrot eats the artwork?"} answer={answer}></FAQQuestion>
        <FAQQuestion question={"Can I book an insurance?"} answer={answer}></FAQQuestion>
        <FAQQuestion question={"How is the transport organized?"} answer={answer}></FAQQuestion>
        <FAQQuestion question={"Are all artists poor?"} answer={answer}></FAQQuestion>
      </div>
    </div>
  );
}

export default FAQPage;
