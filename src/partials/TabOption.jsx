import React from 'react'

export default function TabOption({ number, title, description }) {
    return (
        <div className='flex text-gray-600 cursor-pointer space-x-3 space-y-3  w-full md:flex-row flex-col'>
            <div className='border-2 flex text-[20px] font-bold justify-center items-center text-center px-6 py-5 rounded-xl border-gray-500'>
                {number}
            </div>
            <div className='flex flex-col space-y-2  justify-center text-start md:pl-2'>
                <p className='text-xl font-bold'>{title}</p>
                <p className='text-sm '>{description}</p>
            </div>
        </div>
    )
}
