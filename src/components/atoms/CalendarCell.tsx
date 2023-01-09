import React from 'react'
import { isToday } from '../../utils/date'

export const Day = (props: any) => {
  const getBackGroundClass = (day: number) => {
    let backGroundColor: string
    if (isToday(day)) {
      backGroundColor = 'bg-gray-400'
    } else {
      backGroundColor = 'bg-gray-300'
    }
    return backGroundColor
  }
  const { day, rowIdx, setIsOpen, setTargetDate } = props
  return (
    <div 
      className={
        `border border-gray-200 flex flex-col hover:bg-gray-200 text-black 
        ${getBackGroundClass(day.$D)}`
      } 
      onClick={() => {
        setIsOpen(true)
        setTargetDate(day.format('YYYY/mm/DD'))
      }}
    >
      <header className='flex flex-col items-center'>
        {rowIdx === 0 && <p className='text-sm mt-1'>{day.format('ddd')}</p>}
        <p className={'text-sm p-1 my-1 text-center'}>{day.format('DD')}</p>
      </header>
    </div>
  )
}
