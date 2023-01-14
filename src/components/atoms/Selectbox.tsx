import React from 'react'

export const Selectbox = (props: any) => {
  const { options, setValue } = props
  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  return (
    <div>
      <select className="px-3 py-2 mb-3 bg-stone-200" onChange={handleChange}>
        {options.map((option: any) => (
          <option value={option.value} key={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
