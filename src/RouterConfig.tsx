import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SampleHome } from './components/SampleHome'
import { Main } from './components/pages/Main'
import { SamplePage2 } from './components/SamplePage2'
import { Chart } from './components/pages/Chart'
import { NotFound } from './components/pages/NotFound'

export const RouterConfig: React.FC =() => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<SampleHome />} />
          <Route path="calendar" element={<Main />} />
          <Route path="chart" element={<Chart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}