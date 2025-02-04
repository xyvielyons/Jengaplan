'use client'
import React from "react";
import Lottie from "lottie-react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";
import ErrorLottie from "@/public/ServerError.json"; // Ensure correct path

const CancelledLottie = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center px-4 pb-[100px]">
      <div className="w-full max-w-xs sm:max-w-md">
        <Lottie animationData={ErrorLottie} loop autoplay />
      </div>
      <div className="w-full flex flex-col items-center space-y-4 text-center">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
          Your Payment Was Cancelled
        </h1>
        <Button
          radius="sm"
          className="dark:text-white text-gray-600"
          onPress={() => router.push("/wallet")}
          endContent={<MoveRight />}
        >
          Back to Wallet
        </Button>
      </div>
    </div>
  );
};

export default CancelledLottie;
