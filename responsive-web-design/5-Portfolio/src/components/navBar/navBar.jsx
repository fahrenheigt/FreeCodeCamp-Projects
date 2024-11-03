import React, { useState, useEffect } from "react";
import anime from "animejs";
import {
  FaHome,
  FaInfoCircle,
  FaLaptopCode,
  FaProjectDiagram,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";

export default function NavBar() {
    const [navBarOpen, setNavBarOpen] = useState(false);
    const navBarWidth = 90; // Largeur de la barre de navigation
    const toggleNavBar = () => {
        setNavBarOpen((prev) => !prev);
    };

    useEffect(() => {
        const navBar = document.querySelector(".navBar");
        const navBarLinks = document.querySelectorAll(".navBarLinks a");
        const translateOpenMobile = [120, 20];
        const translateCloseMobile = [20, 120];
        const translateOpenDesktop = [-120, 20];
        const translateCloseDesktop = [20, -120];

        const desktop = window.matchMedia("(min-width: 768px)").matches;
        
        // Anime l'ouverture et la fermeture de la barre de navigation
        anime({
            targets: navBar,
            width: navBarOpen ? `${navBarWidth}px` : "0px",
            duration: 100,
            easing: "easeInOutQuad",
        });

        // Anime les liens de la barre de navigation
        if (navBarOpen) {
            anime({
                targets: navBarLinks,
                translateX: desktop ? translateOpenDesktop : translateOpenMobile,
                opacity: [0, 1],
                easing: "easeInOutQuad",
                delay: anime.stagger(100), // Échelonnement pour chaque lien
            });
        } else {
            anime({
                targets: navBarLinks,
                translateX: desktop ? translateCloseDesktop : translateCloseMobile,
                easing: "easeInOutQuad",
                delay: anime.stagger(100), // Échelonnement pour chaque lien
            });
        }
    }, [navBarOpen]);

    return (
        <>
            <div className={`navBar ${navBarOpen ? "open" : ""}`}>
                {true && (
                    <div className="navBarLinks">
                        <a href="/" className="navBarLink">
                            <FaHome />
                        </a>
                        <a href="/about" className="navBarLink">
                            <FaInfoCircle />
                        </a>
                        <a href="/skills" className="navBarLink">
                            <FaLaptopCode />
                        </a>
                        <a href="/projects" className="navBarLink">
                            <FaProjectDiagram />
                        </a>
                        <a href="/contact" className="navBarLink">
                            <FaPhoneFlip />
                        </a>
                    </div>
                )}
            </div>
            <div className={`navBarIcon ${navBarOpen ? "open" : ""}`} onClick={toggleNavBar}>
                {navBarOpen ? <FaTimes /> : <FaBars />} {/* Icône changeante */}
            </div>
        </>
    );
}
