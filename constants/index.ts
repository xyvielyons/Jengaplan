import { SelectTypes } from '@/lib/types';
import { LayoutDashboard,SquarePen,Settings,Wallet } from 'lucide-react';
export const TestimonialsData = [
    {
      name: "Mwangi Kamau",
      username: "@mwangi",
      body: "This schemes of work generator has saved me countless hours. I can now focus more on teaching!",
      img: "https://avatar.vercel.sh/mwangi",
    },
    {
      name: "Aisha Abdi",
      username: "@aisha",
      body: "Creating schemes of work has never been this easy. This tool ensures I stay ahead of my lesson plans!",
      img: "https://avatar.vercel.sh/aisha",
    },
    {
      name: "Wanjiku Njeri",
      username: "@wanjiku",
      body: "An absolute lifesaver! I generate my schemes of work in minutes instead of spending hours manually.",
      img: "https://avatar.vercel.sh/wanjiku",
    },
    {
      name: "Otieno Brian",
      username: "@otieno",
      body: "I no longer worry about structuring my syllabus. This tool makes it seamless and accurate.",
      img: "https://avatar.vercel.sh/otieno",
    },
    {
      name: "Mutua Ndeto",
      username: "@mutua",
      body: "I used to struggle with schemes of work, but this app makes it effortless and well-organized!",
      img: "https://avatar.vercel.sh/mutua",
    },
    {
      name: "Wambui Njoki",
      username: "@wambui",
      body: "The best tool for teachers! It keeps my schemes of work structured and easy to follow.",
      img: "https://avatar.vercel.sh/wambui",
    },
  ];
  
  export const DashboardItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Create Scheme",
      url: "/create",
      icon: SquarePen,
    },
    {
      title: "Wallet",
      url: "/wallet",
      icon: Wallet,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ]
  export const steps = [
    {
        number:1,
        title:"Fill in the subject and the school details",
        subtitle:"Fill the form with the correct details."
    },
    {
        number:2,
        title:"Topic selection",
        subtitle:"Select the topics you would like to include."
    },
    {
        number:3,
        title:"Timetable structure details",
        subtitle:"Fill in your details based on your school timetable."
    },
    {
        number:4,
        title:"Term breaks and interruptions",
        subtitle:"Fill in your details based on your school timetable."
    },
    {
        number:5,
        title:"Customize Topic Order",
        subtitle:"Easily drag and drop topics to arrange them as you prefer."
    },
    {
        number:6,
        title:"Download your scheme",
        subtitle:"Your scheme has been generated successfully."
    }

]


export const secondaryClasses:SelectTypes[] = [
  {
    name:"Form 1",
    serverName:"form1"
  },
  {
    name:"Form 2",
    serverName:"form2"
  },
  {
    name:"Form 3",
    serverName:"form3"
  },
  {
    name:"Form 4",
    serverName:"form4"
  }

]
export const primaryClasses:SelectTypes[] = [
  {
    name:"PP1",
    serverName:"pp1"
  },
  {
    name:"PP2",
    serverName:"pp2"
  },
  {
    name:"Grade 1",
    serverName:"grade1"
  },
  {
    name:"Grade 2",
    serverName:"grade2"
  },
  {
    name:"Grade 3",
    serverName:"grade3"
  },
  {
    name:"Grade 4",
    serverName:"grade4"
  },
  {
    name:"Grade 5",
    serverName:"grade5"
  },
  {
    name:"Grade 6",
    serverName:"grade6"
  },
  {
    name:"Grade 7",
    serverName:"grade7"
  },
  {
    name:"Grade 8",
    serverName:"grade8"
  },

]
export const secondarySubjects:SelectTypes[] = [
  {
    name:"Mathematics",
    serverName:'mathematics'
  },
  {
    name:"English",
    serverName:'englishes'
  },
  {
    name:"Kiswahili",
    serverName:'kiswahilis'
  },
  {
    name:"Chemistry",
    serverName:'chemistries'
  },
  {
    name:"Biology",
    serverName:'biologies'
  },
  {
    name:"Physics",
    serverName:'physics'
  },
  {
    name:"History",
    serverName:'histories'
  },
  {
    name:"Geography",
    serverName:'geographies'
  },
  {
    name:"CRE",
    serverName:'cres'
  },
  {
    name:"Business",
    serverName:'businesses'
  },
  {
    name:"Home Science",
    serverName:'homesciences'
  },
  {
    name:"Computer",
    serverName:'computers'
  },
  {
    name:"IRE",
    serverName:'ires'
  },
  {
    name:"Agriculture",
    serverName:'agricultures'
  }
]

