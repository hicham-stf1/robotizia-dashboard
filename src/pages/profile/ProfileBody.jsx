import React, { useEffect, useState } from "react";

import EditProfile from "./EditProfile";
import AccountSettings from "./AccountSettings";
import ChangePassword from "./ChangePassword";

import FileUpload from "../../components/ImageUploader/FileUpload";
import axios from "axios";
import { useSelector } from "react-redux";
import Subscriptions from "./Subscriptions";

function ProfileBody() {
  const [selectedTab, setSelectedTab] = useState(0);
  const { user } = useSelector((state) => state.auth);

  console.log(user.id);

  const [userData, setUserdata] = useState(null);
  const [image, setImage] = useState([]);
  const [imageData, setImageData] = useState([]);

  const getUserData = () => {
    axios
      .get(
        "https://api.robotizia.ai/users/find/" + user.id
      )
      .then((res) => {
        setUserdata(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tabs = {
    0: (
      <EditProfile
        getUserData={getUserData}
        key={userData}
        userData={userData}
      />
    ),
    1: (
      <AccountSettings
        getUserData={getUserData}
        key={userData}
        userData={userData}
      />
    ),
    2: <ChangePassword key={userData} userData={userData} />,
    3: <Subscriptions key={userData} userData={userData} />,
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    userData && setImageData(userData?.urlPhoto);
    console.log(userData?.urlPhoto);
  }, [userData]);

  useEffect(() => {
    axios
      .post(
        "https://api.robotizia.ai/users/picture/update/" +
        user.id,
        {
          urlPhoto:
            "https://t4.ftcdn.net/jpg/05/27/83/41/360_F_527834146_oGOiPzNuHZnXiUN4QNm55zn6Ao9fmrJT.jpg",
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="min-w-[80%] mx-auto">
      <div className="my-8">
        <ul className="flex flex-wrap -m-1">
          <li className="mr-8 mt-2">
            <button
              onClick={() => setSelectedTab(0)}
              className={`inline-flex items-center border-[2px] border-[#293fd2] justify-center text-sm font-medium leading-5 rounded-full px-8 py-2 border border-transparent shadow-sm text-white duration-150 ease-in-out uppercase ${selectedTab === 0
                  ? "bg-[#2e46e8] text-white"
                  : "bg-white text-[#2e46e8] "
                }`}
            >
              EDIT PROFILE
            </button>
          </li>
          <li className="mr-8 mt-2">
            <button
              onClick={() => setSelectedTab(1)}
              className={`inline-flex items-center border-[2px] border-[#293fd2] justify-center text-sm font-medium leading-5 rounded-full px-8 py-2 border border-transparent shadow-sm text-white duration-150 ease-in-out uppercase ${selectedTab === 1
                  ? "bg-[#2e46e8] text-white"
                  : "bg-white text-[#2e46e8] "
                }`}
            >
              ACCOUNT SETTINGS
            </button>
          </li>
          <li className="mr-8 mt-2">
            <button
              onClick={() => setSelectedTab(2)}
              className={`inline-flex items-center border-[2px] border-[#293fd2] justify-center text-sm font-medium leading-5 rounded-full px-8 py-2 border border-transparent shadow-sm text-white duration-150 ease-in-out uppercase ${selectedTab === 2
                  ? "bg-[#2e46e8] text-white"
                  : "bg-white text-[#2e46e8] "
                }`}
            >
              CHANGE PASSWORD
            </button>
          </li>
          {user.subscriptionId !== null && (
            <li className="mr-8 mt-2">
              <button
                onClick={() => setSelectedTab(3)}
                className={`inline-flex items-center border-[2px] border-[#293fd2] justify-center text-sm font-medium leading-5 rounded-full px-8 py-2 border border-transparent shadow-sm text-white duration-150 ease-in-out uppercase ${selectedTab === 3
                    ? "bg-[#2e46e8] text-white"
                    : "bg-white text-[#2e46e8] "
                  }`}
              >
                SUBSCRIPTONS
              </button>
            </li>
          )}
        </ul>
      </div>
      <div
        className={
          "bg-[#F7FAFC] rounded-xl grow flex flex-col md:translate-x-0 transition-transform duration-300 ease-in-out translate-x-0 shadow-lg mb-8"
        }
      >
        {/* Profile background */}
        <div className="relative h-44">
          <img
            className="object-cover h-full w-full opacity-[40%] rounded-xl"
            src="/images/profile-bg.png"
            width="979"
            alt="Profile background"
          />
        </div>

        {/* Content */}
        <div className="relative px-4 sm:px-6 pb-8">
          {/* Pre-header */}
          <div className="-mt-16 mb-6 sm:mb-3">
            <div className="flex sm:flex-row sm:justify-between sm:items-end">
              {/* Avatar */}
              <div className="inline-flex ml-24 -mt-1 mb-4 sm:mb-0">
                <div>
                  <img
                    className="rounded-full border-[#8290f1] border-4 truncate w-[160px] h-[160px]"
                    src={imageData}
                    width="160"
                    height="160"
                    alt="Avatar"
                  />
                  <div className="flex justify-between text-sm">
                    <div className="text-[#0FA0F1] cursor-pointer">
                      <FileUpload
                        files={image}
                        setFiles={setImage}
                        setFileData={setImageData}
                        text="Change"
                      />
                    </div>
                    <div className="text-[#FF0F00] z-20 cursor-pointer">
                      Delete
                    </div>
                  </div>
                </div>
                {userData && (
                  <div className="relative text-slate-800 top-20 left-4 hidden md:block">
                    <h1 className="text-2xl  font-bold">
                      {userData?.first_name + " " + userData?.last_name}
                    </h1>
                    <p>{"@" + userData?.username}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Header */}
          <header className="text-center sm:text-left mb-6">
            {/* Name */}
            <div className="inline-flex items-start mb-2 md:hidden">
              <div className="">
                <h1 className="text-2xl text-slate-800 font-bold">
                  Rodrigo Gimenes
                </h1>
                <p>@rodrigogimenes</p>
              </div>
            </div>
          </header>

          <div className="flex flex-col xl:flex-row xl:space-x-16 md:pl-24">
            {tabs[selectedTab]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBody;
