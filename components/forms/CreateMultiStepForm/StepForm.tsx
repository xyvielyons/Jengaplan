import React from 'react'
import SchoolDetailsForm from './SchoolDetailsForm';
import { useAppSelector } from '@/hooks/hooks';
import TopicSelectionForm from './TopicSelectionForm';
import TimetableStructureDetails from './TimetableStructureDetails';
const StepForm = () => {
    const currentStep = useAppSelector((state)=>state.schemes.currentStep);

    function currentStepFormRender(step:Number | String){
        if(currentStep === 1){
            return <SchoolDetailsForm/>
        }else if(currentStep === 2){
          return <TopicSelectionForm/>
        }else if(currentStep === 3){
          return <TimetableStructureDetails/>
        }
    }
  return (
    <div>
        <div className="pb-[80px]">{currentStepFormRender(currentStep)}</div>
    </div>
  )
}

export default StepForm