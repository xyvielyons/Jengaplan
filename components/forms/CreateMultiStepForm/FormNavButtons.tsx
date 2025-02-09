import { ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useAppSelector,useAppDispatch } from "@/hooks/hooks";
import { setCurrentStep } from "@/store/slices/SchemeSlice";
import { Button } from "@heroui/react";
export default function NavButtons() {
  const currentStep = useAppSelector((store) => store.schemes.currentStep);
  const dispatch = useAppDispatch();
  function handlePrevious() {
    dispatch(setCurrentStep(currentStep - 1));
  }
  
  return (
    <div className="flex justify-between flex-col-reverse gap-2 md:flex-row pt-4">
      {currentStep > 1 && (
        <Button
          onPress={handlePrevious}
          radius="sm"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>Previous</span>
        </Button>
      )}
      {/* <Button
        type="submit"
        className={`bg-blue-600 text-white flex-row ${currentStep == 5?"hidden":"block"}`}
        radius="sm"
      >
        <span>
          {currentStep === 6 ? "Confirm and Submit" : "Save and Continue"}
        </span>
        <ChevronRight className="w-5 h-5 ml-2" />
      </Button> */}
      <Button
      type="submit"
      className={`bg-blue-600 text-white flex-row ${currentStep == 5?"hidden":"block"}`}
      radius="sm"
      
      >
      {currentStep === 6 ? "Confirm and Submit" : "Save and Continue"}
      </Button>
    </div>
  );
}