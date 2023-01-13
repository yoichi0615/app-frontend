import React from "react";
import { useState, useEffect } from "react";
import { Month } from "../organisms/Month";
import { getMonth } from "../../utils/date";
import { store } from '../../store';
import { Provider } from 'react-redux';
import axios from 'axios'

export const Main: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const [incomeList, setIncomeList] = useState([])


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/income')
      .then((res) => {
        setIncomeList(res.data)
      })
      .catch((err) => {
        return err
      })
  }, [])

  return (
    <>
      <h3>メインページ</h3>
      <Provider store={store}>
        <Month month={currentMonth} setIsSave={setIsSaved} incomeList={incomeList} />
      </Provider>
    </>
  )
}