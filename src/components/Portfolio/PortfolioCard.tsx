import  { useState } from "react";
import Card from "../UiComponent/Card";
import { CiSettings } from "react-icons/ci";

interface PortfolioCardProps {
  id: string;
  imageSrc: string;
  hoverImageSrc: string;
  title: string;
  noOfModules: number;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  id,
  imageSrc,
  hoverImageSrc,
  title,
  noOfModules,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={id}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        imageSrc={isHovered ? hoverImageSrc : imageSrc}
        title={title}
        description={`Modules: ${noOfModules}`}
      />

      {isHovered && (
        <div className="absolute top-2 right-2 cursor-pointer text-gray-500 rounded-full hover:text-black transition-opacity duration-300 opacity-100">
          <CiSettings size={25} />
        </div>
      )}
    </div>
  );
};

export default PortfolioCard;
