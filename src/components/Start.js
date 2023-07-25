import React from 'react';
import { NavLink, Outlet } from "react-router-dom";

function Start() {
  const [formData, setFormData] = React.useState({
    Name: "",
    email: ""
  });

  const [isFilled, setIsFilled] = React.useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formData.Name.length < 1 && formData.email.length < 1) {
      window.alert('Please fill out the form first');
    } else {
      setIsFilled(true);
      localStorage.setItem('name', formData.Name);
      localStorage.setItem('email', formData.email);
      console.log(formData);
      console.log(localStorage);
    }
  }

  return (
    <div className='start'>
      <h2>Quizzical</h2>
      <p>Test your knowledge!</p>

      <form onSubmit={handleSubmit} className='form'>
        <h3>Please fill out the form before starting the quiz</h3>
        <div className="mb-3">
          <input
            type="name"
            onChange={handleChange}
            className="form-control"
            id="exampleInputEmail1"
            placeholder='Your Name'
            name='Name'
            value={formData.Name}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            onChange={handleChange}
            className="form-control"
            placeholder='Your Email'
            id="exampleInputPassword1"
            name='email'
            value={formData.email}
          />
        </div>
        <div className='button-container'>
          <button className="btn btn-danger">Submit</button>
        </div>
      </form>

    
      <NavLink to="easy">
        <button className='btn start-button' disabled={!isFilled}>
          Easy
        </button>
      </NavLink>

      <NavLink to="medium">
        <button className='btn start-button' disabled={!isFilled}>
          Medium
        </button>
      </NavLink>

      <NavLink to="hard">
        <button className='btn start-button' disabled={!isFilled}>
          Hard
        </button>
      </NavLink>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Start;
