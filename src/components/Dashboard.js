import React, { Component } from 'react';
import Sidebar from './Sidebar';
import HeaderNav from './HeaderNav';
import Footer from './Footer';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newOrders: 0,
      bounceRate: 0,
      userRegistrations: 0,
      uniqueVisitors: 0,
    };
  }

  componentDidMount() {
    // Fetch data from the server when the component mounts
    this.fetchDashboardData();
  }

  fetchDashboardData = async () => {
    try {
      const response = await fetch('http://localhost:8000/dashboard-data');
      const data = await response.json();

      // Update state with the fetched data
      this.setState({
        newOrders: data.newOrders || 0,
        bounceRate: data.bounceRate || 0,
        userRegistrations: data.userCount || 0,
        uniqueVisitors: data.uniqueVisitors || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  render() {
    return (
      <div className="wrapper">
        {/* Sidebar */}
        <Sidebar />

        {/* Header Navigation */}
        <HeaderNav />

        {/* Content Wrapper */}
        <div className="content-wrapper" style={{ padding: '20px' }}>
          {/* Content Header */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Dashboard</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>{this.state.newOrders}</h3>
                      <p>New Orders</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-bag"></i>
                    </div>
                    <a href="#" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6">
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3>{this.state.bounceRate}<sup style={{ fontSize: '20px' }}></sup></h3>
                      <p>Department</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-stats-bars"></i>
                    </div>
                    <a href="#" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6">
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>{this.state.userRegistrations}</h3>
                      <p>User Registrations</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add"></i>
                    </div>
                    <a href="#" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6">
                  <div className="small-box bg-danger">
                    <div className="inner">
                      <h3>{this.state.uniqueVisitors}</h3>
                      <p>Complaints</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-pie-graph"></i>
                    </div>
                    <a href="#" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </a>
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
}

export default Dashboard;
