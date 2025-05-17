
import React from "react";
import Marquee from "react-fast-marquee";
import { HiFolderDownload } from "react-icons/hi";
import CustomContainer from "../../../common/CustomContainer/CustomContainer";
import CustomButton from "../../../common/CustomButton/CustomButton";

const Hero = () => {
  return (
    <CustomContainer className={"banner"}>
      <div className="banner-title mt-5">
        <Marquee 
          speed={80} 
          gradient={false} 
          style={{ overflow: "hidden", zIndex: 'auto' }}
        >
          <h1>Niaina Christopher - Razafindrazaka - </h1>
        </Marquee>
        <Marquee
          speed={80}
          direction="right"
          gradient={false}
          style={{ overflow: "hidden", zIndex: 'auto'}}
        >
          <h1>Fullstack developer - Mobile - Web - </h1>
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
        </div>
        <div className="w-1/5 flex flex-col justify-start items-start">
          <p>
            AS A DIGITAL DESIGNER, I FOCUS ON PRODUCING TOP-NOTCH AND IMPACTFUL
          </p>
          <div>
            <CustomButton
              className="mt-5"
              title={"Download my cv"}
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
