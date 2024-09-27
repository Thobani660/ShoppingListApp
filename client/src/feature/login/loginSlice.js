import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessGranted: false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    verifyUser: (state) => {
        if(state.accessGranted){
            alert("successful")
        }  else{
            alert("unsuccessful")
        }  
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { verifyUser, decrement, incrementByAmount } = loginSlice.actions

export default loginSlice.reducer