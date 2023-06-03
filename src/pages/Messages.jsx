import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/DashboardHeader";
import ProfileBody from "./profile/ProfileBody";
import WelcomeBanner from "../partials/WelcomeBanner";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/message";
import Message from "../components/Message";
import axios from "axios";

function Messages() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const dispatch = useDispatch();
    const { message } = useSelector((state) => state.message)
    const [visible, setVisible] = useState(false)
    //Get all messages
    const [messages, setMessages] = useState([])
    const getAllMessages = async () => {
        setVisible(true)
        try {
            await axios.get("https://api.robotizia.ai/contact-us/findAll").then(res => {
                setMessages(res?.data)
                console.log("messages :" + JSON.stringify(res?.data))
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
        getAllMessages()
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
                        <div className="flex flex-wrap gap-2  w-full">

                            {visible ? <p>Loading...</p> : <>{messages.map((blog, idx) => {
                                return <Message key={idx} full_name={blog.full_name} phone={blog.phone} email={blog.email} message={blog.message} subject={blog.subject} />
                            })}</>}

                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}

export default Messages;
