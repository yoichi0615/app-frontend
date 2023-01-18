import React, { useState } from 'react'
import { Selectbox } from '../atoms/Selectbox'
import { options } from '../pages/Main'

export const Detail = (props: any) => {
  const [selectValue, setValue] = useState(1)

  return (
    <div className="mt-10">
      <table>
        <thead>
          <tr>
            <th className='px-2'>計算<br />対象</th>
            <th className='px-2'>日付</th>
            <th className='px-2'>内容</th>
            <th className='px-2'>金額（円）</th>
            <th className='px-2'>カテゴリー</th>
            <th className='px-2'>削除</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='px-2'>
              <input type="checkbox" />
            </td>
            <td className='px-2'>
              2023-01-11
            </td>
            <td className='px-2'>
              <input type="text" value='DBから値を取得'/>
            </td>
            <td className='px-2'>1000円</td>
            <td className='px-2'>
              <Selectbox options={options} setValue={setValue} />
            </td>
            <td className='px-2'>
              ⤵️
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
