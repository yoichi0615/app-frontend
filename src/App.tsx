import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import { LikeButton } from './components/atoms/LikeButton';

const App: React.FC = () => {
  const [num, setNum] = useState<number>(0)

  useEffect(() => {
    axios.get('http://127.0.0.1:8001/api/list')
      .then(res => {
        setNum(res.data.id)
      })
  }, [])

  return (
    <>
      <div>APP</div>
      <div>{num}</div>
      <LikeButton />
    </>
  )
}

export default App;
