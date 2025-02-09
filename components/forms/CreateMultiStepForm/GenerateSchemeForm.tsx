import SchemeGenerator from '@/components/schemeGenerator/page'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { setCurrentStep } from '@/store/slices/SchemeSlice'
import { Button } from '@heroui/react'
import { ArrowLeft, ArrowRight, EyeIcon, Plus } from 'lucide-react'
import React from 'react'

type Props = {}

const GenerateSchemeForm = (props: Props) => {
   
  return (
    <div className='space-y-8'>
            <SchemeGenerator></SchemeGenerator>
        
    </div>
  )
}

export default GenerateSchemeForm