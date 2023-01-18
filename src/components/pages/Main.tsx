import React from 'react'
import { useState, useEffect } from 'react'
import { Month } from '../organisms/Month'
import { Detail } from '../organisms/Detail'
import { getMonth } from '../../utils/date'
import { store } from '../../store'
import { Provider } from 'react-redux'
import axios from 'axios'

export const options = [
  {
    label: '未分類',
    value:  1
  },
  {
    label: '食費',
    value:  2
  },
  {
    label: '娯楽',
    value:  3
  },
  {
    label: '交際費',
    value:  4
  },
  {
    label: '自己投資',
    value:  5
  },
  {
    label: '借金',
    value: 6
  }
]

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
    <div className="w-[1200px] m-auto">
      <h3>メインページ</h3>
      <Provider store={store}>
        <Month month={currentMonth} setIsSave={setIsSaved} incomeList={incomeList} setIncomeList={setIncomeList} />
        <Detail />
      </Provider>
    </div>
  )
}