import React from 'react'
import { AnimatedTestimonials } from '../cards/animated-testimonials'

const Team = () => {
    const testimonials = [
        {
          quote:
            "As a software engineer, I specialize in building scalable, high-performance applications that enhance user experiences and streamline operations. With expertise in both frontend and backend technologies, I ensure seamless functionality, security, and efficiency in every project.",
          name: "Xyvie Lyons",
          designation: "Software Enginner +254728440683",
          src: "/111194732.jpg",
        },
        {
          quote:
            "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
          name: "George Kungu",
          designation: "Product Manager at Jengascheme",
          src: "/study-group-african-people.jpg",
        },
      ];
  return (
    <section className='mt-[24px] '>
        <div className="space-y-4">
            <h1 className='text-4xl text-start font-bold bg-[linear-gradient(to_right,#212121,#0077FF)] dark:bg-[linear-gradient(to_right,#ffffff,#58A6FF)] bg-clip-text text-transparent w-fit'>Meet the Team</h1>
            <p className='text-gray-600 md:pr-[200px] dark:text-gray-100'>At JengaScheme, we’re a small team of dedicated professionals passionate about education and technology. Together, we’re on a mission to transform lesson planning for teachers everywhere.</p>
        </div>
        <div className="">
            <AnimatedTestimonials testimonials={testimonials} autoplay />
        </div>
    </section>
  )
}

export default Team