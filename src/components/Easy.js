import React, { useState, useEffect } from 'react';
import axios from 'axios';
import he from 'he';
import Timer from './Timer';
import { NavLink } from 'react-router-dom';

function Easy() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState(null); // State to store the result component
  const [startTime, setStartTime] = useState(null); // State to store the quiz start time
  const [isTimerStopped, setIsTimerStopped] = useState(false); // State to track if the timer should be stopped
  const [totalTime, setTotalTime] = useState(0); // State to store the total time taken in milliseconds

  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple')
      .then((response) => {
        const questionsData = response.data.results;
        setQuestions(questionsData);
        setShuffledOptions(questionsData.map(questionData => shuffleOptions(questionData.correct_answer, questionData.incorrect_answers)));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    setSelectedOptions(prevSelectedOptions => {
      return [
        ...prevSelectedOptions,
        {
          [name]: value,
          clicked: true
        }
      ]
    });
  };

  const handleQuizStart = () => {
    setStartTime(Date.now()); // Mark the start time of the quiz
  };

  const handleQuizSubmit = () => {
    setIsSubmitted(true);
    setIsTimerStopped(true); // Stop the timer when the quiz is submitted

    // Calculate the quiz results based on selected options
    const totalQuestions = questions.length;
    let correctAnswers = 0;

    questions.forEach((questionData, index) => {
      const selectedOption = selectedOptions[index]?.[`question_${index}`];
      if (selectedOption === questionData.correct_answer) {
        correctAnswers++;
      }
    });

    // Calculate the elapsed time
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    setTotalTime(elapsedTime);

    // Set the result component to be displayed
    setResults(
      <div className='results'>
        <h1>You Scored: {correctAnswers} / {totalQuestions}</h1>
        <h2>Total Time Taken: {formatTime(elapsedTime)}</h2>
        <NavLink to={'/'}>
          <div>
            <button className='btn submit-button'>Main Menu</button>
          </div>
        </NavLink>
      </div>
    );
  };

  // Helper function to format time in HH:mm:ss format
  const formatTime = (time) => {
    const pad = (n) => (n < 10 ? '0' + n : n);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {isSubmitted ? (
        results
      ) : (
        <div className='question-card-main'>
          {startTime && !isTimerStopped ? ( // Render the Timer component only after the quiz has started and if it is not stopped
            <Timer startTime={startTime} isSubmitted={isSubmitted} />
          ) : (
            <button className='btn start-button' onClick={handleQuizStart}>
              Start Quiz
            </button>
          )}
          <div className='container question-card'>
            <div className='info'>
              <h1>{localStorage.getItem('name')}</h1>
              <h4>{localStorage.getItem('email')}</h4>
            </div>
            {questions.map((questionData, index) => (
              <div className='questions' key={index}>
                <h2>{index + 1}. {he.decode(questionData.question)}</h2>
                <form className='choices'>
                  {shuffledOptions[index].map((option, optionIndex) => (
                    <div className='labels' key={optionIndex}>
                      <input
                        type='radio'
                        id={`option_${index}_${optionIndex}`}
                        name={`question_${index}`}
                        value={option}
                        checked={selectedOptions[index]?.[`question_${index}`] === option}
                        onChange={handleOptionChange}
                      />
                      <label
                        htmlFor={`option_${index}_${optionIndex}`}
                        className={
                          selectedOptions[index]?.clicked
                            ? option === questionData.correct_answer
                              ? 'correct-answer'
                              : 'wrong-answer'
                            : ''
                        }
                      >
                        {he.decode(option)}
                      </label>
                    </div>
                  ))}
                </form>
                <br />
              </div>
            ))}
            <div className='button-container'>
              <button className='submit-button btn' onClick={handleQuizSubmit}>Submit Quiz</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function shuffleOptions(correctAnswer, incorrectAnswers) {
  const options = [correctAnswer, ...incorrectAnswers];
  return options.sort(() => Math.random() - 0.5);
}

export default Easy;
