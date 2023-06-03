import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../partials/Header";
import PageIllustration from "../partials/PageIllustration";
import { clearMessage, setMessage } from "../redux/message";
import axios from 'axios'
import { setUserData, switchLoginStatus } from "../redux/auth";
import { ColorRing } from "react-loader-spinner";

const initialState = {
  email: "",
  password: "",
};

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [visible, setIsVisible] = useState(false)

  const { message } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    setIsVisible(true)
    await axios.post(
      'https://api.robotizia.ai/auth/user/login',
      {
        email: email,
        password: password,
        first_name: "username",
        last_name: "last_name",
        username: "username"
      }
    ).then((res) => {

      // axios.get("https://api.robotizia.ai/users/find/" + res?.data[1]).then(res => {
      //   dispatch(setUserData({ ...res.data, password: "" }))
      dispatch(switchLoginStatus())
      navigate('/')
      // }).catch((error) => {
      //   dispatch(setMessage((error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //     error.message ||
      //     error.toString()))
      // })


    }).catch((error) => {
      dispatch(setMessage((error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()))
    })




    setIsVisible(false)
    setTimeout(() => {
      dispatch(clearMessage())
    }, 3000);
  };

  useEffect(() => {
    dispatch(clearMessage())
  }, [])
  return (
    <main className="bg-white">
      <div className="relative  md:flex">
        {/* Content */}
        <div className="md:w-1/2 w-full">
          <div className="min-h-screen h-full flex flex-col after:flex-1">
            {/* Header */}

            <div className="max-w-[60%] mt-12 min-w-[450px] mx-auto px-3">
              <div>
                {/* <img src="/images/robotiza.png" /> */}
              </div>
              <h1 className="text-3xl text-slate-800 font-bold mb-1">
                Sign in
              </h1>
              <p className="text-[#ADB5CC] text-xs mb-4">
                Sign in to your account by given credential
              </p>
              {/* Form */}
              <form onSubmit={onSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1 text-black"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input

                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      className="form-input w-full text-gray-600"
                      placeholder="Enter Email ID here"

                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1 text-black"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      className="form-input w-full text-gray-600"
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      autoComplete="on"
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <div className="mr-1 text-gray-600 flex justify-end">
                    <Link
                      className="text-xs text-blue underline hover:no-underline"
                      to="#"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <p className="mt-8 mx-3 text-xs font-bold text-center text-gray-600">
                    {message && (
                      <div
                        className="text-red-500"
                        role="alert"
                      >
                        {message}
                      </div>
                    )}
                  </p>
                  <button type="submit" className="btn w-[90%] mt-8 bg-indigo-500 hover:bg-indigo-600 text-white ml-3">

                    Sign In
                  </button>

                </div>
              </form>
              {/* Footer */}


            </div>
          </div>
          {visible &&
            <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
              <ColorRing visible={true}
                height="100"
                width="100"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#164bd3', '#126eba', '#1850b1', '#5869c9', '#132a77']}
              />
            </div>
          }
        </div>

        {/* Image */}
        <div
          className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
          aria-hidden="true"
        >
          <div className="absolute text-white flex flex-col items-center justify-evenly h-full w-[100%]">

            <div>
              <img src="/images/robotizia-white.png" width={400} />
            </div>
            <div>
              {/* <ul className="text-sm">
                <li className="flex items-center">
                  <svg
                    className="mr-2"
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="4" cy="4" r="4" fill="#F3F4FC" />
                  </svg>
                  No hidden fees. One-click cancellation.
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2"
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="4" cy="4" r="4" fill="#F3F4FC" />
                  </svg>
                  10 Runs per day with access to 75+ tools
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2"
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="4" cy="4" r="4" fill="#F3F4FC" />
                  </svg>
                  Quantity and quality, you no longer have to choose
                </li>
              </ul> */}
            </div>
          </div>
          <svg
            className="h-[100%] w-[100%]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H972V1024H4.5335C16.4779 1002.67 26.9733 980.409 36.8165 957.863C74.9683 871.134 99.3953 777.28 109.104 681.677C119.775 577.437 112.116 471.232 88.1444 369.724C105.792 364.689 123.491 359.834 141.087 354.64C150.972 351.603 157.855 339.659 154.977 328.674C152.597 320.082 149.823 311.637 147.432 303.057C115.884 193.318 65.7874 89.902 0 0Z"
              fill="url(#paint0_linear_0_1629)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_0_1629"
                x1="1096.5"
                y1="1024"
                x2="158.117"
                y2="137.028"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#D023EC" />
                <stop offset="1" stop-color="#555CFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </main>
  );
}

export default Signin;
