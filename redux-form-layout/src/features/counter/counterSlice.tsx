import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    count: 0,
}

export const counterSlice = createSlice({
    name:"counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        squared: (state) => {
            state.count *= 2;
        },
        squaredRoot: (state) => {
            state.count /=2;
        },
        reset: (state) => {
            state.count = 0;
        },
        incrementByAmount:(state, action) => {
            state.count += action.payload;
        },
        decrementByAmount: (state, action) => {
            state.count -= action.payload;
        },
        multiplyByAmount: (state, action) => {
            state.count *= action.payload;
        },
        divideByAmount: (state, action) => {
            state.count /= action.payload;
        },
    }
})

export const {increment, decrement, squared, squaredRoot, multiplyByAmount, divideByAmount, reset, incrementByAmount, decrementByAmount} = counterSlice.actions;

export default counterSlice.reducer
