import axios from "axios";
import React, { useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../partials/Header";
import PageIllustration from "../partials/PageIllustration";
import { switchLoginStatus } from "../redux/auth";
import { clearMessage, setMessage } from "../redux/message";
import { registerUser } from "../redux/user-actions";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Signup() {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [visible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(clearMessage());
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password, firstName, lastName, confirmPassword } = values;
    setIsVisible(true);
    // if (password !== confirmPassword) {
    //   dispatch(setMessage("Password do not match"))
    // }
    await axios
      .post(
        "https://king-prawn-app-n4y9m.ondigitalocean.app/auth/client/local/signup",
        {
          first_name: firstName,
          last_name: lastName,
          username: firstName.toLowerCase() + lastName.toLowerCase(),
          email: email,
          password: password,
        }
      )
      .then((res) => {
        // if (!response.ok) {
        //   throw new Error('Sending user data failed.');
        // }
        // dispatch(switchLoginStatus())

        alert("Account created");
      })
      .catch((error) => {
        dispatch(
          setMessage(
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
          )
        );
      });
    setIsVisible(false);
  };

  return (
    <main className="bg-white">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2 w-full">
          <div className="min-h-screen h-full flex flex-col after:flex-1">
            {/* Header */}

            <div className="max-w-[60%] min-w-[450px] mx-auto px-3">
              <div>
                <img src="/images/robotiza.png" />
              </div>
              <h1 className="text-3xl text-slate-800 font-bold mb-1">
                Sign up
              </h1>
              <p className="text-[#ADB5CC] text-xs mb-4">
                Welcome to Loopy AI. Sign up to get started
              </p>
              {/* Form */}
              <form onSubmit={onSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1 text-black"
                      htmlFor="first-name"
                    >
                      First Name
                    </label>
                    <input
                      required
                      id="first-name"
                      className="form-input w-full text-gray-600"
                      placeholder="First Name"
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1 text-black"
                      htmlFor="last-name"
                    >
                      Last Name
                    </label>
                    <input
                      required
                      id="last-name"
                      className="form-input w-full text-gray-600"
                      placeholder="Last Name"
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1 text-black"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      required
                      id="email"
                      className="form-input w-full text-gray-600"
                      placeholder="name@example.com"
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
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
                  <div>
                    <label
                      className="block text-sm font-medium mb-1 text-black"
                      htmlFor="password-2"
                    >
                      Confirmed Password
                    </label>
                    <input
                      id="password-2"
                      className="form-input w-full text-gray-600"
                      placeholder="Re-type password"
                      name="confirmPassword"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      autoComplete="on"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="mt-8 mx-3 text-xs font-bold text-center text-gray-600">
                    {message && (
                      <div className="text-red-500" role="alert">
                        {message}
                      </div>
                    )}
                  </p>
                  <button
                    type="submit"
                    className="btn w-[90%] mt-8 bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              {/* Footer */}
              <div className="flex items-center justify-evenly mt-8">
                <hr className="w-[70px] border-black" />
                <p className="text-[14px] text-gray-600">Or continue with</p>
                <hr className="w-[70px] border-black" />
              </div>
              <Link
                className="btn w-[90%] mt-8 bg-[#0D99FF] text-white ml-3"
                to="/"
              >
                Sign up with Google
              </Link>
              <div className="pt-5 mt-2">
                <div className="text-xs text-center text-gray-600 mb-8">
                  Already have an account?{" "}
                  <Link
                    className="font-medium text-indigo-500 hover:text-indigo-600"
                    to="/signin"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {visible && (
            <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
              <ColorRing
                visible={true}
                height="100"
                width="100"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#164bd3", "#126eba", "#1850b1", "#5869c9", "#132a77"]}
              />
            </div>
          )}
        </div>

        {/* Image */}
        <div
          className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
          aria-hidden="true"
        >
          <div className="absolute text-white flex flex-col items-center justify-evenly h-full w-[100%]">
            <div className="text-3xl">5-day FREE trial. Cancel anytime.</div>
            <div>
              <img src="/images/robotizia-white.png" width={400} />
            </div>
            <div>
              <ul className="text-sm">
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
              </ul>
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

export default Signup;
