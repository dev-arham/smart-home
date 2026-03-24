"use client";

import Lottie from 'lottie-react';
import React from 'react';
import animationData from '../../../public/images/Animated Dashboards.json';

const HeroLottie = () => {
  return (
    <div className="w-full h-auto rounded-2xl flex items-center justify-center">
      <Lottie 
        animationData={animationData} 
        loop={true}
        className="w-full h-full max-md:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
      />
    </div>
  );
};

export default HeroLottie;