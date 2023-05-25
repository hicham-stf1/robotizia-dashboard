import React from "react";

export default function Service({ img, text, description }) {
  return (
    <div className="swiper-slide w-40 space-y-2   shadow-lg h-auto flex flex-col bg-slate-100 p-6 rounded-md">
      <div className="flex justify-between">
        <div className=" text-gray-700 font-bold text-2xl px-2">{text}</div>
        <img className="mb-3 w-[40%] h-auto rounded-lg" src={img} alt="Icon 01" />
      </div>
      <div className="grow space-y-2">
        <div className="text-slate-500 mb-3 leading-6">{description}</div>
      </div>
      <div className="text-right">
        <a
          className="font-medium text-indigo-500 inline-flex items-center transition duration-150 ease-in-out group"
          href="#0"
        >
          Learn More{" "}
          <span className="tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
            -&gt;
          </span>
        </a>
      </div>
    </div>
  );
}
