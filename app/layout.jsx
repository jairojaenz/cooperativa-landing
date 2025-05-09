import  React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Cooperativa de Mujeres Trabajadoras del Campo",
  description: "Productos orgánicos, frescos y de alta calidad cultivados por mujeres",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
  
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

