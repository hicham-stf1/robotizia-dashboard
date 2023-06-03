import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/DashboardHeader";
import ProfileBody from "./profile/ProfileBody";
import WelcomeBanner from "../partials/WelcomeBanner";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import DashboardCard08 from "../partials/dashboard/DashboardCard08";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setRatio } from "../redux/ratio";
import { setStatistics } from "../redux/statistics";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch()

  const [statistic, setStatistic3] = useState([])
  const [visible, setVisible] = useState(false)
  const getAllStatistic = async () => {
    setVisible(true)
    try {
      await axios.get("https://api.robotizia.ai/statistics/subscription/Graph").then(res => {

        dispatch(setStatistics(res?.data))
        // console.log("Statistic :" + res?.data)
      }).catch((error) => {
        console.log(error)
      })
    } catch (error) {
      console.log(error)
    }
    setVisible(false)
  }

  useEffect(() => {
    getAllStatistic()
  }, [])


  const [statistic2, setStatistic2] = useState([])
  const getAllStatistic2 = async () => {
    setVisible(true)
    try {
      await axios.get("https://api.robotizia.ai/statistics/client/Graph").then(res => {

        dispatch(setRatio(res?.data))
      }).catch((error) => {
        console.log(error)
      })
    } catch (error) {
      console.log(error)
    }
    setVisible(false)
  }

  useEffect(() => {
    getAllStatistic2()
  }, [])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              <DashboardCard01 />
              <DashboardCard02 />
              <DashboardCard03 />
              <DashboardCard04 />
              <DashboardCard08 />
              <DashboardCard06 />
              <DashboardCard07 />

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
