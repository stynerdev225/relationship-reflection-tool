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
  description: "A comprehensive relationship reflection tool designed to help individuals and couples gain deeper insights into their relationships through structured prompts and personalized insights.",
  generator: 'v0.dev',
  openGraph: {
    title: "Relationship Reflection Tool",
    description: "A comprehensive relationship reflection tool designed to help individuals and couples gain deeper insights into their relationships through structured prompts and personalized insights.",
    url: "https://github.com/yourusername/relationship-reflection-tool",
    siteName: "Relationship Reflection Tool",
    images: [
      {
        url: "https://pub-6e6d79017ca54282b1e97d020db56f25.r2.dev/thumbnail-relationshipreflection.png",
        width: 1600,
        height: 600,
        alt: "Relationship Reflection Tool - Build stronger relationships through guided reflection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Relationship Reflection Tool",
    description: "A comprehensive relationship reflection tool designed to help individuals and couples gain deeper insights into their relationships through structured prompts and personalized insights.",
    images: ["https://pub-6e6d79017ca54282b1e97d020db56f25.r2.dev/thumbnail-relationshipreflection.png"],
  },
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
