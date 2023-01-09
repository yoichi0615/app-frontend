import React, { useState } from 'react'
import { Day } from '../atoms/CalendarCell'
import Modal from 'react-modal'
import axios, { AxiosResponse } from 'axios'

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

// const handleSave = async () => {
//   await axios.post('')
// }

export const Month = (props: any) => {
  let subtitle: HTMLHeadingElement | null
  const [modalIsOpen, setIsOpen] = useState<boolean>(false)
  const [targetDate, setTargetDate] = useState<number|any>(null)

  function afterOpenModal() {
    if (subtitle) subtitle.style.color = '#f00'
  }

  const closeModal = () => {
    setIsOpen(false)
  }
  const { month } = props

  return (
    <>
      <div className="flex-1 grid grid-cols-7 grid-rows-5">
        {month.map((row:any, i:any) => (
          <React.Fragment key={i}>
            {row.map((day: any, idx: any) => (
              <Day
                day={day}
                key={idx}
                rowIdx={i}
                setIsOpen={setIsOpen}
                setTargetDate={setTargetDate} 
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
                <input type="number" className="px-3 py-2 bg-stone-200"/>
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
          </div>
          <div className="flex justify-center items-center">
            <button className="bg-blue-400 hover:bg-blue-300 text-white rounded px-4 py-1">保存</button>
          </div>
        </div>
      </Modal>
    </>
  )
}
