import React, { useState, useEffect } from 'react';
import data from '../../assets/data/technologies.json';

const Technologies = () => {
//interests is to be changed
  const getTechnologyImagePath = (imageName) => require(`../../assets/images/interests/${imageName}`);

  return (
    <section className="technologies-container">
      <h2>Technologies</h2>
      <div className="cards">
        {data.technologies.map(tech => (
          <div key={tech.id} className="card">
            <img src={getTechnologyImagePath(tech.picture)} alt={tech.name} />
            <div className="content">
              <h3>{tech.name}</h3>
              <p>{tech.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Technologies;
