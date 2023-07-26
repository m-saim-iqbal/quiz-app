import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Start() {
  const [formData, setFormData] = React.useState({
    Name: '',
    email: ''
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
    }
  }

  return (
    <div className='container' style={{ height: '100vh' }}>
      <div className='row align-items-center justify-content-center h-100'>
        <div className="col-md-8">
          <div className='question-card'>
            <div className='start'>
              <h1>Quizzical</h1>
              <p>Test your knowledge!</p>

              <div>
                <form onSubmit={handleSubmit} className='form'>
                  <h3>Please fill out the form before starting the quiz</h3>
                  <div className='mb-3 w-50'>
                    <input
                      type='name'
                      onChange={handleChange}
                      className='form-control p-1'
                      id='exampleInputEmail1'
                      placeholder='Your Name'
                      name='Name'
                      value={formData.Name}
                    />
                  </div>
                  <div className='mb-3 w-50'>
                    <input
                      type='email'
                      onChange={handleChange}
                      className='form-control p-1'
                      placeholder='Your Email'
                      id='exampleInputPassword1'
                      name='email'
                      value={formData.email}
                    />
                  </div>
                  <div>
                    <button className='btn form-button'>Submit</button>
                  </div>
                  {isFilled && <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '1rem', color: 'green' }}>Form submitted successfully</p>}
                </form>
              </div>

              <div className='links'>
                <NavLink to={isFilled ? 'easy' : ''}>
                  <button className='btn start-button' disabled={!isFilled}>
                    Easy
                  </button>
                </NavLink>

                <NavLink to={isFilled ? 'medium' : ''}>
                  <button className='btn start-button' disabled={!isFilled}>
                    Medium
                  </button>
                </NavLink>

                <NavLink to={isFilled ? 'hard' : ''}>
                  <button className='btn start-button' disabled={!isFilled}>
                    Hard
                  </button>
                </NavLink>
              </div>
              <main>
                <Outlet />
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Start;
