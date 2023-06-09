import React from "react";

function MyMessage({text}) {
  return (
    <div className="flex justify-end">
      <div className="flex items-start mb-4 last:mb-0">
        <div>
          <div className="text-sm bg-indigo-500 text-white p-3 rounded-lg rounded-tr-none border border-transparent shadow-md mb-1">
            {text}
          </div>
        </div>
        <img
          className="rounded-full ml-4"
          src="/images/user.jpg"
          width="40"
          height="40"
          alt="User 02"
        />
      </div>
    </div>
  );
}

export default MyMessage;
