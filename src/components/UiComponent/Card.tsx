import React from "react";

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({imageSrc, title, description }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageSrc} alt="Card Image" className="w-full h-2/3 object-cover" />
      <hr />
      <h1>{title}</h1>
      <div className="h-1/3 flex ">
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Card;
