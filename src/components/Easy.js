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
  const [startTime, setStartTime] = useState(Date.now()); // State to store the quiz start time
  const [isTimerStopped, setIsTimerStopped] = useState(false); const [index, setIndex] = useState(0); // this will be the index of the array that will be displayed on the screen
  // const [isOptionSelectedTemp, setIsOptionSelectedTemp] = useState([false])


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

  const handleOptionChange = (event, quesNo) => {
    const { name, value } = event.target;
    const selectedOption = {
      [name]: value,
      clicked: true,
      isCorrect: value === questions[index].correct_answer // Check if the selected option is correct
    };
    setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions.slice(0, index), selectedOption, ...prevSelectedOptions.slice(index + 1)]);
    setTimeout(() => {
      addElement();
    }, 2000);
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
    // const endTime = Date.now();
    // const elapsedTime = endTime - startTime;

    // Set the result component to be displayed
    setResults(
      <div className='row align-items-center justify-content-center h-100'>
        <div className="col-md-8">
        <div className='results'>
          <div className='question-card'>
                <h2 style={{color: '#3c1642'}}>You Scored: {correctAnswers} / {totalQuestions}</h2>
                {/* <h2>Total Time Taken: {formatTime(elapsedTime)}</h2> */}
                <NavLink to={'/'}>
                  <div>
                    <button className='btn submit-button'>Main Menu</button>
                  </div>
                </NavLink>
            </div>
          </div>
        </div>
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

  // Click the button - update the index
  function addElement() {
    index < 19 ? setIndex(index + 1) : setIndex(index);
    console.log(index)
  }

  function getElements(arr, index) {
    return (
      <div className='questions' key={index}>
        <h2>{index + 1}. {he.decode(arr[index].question)}</h2>
        <form className='choices'>
          {shuffledOptions[index].map((option, optionIndex) => {
            let isOptionSelected = selectedOptions[index]?.[`question_${index}`] === option;
            const isOptionCorrect = option === arr[index].correct_answer;

            return (
              <div className='labels' key={optionIndex}>
                <input
                  className=''
                  type='radio'
                  id={`option_${index}_${optionIndex}`}
                  name={`question_${index}`}
                  value={option}
                  checked={isOptionSelected}
                  onChange={handleOptionChange}
                  disabled={selectedOptions[index]?.clicked}
                />
                <label
                  htmlFor={`option_${index}_${optionIndex}`}
                  className={isOptionSelected ? (isOptionCorrect ? 'correct-answer' : 'wrong-answer') : ''}
                >
                  {he.decode(option)}
                </label>
              </div>
            );
          })}
        </form>
        <br />
      </div>

    );
  }

  return (
    // <div className='question-card-main'>
    <div className='container' style={{ height: '100vh' }}>
      {isSubmitted ? (
        results
      ) : (
        <div className='row align-items-center justify-content-center h-100'>
          <div className="col-md-8">
            <div className='question-card'>
              <div className='info-container'>
                <div className='info'>
                  <h1>{localStorage.getItem('name')}</h1>
                  <h4>{localStorage.getItem('email')}</h4>
                  <h4>Attempted: {index} / {questions.length}</h4>

                </div>
                {!isTimerStopped ? (
                  <Timer startTime={startTime} handleQuizSubmit={handleQuizSubmit} />
                ) : (
                  <div></div>
                )}
              </div>

              {/* selectedOptions.filter(option => Object.keys(option).length > 0).length */}
              {/* array to be rendered here */}
              {/* <button onClick={addElement}>Add Items</button> */}
              {/* {{correctAnswers} / {totalQuestions}} */}
              {getElements(questions, index)}
              <div className='button-container'>
                {index === 19 && <button className='form-button btn' onClick={handleQuizSubmit}>Submit Quiz</button>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    // </div>
  );
}

function shuffleOptions(correctAnswer, incorrectAnswers) {
  const options = [correctAnswer, ...incorrectAnswers];
  return options.sort(() => Math.random() - 0.5);
}

export default Easy;