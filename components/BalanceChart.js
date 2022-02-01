import React from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BalanceChart = ({chartData}) => {
  return <Line data={chartData} />
};

export default BalanceChart;
