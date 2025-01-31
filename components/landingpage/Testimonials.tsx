import React from 'react'
import { TestimonialsData } from '@/constants'
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee"
import { one } from '@/public/images';
import Image from 'next/image';


const firstRow = TestimonialsData.slice(0, TestimonialsData.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function Testimonials() {
  return (
    <div className="" id='testimonials'>
        <div className="space-y-2 text-center flex items-center justify-center flex-col relative">
            <h1 className='text-4xl font-bold bg-[linear-gradient(to_right,#212121,#0077FF)] dark:bg-[linear-gradient(to_right,#ffffff,#58A6FF)] bg-clip-text text-transparent w-fit'>What Teachers Are Saying</h1>
            <p className='text-gray-600 dark:text-gray-100'>Don{"'"}t just take our word for it—see how JengaScheme is transforming lesson planning for educators</p>
            <div className='absolute right-[20px] top-4'>
              <Image src={one} alt="one logo" ></Image>
            </div>
        </div>
        <div className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background ">
        <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
            ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
    </div>
    
  );
}
