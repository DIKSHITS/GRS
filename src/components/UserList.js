import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import HeaderNav from './HeaderNav';
import Footer from './Footer';
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

function UserList() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8000/users");
        setUserList(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const updateUserStatus = async (_id) => {
    try {
      await axios.post('http://localhost:8000/updateUserStatus', { _id });
      console.log(`User with ID ${_id} has been approved.`);
      setUserList((prevUserList) =>
        prevUserList.map((user) =>
          user._id === _id ? { ...user, __v: 1 } : user
        )
      );
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const deleteUser = async (_id) => {
    try {
      await axios.delete(`http://localhost:8000/delete-user/${_id}`);
      console.log(`User with ID ${_id} has been deleted.`);
      setUserList((prevUserList) => prevUserList.filter((user) => user._id !== _id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    if (userList.length > 0) {
      $("#example1").DataTable({
        "responsive": true,
        "lengthChange": false,
        "autoWidth": false,
        "buttons": ["copy", "csv", "excel",  "print", "colvis"],
        "dom": '<"row"<"col-md-6"B><"col-md-6"f>>tp',
      }).buttons().container().appendTo('#example1_wrapper .col-md-3:eq(0)');
    }
  }, [userList]);

  return (
    <div className="wrapper">
      <Sidebar />
      <HeaderNav />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">User List</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      {userList.length > 0 ? (
                        <table id="example1" className="table table-bordered table-striped">
                          <thead>
                            <tr>
                              <th>SL</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Contact</th>
                              <th>Gender</th>
                              <th>College ID</th>
                              <th>User Type</th>
                              <th>Email</th>
                              <th>Password</th>
                              <th>Status</th>
                              <th>Approved</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userList.map((user, index) => (
                              <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.contact}</td>
                                <td>{user.gender}</td>
                                <td>{user.collegeId}</td>
                                <td>{user.userType}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>{user.__v}</td>
                                <td>{user.__v === 0 ? "Pending" : "Approved"}</td>
                                <td>
                                  {user.__v === 0 ? (
                                    <button
                                      className="btn btn-sm btn-success"
                                      onClick={() => updateUserStatus(user._id)}
                                    >
                                      Approve
                                    </button>
                                  ) : null}
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => deleteUser(user._id)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default UserList;
