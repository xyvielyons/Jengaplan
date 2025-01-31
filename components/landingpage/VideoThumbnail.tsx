"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { homevideoimage } from "@/public/images";

export default function VideoThumbnail({ homevideoimage1 }: { homevideoimage1?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="mt-[8px] p-[8px] relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <Image
        src={homevideoimage}
        alt="Video thumbnail"
        className="rounded-sm brightness-75"
        width={800} // Adjust width as needed
        height={600} // Adjust height as needed
      />

      {/* Play Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isHovered ? 1 : 0.8, scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.button
          className="bg-white text-black rounded-full p-4 shadow-lg"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <IconPlayerPlayFilled className="h-10 w-10" />
        </motion.button>
      </motion.div>
    </div>
  );
}
