import React from "react";
import login from "../../assets/login/loginnn.png";
import newImage from "../../assets/login/logins.png";
import symbolImage from "../../assets/login/moon.png";
import stethoscopeImage from "../../assets/login/stethoscope.png";

export default function Login() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-primaryColor p-5 lg:p-20 lg:px-40">
      <div className="w-full h-full flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden">
        {/* Left Section */}
        <div className="w-full h-2/3 lg:h-full relative">
          {/* Symbol Image */}
          <img
            src={symbolImage}
            alt="Symbol"
            className="absolute top-4 md:top-8 left-4 md:left-8 w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 z-20"
          />

          {/* Login Text with a Box */}
          <div className="absolute top-4 md:top-8 left-4 sm:left-10 md:left-20 z-20 border p-1 sm:p-2 sm:px-3 md:px-4 bg-white flex items-center text-xs sm:text-sm md:text-md">
            <h2 className="text-pink-700 font-semibold">
              Login to your account
            </h2>
          </div>

          {/* Existing Image */}
          <img
            src={login}
            alt="Login_Image"
            className="absolute w-full h-full object-cover"
            style={{ zIndex: 5 }}
          />

          {/* New Image */}
          <div className="absolute z-10 bottom-0">
            <img
              src={newImage}
              alt="New_Image"
              className=" w-full h-full object-contain "
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex p-5 w-full flex-col items-center justify-center  overflow-hidden">
          <div className="flex flex-col items-start justify-center w-2/3 ">
            <div className="flex items-center mb-4">
              <img
                src={stethoscopeImage}
                alt="Stethoscope"
                className="w-5 sm:w-6 h-5 sm:h-6 mr-2"
              />
              <h2 className="text-pink-700 font-semibold text-lg sm:text-xl">
                Admin Login
              </h2>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold mb-6">
              Welcome back!
            </h3>
            {/* form part */}
            <form className="flex-grow w-full mt-5 lg:mt-10">
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
                  className="bg-primaryColor  text-white p-2 px-5 text-sm rounded mb-4"
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
        </div>

        {/* Mobile Right Section */}
        <div className="md:hidden w-full h-full p-2 py-4 flex flex-col bg-white overflow-y-auto">
          <div className="flex flex-col items-start mb-3 mx-4">
            <div className="flex items-center mb-1 gap-2">
              <img
                src={stethoscopeImage}
                alt="Stethoscope"
                className="w-5"
              />
              <h2 className="text-pink-700 font-semibold text-lg">
                Admin Login
              </h2>
            </div>
            <h3 className="text-2xl  font-bold mb-3">
              Welcome back!
            </h3>
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

            <div className="mb-3">
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
                className="bg-primaryColor text-white p-2 px-5 rounded focus:outline-none focus:shadow-outline mb-2"
                type="button"
              >
                Log In
              </button>

              <a
                className="inline-block text-sm text-gray-400 hover:text-gray-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>

          <div className="pt-4 px-4"></div>
        </div>
      </div>
    </div>
  );
}