// export const secondarySubjects = ["English","Kiswahili","Mathematics","Chemistry","Biology","Physics","History","Geograpghy","CRE","Business","HomeScience","Computer","IRE"]
export const primarySubjects = (grade:string | any):SelectTypes[]=>{
  switch (grade) {
    case "pp1":
      return [
        {
          name:"Mathematics",
          serverName:"mathematics"
        },
        {
          name:"English",
          serverName:"english"
        },
        {
          name:"CRE",
          serverName:"cre"
        },
        {
          name:"ART & CRAFT",
          serverName:"artsandcraft"
        },
        {
          name:"MUSIC",
          serverName:"music"
        },
        {
          name:"Environment",
          serverName:"environment"
        },
        {
          name:"Movement",
          serverName:"movement"
        },
      ]
    case "pp2":
      return [
        {
          name:"Mathematics",
          serverName:"mathematics"
        },
        {
          name:"English",
          serverName:"english"
        },
        {
          name:"CRE",
          serverName:"cre"
        },
        {
          name:"ART & CRAFT",
          serverName:"artsandcraft"
        },
        {
          name:"MUSIC",
          serverName:"music"
        },
        {
          name:"Environment",
          serverName:"environment"
        },
        {
          name:"Psychomotor",
          serverName:"psychomotor"
        },
      ]
    case "grade1":
      return [
        {
          name:"Mathematics",
          serverName:"mathematics"
        },
        {
          name:"English",
          serverName:"english"
        },
        {
          name:"Kiswahili",
          serverName:"kiswahili"
        },
        {
          name:"CRE",
          serverName:"cre"
        },
        {
          name:"ART & CRAFT",
          serverName:"artsandcraft"
        },
        {
          name:"MUSIC",
          serverName:"music"
        },
        {
          name:"Environment",
          serverName:"environment"
        },
        {
          name:"Hygine & Nutrition",
          serverName:"hygineandnutrition"
        },
        {
          name:"Literacy",
          serverName:"literacy"
        },
        {
          name:"Movement",
          serverName:"movement"
        },
        
      ]
    case "grade2":
      return [
        {
          name:"Mathematics",
          serverName:"mathematics"
        },
        {
          name:"English",
          serverName:"english"
        },
        {
          name:"Kiswahili",
          serverName:"kiswahili"
        },
        {
          name:"CRE",
          serverName:"cre"
        },
        {
          name:"ART & CRAFT",
          serverName:"artsandcraft"
        },
        {
          name:"MUSIC",
          serverName:"music"
        },
        {
          name:"Environment",
          serverName:"environment"
        },
        {
          name:"Hygine & Nutrition",
          serverName:"hygineandnutrition"
        },
        {
          name:"Literacy",
          serverName:"literacy"
        },
        {
          name:"Movement",
          serverName:"movement"
        },
        {
          name:"Creative Arts and sports",
          serverName:"creativeartsandsports"
        },
        
      ]
    case "grade3":
      return [
        {
          name:"Mathematics",
          serverName:"mathematics"
        },
        {
          name:"English",
          serverName:"english"
        },
        {
          name:"Kiswahili",
          serverName:"kiswahili"
        },
        {
          name:"CRE",
          serverName:"cre"
        },
        {
          name:"ART & CRAFT",
          serverName:"artsandcraft"
        },
        {
          name:"MUSIC",
          serverName:"music"
        },
        {
          name:"Environment",
          serverName:"environment"
        },
        {
          name:"Hygine & Nutrition",
          serverName:"hygineandnutrition"
        },
        {
          name:"Literacy",
          serverName:"literacy"
        },
        {
          name:"Movement",
          serverName:"movement"
        },
        {
          name:"Creative Arts and sports",
          serverName:"creativeartsandsports"
        },
        {
          name:"IRE",
          serverName:"ire"
        },
        
      ]
      case "grade4":
      return [
        {
          name:"Mathematics",
          serverName:"mathematics"
        },
        {
          name:"English",
          serverName:"english"
        },
        {
          name:"Kiswahili",
          serverName:"kiswahili"
        },
        {
          name:"CRE",
          serverName:"cre"
        },
        {
          name:"ART & CRAFT",
          serverName:"artsandcraft"
        },
        {
          name:"MUSIC",
          serverName:"music"
        },
        {
          name:"IRE",
          serverName:"ire"
        },
        {
          name:"Agriculture & Nutrition",
          serverName:"agricultureandnutrition"
        },
        {
          name:"Agriculture",
          serverName:"agriculture"
        },
        {
          name:"Social Studies",
          serverName:"socialstudies"
        },
        {
          name:"Science",
          serverName:"science"
        },
        {
          name:"Home Science",
          serverName:"homescienece"
        },
        {
          name:"Physical Health",
          serverName:"physicalhealth"
        },
        {
          name:"Creative Arts and sports",
          serverName:"creativeartsandsports"
        },
      ]
      case "grade5":
      return [
        {
          name:"Mathematics",
          serverName:"mathematics"
        },
        {
          name:"English",
          serverName:"english"
        },
        {
          name:"Kiswahili",
          serverName:"kiswahili"
        },
        {
          name:"CRE",
          serverName:"cre"
        },
        {
          name:"ART & CRAFT",
          serverName:"artsandcraft"
        },
        {
          name:"MUSIC",
          serverName:"music"
        },
        {
          name:"IRE",
          serverName:"ire"
        },
        {
          name:"Agriculture & Nutrition",
          serverName:"agricultureandnutrition"
        },
        {
          name:"Agriculture",
          serverName:"agriculture"
        },
        {
          name:"Social Studies",
          serverName:"socialstudies"
        },
        {
          name:"Science",
          serverName:"science"
        },
        {
          name:"Home Science",
          serverName:"homescienece"
        },
        {
          name:"Physical Health",
          serverName:"physicalhealth"
        },
        {
          name:"Lifeskills",
          serverName:"lifeskills"
        },
      ]
      case "grade6":
      return [
        {
          name:"Mathematics",
          serverName:"mathematics"
        },
        {
          name:"English",
          serverName:"english"
        },
        {
          name:"Kiswahili",
          serverName:"kiswahili"
        },
        {
          name:"CRE",
          serverName:"cre"
        },
        {
          name:"ART & CRAFT",
          serverName:"artsandcraft"
        },
        {
          name:"MUSIC",
          serverName:"music"
        },
        {
          name:"IRE",
          serverName:"ire"
        },
        {
          name:"Agriculture & Nutrition",
          serverName:"agricultureandnutrition"
        },
        {
          name:"Agriculture",
          serverName:"agriculture"
        },
        {
          name:"Social Studies",
          serverName:"socialstudies"
        },
        {
          name:"Science",
          serverName:"science"
        },
        {
          name:"Home Science",
          serverName:"homescienece"
        },
        {
          name:"Physical Health",
          serverName:"physicalhealth"
        }
      ]
      case "grade7":
        return [
          {
            name:"Mathematics",
            serverName:"mathematics"
          },
          {
            name:"English",
            serverName:"english"
          },
          {
            name:"Kiswahili",
            serverName:"kiswahili"
          },
          {
            name:"CRE",
            serverName:"cre"
          },
          {
            name:"Agriculture & Nutrition",
            serverName:"agricultureandnutrition"
          },
          {
            name:"Social Studies",
            serverName:"socialstudies"
          },
          {
            name:"Integrated Science",
            serverName:"integratedscience"
          },
          {
            name:"Creative Arts & Sports",
            serverName:"creativeartsandsports"
          },
          {
            name:"Pre Tech Studies",
            serverName:"pretechstudies"
          },
          {
            name:"IRE",
            serverName:"ire"
          },
        ]
      case "grade8":
        return [
          {
            name:"Mathematics",
            serverName:"mathematics"
          },
          {
            name:"English",
            serverName:"english"
          },
          {
            name:"Kiswahili",
            serverName:"kiswahili"
          },
          {
            name:"CRE",
            serverName:"cre"
          },
          {
            name:"Agriculture & Nutrition",
            serverName:"agricultureandnutrition"
          },
          {
            name:"Social Studies",
            serverName:"socialstudies"
          },
          {
            name:"Integrated Science",
            serverName:"integratedscience"
          },
          {
            name:"Hindu Religious Education",
            serverName:"hindu"
          },
          {
            name:"Creative Arts & Sports",
            serverName:"creativeartsandsports"
          },
          {
            name:"Pre Tech Studies",
            serverName:"pretechstudies"
          },
          {
            name:"IRE",
            serverName:"ire"
          },
        ]
      case "grade9":
        return [
          {
            name:"Mathematics",
            serverName:"mathematics"
          },
          {
            name:"English",
            serverName:"english"
          },
          {
            name:"Kiswahili",
            serverName:"kiswahili"
          },
          {
            name:"CRE",
            serverName:"cre"
          },
          {
            name:"Agriculture & Nutrition",
            serverName:"agricultureandnutrition"
          },
          {
            name:"Social Studies",
            serverName:"socialstudies"
          },
          {
            name:"Integrated Science",
            serverName:"integratedscience"
          },
          {
            name:"Creative Arts & Sports",
            serverName:"creativeartsandsports"
          },
          {
            name:"Pre Tech Studies",
            serverName:"pretechstudies"
          },
          {
            name:"IRE",
            serverName:"ire"
          },
        ]
    
  
    default:
      return []
      
  }
}