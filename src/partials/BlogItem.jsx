import React from "react";

import AppImage01 from "./../images/applications-image-01.jpg";
import AppImage02 from "./../images/applications-image-02.jpg";
import AppImage03 from "./../images/applications-image-03.jpg";
import AppImage04 from "./../images/applications-image-04.jpg";

function BlogItem({ picture, title, href }) {
  return (
    <div className="col-span-full mx-2 sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-sm border border-slate-200 overflow-hidden mt-6">
      <div className="flex flex-col ">
        {/* Image */}
        <img
          className="h-60"
          src={picture}
          width="355"
          alt="Application 01"
        />
        {/* Card Content */}
        <div className="grow flex flex-col p-5">
          {/* Card body */}
          <div className="grow">
            {/* Header */}
            <header className="mb-3 truncate">
              <h3 className="text-md w-8  text-slate-800 font-semibold">
                {title}
              </h3>
            </header>
          </div>
          {/* Card footer */}
          <div>
            <a
              href={href}
              className="btn-sm w-full bg-indigo-500 hover:bg-indigo-600 text-white"

            >
              View
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
