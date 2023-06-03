import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClientSecret, setUserData } from "../redux/auth";
import { ColorRing } from "react-loader-spinner";
import { clearMessage, setMessage } from "../redux/message";
import { useNavigate } from "react-router-dom";

function PricingTables() {
  const [value, setValue] = useState(true);

  const [priceOutput] = useState({
    plan1: {
      false: ["$", "39", "/mo"],
      true: ["$", "29", "/mo"],
    },
    plan2: {
      false: ["$", "79", "/mo"],
      true: ["$", "57", "/mo"],
    },
    plan3: {
      false: ["$", "197", "/mo"],
      true: ["$", "139", "/mo"],
    },
  });
  const [subscriptionObject, setSubscriptionObject] = useState({});

  // useEffect(() => {
  //   setIsVisible(true)
  //   axios.post('https://api.robotizia.ai/payment/subscription/initial',
  //     {
  //       plan: "Basic",
  //       frequency: priceOutput.plan1[value][1] && priceOutput.plan1[value][1] === "18" ? "Monthly" : "Annually",
  //       email: user?.email
  //     }
  //   ).then((res) => {
  //     window.location.href = res?.data.invoice_url
  //   }).catch((error) => {
  //     console.log(error.response &&
  //       error.response.data &&
  //       error.response.data.message) ||
  //       error.message ||
  //       error.toString()
  //   })

  //   setIsVisible(false)
  // }, [subscriptionObject])

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const [visible, setIsVisible] = useState(false);

  console.log(
    JSON.stringify({
      plan: "Basic",
      frequency: priceOutput.plan1[value][1] === "18" ? "Monthly" : "Yearly",
      email: user?.email,
    })
  );
  console.log(user);

  // useEffect(async () => {
  //   axios.get("https://api.robotizia.ai/users/find/" + user[1]).then((res) => {
  //     setUserData(res?.data)
  //   }).catch((error) => {
  //     console.log(error.response &&
  //       error.response.data &&
  //       error.response.data.message) ||
  //       error.message ||
  //       error.toString()
  //     // setTimeout(() => {
  //     //   dispatch(clearMessage())
  //     // }, 3000);
  //   })
  // }, [])

  const [subscriped, setSubscriped] = useState(false);
  useEffect(() => {
    axios
      .get(
        "https://api.robotizia.ai/users/find/" + user?.id
      )
      .then((res) => {
        if (res.data.subscriptionId) {
          setSubscriped(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h1 className="h1 mb-4 text-indigo-500" data-aos="fade-up">
              Simple, transparent pricing
            </h1>
            <p
              className="text-xl text-gray-400"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Get the Robotizia plan that fits your needs at a special
              introductory price.
            </p>
          </div>

          {/* Pricing tables */}
          <div>
            {/* Pricing toggle */}
            <div
              className="flex justify-center mb-16"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="inline-flex items-center">
                <div className="text-gray-600 font-medium mr-3">
                  Billed Monthly
                </div>
                <div className="form-switch">
                  <input
                    type="checkbox"
                    name="pricing-toggle"
                    id="pricing-toggle"
                    className="sr-only"
                    checked={value}
                    onChange={() => setValue(!value)}
                  />
                  <label className="bg-gray-600" htmlFor="pricing-toggle">
                    <span className="bg-gray-200" aria-hidden="true"></span>
                    <span className="sr-only">Enable to see yearly prices</span>
                  </label>
                </div>
                <div className="text-gray-600 font-medium ml-3">
                  Billed Annually
                </div>
              </div>
            </div>
            <p className="my-8 mx-3 text-xl font-bold text-center text-gray-600">
              {message && (
                <div className="text-red-500" role="alert">
                  {message}
                </div>
              )}
            </p>
            {visible && (
              <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
                <ColorRing
                  visible={true}
                  height="100"
                  width="100"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    "#164bd3",
                    "#126eba",
                    "#1850b1",
                    "#5869c9",
                    "#132a77",
                  ]}
                />
              </div>
            )}

            <div className="max-w-sm rounded-md justify-center mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 items-center lg:max-w-none">
              {/* Pricing table 1 */}
              <div
                className="relative flex flex-col h-full p-6 shadow-xl"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="h4 text-indigo-600 mb-1">Basic</div>
                  <div className="inline-flex items-baseline mb-2">
                    <span className="text-2xl md:text-3xl font-medium text-gray-400">
                      {priceOutput.plan1[value][0]}
                    </span>
                    <span className="h2 text-indigo-500">
                      {priceOutput.plan1[value][1]}
                    </span>
                    <span className="font-medium text-gray-400">
                      {priceOutput.plan1[value][2]}
                    </span>
                  </div>
                  <div className="text-gray-400">Robotizia Pricing</div>
                </div>
                <div className="font-medium mb-3">Features include:</div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>10,000 words Per month</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>800 words Input length</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>5 questions per question type</span>
                  </li>

                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>
                      Generate Multiple Choice, True/False, Short Answer and
                      Fill- In-The-Blank Questions
                    </span>
                  </li>
                </ul>
                {!subscriped && (
                  <div
                    onClick={async () => {
                      let frequency =
                        priceOutput.plan2[value][1] === "49"
                          ? "Monthly"
                          : "Yearly";

                      setIsVisible(true);
                      isLoggedIn
                        ? await axios
                          .post(
                            "https://api.robotizia.ai/payment/subscription/initial",
                            {
                              plan: "Basic",
                              frequency: frequency,
                              email: user?.email,
                            }
                          )
                          .then((res) => {
                            navigate("/payment");
                            dispatch(
                              setClientSecret({
                                plan: "Basic",
                                frequency: frequency,
                                email: user?.email,
                                clientsecret: res?.data.client_secret,
                              })
                            );
                          })
                          .catch((error) => {
                            dispatch(
                              setMessage(
                                error.response &&
                                error.response.data &&
                                error.response.data.message
                              ) ||
                              error.message ||
                              error.toString()
                            );
                            setTimeout(() => {
                              dispatch(clearMessage());
                            }, 5000);
                          })
                        : navigate("/signin");
                      setIsVisible(false);
                    }}
                    className=" p-3 mt-6"
                  >
                    <a
                      className="btn-sm text-white bg-indigo-600 hover:bg-indigo-700 w-full"
                      href="#0"
                    >
                      Get started
                    </a>
                  </div>
                )}
              </div>

              {/* Pricing table 2 */}
              <div
                className="relative flex flex-col h-full p-6 shadow-xl"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="absolute top-0 right-0 mr-6 -mt-4">
                  <div className="inline-flex text-sm font-semibold py-1 px-3 mt-px text-green-600 bg-green-200 rounded-full">
                    Most Popular
                  </div>
                </div>
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="h4 text-purple-600 mb-1">Premium</div>
                  <div className="inline-flex items-baseline mb-2">
                    <span className="text-2xl md:text-3xl font-medium text-gray-400">
                      {priceOutput.plan2[value][0]}
                    </span>
                    <span className="h2 text-indigo-500">
                      {priceOutput.plan2[value][1]}
                    </span>
                    <span className="font-medium text-gray-400">
                      {priceOutput.plan2[value][2]}
                    </span>
                  </div>
                  <div className="text-gray-400">
                    Better insights
                  </div>
                </div>
                <div className="font-medium mb-3">
                  All features of Essential plus:
                </div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>40,000 words Per month</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Consectetur adipiscing elit</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Excepteur sint occaecat cupidatat</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Officia deserunt mollit anim</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Placeholder text commonly used</span>
                  </li>
                </ul>
                {!subscriped && (
                  <div
                    onClick={async () => {
                      let frequency =
                        priceOutput.plan3[value][1] === "79"
                          ? "Monthly"
                          : "Yearly";

                      setIsVisible(true);
                      isLoggedIn
                        ? await axios
                          .post(
                            "https://api.robotizia.ai/payment/subscription/initial",
                            {
                              plan: "Basic",
                              frequency: frequency,
                              email: user?.email,
                            }
                          )
                          .then((res) => {
                            navigate("/payment");
                            dispatch(
                              setClientSecret({
                                plan: "Premium",
                                frequency: frequency,
                                email: user?.email,
                                clientsecret: res?.data.client_secret,
                              })
                            );
                          })
                          .catch((error) => {
                            dispatch(
                              setMessage(
                                error.response &&
                                error.response.data &&
                                error.response.data.message
                              ) ||
                              error.message ||
                              error.toString()
                            );
                            setTimeout(() => {
                              dispatch(clearMessage());
                            }, 5000);
                          })
                        : navigate("/signin");
                      setIsVisible(false);
                    }}
                    className=" p-3 mt-6"
                  >
                    <a
                      className="btn-sm text-white bg-purple-600 hover:bg-purple-700 w-full"
                      href="#0"
                    >
                      Get started
                    </a>
                  </div>
                )}
              </div>

              {/* Pricing table 3 */}
              <div
                className="relative flex flex-col h-full p-6 shadow-xl"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="h4 text-indigo-600 mb-1">Gold</div>
                  <div className="inline-flex items-baseline mb-2">
                    <span className="text-2xl md:text-3xl font-medium text-gray-400">
                      {priceOutput.plan3[value][0]}
                    </span>
                    <span className="h2 text-indigo-500">
                      {priceOutput.plan3[value][1]}
                    </span>
                    <span className="font-medium text-gray-400">
                      {priceOutput.plan3[value][2]}
                    </span>
                  </div>
                  <div className="text-gray-400">Robotizia Pricing</div>
                </div>
                <div className="font-medium mb-3">
                  All features of Essential plus:
                </div>
                <ul className="text-gray-400 -mb-3 grow">
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>70 000 words and 2000 words Input length</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Input Content as .txt, .doc or .pdf</span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Create Study Guide</span>
                  </li>
                  {/* <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>
                      Export Questions, and Study Guide as .txt,.doc or .pdf
                    </span>
                  </li> */}
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>
                      Export Questions, and Study Guide as .txt,.doc or .pdf
                    </span>
                  </li>
                  <li className="flex items-center mb-3">
                    <svg
                      className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Auto-Save</span>
                  </li>
                </ul>
                {!subscriped && (
                  <div
                    onClick={async () => {
                      let frequency =
                        priceOutput.plan1[value][1] === "197"
                          ? "Monthly"
                          : "Yearly";

                      setIsVisible(true);
                      isLoggedIn
                        ? await axios
                          .post(
                            "https://api.robotizia.ai/payment/subscription/initial",
                            {
                              plan: "Basic",
                              frequency: frequency,
                              email: user?.email,
                            }
                          )
                          .then((res) => {
                            navigate("/payment");
                            dispatch(
                              setClientSecret({
                                plan: "Gold",
                                frequency: frequency,
                                email: user?.email,
                                clientsecret: res?.data.client_secret,
                              })
                            );
                          })
                          .catch((error) => {
                            dispatch(
                              setMessage(
                                error.response &&
                                error.response.data &&
                                error.response.data.message
                              ) ||
                              error.message ||
                              error.toString()
                            );
                            setTimeout(() => {
                              dispatch(clearMessage());
                            }, 5000);
                          })
                        : navigate("/signin");
                      setIsVisible(false);
                    }}
                    className="p-3 mt-6"
                  >
                    <a
                      className="btn-sm text-white bg-indigo-600 hover:bg-indigo-700 w-full"
                      href="#0"
                    >
                      Get started
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingTables;
