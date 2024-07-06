// src/components/Gallery.js
import React from 'react';
import './Gallery.css';

const Gallery = () => {
  // Replace these image URLs with your actual image URLs
  const images = [
    'https://technoindiagroup.in/assets/images/tig-building.jpg',
    'https://www.applyme.in/wp-content/uploads/2020/07/Picture9.png',
    'https://static.zollege.in/public/college_data/images/appImage/16505339211626951950phpigXuO0.jpeg?tr=h-250,w-400,c-force',
    // Add more image URLs as needed
  ];

  return (
    <div className='gallery-sir'>
    <div className="gallery-container">
      
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image} alt={`Gallery Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Gallery;
