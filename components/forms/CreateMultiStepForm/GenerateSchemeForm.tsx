import SchemeGenerator from '@/components/schemeGenerator/page'

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