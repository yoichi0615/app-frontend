import React, { useState, useEffect } from "react"
import { Header } from "../molecules/Header"
import axios from 'axios'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export const Chart = () => {
  const [chartData, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      await axios.get('http://127.0.0.1:8000/api/daily_amount')
        .then((res) => {
          setData(res.data)
        })
    }
    getData()
  }, [])


  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "グラフタイトル",
      },
    },
  };
  
  const endDay = Number(dayjs().endOf('month').format('D'))

  const labels = [...Array(endDay)].map((_, i) => `${i + 1}日`)


  const data = {
    labels,
    datasets: [
      {
        label: "支出",
        data: chartData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <Header />
      <Bar options={options} data={data} />
    </>
  )
}
