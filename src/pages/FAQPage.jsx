import React from "react";
import "../styles/FAQPage.css";
import FAQQuestion from "../components/FAQQuestion";

function FAQPage() {
  const question = "How can I get veryfied as an artist?";
  const answer =
    "You can click on the *more* button in your profile menu bar and make a request for an artist profile. On the following form, you will have to enter more information about you as an artist. This information will be validated by our team. We will notify you as soon as possible about the outcome of your request!";
  return (
    <div className="page-wrapper mobile-dvh">
      <div className="faq-questions-wrapper">
        <FAQQuestion question={question} answer={answer}></FAQQuestion>
        <FAQQuestion question={question} answer={answer}></FAQQuestion>
        <FAQQuestion question={question} answer={answer}></FAQQuestion>
        <FAQQuestion question={question} answer={answer}></FAQQuestion>
        <FAQQuestion question={question} answer={answer}></FAQQuestion>
        <FAQQuestion question={question} answer={answer}></FAQQuestion>
        <FAQQuestion question={question} answer={answer}></FAQQuestion>
        <FAQQuestion question={question} answer={answer}></FAQQuestion>
        <FAQQuestion question={question} answer={answer}></FAQQuestion>
        <FAQQuestion question={question} answer={answer}></FAQQuestion>
      </div>
    </div>
  );
}

export default FAQPage;
