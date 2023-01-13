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
    setData: (state, action) => {
      state.amount = action.payload.amount
    }
  }
})

export const { setData } = expenseSlice.actions
export default expenseSlice.reducer
