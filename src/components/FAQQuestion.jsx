import React, { useState } from "react";
import "../styles/FAQQUestion.css";

function FAQQuestion(props) {
  const { question, answer } = props;
  const [questionClicked, setQuestionClicked] = useState(false);

  function handleQuestionClick() {
    setQuestionClicked(!questionClicked);
  }

  return (
    <div className="faq-question-wrapper">
      <h3 onClick={handleQuestionClick} className="faq-question-headline">
        {question}
      </h3>
      <p className={"faq-question-text " + (questionClicked && "show")}>
        {answer}
      </p>
    </div>
  );
}

export default FAQQuestion;
