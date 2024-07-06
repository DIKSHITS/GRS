// DepartmentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderNav from './HeaderNav';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './DepartmentList.css';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({
    depName: '',
    poc: '',
    pocContact: '',
    pocEmail: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDepartment({
      ...newDepartment,
      [name]: value,
    });
  };

  const handleAddDepartment = async () => {
    try {
      const response = await axios.post('http://localhost:8000/departments', newDepartment);
      setDepartments([...departments, response.data]);
      setNewDepartment({
        depName: '',
        poc: '',
        pocContact: '',
        pocEmail: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="wrapper">
      {/* Sidebar */}
      <Sidebar />

      {/* Header Navigation */}
      <HeaderNav />

      {/* Content Wrapper */}
      <div className="content-wrapper">
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Department List Table */}
            <div className="row">
              <div className="col-lg-12">
                <h2>College Department List</h2>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Sl No</th>
                        <th>Department Name</th>
                        <th>Point of Contact</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.map((department, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{department.depName}</td>
                          <td>{department.poc}</td>
                          <td>{department.pocContact}</td>
                          <td>{department.pocEmail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Add Department Form */}
            <div className='college-add-department-section-a'>
              <h2>Add Department</h2>
              <form className='college-add-department-form-a'>
                <label>
                  Department Name:
                  <input
                    type="text"
                    name="depName"
                    value={newDepartment.depName}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Point of Contact:
                  <input
                    type="text"
                    name="poc"
                    value={newDepartment.poc}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Contact Number:
                  <input
                    type="text"
                    name="pocContact"
                    value={newDepartment.pocContact}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="pocEmail"
                    value={newDepartment.pocEmail}
                    onChange={handleInputChange}
                  />
                </label>
                <button type="button" onClick={handleAddDepartment}>
                  Add Department
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      {/* /.content-wrapper */}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default DepartmentList;
