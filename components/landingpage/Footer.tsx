'use client'
import Image from 'next/image'
import React from 'react'
import { logolight } from '@/public/images'
import { useState, useEffect } from "react";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import Link from 'next/link';
type Props = {}

const Footer = (props: Props) => {
    const [year, setYear] = useState(new Date().getFullYear());
    useEffect(() => {
        setYear(new Date().getFullYear());
      }, []);

  return (
    <div className='border-t-gray-400  border-t-[1px] flex items-center justify-center p-4 flex-col space-y-4'>
        <div className="">
            <Image src={logolight} alt="" width={150} height={150} className='dark:brightness-150'></Image>
        </div>
        <div className="flex flex-row gap-4 ">
            <div className="">
                <Link href="https://wa.me/+254728440683" target="_blank" rel="noopener noreferrer">
                    <FaWhatsappSquare className='text-gray-400 dark:active:text-gray-100 dark:hover:text-gray-100 hover:text-gray-800 active:text-gray-800' size={24}></FaWhatsappSquare>
                </Link>
            </div>
            <div className="">
                <Link href="https://www.linkedin.com/in/xyvie-lyons-a8873820a" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={24} className='text-gray-400 dark:active:text-gray-100 dark:hover:text-gray-100 hover:text-gray-800 active:text-gray-800'></FaLinkedin>
                </Link>
            </div>
            <div className="">
                <Link href="https://www.facebook.com/profile.php?id=61559700346584" target="_blank" rel="noopener noreferrer">
                    <FaFacebookSquare size={24} className='text-gray-400 dark:active:text-gray-100 dark:hover:text-gray-100 hover:text-gray-800 active:text-gray-800'></FaFacebookSquare>
                </Link>
            </div>
        </div>
        <div className="">
            <p className='text-gray-600 dark:text-gray-200'>© {year} Jengascheme. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer