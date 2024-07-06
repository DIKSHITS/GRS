import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home1 from "./components/Home1";
import Login from "./components/Login";
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ComplaintsList from './components/ComplaintsList';
import ComplaintForm from './components/ComplaintForm';
import DepartmentList from './components/DepartmentList';
import LogoutButton from './components/LogoutButton';
import HeaderNav from './components/HeaderNav';
import UserList from './components/UserList';
import Profile from './components/Profile';
import UpdateUserStatus from "./components/UpdateUserStatus";
import DeleteUser from "./components/DeleteUser";
import Serves from "./components/Serves";
import updateComplaintStatus from "./components/updateComplaintStatus"
import Footer from "./components/Footer"
import About from './About';
import Gallery from './Gallery';
//import RejectComplaint from './path-to-RejectComplaint'; // Replace 'path-to-RejectComplaint' with the actual path

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home1 />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/ComplaintForm" element={<ComplaintForm />} />
          <Route path="/ComplaintsList" element={<ComplaintsList />} />
          <Route path="/DepartmentList" element={<DepartmentList />} />
          <Route path="/LogoutButton" element={<LogoutButton />} />
          <Route path="/HeaderNav" element={<HeaderNav />} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/UpdateUserStatus" element={<UpdateUserStatus />} />
          <Route path="/DeleteUser" element={<DeleteUser />} />
          <Route path="/updateComplaintStatus" element={<updateComplaintStatus />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Serves" element={<Serves />} />
          <Route path="/About" element={<About />} />
          <Route path="/Gallery" element={<Gallery />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
