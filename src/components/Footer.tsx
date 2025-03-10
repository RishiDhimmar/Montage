import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-600 text-sm text-center bottom-0 mt-8">
      <div className="flex justify-center space-x-4 mt-2">
        <p>Collective Assembly © 2023</p>
        <a href="#" className="hover:underline">
          Privacy & Legal
        </a>
        <a href="#" className="hover:underline">
          Contact
        </a>
        <a href="#" className="hover:underline">
          Careers
        </a>
        <a href="#" className="hover:underline">
          Partners
        </a>
        <a href="#" className="hover:underline">
          News
        </a>
      </div>
    </footer>
  );
};

export default Footer;
