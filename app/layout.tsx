import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/providers/heroui-provider";
import {Button} from '@heroui/button'; 
// Configure the font
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400','500','900','100','300','700'], // Specify the font weights you need
  variable: '--font-roboto', // Optional: CSS variable for styling
});

export const metadata: Metadata = {
  title: "Jengaplan",
  description: "JengaPlan is an advanced schemes of work generator that helps teachers create structured lesson plans effortlessly. Customize by term, subject, and weekly lessons, then export to PDF. Save time and streamline your curriculum planning today!",
  keywords:'JengaPlan, schemes of work generator, lesson planning tool, teacher lesson planner, automated lesson plans, curriculum planning software, education SaaS, school lesson planner, teaching resources, academic planning tool.'
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable}  antialiased`}
      >
        <Toaster />
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Providers>
              {children}
              </Providers>
          </ThemeProvider>
          
      </body>
    </html>
  );
}
