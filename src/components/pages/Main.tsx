import React from 'react'
import { useState, useEffect } from 'react'
import { Month } from '../organisms/Month'
import { getMonth } from '../../utils/date'
import { store } from '../../store'
import { Provider } from 'react-redux'
import axios from 'axios'

export const getExpenseData = async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/total_income')
  return response.data
}

export const Main: React.FC = () => {
  const [currentMonth] = useState(getMonth())
  const [setIsSaved] = useState<boolean>(false)
  const [incomeList, setIncomeList] = useState([])

  useEffect(() => {
    getExpenseData().then((res) =>{
      setIncomeList(res)
    })
  }, [])

  return (
    <>
      <h3>メインページ</h3>
      <Provider store={store}>
        <Month month={currentMonth} setIsSave={setIsSaved} incomeList={incomeList} setIncomeList={setIncomeList} />
      </Provider>
    </>
  )
}