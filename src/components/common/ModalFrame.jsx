import React from "react";

const ModalFrame = ({ children }) => {
  return (
    <main className="backdrop-blur-sm bg-black/50 fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center">
      <section className="bg-white p-5 rounded-xl relative ">{children}</section>
    </main>
  );
};

export default ModalFrame;