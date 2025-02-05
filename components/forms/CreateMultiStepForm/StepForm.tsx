import React from 'react'
import SchoolDetailsForm from './SchoolDetailsForm';
import { useAppSelector } from '@/hooks/hooks';
const StepForm = () => {
    const currentStep = useAppSelector((state)=>state.schemes.currentStep);

    function currentStepFormRender(step:Number | String){
        if(currentStep === 1){
            return <SchoolDetailsForm/>
        }
    }
  return (
    <div>
        <div className="">{currentStepFormRender(currentStep)}</div>
    </div>
  )
}

export default StepForm