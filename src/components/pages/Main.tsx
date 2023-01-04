import React from "react";
import { useState } from "react";
import { Month } from "../molecules/Month";
import { getMonth } from "../../utils/date";

export const Main:React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  return (
    <>
      <h3>家計簿メインページ</h3>
      <Month month={currentMonth} />
    </>
  )
}