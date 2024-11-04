import React from 'react';
import data from '../../assets/data/about.json'; // Ajuste le chemin vers ton JSON
import anime from 'animejs';
import Interests from '../../components/interests/interests';
import Experience from '../../components/experience/experience';

const About = () => {

  return (
    <div className='about-container'>
        <h1>About me</h1>
        <Interests />
        <Experience />
    </div>
  );
};

export default About;
