// store/slices/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";
 
//create the type of the initial CounterState Value that is going to be passed in
interface SchemeStateTypes {
  value: number;
}
//our initial counter state is o
const initialState: SchemeStateTypes = {
  value: 0,
};
 
const SchemeSlice = createSlice({
//name of the slice
  name: "counter",
  //the initial state
  initialState,
  //the reducer functions
  reducers: {
  //add + 1
    increment: (state) => {
      state.value += 1;
    },
   //add - 1 
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

//export the reducers from counterSlice.actions
export const { increment, decrement } = SchemeSlice.actions;
//export the counterSlice.reducer
export default SchemeSlice.reducer;