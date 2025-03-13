import React from "react";

interface LoadingProps {
  isLoading: boolean;
}

const Loader: React.FC<LoadingProps> = ({ isLoading }) => {


    if (!isLoading) return null;
  
    return (
      <div className="flex items-center justify-center h-16">
        <div className="w-8 h-8 border-4 border-[#001833] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  
};

export default Loader;
