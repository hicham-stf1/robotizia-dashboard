import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/DashboardHeader";
import ProfileBody from "./profile/ProfileBody";
import ModalBasic from "../components/ModalBasic";
import BlogList from "../partials/BlogList";
import BlogItem from "../partials/BlogItem";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/message";
import axios from "axios";
import RichTextEditor from "../components/RichTextEditor";

function Blog() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
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

  // Here what to send
  // const formData = new FormData();
  // formData.append("file", files[0], files[0]?.name);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleChangeContent = (e) => {
    setContent(e.target.value)
  }

  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message)

  //Get all users
  const [blogs, setBlogs] = useState([])
  const getAllBlogs = async () => {
    setVisible(true)
    try {
      await axios.get("https://king-prawn-app-n4y9m.ondigitalocean.app/blog/findall").then(res => {
        setBlogs(res?.data)
        console.log("blogs :" + JSON.stringify(res?.data))
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
    getAllBlogs()
  }, [])

  const uploadFile = async () => {
    setUploading(true)
    if (files.length === 0) {
      alert("Please upload an image")
    } else {
      const formData = new FormData();
      formData.append("file", files[0], files[0]?.name);
      await axios
        .post(
          `https://king-prawn-app-n4y9m.ondigitalocean.app/files/upload`,
          formData
        )
        .then((res) => {
          setVisible(true)
          axios.post("https://king-prawn-app-n4y9m.ondigitalocean.app/blog/create",
            {
              title: title,
              description: content,
              image_url: [res?.data]
            }).then(res => {
              setSidebarOpen(false)
              getAllBlogs()
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
          alert(
            error.response && error.response.data && error.response.data.message
          ) || error.message;
        });
    }

    setUploading(false)
  };

  //Add content
  const onSubmit = async () => {
    uploadFile()
    // alert(JSON.stringify(content))
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Page header */}
        <div className="sm:flex sm:justify-between p-8 sm:items-center">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
              Blogs ✨
            </h1>
          </div>

          {/* Right: Actions */}
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            {/* Add customer button */}
            <button
              aria-controls="feedback-modal"
              onClick={(e) => {
                e.stopPropagation();
                setFeedbackModalOpen(true);
              }}
              className="btn bg-indigo-500 flex hover:bg-indigo-600 text-white"
            >
              Add Blog
              {/* <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg> */}
            </button>
          </div>
        </div>

        <main className="flex justify-center">
          {/* <BlogList /> */}
          <div className="flex flex-wrap  w-full">

            {visible ? <p>Loading...</p> : <>{blogs.map((blog, idx) => {
              return <BlogItem href={`/blog-details/${blog?.id}`} key={idx} title={blog.title} picture={blog.BlogPicture[blog.BlogPicture.length - 1]?.pictureUrl} />
            })}</>}

          </div>
        </main>

        <div className="m-1.5">
          <ModalBasic
            id="feedback-modal"
            modalOpen={feedbackModalOpen}
            setModalOpen={setFeedbackModalOpen}
            title="Add New Blog"
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


                  <RichTextEditor name="content" initialValue={content} getValue={setContent} />

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
                <button disabled={uploading} onClick={() => onSubmit()} className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
                  {uploading ? "Uploading..." : visible ? "please wait.." : "Add Blog"}
                </button>
              </div>
            </div>
          </ModalBasic>
          {/* End */}
        </div>
      </div>
    </div>
  );
}

export default Blog;
