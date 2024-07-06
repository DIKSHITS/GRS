import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const userEmail = sessionStorage.getItem('email');

    const fetchUserType = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/userType?email=${userEmail}`);
        const data = await response.json();

        setUserType(data.userType);
      } catch (error) {
        console.error('Error fetching user type:', error);
      }
    };

    fetchUserType();
  }, []); // Run the effect only once on component mount

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <div className="sidebar">
              <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                  <img src="https://media.istockphoto.com/id/474947550/photo/five-year-old-boy.jpg?s=2048x2048&w=is&k=20&c=e8iYtE7E0w3f_haqm7_WXTKO0bkUIMnu6LlOyJv7Ggs=" className="img-circle elevation-2" alt="User Image" />
                </div>
                <div className="info">
                  <a href="profile" className="d-block">Dikshit singh</a>
                </div>
              </div>
              {/* SidebarSearch Form */}
              <div className="form-inline">
                <div className="input-group" data-widget="sidebar-search">
                  <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                  <div className="input-group-append">
                    <button className="btn btn-sidebar">
                      <i className="fas fa-search fa-fw"></i>
                    </button>
                  </div>
                </div>
              </div>

              <li className="nav-item menu-open">
                <Link to="/Dashboard" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard</p>
                  <i className="right fas fa-angle-left"></i>
                </Link>

                {(userType === 'admin' || userType === 'teacher' || userType === 'student' || userType === 'other') && (
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/profile" className="nav-link active">
                        <i className="fas fa-user-circle"></i>&nbsp;&nbsp;
                        <p>My Profile</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/Serves" className="nav-link active">
                        <i className="fas fa-file-alt"></i>&nbsp;&nbsp;
                        <p>Service Record</p>
                      </Link>
                    </li>
                  </ul>
                )}

                {(userType === 'student' || userType === 'teacher' || userType === 'other') && (
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/ComplaintForm" className="nav-link active">
                        <i className="fas fa-bullhorn"></i>&nbsp;&nbsp;
                        <p>Lodge a Complaint</p>
                      </Link>
                    </li>
                  </ul>
                )}

                {userType === 'admin' && (
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/ComplaintsList" className="nav-link active">
                        <i className="far fa-clipboard"></i>&nbsp;&nbsp;
                        <p>Work Assignment</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/UserList" className="nav-link active">
                        <i className="far fa-clipboard"></i>&nbsp;&nbsp;
                        <p>User Management</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/DepartmentList" className="nav-link active">
                        <i className="fas fa-building"></i>&nbsp;&nbsp;
                        <p>Department</p>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
