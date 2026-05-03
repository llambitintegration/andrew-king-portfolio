import type React from "react"
import type { Metadata } from "next"
import { Figtree, Instrument_Serif, JetBrains_Mono } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Andrew King — AI/ML & Automation Engineer",
  description:
    "Portfolio of Andrew King — AI/ML engineer specializing in industrial robotics, controls integration, and intelligent automation systems.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-contrast="balanced"
      className={`${figtree.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${GeistMono.variable}`}
    >
      <body className={figtree.className}>{children}</body>
    </html>
  )
}
