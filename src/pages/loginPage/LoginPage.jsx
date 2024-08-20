import React from "react";
import login from "../../assets/login/loginnn.png";
import newImage from "../../assets/login/logins.png";
import symbolImage from "../../assets/login/moon.png";
import stethoscopeImage from "../../assets/login/stethoscope.png";

export default function Login() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-white border-8 border-pink-600 box-border ">
      {/* Left Section */}
      <div className="w-full md:w-1/2 h-full relative ">
        {/* Symbol Image */}
        <img
          src={symbolImage}
          alt="Symbol"
          className="absolute top-4 md:top-8 left-4 md:left-8 w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 z-20"
        />

        {/* Login Text with a Box */}
        <div className="absolute top-4 md:top-8 left-4 sm:left-10 md:left-20 z-20 border p-1 sm:p-2 sm:px-3 md:px-4 bg-white flex items-center text-xs sm:text-sm md:text-md">
          <h2 className="text-pink-700 font-semibold">Login to your account</h2>
        </div>

        {/* Existing Image */}
        <img
          src={login}
          alt="Login Image"
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ zIndex: 5 }}
        />

        {/* New Image */}
        <img
          src={newImage}
          alt="New Image"
          className="absolute w-full h-[40%] sm:h-[50%] object-bottom"
          style={{ zIndex: 10, bottom: "10%" }}
        />

        <div className="absolute inset-0 opacity-50"></div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex md:w-1/2 h-full p-6 sm:p-8 md:p-12 flex-col justify-start bg-white overflow-y-auto">
        <div className="flex flex-col items-start mt-10 sm:mt-8 ml-6">
          <div className="flex items-center mb-4">
            <img
              src={stethoscopeImage}
              alt="Stethoscope"
              className="w-5 sm:w-6 h-5 sm:h-6 mr-2"
            />
            <h2 className="text-pink-700 font-semibold text-lg sm:text-xl">Admin Login</h2>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-6">Welcome back!</h3>
        </div>

        <form className="flex-grow">
          <div className="mb-6">
            <label
              className="block text-gray-500 text-sm font-bold mb-2 text-left"
              htmlFor="username"
            >
              Username / E-mail
            </label>
            <input
              className="shadow appearance-none border border-gray-500 rounded w-full py-2 sm:py-3 px-3 sm:px-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="r6o3george@gmail.com"
            />
          </div>

          <div className="mb-8">
            <label
              className="block text-gray-500 text-sm font-bold mb-2 text-left"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-gray-500 rounded w-full py-2 sm:py-3 px-3 sm:px-4 text-gray-700 bg-gray-100 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
            />
          </div>

          <div className="flex flex-col items-start">
            <button
              className="bg-pink-700 hover:bg-pink-900 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded mb-4"
              type="button"
            >
              Log In
            </button>
            
            <a
              className="inline-block align-baseline font-bold text-sm text-gray-400 hover:text-gray-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>

      {/* Mobile Right Section */}
      <div className="md:hidden w-full h-full p-4 flex flex-col bg-white overflow-y-auto">
        <div className="flex flex-col items-start mt-6 mb-4 mx-4">
          <div className="flex items-center mb-4">
            <img
              src={stethoscopeImage}
              alt="Stethoscope"
              className="w-5 sm:w-6 h-5 sm:h-6 mr-2"
            />
            <h2 className="text-pink-700 font-semibold text-lg sm:text-xl">Admin Login</h2>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Welcome back!</h3>
        </div>

        <form className="mx-4 flex flex-col flex-grow">
          <div className="mb-4">
            <label
              className="block text-gray-500 text-sm font-bold mb-2 text-left"
              htmlFor="username"
            >
              Username / E-mail
            </label>
            <input
              className="shadow appearance-none border border-gray-500 rounded w-full py-2 sm:py-3 px-3 sm:px-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="r6o3george@gmail.com"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-500 text-sm font-bold mb-2 text-left"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-gray-500 rounded w-full py-2 sm:py-3 px-3 sm:px-4 text-gray-700 bg-gray-100 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
            />
          </div>

          <div className="flex flex-col items-start">
            <button
              className="bg-pink-700 hover:bg-pink-900 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded focus:outline-none focus:shadow-outline mb-4"
              type="button"
            >
              Log In
            </button>
            
            <a
              className="inline-block font-bold text-sm text-gray-400 hover:text-gray-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>

        <div className="pt-4 px-4">
       
        </div>
      </div>
    </div>
  );
}
