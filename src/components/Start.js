import React from 'react'

function Start(props) {

    return (
        <div className='start'>
            <h2>Quizzical</h2>
            <p>Test your knowledge!</p>
            <button className='btn start-button' onClick={() => props.onSelectDifficulty(props.difficulty)}>
                Easy
            </button>
            <button className='btn start-button' onClick={() => props.onSelectDifficulty(props.difficulty)}>
                Medium
            </button>
            <button className='btn start-button' onClick={() => props.onSelectDifficulty(props.difficulty)}>
                Hard
            </button>
        </div>
    )
}

export default Start