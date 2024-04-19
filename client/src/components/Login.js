import React, { useState } from 'react';
import apiService from '../services/apiService'; // Import the apiService module
import './Login.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/all.css';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [signInError, setSignInError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);

  const toggleForm = () => {
    setIsSignIn(prevState => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignIn) {
        if (!formData.email || !formData.password) {
          setSignInError("Please fill in all the fields.");
          return;
        }
        const response = await apiService.login(formData);
        console.log(response);
        window.location.href = '/user';
      } else {
        if (!formData.name || !formData.email || !formData.password) {
          setSignUpError("Please fill in all the fields.");
          return;
        }
        const response = await apiService.signup(formData);
        console.log(response);
        window.location.href = '#';
        setSignUpError("User registered successfully.");
      }
    } catch (error) {
      console.error('Error:', error); // Log error message
      if (error.status === 500) {
        setSignUpError("Registration Failed.");
      } else if (error.status === 400 && isSignIn) {
        setSignInError("Email not found.");
      } else if (error.status === 401 && isSignIn) {
        setSignInError("Incorrect password.");
      } else if (error.status === 400 && !isSignIn) {
        setSignUpError("Email already exists.");
      } else {
        setSignUpError("Server is currently unavailable!!! Please try again later.");
        setSignInError("Server is currently unavailable!!! Please try again later.");
      }
    }
  };

  return (
    <div className="login">
      <div className={`container ${isSignIn ? 'sign-in-active' : 'sign-up-active'}`} id="container">
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fab fa-github"></i></a>
              <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <button type="submit">Sign Up</button>
            {/* Signup form elements */}
            {signUpError && <div className="error-message">{signUpError}</div>}
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fab fa-github"></i></a>
              <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email password</span>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <a href="#">Forget Your Password?</a>
            <button type="submit">Sign In</button>
            {/* Login form elements */}
            {signInError && <div className="error-message">{signInError}</div>}
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button onClick={toggleForm}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button onClick={toggleForm}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
