import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

import { useSelector } from "react-redux";

function Subscriptions({ userData, getUserData }) {
  const { user } = useSelector((state) => state.auth);
  const [values, setValues] = useState({
    username: userData?.username,
    email: userData?.email,
  });

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const updateUsername = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://api.robotizia.ai/users/username/update/" +
        user.id,
        {
          username: values.username,
        }
      )
      .then((res) => {
        console.log(res.data);
        getUserData();
        Swal.fire({
          icon: "success",
          title: "Username updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
        err.message === "Network Error"
          ? Swal.fire({
            icon: "warning",
            title: "No internet connection. Please check your network",
            showConfirmButton: false,
            timer: 1500,
          })
          : Swal.fire({
            icon: "info",
            title: "Server error, please try later",
            showConfirmButton: false,
            timer: 1500,
          });
      });
  };

  const updateEmail = (e) => {
    e.preventDefault();
    console.log(userData?.email === values.email);
    if (userData?.email === values?.email) {
      Swal.fire({
        icon: "warning",
        title: "The entered email is the same as the old one",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      axios
        .post(
          "https://api.robotizia.ai/users/email/update/" +
          user.id,
          {
            new_email: values.email,
          }
        )
        .then((res) => {
          console.log(res.data);
          getUserData();
          Swal.fire({
            icon: "success",
            title: "Email address updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err.message);
          err.message === "Network Error"
            ? Swal.fire({
              icon: "warning",
              title: "No internet connection. Please check your network",
              showConfirmButton: false,
              timer: 1500,
            })
            : err.message === "Request failed with status code 403"
              ? Swal.fire({
                icon: "error",
                title: "Email address already taken",
                showConfirmButton: false,
                timer: 1500,
              })
              : Swal.fire({
                icon: "info",
                title: "Server error, please try later",
                showConfirmButton: false,
                timer: 1500,
              });
        });
    }
  };

  const plans = {
    Basic: {
      Monthly: 39,
      Yearly: 29 * 12,
    },
    Premium: {
      Monthly: 79,
      Yearly: 57 * 12,
    },
    Gold: {
      Monthly: 197,
      Yearly: 139 * 12,
    },
  };

  return (
    <div className="space-y-5 my-8 xl:mb-0 ">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl text-slate-800 font-bold mb-4">
            Billing & Invoices
          </h2>
          <div className="text-sm text-[#475569]">
            Your {userData?.subscription?.plan} Plan is set to{" "}
            <strong className="font-medium">
              $545
            </strong>{" "}
            per{" "}
            {userData?.subscription?.frequency === "Yearly" ? "year" : "month"}{" "}
            and will renew on{" "}
            <strong className="font-medium">July 9, 2021</strong>.
          </div>
          <div className="flex justify-between mt-6">
            <div className="md:w-[200px]">
              <a
                href="https://billing.stripe.com/p/login/test_00g3fM5A0gwaav6144"
                target="_blank"
              >
                <button
                  type="submit"
                  className=" w-full bg-[red] font-semibold  py-[6px] text-white rounded-md text-sm"
                >
                  CANCEL
                </button>
              </a>
            </div>
            <div className="md:w-[200px]">
              <a
                href="https://billing.stripe.com/p/login/test_00g3fM5A0gwaav6144"
                target="_blank"
              >
                <button className=" w-full bg-[green] font-semibold py-[6px] text-white rounded-md text-sm">
                  UPGRADE
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Billing Information */}
        <section className="mt-6">
          <div className="flex justify-between">
            <h3 className="text-xl leading-snug text-slate-800 font-bold mb-1">
              Billing Information
            </h3>
            <span
              className={
                userData?.subscription?.Status === "Active"
                  ? "text-[green] font-semibold"
                  : "text-[red] font-semibold"
              }
            >
              {userData?.subscription?.Status}
            </span>
          </div>
          <ul>
            <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
              {/* Left */}
              <div className="text-sm text-slate-800 font-medium">
                Payment Method
              </div>
              {/* Right */}
              <div className="text-sm text-slate-800ml-4">
                <span className="mr-3 text-[#475569] ">Bank card</span>
                {/* <a
                  className="font-medium text-indigo-500 hover:text-indigo-600"
                  href="#0"
                >
                  Edit
                </a> */}
              </div>
            </li>
            <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
              {/* Left */}
              <div className="text-sm text-slate-800 font-medium">Plan</div>
              {/* Right */}
              <div className="text-sm text-slate-800ml-4">
                <span className="mr-3 text-[#475569] ">
                  {userData?.subscription?.plan}
                </span>
                {/* <a
                  className="font-medium text-indigo-500 hover:text-indigo-600"
                  href="#0"
                >
                  Edit
                </a> */}
              </div>
            </li>
            <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
              {/* Left */}
              <div className="text-sm text-slate-800 font-medium">
                Billing Interval
              </div>
              {/* Right */}
              <div className="text-sm text-slate-800ml-4">
                <span className="mr-3 text-[#475569] ">
                  {userData?.subscription?.frequency}
                </span>
                {/* <a
                  className="font-medium text-indigo-500 hover:text-indigo-600"
                  href="#0"
                >
                  Edit
                </a> */}
              </div>
            </li>
            <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
              {/* Left */}
              <div className="text-sm text-slate-800 font-medium">
                VAT/GST Number
              </div>
              {/* Right */}
              <div className="text-sm text-slate-800ml-4">
                <span className="mr-3 text-[#475569] ">-</span>
                {/* <a
                  className="font-medium text-indigo-500 hover:text-indigo-600"
                  href="#0"
                >
                  Edit
                </a> */}
              </div>
            </li>
            <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
              {/* Left */}
              <div className="text-sm text-slate-800 font-medium">
                Your Address
              </div>
              {/* Right */}
              <div className="text-sm text-slate-800ml-4">
                <span className="mr-3 text-[#475569] ">-</span>
                {/* <a
                  className="font-medium text-indigo-500 hover:text-indigo-600"
                  href="#0"
                >
                  Edit
                </a> */}
              </div>
            </li>
            <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
              {/* Left */}
              <div className="text-sm text-slate-800 font-medium">
                Billing Address
              </div>
              {/* Right */}
              <div className="text-sm text-slate-800ml-4">
                <span className="mr-3 text-[#475569] ">{userData?.email}</span>
                {/* <a
                  className="font-medium text-indigo-500 hover:text-indigo-600"
                  href="#0"
                >
                  Edit
                </a> */}
              </div>
            </li>
          </ul>
        </section>

        {/* Invoices */}
        <section>
          <h3 className="text-xl leading-snug text-slate-800 font-bold mb-1">
            Invoices
          </h3>
          {/* Table */}
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400">
              <tr className="flex flex-wrap md:table-row md:flex-no-wrap">
                <th className="w-full block md:w-auto md:table-cell py-2">
                  <div className="font-semibold text-left">Year</div>
                </th>
                <th className="w-full hidden md:w-auto md:table-cell py-2">
                  <div className="font-semibold text-left">Plan</div>
                </th>
                <th className="w-full hidden md:w-auto md:table-cell py-2">
                  <div className="font-semibold text-left">Amount</div>
                </th>
                <th className="w-full hidden md:w-auto md:table-cell py-2">
                  <div className="font-semibold text-right"></div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm">
              {/* Row */}
              <tr className="flex flex-wrap md:table-row md:flex-no-wrap border-b border-slate-200 py-2 md:py-0">
                <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2 text-[#475569]">
                  <div className="text-left font-medium text-slate-800">
                    2021
                  </div>
                </td>
                <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2 text-[#475569]">
                  <div className="text-left">Basic Plan - Annualy</div>
                </td>
                <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2 text-[#475569]">
                  <div className="text-left font-medium">$349.00</div>
                </td>
                <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2 text-[#475569]">
                  <div className="text-right flex items-center md:justify-end">
                    {/* <a
                      className="font-medium text-indigo-500 hover:text-indigo-600"
                      href="#0"
                    >
                      HTML
                    </a> */}
                    <span
                      className="block w-px h-4 bg-slate-200 mx-2"
                      aria-hidden="true"
                    ></span>
                    <a
                      className="font-medium text-indigo-500 hover:text-indigo-600"
                      href="#0"
                    >
                      PDF
                    </a>
                  </div>
                </td>
              </tr>
              {/* Row */}
              <tr className="flex flex-wrap md:table-row md:flex-no-wrap border-b border-slate-200 py-2 md:py-0">
                <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2 text-[#475569]">
                  <div className="text-left font-medium text-slate-800">
                    2020
                  </div>
                </td>
                <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2 text-[#475569]">
                  <div className="text-left">Basic Plan - Annualy</div>
                </td>
                <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2 text-[#475569]">
                  <div className="text-left font-medium">$349.00</div>
                </td>
                <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2 text-[#475569]">
                  <div className="text-right flex items-center md:justify-end">
                    {/* <a
                      className="font-medium text-indigo-500 hover:text-indigo-600"
                      href="#0"
                    >
                      HTML
                    </a> */}
                    <span
                      className="block w-px h-4 bg-slate-200 mx-2"
                      aria-hidden="true"
                    ></span>
                    <a
                      className="font-medium text-indigo-500 hover:text-indigo-600"
                      href="#0"
                    >
                      PDF
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default Subscriptions;
