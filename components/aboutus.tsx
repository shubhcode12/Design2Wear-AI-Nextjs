"use client";
import { Chip } from "@nextui-org/react";
import React from "react";
import FeaturesBento from "./feature-bento";

function AboutUs() {
  return (
    <div className="flex-col justify-center items-center mx-auto relative text-center pt-52">
      <div className="flex justify-center items-center text-cente mb-2">
        <Chip variant="flat" color="secondary">
          Why Design2Wear AI?
        </Chip>
      </div>
      <h1 className="text-2xl lg:text-4xl font-semibold z-10 relative">
       Why Choose Our Fashion Assistant?
      </h1>
      <h1 className="text-lg lg:text-xl font-normal z-10 relative max-w-[600px] text-center flex mx-auto justify-center items-center text-gray-500 mt-2">
        Keep track of all your meetings and what was discussed. Import events
        quickly with our Google Calendar and Outlook integrations.
      </h1>

      <FeaturesBento />
    </div>
  );
}

export default AboutUs;
