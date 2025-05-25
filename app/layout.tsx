import type React from "react"
import "./globals.css"
import { Inter, Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ApiStatusProvider } from "@/lib/api-status-context"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

export const metadata = {
  title: "Relationship Reflection Tool",
  description: "A visual tool to reflect on relationship dynamics",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={playfair.variable}>
      <head />
      <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="light"
        >
          <ApiStatusProvider>
            {children}
          </ApiStatusProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
