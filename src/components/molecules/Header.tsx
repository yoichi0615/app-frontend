import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom';

export const Header = () => {
  const location = useLocation()
  console.log(location)
  return (
    <header className='bg-orange-200'>
      <div className='mb-5'>
        <ul className='list-none flex'>
          <li className={`p-3 mr-2 ${location.pathname === '/' ? 'text-gray-400' : ''}`}>
            <Link to="/">ホーム</Link>
          </li>
          <li className={`p-3 mr-2 ${location.pathname === '/calendar' ? 'text-gray-400' : ''}`}>
          <Link to="/calendar">家計</Link>
          </li>
          <li className={`p-3 mr-2 ${location.pathname === '/chart' ? 'text-gray-400' : ''}`}>
            <Link to="/chart">グラフ</Link>
          </li>
          <li className={`p-3 mr-2 ${location.pathname === '/setting' ? 'text-gray-400' : ''}`}>
          <Link to="/setting">設定</Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
