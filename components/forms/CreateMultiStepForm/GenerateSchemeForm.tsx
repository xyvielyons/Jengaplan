import { Button } from '@heroui/react'
import { ArrowLeft, ArrowRight, EyeIcon, Plus } from 'lucide-react'
import React from 'react'

type Props = {}

const GenerateSchemeForm = (props: Props) => {
  return (
    <div className='space-y-8'>
        <div className="flex gap-2 flex-col">
            <Button className="w-full bg-blue-600 text-white" radius='sm' endContent={<ArrowRight></ArrowRight>}>Pay & Download</Button>
            <Button className="w-full text-gray-700" variant="bordered" radius='sm' endContent={<Plus></Plus>}>Create another scheme</Button>
        </div>
        <div className="flex flex-row gap-2">
        <Button className="w-full text-gray-800" variant="solid" radius='sm' startContent={<ArrowLeft></ArrowLeft>}>Back</Button>
            <Button className="w-full bg-gray-800 text-white" radius='sm' endContent={<EyeIcon></EyeIcon>}>Preview Scheme</Button>
        </div>
    </div>
  )
}

export default GenerateSchemeForm