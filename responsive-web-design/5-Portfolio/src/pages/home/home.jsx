// src/pages/Home.js
import React, { useEffect } from 'react';
import anime from 'animejs';

const Home = () => {
    useEffect(() => {
        anime({
            targets: '#home h1',
            translateY: [-50, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo',
        });

        anime({
            targets: '#home p',
            translateY: [25, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: 300,
            easing: 'easeOutExpo',
        });
    }, []);

    return (
        <div id="home" className="page">
            <h1>Bienvenue sur mon Portfolio !</h1>
            <p>Je suis développeur web.</p>
        </div>
    );
};

export default Home;
