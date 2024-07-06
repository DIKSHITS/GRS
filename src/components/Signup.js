import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';

const Signup = () => {
  const history = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    gender: "male",
    userType: "student",
    email: "",
    password: "",
    collegeId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/signup", formData);

      if (response.data === "exist") {
        alert("User already exists");
      } else if (response.data === "notexist") {
        history("/login", { state: { id: formData.email } });
      }
    } catch (error) {
      alert("Wrong details");
      console.error(error);
    }
  };

  return (
    <MDBContainer fluid className='bg-dark'>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol>
          <MDBCard className='my-4'>
            <MDBRow className='g-0'>
              <MDBCol md='6' className="d-none d-md-block">
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp' alt="Sample photo" className="rounded-start" fluid/>
              </MDBCol>
              <MDBCol md='6'>
                <MDBCardBody className='text-white d-flex flex-column justify-content-center'>
                  <h3 className="mb-4 text-uppercase fw-bold text-blue">Student Registration Form</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <MDBInput
                        placeholder="First Name"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <MDBInput
                        placeholder="Last Name"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <MDBInput
                        placeholder="Contact"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-select"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">User Type</label>
                      <select
                        className="form-select"
                        id="userType"
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                      >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="staff">Staff</option>
                        <option value="other">Other</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <MDBInput
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <MDBInput
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <MDBInput
                        placeholder="College ID"
                        id="collegeId"
                        name="collegeId"
                        value={formData.collegeId}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex justify-content-end pt-3">
                      <MDBBtn color='light' size='lg' type="reset">
                        Reset all
                      </MDBBtn>
                      <MDBBtn className='ms-2' color='warning' size='lg' type="submit">
                        Submit form
                      </MDBBtn>
                     
                    </div>
                  </form>
                  <p className="text-blue">OR</p>
                  <Link to="/login" className="text-blue">Login Page</Link>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Signup;
