import { useState } from "react";

const quizData = [
  { question: "When is the best time to see a sunset?", options: ["Morning", "Evening", "Midnight"], answer: 1 },
  { question: "Which color is common in sunsets?", options: ["Blue", "Green", "Orange"], answer: 2 },
  { question: "Sunsets are often used to symbolize?", options: ["New beginnings", "Endings or transitions", "Mystery and fear"], answer: 1 },
  { question: "What does the sun do at night?", options: ["Rises", "Sets", "Is at its highest point"], answer: 1 },
  { question: "Sunsets make people feel?", options: ["Calm", "Angry", "Sleepy"], answer: 0 }
];

const GamePage = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [finished, setFinished] = useState(false);

  const handleSelect = (i) => {
    setSelected(i);
    setResult("");
  };

  const handleNext = () => {
    if (selected === null) return;

    if (selected === quizData[index].answer) {
      setScore(score + 1);
      setResult("✅ Correct!");
    } else {
      setResult(`❌ Wrong! Answer: ${quizData[index].options[quizData[index].answer]}`);
    }

    setTimeout(() => {
      if (index + 1 < quizData.length) {
        setIndex(index + 1);
        setSelected(null);
        setResult("");
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  if (finished) {
    return (
      <div className="quiz-container">
        <h2>🎉 Quiz Complete!</h2>
        <p className="final-score">Score: {score}/{quizData.length}</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>{quizData[index].question}</h2>

      <div className="options">
        {quizData[index].options.map((opt, i) => (
          <div
            key={i}
            className={`option ${selected === i ? "selected" : ""}`}
            onClick={() => handleSelect(i)}
          >
            {opt}
          </div>
        ))}
      </div>

      <button onClick={handleNext} disabled={selected === null}>
        Next
      </button>

      <p className="result">{result}</p>
      
    </div>
  );
};

export default GamePage;