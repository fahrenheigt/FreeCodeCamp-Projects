import React, { useState, useEffect } from 'react';
import data from '../../assets/data/certifications.json';

const Certifications = () => {
 //interests is to be changed
  const getCertificationImagePath = (imageName) => require(`../../assets/images/interests/${imageName}`);

  return (
    <section className="certifications-container">
      <h2>Certifications</h2>
      <div className="cards">
        {data.certifications.map(cert => (
          <div key={cert.id} className="card">
            <img src={getCertificationImagePath(cert.picture)} alt={cert.title} />
            <div className="content">
              <h3>{cert.title}</h3>
              <p>Émis par : {cert.issuer}</p>
              <p>Date : {cert.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
