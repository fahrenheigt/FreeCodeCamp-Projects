import React, { useEffect } from 'react';
import anime from "animejs";

export default function Home() {
    useEffect(() => {
        const container = document.querySelector('.container');
        
        // Créer et ajouter les blocs
        for (var i = 0; i < 100; i++) {
            const blocks = document.createElement('div');
            blocks.classList.add('block');
            container.appendChild(blocks);
        }

        // Fonction d'animation des blocs
        function animateBlocks() {
            anime({
                targets: '.block',
                translateX: function () {
                    return anime.random(-700, 700);
                },
                translateY: function () {
                    return anime.random(-500, 500);
                },
                scale: function () {
                    return anime.random(1,5);
                },
                easing: 'easeOutElastic(1, .8)',
                duration: 3000,
                delay: anime.stagger(50),
                complete: animateBlocks,
            });
        }

        // Démarrer l'animation
        animateBlocks();
    }, []); // Le tableau vide garantit que l'effet ne s'exécute qu'une fois après le premier rendu

    return (
        <div className='home-container'>
            <div className='container'>
                <h2>Axel Le Meur</h2>
            </div>
        </div>
    );
}
