import React from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen">
    <SyncLoader color="#9C2677" size={20} margin={2} />
  </div>
  );
};

export default LoadingScreen;
