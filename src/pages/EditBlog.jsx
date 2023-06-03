import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import { setMessage } from '../redux/message';
import ModalBasic from '../components/ModalBasic';
import parse from 'html-react-parser'
import RichTextEditor from '../components/RichTextEditor';
import { setBlogData } from '../redux/ui-slice';

function EditBlog() {

    const Id = useParams().id;

    const [visible, setVisible] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const { message } = useSelector((state) => state.message)
    const dispatch = useDispatch()

    //Get blog details
    const [blog, setBlog] = useState('')
    const getBlogData = async () => {
        setVisible(true)
        try {
            await axios.get("https://api.robotizia.ai/blog/" + Id).then(res => {
                setBlog(res?.data)
                setBlogData(res?.data)
                console.log("blog :" + JSON.stringify(res?.data))
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
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

    useEffect(() => {
        getBlogData()
    }, [])

    const navigate = useNavigate()

    const deleteBlog = async () => {
        setDeleting(true)
        try {
            await axios.get("https://api.robotizia.ai/blog/delete/" + Id).then(res => {
                navigate('/blog')
                console.log("blog :" + JSON.stringify(res?.data))
            }).catch((error) => {
                alert((error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString())
            })
        } catch (error) {
            alert((error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString())
        }
        setDeleting(false)
    }

    //Update blog
    const [title, setTitle] = useState(blog?.title)
    const [content, setContent] = useState(blog?.content)
    const [Image_url, setImage_url] = useState()
    const [uploading, setUploading] = useState(false)

    const [files, setFiles] = useState([]);
    const uploadHandler = (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (!file) return;
        file.isUploading = true;
        setFiles([file]);
    };

    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleChangeContent = (e) => {
        setContent(e.target.value)
    }

    const uploadFile = async () => {
        setUploading(true)
        if (files.length === 0) {
            alert("Please upload an image")
        } else {
            const formData = new FormData();
            formData.append("file", files[0], files[0]?.name);
            await axios
                .post(
                    `https://api.robotizia.ai/files/upload`,
                    formData
                )
                .then((res) => {
                    setVisible(true)
                    axios.post("https://api.robotizia.ai/blog/update/" + Id,
                        {
                            title: title,
                            description: content,
                            image_url: [res?.data]
                        }).then(res => {
                            setSidebarOpen(false)
                            getBlogData()
                            setFeedbackModalOpen(false)
                        }).catch((error) => {
                            alert(error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                                error.message ||
                                error.toString()
                        })

                    setVisible(false)
                })
                .catch((error) => {
                    console.log(
                        error.response && error.response.data && error.response.data.message
                    ) || error.message;
                });
        }

        setUploading(false)
    };

    //Add content
    const onSubmit = async () => {
        uploadFile()
    }


    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                {/* Page header */}
                <div className="sm:flex sm:justify-between p-8 sm:items-center">
                    {/* Left: Title */}
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                            Edit Blog ✨
                        </h1>
                    </div>

                    {/* Right: Actions */}
                    <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                        {/* Add customer button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setFeedbackModalOpen(true);
                            }}
                            aria-controls="feedback-modal"
                            className="btn bg-indigo-500 flex hover:bg-indigo-600 text-white"
                        >
                            Update Blog
                            {/* <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg> */}
                        </button>
                        <button
                            aria-controls="feedback-modal"
                            onClick={deleteBlog}
                            className="btn bg-red-500 flex hover:bg-red-600 text-white"
                        >
                            {deleting ? "Deleting..." : "Delete Blog"}
                            {/* <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg> */}
                        </button>

                    </div>
                </div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="pt-4">
                        <div className="max-w-3xl mx-auto">

                            {visible ? <p>Loading...</p> :
                                <article>

                                    <header className="mb-8">
                                        {/* Title and excerpt */}
                                        <div className="text-center md:text-left">
                                            <h1 className="h3 mb-4" data-aos="fade-up">{blog?.title}</h1> </div>
                                        {/* Article meta */}
                                        <div className="md:flex md:items-center md:justify-between mt-3">

                                        </div>
                                    </header>

                                    {/* Article image */}
                                    <figure className="mb-8 lg:-ml-32 lg:-mr-32 flex justify-center items-center " data-aos="fade-up" data-aos-delay="600">
                                        <img className="h-80" src={(blog.BlogPicture) ? blog.BlogPicture[(blog.BlogPicture).length - 1]?.pictureUrl : ""} alt="News single" />
                                    </figure>

                                    {/* Article content */}
                                    <div className="text-lg text-start text-gray-700">
                                        <p className="mb-8">{blog?.content && parse((blog?.content))}</p>
                                    </div>


                                </article>}

                        </div>

                        <div className="m-1.5">
                            <ModalBasic
                                id="feedback-modal"
                                modalOpen={feedbackModalOpen}
                                setModalOpen={setFeedbackModalOpen}
                                title="Update Blog"
                            >
                                {/* Modal content */}
                                <div className="px-5 py-4 w-full">
                                    <div className="text-sm">
                                        <div className="font-medium text-slate-800 mb-3">
                                            Share knowledge and thoughts with Robotizia visitors 🙌
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-1 text-black"
                                                htmlFor="title"
                                            >
                                                Title <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                id="title"
                                                name="title"
                                                onChange={handleChangeTitle}
                                                value={title}
                                                className="form-input w-full px-2 py-1"
                                                type="text"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-1 text-black"
                                                htmlFor="image"
                                            >
                                                Image <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                onClick={(e) => (e.target.value = null)}
                                                onChange={uploadHandler}
                                                accept={"image/*"}
                                                className="form-input w-full px-2 py-1"
                                                type="file"
                                                required
                                            />
                                        </div>
                                        <div>

                                            <RichTextEditor name="content" initialValue={(content)} getValue={setContent} />

                                        </div>
                                    </div>
                                </div>
                                {/* Modal footer */}
                                <div className="px-5 py-4 border-t border-slate-200">
                                    <div className="flex flex-wrap justify-end space-x-2">
                                        <button
                                            className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFeedbackModalOpen(false);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button onClick={() => onSubmit()} className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
                                            {uploading ? "Updating..." : visible ? "please wait.." : "Update Blog"}
                                        </button>
                                    </div>
                                </div>
                            </ModalBasic>
                            {/* End */}
                        </div>

                    </div>
                </div>
            </div>



        </div>

    );
}

export default EditBlog;