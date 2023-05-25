import React from "react";

function BotMessage({ text }) {
  return (
    <div className="flex items-start my-4 last:mb-0">
      <img
        className="rounded-full mr-4"
        src="/images/robotizia-bot.png"
        width="40"
        height="40"
        alt="User 01"
      />
      <div>
        <div className="text-sm bg-white text-slate-800 p-3 rounded-lg rounded-tl-none border border-slate-200 shadow-md mb-1">
          {text}
        </div>
      </div>
    </div>
  );
}

export default BotMessage;
