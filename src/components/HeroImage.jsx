import React from 'react';
import heroImg from '../assets/hero-image.avif'

const HeroImage = () => {
    return (
        <div className='relative h-screen bg-violet-50'>
            <div className='w-48 h-48 rounded-2xl bg-purple-600 absolute'></div>
                <img src={heroImg} alt="" className='w-120 rounded-lg'/>
            
        </div>
    );
};

export default HeroImage;