import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ComplaintsList.css';
import Sidebar from './Sidebar';
import HeaderNav from './HeaderNav';
import Footer from './Footer';

const Serves = () => {
  const [complaints, setComplaints] = useState([]);
  const email = sessionStorage.getItem("email");

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/complaints_dik?email=${email}`);
      const data = response.data;
      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [email]);

  const handleResolve = async (complaintId) => {
    try {
      await axios.put(`http://localhost:8000/resolve_complaint/${complaintId}`);
      fetchComplaints();
      alert('Complaint resolved successfully!');
    } catch (error) {
      console.error('Error resolving complaint:', error);
    }
  };

  return (
    <div className="wrapper">
      <Sidebar />
      <HeaderNav />

      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Against Your Complaint</h1>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>SL No</th>
                        <th>Name</th>
                        <th>College ID</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Person</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complaints.map((complaint, index) => (
                        <tr key={complaint._id}>
                          <td>{index + 1}</td>
                          <td>{complaint.name}</td>
                          <td>{complaint.collegeId}</td>
                          <td>{complaint.description}</td>
                          <td>{complaint.priority}</td>
                          <td>{complaint.person}</td>
                          <td>
                            <button onClick={() => handleResolve(complaint._id)}>Resolve</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Serves;
