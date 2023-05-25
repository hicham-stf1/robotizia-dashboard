import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/DashboardHeader";
import ProfileBody from "./profile/ProfileBody";
import DeleteButton from "../partials/DeleteButton";
import DateSelect from "../partials/DateSelect";
import CustomersTable from "../partials/CustomersTable";
import PaginationClassic from "../partials/PaginationClassic";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/message";
import SubscriptionTable from "../partials/SubscriptionTable";
import SearchBar from "../components/SearchBar";

function Subscriptions() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);

  const [visible, setVisible] = useState()

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message)

  //Get all users
  const [users, setUsers] = useState([])
  const getAllUsers = async () => {
    setVisible(true)
    try {
      await axios.get("https://king-prawn-app-n4y9m.ondigitalocean.app/statistics/subscription/findall").then(res => {
        setUsers(res?.data)
        console.log("SubscriptionTable :" + res?.data)
      }).catch((error) => {
        dispatch(setMessage((error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString()))
      })
    } catch (error) {
      dispatch(setMessage((error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()))
    }
    setVisible(false)
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const [search, setSearch] = useState("")
  const HandleSearch = (e) => {
    setSearch(e.target.value)
  }

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
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                  Subscription ✨
                </h1>
              </div>
              <SearchBar handleChange={HandleSearch} value={search} />
            </div>

            {/* Table */}
            <SubscriptionTable search={search} customers={users} selectedItems={handleSelectedItems} />

            {/* Pagination */}
            {/* <div className="mt-8">
              <PaginationClassic />
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Subscriptions;
