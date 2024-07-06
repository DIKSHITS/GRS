import React from "react";
import { Link } from "react-router-dom";
import './Home.css';

function Home1() {
  
  return (
    <div className="raj">
    <div className="homepage">
      {/* Header */}
      <header className="header-a">
        <img src="https://storage.googleapis.com/ezap-prod/colleges/4342/tict_logo_new_7.png" alt="Logo" className="logo" />
        <h1 className="title">Techno International New Town</h1>
      </header>

     

      {/* Navigation */}
      <nav className="nav-a">
        <ul className="menu">
          <li className="menu-item">
            <Link to="/" className="menu-link-e">Home</Link>
          </li>
          <li className="menu-item">
            <Link to="/About" className="menu-link-e">About Us</Link>
          </li>
          <li className="menu-item">
            <Link to="/Gallery" className="menu-link-e">Gallery</Link>
          </li>
          
          <li className="menu-item">
            <Link to="/Login" className="menu-link-e">Admin</Link>
          </li>
        </ul>
      </nav>
         
          {/* Main Content */}
      <div className="main-content-p">
        <p className="welcome-message-p">Welcome to Techno International New Town!</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. 
          Sed cursus ante dapibus diam.
          Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed 
          augue semper porta. Mauris massa.
        </p>
      </div>



      {/* Tiles for User and Admin */}
      <div className="tiles-container-d">
        <div className="tile">
          <Link to="/user" className="tile-link-f">
            <h2>User</h2>
            <p>Explore user-related content here.</p>
          </Link>
        </div>
        <div className="tile">
          <Link to="/admin" className="tile-link">
            <h2>Admin</h2>
            <p>Access admin-related features and tools.</p>
          </Link>
        </div>
      </div>

     
 <br></br> <br></br>
      {/* Footer with Contact Information */}
      <footer className="footer">
          Email: info@technoindia.edu
          Phone: +91 123 456 7890
          Address: Techno International New Town, Kolkata, India
      </footer>
    </div>
    </div>
  );
 
}

export default Home1;