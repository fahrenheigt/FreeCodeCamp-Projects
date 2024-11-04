import React from 'react';
import data from '../../assets/data/about.json';

const Experience = () => {

    const getExperienceImagePath = (imageName) => require(`../../assets/images/experience/${imageName}`);

    const sortedExperiences = [...data.experience].sort((a, b) => a.order - b.order);

  return (
    <div className='experience-container'>
        <div className='experiences'>
            <h2>Expériences</h2>
            {sortedExperiences.map((exp, index) => (
                <div key={index} className='experience'>
                    <h3>{exp.title} at {exp.company}</h3>
                    <img src={getExperienceImagePath(exp.picture)} alt={exp.name} />
                    <p>{exp.description}</p>
                    <p>{exp.startDate} - {exp.endDate}</p>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Experience;
