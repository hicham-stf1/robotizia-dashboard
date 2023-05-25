import React, { useState, useEffect } from "react";
import Customer from "./CustomersTableItem";

import Image01 from "../images/user-40-01.jpg";
import Image02 from "../images/user-40-02.jpg";
import Image03 from "../images/user-40-03.jpg";
import Image04 from "../images/user-40-04.jpg";
import Image05 from "../images/user-40-05.jpg";
import Image06 from "../images/user-40-06.jpg";
import Image07 from "../images/user-40-07.jpg";
import Image08 from "../images/user-40-08.jpg";
import Image09 from "../images/user-40-09.jpg";
import Image10 from "../images/user-40-10.jpg";

function CustomersTable({ selectedItems, customers, visible, search }) {


  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  // useEffect(() => {
  //   setList(customers);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map((li) => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);



  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">
          All Users <span className="text-slate-400 font-medium">{customers?.length}</span>
        </h2>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
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
                {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th> */}
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <span className="sr-only">Menu</span>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {visible ? <p className="py-6 text-center">Loading... Please wait</p> : <tbody className="text-sm divide-y divide-slate-200">
              {customers.filter((customer) => {
                const { first_name } = customer;
                if (search == "") {
                  return customer;
                } else if (
                  first_name.toLowerCase().includes(search.toLocaleLowerCase())
                ) {
                  return customer;
                }
              }).

                map((customer) => {
                  return (
                    <Customer
                      key={customer.id}
                      id={customer.id}
                      image={customer.urlPhoto}
                      name={customer.first_name}
                      username={customer.username}
                      email={customer.email}
                      authMethod={customer.method_auth}
                      plan={customer.subscription?.plan}
                      // orders={customer.orders}
                      // lastOrder={customer.lastOrder}
                      spent={customer.total_spent}
                      phone={customer.phone_number}
                      // active={customer.active}
                      handleClick={handleClick}
                      isChecked={isCheck.includes(customer.id)}
                    />
                  );
                })}
            </tbody>}
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomersTable;
