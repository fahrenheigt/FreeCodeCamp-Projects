import React, { useEffect } from 'react';
import anime from "animejs";
import { motion } from "framer-motion";

export default function Home({}) {
    useEffect(() => {
        const container = document.querySelector('.container');
        
        // Créer et ajouter les blocs
        for (var i = 0; i < 70; i++) {
            const blocks = document.createElement('div');
            blocks.classList.add('block');
            container.appendChild(blocks);
        }

        // Fonction d'animation des blocs
        function animateBlocks() {
            anime({
                targets: '.block',
                translateX: () => anime.random(-window.screen.width/2, window.screen.width/2),
                translateY: () => anime.random(-window.screen.height/2, window.screen.height/2),
                scale: () => anime.random(1,5),
                easing: 'easeOutElastic(1, .8)',
                duration: 3000,
                delay: anime.stagger(20),
                complete: animateBlocks,
            });
        }

        // Démarrer l'animation
        animateBlocks();
    }, []); 
    
    return (
        <motion.div
            className="home-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className='container'></div>
            <div className='blur'></div>
            <div className='overlay'>
                <h1>Axel Le Meur</h1>
                <h2>Web Developer</h2>
            </div>

        </motion.div>
    );
}
