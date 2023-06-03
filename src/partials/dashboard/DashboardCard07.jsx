import axios from "axios";
import React, { useEffect, useState } from "react";

import Image01 from "../../images/user-40-01.jpg";
import Image02 from "../../images/user-40-02.jpg";
import Image03 from "../../images/user-40-03.jpg";
import Image04 from "../../images/user-40-04.jpg";
import Image05 from "../../images/user-40-05.jpg";
import Image06 from "../../images/user-40-06.jpg";
import Image07 from "../../images/user-40-07.jpg";
import Image08 from "../../images/user-40-08.jpg";
import Image09 from "../../images/user-40-09.jpg";
import Image10 from "../../images/user-40-10.jpg";
import CustomersTableItem from "../CustomersTableItem";

function DashboardCard07() {


  const [users, setUsers] = useState([])
  const [visible, setIsVisible] = useState(false)
  const getLatestUsers = async () => {
    await axios.get("https://api.robotizia.ai/statistics/client/latestCustomers").then((response) => {
      setUsers(response?.data?.users)
    }).catch((error) => {
      console.log(error.messages)
    })
  }
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getLatestUsers()
  }, [])


  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Latest Subscriptions</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Full name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Username</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Phone number</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Auth method</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Plan</div>
                </th>

                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Total spent</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {users.map((customer) => {
                return (
                  <CustomersTableItem
                    key={customer.id}
                    id={customer.id}
                    image={customer.urlPhoto}
                    name={customer.last_name}
                    username={customer.username}
                    email={customer.email}
                    authMethod={customer.method_auth}
                    plan={customer.subscription?.plan}
                    status={customer.subscription?.Status}
                    // orders={customer.orders}
                    // lastOrder={customer.lastOrder}
                    spent={customer.total_spent}
                    phone={customer.phone_number}
                    active={customer.subscription?.Status}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
