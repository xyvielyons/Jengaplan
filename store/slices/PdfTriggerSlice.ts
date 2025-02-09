// store/slices/counterSlice.ts
import { createSlice,PayloadAction } from "@reduxjs/toolkit";
type PdfState = {
  generatePdf?: () => Promise<any>; // Store function reference
}
const initialState: PdfState = {};
 
const PdfSlice = createSlice({
//name of the slice
  name: "pdf",
  //the initial state
  initialState,
  //the reducer functions
  reducers: {
  //add + 1
  setGeneratePdf: (state, action: PayloadAction<() => Promise<any>>) => {
    state.generatePdf = action.payload;
  },
  }
});

//export the reducers from counterSlice.actions
export const { setGeneratePdf } = PdfSlice.actions;
//export the counterSlice.reducer
export default PdfSlice.reducer;