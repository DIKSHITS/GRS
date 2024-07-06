// Import statements for React, MDB React UI Kit, and other dependencies
import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

// Import the custom CSS
import './Login.css';

// Component definition
function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const cookies = new Cookies(); // Initialize cookies

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      if (response.data === "exist") {
        cookies.set("user", email, { path: "/" }); // Set a cookie
        sessionStorage.setItem("email", email); // Save the user ID in session storage
        history("/Dashboard", { state: { id: email } });
      } else if (response.data === "notexist") {
        alert("User has not signed up");
      }
    } catch (error) {
      alert("Error occurred. Please check your details and try again.");
      console.error(error);
    }
  }

  // Render the login form
  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        {/* Column for Image */}
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample" />
        </MDBCol>

        {/* Column for Login Form */}
        <MDBCol col='4' md='6' className="login-container">
          {/* Social Media Sign-in Buttons */}
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>
            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>
            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>
          </div>

          {/* Divider */}
          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          {/* Rest of the login form */}
          {/* Email Input Field */}
          <MDBInput
            wrapperClass='mb-4'
            placeholder='Email Address'
            id='email'
            type='email'
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
          />

          {/* Password Input Field */}
          <MDBInput
            wrapperClass='mb-4'
            placeholder='Password'
            id='password'
            type='password'
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
          />

          {/* Your modified login button with the submit function */}
          <div className='text-center text-md-start mt-4 pt-2'>
            <button className="mb-0 px-5 btn btn-primary" onClick={submit}>
              Login
            </button>
            <p className="small fw-bold mt-2 pt-1 mb-2">
              Don't have an account? <a href="Signup" className="link-danger">Register</a>
            </p>
          </div>
        </MDBCol>
      </MDBRow>

      {/* Footer Section */}
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2020. All rights reserved.
        </div>

        {/* Social Media Links */}
        <div>
          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='facebook-f' size="md"/>
          </MDBBtn>
          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='twitter' size="md"/>
          </MDBBtn>
          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='google' size="md"/>
          </MDBBtn>
          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='linkedin-in' size="md"/>
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
}

export default Login;
