import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import { store } from "./redux/store";
import "aos/dist/aos.css";
import "./css/style.css";

import AOS from "aos";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Subscriptions from "./pages/Subscriptions";

import { Provider } from "react-redux";
import PaymentForm from "./components/stripe/PaymentForm";
import Stripe from "./components/stripe/Stripe";
// import 'echarts-gl';
// import * as echarts from 'echarts';
// import ReactECharts from 'echarts-for-react';

import { useSelector } from "react-redux";
import axios from "axios";
import EditBlog from "./pages/EditBlog";
import AddNewAdmin from "./pages/AddNewAdmin";
import Messages from "./pages/Messages";

function App() {
  const location = useLocation();

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  console.log(isLoggedIn);
  console.log(user);

  useEffect(() => {
    AOS.init({
      once: isLoggedIn,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, []); // triggered on route change

  return (
    <Routes>
      <Route
        path="/signin"
        element={<SignIn />}
      />
      <Route
        path="/signup"
        element={!isLoggedIn ? <SignUp /> : <Navigate replace to="/" />}
      />
      <Route
        path="/"
        element={isLoggedIn ? <Home /> : <Navigate replace to="/signin" />}
      />
      <Route
        path="/users"
        element={isLoggedIn ? <Users /> : <Navigate replace to="/signin" />}
      />
      <Route
        path="/blog"
        element={isLoggedIn ? <Blog /> : <Navigate replace to="/signin" />}
      />
      <Route
        path="/blog-details/:id"
        element={isLoggedIn ? <EditBlog /> : <Navigate replace to="/signin" />}
      />
      <Route
        path="/subscriptions"
        element={isLoggedIn ? <Subscriptions /> : <Navigate replace to="/signin" />}
      />
      <Route
        path="/messages"
        element={isLoggedIn ? <Messages /> : <Navigate replace to="/signin" />}
      />
      <Route
        path="/add-new-admin"
        element={isLoggedIn ? <AddNewAdmin /> : <Navigate replace to="/signin" />}
      />
      <Route
        path="/profile"
        element={isLoggedIn ? <Profile /> : <Navigate replace to="/signin" />}
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
