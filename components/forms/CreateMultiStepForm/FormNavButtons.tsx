import { ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useAppSelector,useAppDispatch } from "@/hooks/hooks";
import { setCurrentStep } from "@/store/slices/SchemeSlice";
export default function NavButtons() {
  const currentStep = useAppSelector((store) => store.schemes.currentStep);
  const dispatch = useAppDispatch();
  function handlePrevious() {
    dispatch(setCurrentStep(currentStep - 1));
  }
  
  return (
    <div className="flex justify-between items-center">
      {currentStep > 1 && (
        <button
          onClick={handlePrevious}
          type="button"
          className="inline-flex items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>Previous</span>
        </button>
      )}
      <button
        type="submit"
        className="inline-flex items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        <span>
          {currentStep === 6 ? "Confirm and Submit" : "Save and Continue"}
        </span>
        <ChevronRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
}