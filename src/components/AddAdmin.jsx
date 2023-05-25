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

function AddAdmin() {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);
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
            'https://king-prawn-app-n4y9m.ondigitalocean.app/auth/user/signup',
            {
                email: email,
                password: password,
                role: "Admin"
            }
        ).then((res) => {

            setSuccessful(true)
            dispatch(setMessage("Admin Added"))

        }).catch((error) => {
            setSuccessful(false)
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
            <div className="relative md:flex">
                {/* Content */}
                <div className="md:w-1/2 w-full">
                    <div className="min-h-screen h-full flex flex-col after:flex-1">
                        {/* Header */}

                        <div className="max-w-[60%] mt-12 min-w-[450px] mx-auto px-3">

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

                                    <p className="mt-8 mx-3 text-xs font-bold text-center text-gray-600">
                                        {message && (
                                            <div
                                                className={successful ? "text-green-500" : "text-red-500"}
                                                role="alert"
                                            >
                                                {message}
                                            </div>
                                        )}
                                    </p>
                                    <button type="submit" className="btn w-[90%] mt-8 bg-indigo-500 hover:bg-indigo-600 text-white ml-3">

                                        {visible ? "Adding..." : " Add Admin"}
                                    </button>

                                </div>
                            </form>



                        </div>
                    </div>

                </div>


            </div>
        </main>
    );
}

export default AddAdmin;
