"use client";
import { Chip } from "@nextui-org/react";
import React from "react";
import { ThemeSwitch } from "./theme-switch";
import { useTheme } from "next-themes";

function AppPreview() {
  return (
    <div className="flex-col justify-center items-center mx-auto mt-10 relative text-center">
      <div className="flex justify-center items-center text-cente mb-2">
        <Chip variant="flat" color="secondary">
          Easy to use AI App
        </Chip>
      </div>
      <h1 className="text-2xl lg:text-4xl font-semibold z-10 relative">
        Never Loose Information
      </h1>
      <h1 className="text-lg lg:text-xl font-normal z-10 relative max-w-[600px] text-center flex mx-auto justify-center items-center text-gray-500 mt-2">
        Design2wear is an AI app that helps you design your own clothes.
      </h1>

      <img
        alt="meetings"
        className="w-74 border-2 border-gray-500 rounded-2xl m-10"
        src={
          useTheme().theme === "light"
            ? "/aimockup-light.png"
            : "/aimockup-light.png"
        }
      />
    </div>
  );
}

export default AppPreview;
