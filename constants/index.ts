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
        title:"Topic details",
        subtitle:"Select the topics you would like to include."
    },
    {
        number:3,
        title:"Timetable structure details",
        subtitle:"Fill in your details based on your school timetable."
    },
    {
        number:4,
        title:"Team breaks and interruptions",
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

export const primaryClasses = ["PP1","PP2","Grade-1","Grade-2","Grade-3","Grade-4","Grade-5","Grade-6","Grade-7","Grade-8","Grade-9"]
export const secondaryClasses = ["Form-1","Form-2","Form-3","Form-4"]

export const secondarySubjects = ["English","Kiswahili","Mathematics","Chemistry","Biology","Physics","History","Geograpghy","CRE","Business","HomeScience","Computer","IRE"]
export const primarySubjects = (grade:string | any)=>{
  switch (grade) {
    case "PP1":
      return ["English","Mathematics","CRE","Arts&Crafts","Music","EnvironMent","Movement"]
      break;
    case "PP2":
      return ["English","Mathematics","CRE","Arts&Crafts","Music","EnvironMent","Movement","Psychomotor"]
      break;
  
    default:
      return []
      break;
  }
}