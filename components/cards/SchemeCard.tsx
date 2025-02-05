'use client'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Steps from './Steps'
import StepForm from '../forms/CreateMultiStepForm/StepForm'

type Props = {}

const SchemeCard = (props: Props) => {
  return (
    <Card className='dark:bg-background'>
      <CardHeader>
        <CardTitle>
          <Steps></Steps>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <StepForm></StepForm>
      </CardContent>
    </Card>

  )
}

export default SchemeCard