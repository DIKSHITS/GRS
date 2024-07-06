import React, { useEffect, useState } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-buttons/js/dataTables.buttons.min';
import 'datatables.net-buttons-bs4/js/buttons.bootstrap4.min';
import 'datatables.net-buttons/js/buttons.html5.min';
import 'datatables.net-buttons/js/buttons.print.min';
import 'jszip/dist/jszip.min.js';
import 'pdfmake/build/pdfmake.min.js';
import 'pdfmake/build/vfs_fonts.js';
import 'datatables.net-buttons/js/buttons.colVis.min.js';
import './ComplaintsList.css';
import Sidebar from './Sidebar';
import HeaderNav from './HeaderNav';
import Footer from './Footer';

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:8000/complaints');
        const data = response.data;
        setComplaints(data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  useEffect(() => {
    if (complaints.length > 0) {
      $("#example1").DataTable({
        "responsive": true,
        "lengthChange": false,
        "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
        "dom": '<"row"<"col-md-6"B><"col-md-6"f>>tp',
      }).buttons().container().appendTo('#example1_wrapper .col-md-3:eq(0)');
    }
  }, [complaints]);

  const updateComplaintStatus = async (_id) => {
    try {
      await axios.post('http://localhost:8000/updateComplaintStatus', { _id });

      console.log(`Complaint with ID ${_id} has been approved.`);
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === _id ? { ...complaint, __v: 1 } : complaint
        )
      );
    } catch (error) {
      console.error('Error approving complaint:', error);
    }
  };

  const rejectComplaint = async (_id) => {
    try {
      await axios.delete(`http://localhost:8000/RejectComplaint/${_id}`);

      console.log(`Complaint with ID ${_id} has been rejected.`);
      setComplaints((prevComplaints) =>
        prevComplaints.filter((complaint) => complaint._id !== _id)
      );
    } catch (error) {
      console.error('Error rejecting complaint:', error);
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
                <h1 className="m-0">Complaints List</h1>
              </div>
           
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  {complaints.length > 0 ? (
                    <table id="example1" className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>SL No</th>
                          <th>Name</th>
                          <th>College ID</th>
                          <th>Description</th>
                          <th>Priority</th>
                          <th>Department</th>
                          <th>Person</th>
                          <th>Actions</th>
                          <th>Resolve Status</th>
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
                            <td>{complaint.department}</td>
                            <td>{complaint.person}</td>
                            <td>
                              {complaint.__v === 0 ? (
                                <div>
                                  <button
                                    className="btn btn-sm btn-success mr-2"
                                    onClick={() => updateComplaintStatus(complaint._id)}
                                  >
                                    Approve
                                  </button>
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => rejectComplaint(complaint._id)}
                                  >
                                    Reject
                                  </button>
                                </div>
                              ) : (
                                <span className="text-success">Approved</span>
                              )}
                            </td>
                            <td>
                              {complaint.__v === 2 ? (
                                <span className="text-success">Resolved</span>
                              ) : (
                                <span className="text-danger">Not Resolved</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No complaints available.</p>
                  )}
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

export default ComplaintsList;
