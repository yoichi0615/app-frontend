import React from "react";

export const Day = (props: any) => {
  const { day, rowIdx } = props;
  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {/* 1行目に曜日を表示 */}
        {rowIdx === 0 && <p className="text-sm mt-1">{day.format("ddd")}</p>}
        <p className={"text-sm p-1 my-1 text-center"}>{day.format("DD")}</p>
      </header>
    </div>
  );
};
