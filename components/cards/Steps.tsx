'use client'
import React from 'react'
import { steps } from '@/constants'
import { useAppSelector } from '@/hooks/hooks';
const Steps = () => {
    const currentStep = useAppSelector((state:any)=>state.schemes.currentStep)
    console.log(currentStep)
    const stepsLength = steps.length;
    function StepIndicator(step:Number | String){
        if(step === 1){
            return (
                <div className="flex flex-row space-x-2">
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="w-[64px] h-[10px] border-gray-600 dark:border-gray-400 border-[1px] rounded-md"></div>
                    <div className="w-[64px] h-[10px] border-gray-600 dark:border-gray-400 border-[1px] rounded-md"></div>
                    <div className="w-[64px] h-[10px] border-gray-600 dark:border-gray-400 border-[1px] rounded-md"></div>
                    <div className="w-[64px] h-[10px] border-gray-600 dark:border-gray-400 border-[1px] rounded-md"></div>
                    <div className="w-[64px] h-[10px] border-gray-600 dark:border-gray-400 border-[1px] rounded-md"></div>
                </div>
            )
        }else if(step === 2){
               return( <div className="flex flex-row space-x-2">
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="w-[64px] h-[10px] border-gray-600 dark:border-gray-400 border-[1px] rounded-md"></div>
                    <div className="w-[64px] h-[10px] border-gray-600 dark:border-gray-400 border-[1px] rounded-md"></div>
                    <div className="w-[64px] h-[10px] border-gray-600 dark:border-gray-400 border-[1px] rounded-md"></div>
                    <div className="w-[64px] h-[10px] border-gray-600 dark:border-gray-400 border-[1px] rounded-md"></div>


                </div>)

        }else if(step === 3){
               return( <div className="flex flex-row space-x-2">
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="w-[64px] h-[10px] border-gray-600 dark:border-gray-400 border-[1px] rounded-md"></div>
                    <div className="w-[64px] h-[10px] border-gray-600 dark:border-gray-400 border-[1px] rounded-md"></div>
                    <div className="w-[64px] h-[10px] border-gray-600 dark:border-gray-400 border-[1px] rounded-md"></div>

                </div>)

        }else if(step === 4){
               return( <div className="flex flex-row space-x-2">
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="w-[64px] h-[10px] border-gray-600 dark:border-gray-400 border-[1px] rounded-md"></div>
                    <div className="w-[64px] h-[10px] border-gray-600 dark:border-gray-400 border-[1px] rounded-md"></div>

                </div>)
        
        }else if(step === 5){
               return( <div className="flex flex-row space-x-2">
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="w-[64px] h-[10px] border-gray-600 dark:border-gray-400 border-[1px] rounded-md"></div>

                </div>)
        }else if(step === 6){
               return( <div className="flex flex-row space-x-2">
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                    <div className="bg-gray-800 w-[64px] h-[10px] border-gray-800 dark:bg-gray-200 rounded-md"></div>
                </div>)
        }
    }
  return (
    <div className='space-y-4'>
        <div className="">
            {StepIndicator(currentStep)}
        </div>
        <div className="">
            {steps.map((step,i)=>{
            if(currentStep === step.number){
                return(
                    <div className="space-y-[4px]" key={i}>
                        <h1 className=' text-gray-800 text-[18px] dark:text-gray-200'>{step.title}</h1>
                        <p className='text-sm text-gray-600 font-light dark:text-gray-300'>{step.subtitle}</p>
                    </div>
                )
            }
        })}
        </div>
        
    </div>
  )
}

export default Steps