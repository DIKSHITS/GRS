// src/components/About.js
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="abouts-sir">
    <div className="about-containers">
      <div className="about-header">
        <h1>Welcome to Tecno India College of Technology</h1>
        <p>Empowering Minds, Shaping Futures</p>
      </div>
      <div className="about-content">
        <p>
          Tecno India College of Technology is a leading institution committed to providing
          world-class education in engineering and technology. With a focus on innovation,
          research, and excellence, we aim to prepare students for successful careers in
          the rapidly evolving technological landscape.
        </p>
        <p>
          Our state-of-the-art campus, experienced faculty, and industry-oriented curriculum
          set us apart as a hub for learning and discovery. At Tecno India College of Technology,
          we believe in nurturing creativity, critical thinking, and leadership skills among
          our students.
        </p>
        {/* Add more information about the college */}
      </div>
   
    </div>
     </div>
  );
};

export default About;
