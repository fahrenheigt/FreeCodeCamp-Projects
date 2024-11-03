import React from 'react';
import data from '../../assets/data/about.json';

const Interests = () => {

    const getInterestsImagePath = (imageName) => require(`../../assets/images/interests/${imageName}`);

  return (
    <div className='interests-container'>
        <div className='interests'>
            <h2>Centres d'intérêts</h2>
            {data.interests.map((interest, index) => (
                <div key={index} className='interest'>
                <h3>{interest.name}</h3>
                <img src={getInterestsImagePath(interest.picture)} alt={interest.name} />
                <p>{interest.description}</p>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Interests;
