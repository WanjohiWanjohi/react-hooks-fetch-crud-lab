import React , {useState,useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  useEffect(() =>{
    fetch("http://localhost:4000/questions").then((res)=> res.json())
    .then((data)=> setQuestions(data))
  }, [])
 
  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {method: "DELETE"})
    .then((res)=> res.json())
    .then(()=> {
      const filteredQuestions = questions.filter((ques) => ques.id !== id);
      setQuestions(filteredQuestions);
    })
  }
  function handleDropDownChange(id,correctIndex){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuestions(updatedQuestions);
      });
  }
  
  const questionItems = questions.map((que)=> (
    <QuestionItem  key={que.id} question={que} handleDeleteClick={handleDeleteClick} handleDropDownChange={handleDropDownChange}/>
  ))
  return (
    
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questionItems}
      </ul>
    </section>
  );
}

export default QuestionList;
