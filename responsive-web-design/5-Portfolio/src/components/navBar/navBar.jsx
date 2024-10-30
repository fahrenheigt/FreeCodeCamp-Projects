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

    const toggleNavBar = () => {
        setNavBarOpen((prev) => !prev);
    };

    useEffect(() => {
        const navBar = document.querySelector(".navBar");
        const navBarLinks = document.querySelectorAll(".navBarLinks a");
        
        // Anime l'ouverture et la fermeture de la barre de navigation
        anime({
            targets: navBar,
            width: navBarOpen ? "110px" : "0px",
            duration: 800,
            easing: "easeInOutQuad",
        });

        // Anime les liens de la barre de navigation
        if (navBarOpen) {
            anime({
                targets: navBarLinks,
                translateX: [120, 20],
                opacity: [0, 1],
                duration: 1500,
                easing: "easeInOutQuad",
                delay: anime.stagger(200), // Échelonnement pour chaque lien
            });
        } else {
            anime({
                targets: navBarLinks,
                translateX: [0, 120],
                duration: 1500,
                easing: "easeInOutQuad",
                delay: anime.stagger(100), // Échelonnement pour chaque lien
            });
        }
    }, [navBarOpen]);

    return (
        <>
            <div className={`navBar ${navBarOpen ? "open" : ""}`}>
                {navBarOpen && (
                    <div className="navBarLinks">
                        <a href="#home" className="navBarLink">
                            <FaHome />
                            <p>Home</p>
                        </a>
                        <a href="#about" className="navBarLink">
                            <FaInfoCircle />
                            <p>About</p>
                        </a>
                        <a href="#skills" className="navBarLink">
                            <FaLaptopCode />
                            <p>Skills</p>
                        </a>
                        <a href="#projects" className="navBarLink">
                            <FaProjectDiagram />
                            <p>Projects</p>
                        </a>
                        <a href="#contact" className="navBarLink">
                            <FaPhoneFlip />
                            <p>Contact</p>
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
