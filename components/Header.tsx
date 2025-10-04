
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 py-2">
        Fake News Detector
      </h1>
      <p className="text-gray-400 mt-2 text-md sm:text-lg">
        Using AI to separate fact from fiction. Enter a headline to begin.
      </p>
    </header>
  );
};

export default Header;
