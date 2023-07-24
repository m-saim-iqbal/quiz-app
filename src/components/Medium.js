import React, { useEffect, useState } from 'react';
import axios from 'axios';
import he from 'he';

function Easy() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php?amount=20&category=9&difficulty=medium&type=multiple')
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
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [name]: value,
    }));
  };

  const handleQuizSubmit = () => {
    // Calculate the quiz results based on selected options
    const totalQuestions = questions.length;
    let correctAnswers = 0;

    questions.forEach((questionData, index) => {
      const selectedOption = selectedOptions[`question_${index}`];
      if (selectedOption === questionData.correct_answer) {
        correctAnswers++;
      }
    });

    // Log the results to the console
    console.log('Quiz Results:');
    console.log(`Total Questions: ${totalQuestions}`);
    console.log(`Correct Answers: ${correctAnswers}`);
    console.log(`Incorrect Answers: ${totalQuestions - correctAnswers}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='question-card-main'>
      <div className='container question-card'>
        {questions.map((questionData, index) => (
          <div className='questions' key={index}>
            <h2>{he.decode(questionData.question)}</h2>
            <form className='choices'>
              {shuffledOptions[index].map((option, optionIndex) => (
                <div className='labels' key={optionIndex}>
                  <input
                    type='radio'
                    id={`option_${index}_${optionIndex}`}
                    name={`question_${index}`}
                    value={option}
                    checked={selectedOptions[`question_${index}`] === option}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor={`option_${index}_${optionIndex}`}>{he.decode(option)}</label>
                </div>
              ))}
            </form>
            <br />
          </div>
        ))}
        <button onClick={handleQuizSubmit}>Submit Quiz</button>
      </div>
    </div>
  );
}

function shuffleOptions(correctAnswer, incorrectAnswers) {
  const options = [correctAnswer, ...incorrectAnswers];
  return options.sort(() => Math.random() - 0.5);
}

export default Easy;
