import React from 'react'
import { isToday, isThisMonth } from '../../utils/date'

export const CalendarCell = (props: any) => {
  const getBackGroundClass = (day: number) => {
    let backGroundColor: string
    if (isToday(day)) {
      backGroundColor = 'bg-gray-400'
    } else {
      backGroundColor = 'bg-gray-300'
    }
    return backGroundColor
  }
  const { day, rowIdx, setIsOpen, setTargetDate, setIsLoadedPost, income, setError } = props

  const getDisabledClass = (day: number) => {
    const disabledClass = (isThisMonth(day)) ? '' : 'pointer-events-none bg-gray-500'
    return disabledClass
  }

  return (
    <div 
      className={
        `border border-gray-200 flex flex-col hover:bg-gray-200 text-black 
        ${getBackGroundClass(day.$D)}
        ${getDisabledClass(day)}`
      } 
      onClick={() => {
        setIsOpen(true)
        setTargetDate(day.format('YYYY/MM/DD'))
        setIsLoadedPost(false)
        setError(false)
      }}
    >
      <header className='flex flex-col items-center'>
        {rowIdx === 0 && <p className='text-sm mt-1'>{day.format('ddd')}</p>}
        <p className={'text-sm p-1 my-1 text-center'}>{day.format('DD')}</p>
        {income &&  <p className='text-red-400'><span>-</span>{ income.total_amount }</p>}
      </header>
    </div>
  )
}
