import React from "react";
import { useState } from "react";
import { Month } from "../organisms/Month";
import { getMonth } from "../../utils/date";
import { store } from '../../store';
import { Provider } from 'react-redux';

export const Main: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  return (
    <>
      <h3>メインページ</h3>
      <Provider store={store}>
        <Month month={currentMonth} isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
      </Provider>
    </>
  )
}