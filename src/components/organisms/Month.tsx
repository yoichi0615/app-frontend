import React, { useState } from 'react'
import { CalendarCell } from '../atoms/CalendarCell'
import Modal from 'react-modal'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setData } from '../../store/modules/expenseSlice'
import { getExpenseData } from '../pages/Main'
import { Selectbox } from '../atoms/Selectbox'
import { options } from '../pages/Main'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
}

const payload = {
  user_id: null,
  memo: '',
  category_id: 1,
  amount: 0,
}

export const Month = (props: any) => {
  const expenseData = useSelector((state: any) => state.expense)
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = useState<boolean>(false)
  const [targetDate, setTargetDate] = useState<number|null>(null)
  const [isLoadedPost, setIsLoadedPost] = useState<boolean>(false)
  const [memo, setMemo] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const [isError, setError] = useState(false)
  const [selectValue, setValue] = useState(1)


  const closeModal = () => {
    setIsOpen(false)
  }
  const { month, incomeList, setIncomeList } = props

  const handleSave = async () => {
    await axios.post('http://127.0.0.1:8000/api/income', {
      user_id: 1,
      memo: expenseData.memo,
      category_id: selectValue,
      amount: expenseData.amount,
      date: targetDate
    }).then(() => {
      setAmount(0)
      setMemo('')
      getExpenseData().then((res) =>{
        setIncomeList(res)
        setIsLoadedPost(true)
      })
    }).catch(() => {
      setError(true)
    })
  }

  const getMonthlyTotalExpense = () => {
    const totalAmount = incomeList.reduce((sum: number, element: any) => {
      return sum + Number(element.total_amount)
    }, 0)

    return totalAmount
  }

  const handleChangeAmount = (e: any) => {
    payload.amount = e.target.value
    dispatch(setData(payload))
    setAmount(e.target.value)
  }

  const handleChangeMemo = (e: any) => {
    payload.memo = e.target.value
    dispatch(setData(payload))
    setMemo(e.target.value)
  }

  return (
    <>
      <h2 className="font-bold">月間収支</h2>
      <div className="flex mb-2 justify-end mr-5">
        <table>
          <thead>
            <tr>
              <th className="px-3">当月収入</th>
              <th className="px-3"></th>
              <th className="px-3">当月支出</th>
              <th className="px-3"></th>
              <th className="px-3">当月収支</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3">0円</td>
              <td className="px-3">ー</td>
              <td className="font-bold text-red-700 px-3">{getMonthlyTotalExpense()}円</td>
              <td className="px-3">＝</td>
              <td className="text-red-400 px-3">{0 - getMonthlyTotalExpense()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex-1 grid grid-cols-7 grid-rows-5 mt-10">
        {month.map((row:any, i:any) => (
          <React.Fragment key={i}>
            {row.map((day: any, idx: any) => (
              <CalendarCell
                day={day}
                key={idx}
                rowIdx={i}
                setIsOpen={setIsOpen}
                setTargetDate={setTargetDate}
                setIsLoadedPost={setIsLoadedPost}
                income={incomeList.find((value: any) => value.date === day.format('YYYY-MM-DD')) ?? null}
                setError={setError}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <Modal
        contentLabel="Example Modal"
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        {!isLoadedPost &&
          <>
            <div className="flex justify-between mb-8">
              <h1 className="font-bold">支出入力</h1>
              <span className="float-right">({targetDate})</span>
              <button onClick={closeModal} className="font-bold text-gray-400 text-xl">×</button>
            </div>
            <div>
              <div className="important-box">
                <div className="flex justify-between py-2">
                  <div className="mr-5 px-3 py-2">支出金額</div>
                  <div>
                    <span className="bg-gray-200 px-3">-</span>
                    <input
                      type="number"
                      className="px-3 py-2
                      bg-stone-200"
                      value={amount}
                      onChange={handleChangeAmount}
                    />
                    <span className="bg-gray-200 p-1">円</span>
                  </div>
                </div>
                <div className="flex py-2 mb-5">
                  <div className="mr-12 px-3 py-2">項目</div>
                  <Selectbox options={options} setValue={setValue} />
                </div>
                <div className="flex py-2 mb-5">
                  <div className="mr-12 px-3 py-2">メモ</div>
                  <input
                    // cols="30"
                    // rows="10"
                    className="bg-stone-50"
                    value={memo}
                    onChange={handleChangeMemo}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button className="bg-blue-400 hover:bg-blue-300 text-white rounded px-4 py-1" onClick={handleSave}>保存</button>
              </div>
              {isError &&
                <p className="font-bold text-red-400">登録に失敗しました</p>
              }
            </div>
          </>
        }
        {isLoadedPost &&
          <>
            <p>登録が完了しました。</p>
            <button onClick={closeModal} className="font-bold text-white-400 text-xl bg-gray-400 hover:bg-blue-300 rounded px-4 py-1">閉じる</button>
          </>
        }
      </Modal>
    </>
  )
}
