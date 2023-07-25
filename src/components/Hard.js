import React, { useEffect, useState } from 'react';
import axios from 'axios';
import he from 'he';

function Hard() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState(null); // State to store the result component

  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php?amount=20&category=9&difficulty=hard&type=multiple')
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
    const { name, value} = event.target;
    // disabled = true;
    // if(value === questions.correctAnswers) {

    // }
    // console.log(name.slice(-1))  [{},{},{}]
    // console.log(value)
    // console.log(questions[name.slice(-1)].correct_answer)
    console.log(selectedOptions)
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

  // console.log(selectedOptions)

  const handleQuizSubmit = () => {
    setIsSubmitted(true);

    // Calculate the quiz results based on selected options
    const totalQuestions = questions.length;
    let correctAnswers = 0;

    questions.forEach((questionData, index) => {
      const selectedOption = selectedOptions[index]?.[`question_${index}`];
      if (selectedOption === questionData.correct_answer) {
        correctAnswers++;
      }
    });

    // Set the result component to be displayed
    setResults(
      <div className='results'>
        <h1>Result: {correctAnswers} / {totalQuestions}</h1>
      </div>
    );
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

export default Hard;
