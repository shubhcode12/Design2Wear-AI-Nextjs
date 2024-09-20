"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

export default function FeaturesBento() {
  return (
    <div className="max-w-[900px] gap-4 grid grid-cols-12 grid-rows-2 px-8 mt-20">
      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            AI-Powered Suggestions
          </p>
          <h4 className="text-white font-medium text-large">
            Get personalized outfit ideas based on your preferences, occasion,
            and style.
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src="https://img.freepik.com/free-photo/young-woman-stylish-orange-hat-bright-blouse-is-dancing-red-wall-girl-white-skirt-sneakers-smiles_197531-14351.jpg?t=st=1726844181~exp=1726847781~hmac=59e997dc693c2225c1eb8b20a55267c4ee3ab155fb24c08bf0fe42e5225aa5dd&w=2000"
        />
      </Card>
      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            Tailored to You
          </p>
          <h4 className="text-white font-medium text-large">
            Input your size, style, and favorite colors to generate looks that
            fit you perfectly.
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src="https://img.freepik.com/free-photo/young-handsome-man-street-outfit_1303-19659.jpg?t=st=1726844427~exp=1726848027~hmac=0cbff501ebf0381ad4f35b98f1c5294bc9fae5a764f6e292d42e95e1668286e1&w=996"/>
      </Card>
      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            Multiple Categories
          </p>
          <h4 className="text-white font-medium text-large">
            From casual wear to formal events, we have outfits for every
            occasion.
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src="https://img.freepik.com/free-photo/charming-young-woman-pink-suit-looking-away_197531-16815.jpg?t=st=1726844288~exp=1726847888~hmac=a2dc47b0d7770d67582a5335b0945524a896f60d1a829409402aeedc297cbfe8&w=2000"
        />
      </Card>
    </div>
  );
}
