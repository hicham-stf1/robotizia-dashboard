import React from "react";
import { AiFillEye } from 'react-icons/ai'
function SubscriptionTableItem(props) {
  return (
    <tr>

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left text-black">@{props.username}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left text-black">{props.email}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{props.plan}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left text-black">{props.frequency}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left text-black">{props.words_per_month}</div>
      </td>

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-emerald-500">
          {props.input_length}
        </div>
      </td>
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className={`text-left font-medium ${props.active ? "text-emerald-500" : "text-red-500"}`}>
          {props.active ? "Active" : "Inactive"}
        </div>
      </td> */}
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className={`text-left font-medium text-[#2e46e8] cursor-pointer`}>
          <AiFillEye size={22} />
        </div>
      </td> */}

    </tr>
  );
}

export default SubscriptionTableItem;
