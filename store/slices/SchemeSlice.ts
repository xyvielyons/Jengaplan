// store/slices/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface Break {
  startWeek: number;
  startLesson: number;
  endWeek: number;
  endLesson: number;
  title: string;
}
//create the type of the initial CounterState Value that is going to be passed in
interface SchemeStateTypes {
  currentStep:number,
  formData?:{
    schoolName?:string,
    schoolLevel?:string,
    subject?:string,
    term?:string,
    class?:string,
    year?:string,
    selectedTopics?:string[],
    lessonsPerWeek?:number,
    startWeek?:number,
    startLesson?:number,
    endWeek?:number,
    endLesson?:number,
    addBreaks?:boolean,
    breaks?:Break[]
    doubleLesson?:number[]
  }
}
//our initial counter state is o
const initialState: SchemeStateTypes = {
  currentStep:1,
  formData:{}
};
 
const SchemeSlice = createSlice({
//name of the slice
  name: "schemegendata",
  //the initial state
  initialState,
  //the reducer functions
  reducers: {
  //add + 1
    setCurrentStep:(state,action)=>{
      state.currentStep = action.payload
    },
    updateFormData:(state,action)=>{
      state.formData={
        ...state.formData,
        ...action.payload
      }
    } 
  },
});

//export the reducers from counterSlice.actions
export const { setCurrentStep,updateFormData } = SchemeSlice.actions;
//export the counterSlice.reducer
export default SchemeSlice.reducer;