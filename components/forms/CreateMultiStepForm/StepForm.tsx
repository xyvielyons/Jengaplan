import React from 'react'
import SchoolDetailsForm from './SchoolDetailsForm';
import { useAppSelector } from '@/hooks/hooks';
import TopicSelectionForm from './TopicSelectionForm';
import TimetableStructureDetails from './TimetableStructureDetails';
import TermBreaksForm from './TermBreaksForm';
import TopicOrder from './KanbanTopic';
import KanbanTopic from './KanbanTopic';
import GenerateSchemeForm from './GenerateSchemeForm';
const StepForm = () => {
    const currentStep = useAppSelector((state)=>state.schemes.currentStep);

    function currentStepFormRender(step:Number | String){
        if(currentStep === 1){
            return <SchoolDetailsForm/>
        }else if(currentStep === 2){
          return <TopicSelectionForm/>
        }else if(currentStep === 3){
          return <TimetableStructureDetails/>
        }else if(currentStep === 4){
          return <TermBreaksForm/>
        }else if(currentStep === 5){
          return <KanbanTopic/>
        }else if(currentStep === 6){
          return <GenerateSchemeForm/>
        }
    }
  return (
    <div>
        <div className="pb-[80px]">{currentStepFormRender(currentStep)}</div>
    </div>
  )
}

export default StepForm