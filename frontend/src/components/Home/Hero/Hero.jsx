import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { HiFolderDownload } from "react-icons/hi";
import CustomContainer from "../../../common/CustomContainer/CustomContainer";
import CustomButton from "../../../common/CustomButton/CustomButton";
import { Link } from "react-router-dom";

import backgroundImage from "../../../assets/images/pexels-by.png"; 
import backgroundImageTwo from "../../../assets/images/pexels-by-2.png"; 

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <CustomContainer className={"banner"}>
      <div className="banner-title mt-8">
        <Marquee 
          speed={80} 
          gradient={false} 
          style={{ overflow: "hidden", zIndex: 'auto' }}
        >
          <h1>Créez votre page d'adieu -</h1>
        </Marquee>
        <Marquee
          speed={80}
          direction="right"
          gradient={false}
          style={{ overflow: "hidden", zIndex: 'auto'}}
        >
          <h1>dramatique - ironique - cringe - classe - touchante -</h1>
        </Marquee>
      </div>

      <div className="content flex mt-16">
        <div className="w-1/5 flex items-center">
          <div>
            <p className="text-gray-600 text-sm">
              EXPRIMEZ-VOUS AVANT DE CLAQUER LA PORTE.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              UNE PAGE UNIQUE. AVEC STYLE.
            </p>
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
          <p className="text-gray-600 text-sm">
            PARCE QUE SI C'EST LA FIN, AUTANT QU'ELLE SOIT INOUBLIABLE.
          </p>
          <Link to="/create-page">
            <CustomButton
              className="mt-5"
              title={"Créer ma page"}
              icon={<HiFolderDownload className="w-5 h-5" />}
            />
          </Link>
        </div>
      </div>
    </CustomContainer>
  );
};

export default Hero;
