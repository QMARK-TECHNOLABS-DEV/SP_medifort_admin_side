import React, { useEffect, useState } from 'react';
import login from '../../assets/login/loginnn.png';
import newImage from '../../assets/login/logins.png';
import symbolImage from '../../assets/login/moon.png';
import stethoscopeImage from '../../assets/login/stethoscope.png';
import axios from '../../axios-folder/axios';
import { loginRoute } from '../../utils/Endpoint';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/AuthSlicer';
import { setAccessToken, setRefreshToken } from '../../redux/slices/TokenReducer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.userInfo);

  useEffect(() => {
    if (isLoggedIn && userData?.role === "admin") {
      navigate("/");
    } else if (userData?.role !== "admin") {
      navigate("/login");
    }
  }, [isLoggedIn, userData, navigate]);

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!data.email.trim()) {
      return toast.info("Email is required")
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      return toast.info("Email is not valid")
    }

    if (!data.password.trim()) {
      return toast.info("Password is required")
    } else if (data.password.length < 8 || data.password.length > 20) {
      return toast.info("Password must be between 8 and 20 characters")
    }

    try {
      const res = await axios.post(loginRoute, data)

      if (res.status === 200) {
        dispatch(setUser(res.data.userInfo))
        dispatch(setAccessToken(res.data.accessToken))
        dispatch(setRefreshToken(res.data.refreshToken))

        toast.success("Authenticated")
        setIsLoggedIn(true)
      }
      else if(res.status === 401){
        toast.error("Invalid Credentials")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-primaryColor p-5 lg:p-20 lg:px-40">
      <div
        className="w-full h-full flex flex-col lg:flex-row bg-white rounded-2xl overflow-auto"
        style={{
          /* Hide scrollbar for WebKit browsers */
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* Internet Explorer and Edge */
        }}
      >
        {/* Left Section */}
        <div className="relative flex flex-col justify-center items-center w-full h-2/3 lg:h-full">
          {/* Login Text with Symbol Image */}
          <div className="absolute top-4 left-1 sm:left-6 md:left-12 z-20 flex items-center">
            <img
              src={symbolImage}
              alt="Symbol"
              className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 mr-2"
            />
            <div className="border p-1 sm:p-2 sm:px-3 md:px-4 bg-white flex items-center text-xs sm:text-sm md:text-md">
              <h2 className="text-pink-700 font-semibold">
                Login to your account
              </h2>
            </div>
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
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex p-5 w-full flex-col items-center justify-center overflow-hidden">
          <div className="flex flex-col items-start justify-center w-2/3">
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
            {/* Form */}
            <form className="flex-grow w-full mt-5 lg:mt-10">
              <div className="mb-6">
                <label
                  className="block text-gray-500 text-sm font-bold mb-2 text-left"
                  htmlFor="email"
                >
                  E-mail
                </label>
                <input
                  className="shadow appearance-none border border-gray-500 rounded w-full py-2 sm:py-3 px-3 sm:px-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Enter e-mail"
                  name='email'
                  value={data?.email}
                  onChange={changeHandler}
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
                  name='password'
                  value={data?.password}
                  onChange={changeHandler}
                />
              </div>

              <div className="flex flex-col items-start">
                <button
                  onClick={submitHandler}
                  className="bg-primaryColor text-white p-2 px-5 text-sm rounded mb-4"
                  type="button"
                >
                  Log In
                </button>

                {/* <a
                  className="inline-block align-baseline font-bold text-sm text-gray-400 hover:text-gray-800"
                  href="#"
                >
                  Forgot Password?
                </a> */}

              </div>
            </form>
          </div>
        </div>

        {/* Mobile Right Section */}
        <div className="md:hidden w-full h-full p-2 py-4 flex flex-col bg-white overflow-y-auto"
          style={{
            /* Hide scrollbar for WebKit browsers */
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* Internet Explorer and Edge */
          }}
        >
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
            <h3 className="text-2xl font-bold mb-3">
              Welcome back!
            </h3>
          </div>

          <form className="mx-4 flex flex-col flex-grow">
            <div className="mb-4">
              <label
                className="block text-gray-500 text-sm font-bold mb-2 text-left"
                htmlFor="email"
              >
                E-mail
              </label>
              <input
                className="shadow appearance-none border border-gray-500 rounded w-full py-2 sm:py-3 px-3 sm:px-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Enter e-mail"
                name='email'
                value={data?.email}
                onChange={changeHandler}
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
                name='password'
                value={data?.password}
                onChange={changeHandler}
              />
            </div>

            <div className="flex flex-col items-start">
              <button
                onClick={submitHandler}
                className="bg-primaryColor text-white p-2 px-5 rounded focus:outline-none focus:shadow-outline mb-2"
                type="button"
              >
                Log In
              </button>

              {/* <a
                className="inline-block text-sm text-gray-400 hover:text-gray-800"
                href="#"
              >
                Forgot Password?
              </a> */}

            </div>
          </form>

          <div className="pt-4 px-4"></div>
        </div>
      </div>
    </div>
  );
}
