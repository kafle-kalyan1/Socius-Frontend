import React, { useEffect } from 'react';
import SVG from './SVG';

const ServerError = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <SVG />
      <div className="flex flex-col items-center justify-center">
        <p className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-gray-600 mt-8">500</p>
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-600 mt-2">Server Error</p>
        <h2 className="md:text-lg xl:text-xl text-gray-500 mt-4">
          Oops something went wrong. Try to refresh this page or <br />
          feel free to contact us if the problem persists.
        </h2>
      </div>
    </div>
  );
};

export default ServerError;
