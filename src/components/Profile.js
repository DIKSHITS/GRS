import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from './Sidebar';
import HeaderNav from './HeaderNav';
import Footer from './Footer'; // Import the Footer component

function Profile() {
  const email = sessionStorage.getItem("email");
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/Profile', { params: { email } });
        setUserList(response.data);

        // Log the fetched data
        console.log("Fetched data:", response.data);
      } catch (error) {
        console.error(error);
        setError("Error fetching data");
      }
    }

    fetchData();
  }, [email]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (userList.length > 0) {
    return (
      <div className="wrapper">
        <Sidebar />
        <HeaderNav />

        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Profile</h1>
                </div>
              </div>
            </div>
          </div>

          <section className="content">
            <div className="container-fluid">
              {/* Profile content goes here */}
            
        {userList.map((userData, index) => (
          <div key={index}>
            <p>Email: {userData.email}</p>
            <p>First Name: {userData.firstName}</p>
            <p>Last Name: {userData.lastName}</p>
            <p>Contact: {userData.contact}</p>
            <p>User Type: {userData.userType}</p>
            <p>College ID: {userData.collegeId}</p>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
          </div>
        ))}
            </div>
          </section>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Profile;

