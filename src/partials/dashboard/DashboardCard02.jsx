import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LineChart from "../../charts/LineChart01";
import Icon from "../../images/icon-02.svg";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";

function DashboardCard02() {
  const { statistics } = useSelector((state) => state.statistics)
  const chartData = {
    labels: statistics?.subscription.labels,
    datasets: [
      // Indigo line
      {
        data: statistics?.subscription.data,
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.blue[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        clip: 20,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 02" />
        </header>
        <h2 className="text-lg font-semibold text-slate-800 mb-2">
          Subscriptions
        </h2>
        {/* <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Sales</div> */}
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">${statistics?.subscription.total}</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-amber-500 rounded-full">
            {statistics?.subscription.percentage}%
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={128} />
      </div>
    </div>
  );
}

export default DashboardCard02;
