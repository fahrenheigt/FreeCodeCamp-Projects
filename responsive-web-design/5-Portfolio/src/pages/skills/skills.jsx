import React, { useEffect } from 'react';
import Technologies from '../../components/technologies/technologies';
import Certifications from '../../components/certifications/certifications';
import anime from "animejs";

export default function Skills({}) {

    return (
        <div className="skills-container">
            <Technologies />
            <Certifications />
            <div className='container'></div>
        </div>
    );
}

