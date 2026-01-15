"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

type Logo = {
  src: string
  alt: string
  angle: number // degrees from top (clockwise)
  distance?: number // px distance from center
}

const logos: Logo[] = [
  { src: '/Claude_AI_symbol.svg.png', alt: 'Claude AI', angle: 0, distance: 220 },
  { src: '/gpt.png', alt: 'ChatGPT', angle: 51, distance: 220 },
  { src: '/videogram.webp', alt: 'Videogram', angle: 102, distance: 220 },
  { src: '/flux.webp', alt: 'Flux', angle: 153, distance: 220 },
  { src: '/elevenlabs.webp', alt: 'Eleven Labs', angle: 204, distance: 220 },
  { src: '/luma.png', alt: 'Luma', angle: 255, distance: 220 },
  { src: '/veo3.webp', alt: 'Veo 3', angle: 306, distance: 220 }
]

function polarToCartesian(angleDeg: number, distance: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  const x = Math.cos(rad) * distance
  const y = Math.sin(rad) * distance
  return { x, y }
}

export default function OrbitSection() {
  // compute a responsive ring size on the client to avoid overflow on small screens
  const [ringSize, setRingSize] = useState(560)

  useEffect(() => {
    function updateSize() {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      // keep a max of 560px but on small screens use up to 90% of viewport width
      const size = Math.min(560, Math.floor(vw * 0.9))
      setRingSize(size)
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const center = ringSize / 2
  // On mobile, use a smaller orbit radius to keep logos from being cut off
  const isMobile = ringSize < 560
  const distanceMultiplier = isMobile ? 0.40 : 0.62

  return (
    <section className="py-20 md:py-40 px-6 overflow-hidden bg-black">
      <div className="max-w-6xl mx-auto text-center">
        {/* Container that positions heading and orbit together */}
        <div className="relative orbit-wrap" style={{ minHeight: ringSize }}>
          {/* Heading centered in the middle of the orbit visually */}
          <div className="orbit-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight">
              Todos los modelos de IA<br/> en un solo proceso <br/>de producción
            </h2>
          </div>

          {/* rotating container: absolute so items can orbit around the heading */}
          <div className="orbit-container">
            <div aria-hidden className="orbit-ring" style={{ width: ringSize, height: ringSize }}>
              {logos.map((logo, idx) => {
                const dist = Math.floor(ringSize * distanceMultiplier)
                const { x, y } = polarToCartesian(logo.angle, dist)
                const left = `${Math.round((center + x - 32) * 100) / 100}px` // Round to 2 decimals for consistent hydration
                const top = `${Math.round((center + y - 32) * 100) / 100}px`
                // stagger animation durations slightly via inline style
                const animDelay = `${(idx % 6) * 0.3}s`
                return (
                  <div
                    key={idx}
                    className="orbit-item crisp-render"
                    style={{ left, top, boxShadow: 'rgba(0, 0, 0, 0.6) 0px 6px 24px', animationDelay: animDelay }}
                  >
                    {/* Use next/image for optimization where possible; fallback to img if needed */}
                    <Image src={logo.src} alt={logo.alt} width={44} height={44} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
