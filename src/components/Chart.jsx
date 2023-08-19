import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as Chartjs,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box } from "@chakra-ui/react";

Chartjs.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function Chart({ curSymbol, arr }) {
  let prices = [];
  let date = [];
  for (let i = 0; i < arr.length; i++) {
    date.push(new Date(arr[i][0]).toLocaleDateString());
    prices.push(arr[i][1]);
  }

  let data = {
    labels: date,
    datasets: [
      {
        label: `Dates`,
        data: prices,
        borderColor: "rgb(255,99,132)",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderWidth: 1,
      },
    ],
  };

  let options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Currency Prices in ${curSymbol}`,
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <Box className="line-chart" alignSelf={"center"} width={"80%"} mt={"10px"}>
      <Line data={data} options={options}></Line>
    </Box>
  );
}
