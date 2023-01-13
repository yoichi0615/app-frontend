import { configureStore } from "@reduxjs/toolkit"
import expenseReducer from "./modules/expenseSlice"

export const store = configureStore({
  reducer: {
    expense: expenseReducer
  }
})