import React, { useState } from 'react'
import { CalendarCell } from '../atoms/CalendarCell'
import Modal from 'react-modal'
import axios, { AxiosResponse } from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setData } from '../../store/modules/expenseSlice'


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

export const Month = (props: any) => {
  const expenseData = useSelector((state: any) => state.expense)
  const dispatch = useDispatch()

  let subtitle: HTMLHeadingElement | null
  const [modalIsOpen, setIsOpen] = useState<boolean>(false)
  const [targetDate, setTargetDate] = useState<number|null>(null)
  const [isLoadedPost, setIsLoadedPost] = useState<boolean>(false)
  const [memo, setMemo] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)

  function afterOpenModal() {
    if (subtitle) subtitle.style.color = '#f00'
  }

  const closeModal = () => {
    setIsOpen(false)
  }
  const { month, isLoaded, setIsLoaded } = props

  const handleSave = async () => {
    await axios.post('http://127.0.0.1:8000/api/income', {
      user_id: 1,
      memo,
      category_id: 1,
      amount: expenseData.amount,
      date: '2022-03-11'
    }).then(() => {
      setIsLoadedPost(true)
      setAmount(0)
      setMemo('')
    }).catch(() => {
      return false
    })
  }

  const handleChangeAmount = (e: any) => {
    const payload = { amount: e.target.value }
    setAmount(e.target.value)
    dispatch(setData(payload))
  }

  const handleChangeMemo = (e: any) => {
    setMemo(e.target.value)
  }

  return (
    <>
      <div className="flex-1 grid grid-cols-7 grid-rows-5">
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
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <Modal
        contentLabel="Example Modal"
        isOpen={modalIsOpen}
        style={customStyles}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
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
                  {/* SelectBoxコンポーネント化 */}
                  <select name="" id="" className="px-3 py-2 mb-3 bg-stone-200">
                    <option value="">AAAA</option>
                    <option value="">B</option>
                    <option value="">C</option>
                  </select>
                </div>
                <div className="flex py-2 mb-5">
                  <div className="mr-12 px-3 py-2">メモ</div>
                  <textarea
                    cols="30"
                    rows="10"
                    className="bg-stone-50"
                    value={memo}
                    onChange={handleChangeMemo}
                  >
                  </textarea>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button className="bg-blue-400 hover:bg-blue-300 text-white rounded px-4 py-1" onClick={handleSave}>保存</button>
              </div>
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
