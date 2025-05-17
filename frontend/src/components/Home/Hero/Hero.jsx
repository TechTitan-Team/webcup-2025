import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { HiFolderDownload } from "react-icons/hi";
import CustomContainer from "../../../common/CustomContainer/CustomContainer";
import CustomButton from "../../../common/CustomButton/CustomButton";

import backgroundImage from "../../../assets/images/pexels-by.png"; 
import backgroundImageTwo from "../../../assets/images/pexels-by-2.png"; 

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 3000); // Change d'image toutes les 3 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <CustomContainer className={"banner"}>
      <div className="banner-title mt-5">
        <Marquee 
          speed={80} 
          gradient={false} 
          style={{ overflow: "hidden", zIndex: 'auto' }}
        >
          <h1>Crée ta page de départ -</h1>
        </Marquee>
        <Marquee
          speed={80}
          direction="right"
          gradient={false}
          style={{ overflow: "hidden", zIndex: 'auto'}}
        >
          <h1>dramatique - classe - gênante ou touchante -</h1>
        </Marquee>
      </div>

      <div className="content flex mt-15">
        <div className="w-1/5 flex items-center">
          <div>
            <p>
              AS A DIGITAL DESIGNER, I FOCUS ON PRODUCING TOP-NOTCH AND IMPACTFUL
              DIGITAL EXPERIENCES.
            </p>
            <p>DAVID'S INTERACTION DESIGN EXPERTISE DELIVERED.</p>
          </div>
        </div>
        <div className="w-3/5 text-center">
          <img 
            src={backgroundImage} 
            alt="Background" 
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-150 h-auto transition-opacity duration-1000 ${
              currentImage === 0 ? 'opacity-60' : 'opacity-0'
            }`}
            style={{ zIndex: 0 }}
          />
          <img 
            src={backgroundImageTwo} 
            alt="Background" 
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-110 h-auto transition-opacity duration-1000 ${
              currentImage === 1 ? 'opacity-60' : 'opacity-0'
            }`}
            style={{ zIndex: 0 }}
          />
        </div>
        <div className="w-1/5 flex flex-col justify-start items-start">
          <p>
            AS A DIGITAL DESIGNER, I FOCUS ON PRODUCING TOP-NOTCH AND IMPACTFUL
          </p>
          <div>
            <CustomButton
              className="mt-5"
              title={"Créer ma page"}
              icon={<HiFolderDownload className="w-6 h-6" />}
            />
          </div>{/*
          <div className="flex gap-2">
            <CustomBadge
              title={"Digital design"}
              className={'mt-4'}
            />
            <CustomBadge
              title={"2025"}
              className={'mt-4'}
              theme="dark"
            />
          </div> */}
        </div>
      </div>
    </CustomContainer>
  );
};

export default Hero;
