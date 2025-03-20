import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-full p-5 ">
        <img src={imageSrc} alt="Image" className=" h-[150px] w-[230px] " />
      </div>
      <div className="flex p-4 border-t border-gray-300 justify-between items-center">
        <div>
          <div>{title}</div>
          <div className="text-gray-700 text-sm">{description}</div>
        </div>
        <div className=" ">
          <HiDotsHorizontal />
        </div>
      </div>
    </div>
  );
};

export default Card;
