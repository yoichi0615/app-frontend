import { useState, useEffect } from 'react'

export const LikeButton: React.FC = () => {

  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    console.log('useEffect is called') 
    window.setInterval(()=> {
      setCount(prev => ++prev)
    }, 1000)
    return () => {}
  }, [])


  const handleClick = () => {
    setCount(prev => ++prev)
  }

  return (
    <button onClick={handleClick}>♥　{count}</button>
  )
}