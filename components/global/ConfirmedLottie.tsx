'use client'
import React from "react";
import Lottie from "lottie-react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";
import { ConfirmedLottie as Lott } from "@/public/images";
const ConfirmedLottie = ({data}:{data:any}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-xs sm:max-w-md">
        <Lottie animationData={Lott} loop autoplay />
      </div>
      <div className="w-full flex flex-col items-center space-y-4 text-center">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
          {data.status_code==1 ? "Payment Was Completed Successfully": data.status_code == 2 ? "Your Payment has Failed":"Your Payment Is Invalid" }
        </h1>
        <p className="text-sm">{`${data.message}: ${data.payment_method}`}</p>
        
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

export default ConfirmedLottie;
