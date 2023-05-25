import React from 'react'

export default function Message({ UserImage, full_name, email, Date, message, subject, phone }) {
    return (
        <div className='h-40 w-[30%] mw-2'>
            <button className="flex md:flex-col w-full p-2 rounded bg-indigo-100 text-left">
                {/* <img className="w-8 h-8 rounded-full mr-2" src={UserImage} width="32" height="32" alt="User 01" /> */}
                <div className="text-md text-slate-700 my-2 font-medium">{email}</div>

                <div className="grow truncate">
                    <div className="flex items-center justify-between mb-1.5">
                        <div className="truncate">
                            <span className="text-sm font-semibold text-slate-800">{full_name}</span>
                        </div>
                        <div className="text-xs text-slate-500 font-medium ml-5">{phone}</div>
                    </div>
                    <div className="text-xs font-medium text-slate-800 truncate mb-0.5">{subject}</div>
                    <div className="text-xs whitespace-normal">{message}</div>
                </div>
            </button>
        </div>
    )
}
