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
      <body className={figtree.className}>
        <div id="ak-splash" aria-hidden="true">
          <div className="ak-splash-inner">
            <span className="ak-splash-dot" />
            <span className="ak-splash-name">
              <em>Andrew</em> King
            </span>
            <span className="ak-splash-sep" aria-hidden="true">
              ·
            </span>
            <span className="ak-splash-kicker">Loading</span>
          </div>
          <div className="ak-splash-bar" aria-hidden="true">
            <span />
          </div>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var MIN=2000,t0=Date.now();function h(){var e=document.getElementById('ak-splash');if(!e)return;var d=Math.max(0,MIN-(Date.now()-t0));setTimeout(function(){e.classList.add('is-ready');setTimeout(function(){if(e&&e.parentNode)e.parentNode.removeChild(e)},600)},d)}if(document.readyState==='complete')h();else window.addEventListener('load',h)})();`,
          }}
        />
        {children}
      </body>
    </html>
  )
}
