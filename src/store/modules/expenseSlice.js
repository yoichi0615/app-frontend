import { createSlice } from '@reduxjs/toolkit'

export const expenseSlice = createSlice({
  name: 'expense',
  initialState: {
    user_id: null,
    memo: '',
    category_id: null,
    amount: 0,
    date: ''
  },
  reducers: {
    setData: (state, { payload, type }) => {
      state.amount = payload.amount
      state.memo = payload.memo
      state.category_id = payload.category_id
    }
  }
})

export const { setData } = expenseSlice.actions
export default expenseSlice.reducer
