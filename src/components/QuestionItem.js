import React from "react";

function QuestionItem({ question, handleDeleteClick, handleDropDownChange}) {
  const { id, prompt, answers, correctIndex } = question;
 
  function onDeleteClick() {
    handleDeleteClick(id);
  }
  function onDroppedDownChange(event) {
    handleDropDownChange(id, parseInt(event.target.value));
  }
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
    
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={onDroppedDownChange}>{options}</select>
      </label>
      <button onClick={onDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
