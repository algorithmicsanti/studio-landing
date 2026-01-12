'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { SparklesIcon } from '@heroicons/react/24/outline'
import { PauseIcon, PlayIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'
import OrbitSection from '@/components/OrbitSection'

// Videos used by the ComputerSection (module scope to keep useEffect stable)
const videos = [
  '/VIDEO%20SEARS.mp4',      // Plays once first
  '/VIDEO%20LG%20TRUE%20WIRELESS.mp4',
  '/VIDEO%20INBODY.mp4',
  '/VIDEO%20RENOPARTES%20MECATRONICA%200BH.mp4',
  '/VIDEO%20LIVERPOOL.mp4',
]

export default function Home() {
  useEffect(() => {
    // Check if user is authenticated (in real app, check auth state)
    // For demo purposes, we'll show the landing page
  }, [])

  const heroVideoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    // Try to programmatically start the video in case autoplay is blocked
    const vid = heroVideoRef.current
    if (vid) {
      const playPromise = vid.play()
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {
          // Autoplay was prevented; keep muted and try again silently
          try { vid.muted = true; vid.play().catch(() => { }) } catch { }
        })
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Hero Section */}
      <section className="relative py-17 px-6 min-h-[75vh] flex items-center justify-center">
        {/* Background video positioned inside this section only (not fixed) */}
        <video
          ref={heroVideoRef}
          className="absolute inset-0 w-full h-full object-cover -z-20 opacity-60"
          autoPlay
          muted
          loop
          preload="metadata"
          playsInline
          aria-hidden="true"
        >
          {/* Hero (primera pantalla) - mostrar Audi */}
          <source src="/Audi%20RS%20e-tron%20GT.mp4" type="video/mp4" />
        </video>

        {/* Semi-opaque black overlay to improve text contrast (covers hero area only) */}
        <div className="absolute inset-0 bg-black/40 -z-10" />

        <div className="max-w-5xl mx-auto text-center z-10 relative">
          {/* Eyebrow - Badge */}
          <div className="inline-flex flex-col items-center px-4 py-2 rounded-full text-primary font-semibold mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full gap-3 border border-primary/20 backdrop-blur-md">
              <SparklesIcon className="h-4 w-4" />
              <span className="font-semibold">#1</span>
              <span className="text-sm md:text-base">Herramienta de Video con IA</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-primary/90">
              {/* 5 stars */}
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-yellow-400">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.379 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.382 2.488c-.785.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.64 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69L9.05 2.927z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* H1 - Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            La Mejor IA para
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary-dark">Producción de Video</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto mb-10">
            Crea anuncios de video para e-commerce de alto rendimiento en días, no semanas.
          </p>

          {/* CTA Button */}
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-primary rounded-xl hover:bg-primary-dark hover:scale-105 shadow-lg shadow-primary/20"
          >
            <SparklesIcon className="h-5 w-5 mr-2" />
            Comenzar Ahora
          </Link>
          {/* Eyebrow Text - Trust indicator */}

        </div>
      </section>

      {/* Orbit Section - moved to be second on the page */}
      <OrbitSection />


      {/* IA + Humano en el Loop - sección de ancho completo con fondo negro */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">IA + Humano en el Loop de Producción</h3>
          <p className="text-xl text-muted leading-relaxed">
            Adnova Studio combina la agilidad de modelos de IA generativa con edición profesional.
            ¿El resultado? Anuncios de video que realmente puedes usar.
          </p>
        </div>
      </section>

      {/* Video Examples Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Automatización cuando la quieras,
              <br />
              control creativo cuando no
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Video Composer */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all group overflow-hidden">
              <h3 className="text-2xl font-bold text-foreground mb-3">Video Composer</h3>
              <p className="text-muted mb-6">Crea videos completos con solo instrucciones simples.</p>
              <div className="relative bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl overflow-hidden aspect-video border border-border/50 group-hover:border-primary/30 transition-all shadow-2xl">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                >
                  <source src="/VIDEO%20LG%20TRUE%20WIRELESS.mp4" type="video/mp4" />
                </video>
                <span className="absolute bottom-3 right-3 px-2 py-1 text-[10px] uppercase tracking-[0.3em] bg-black/70 text-white rounded-full">
                  demo
                </span>
              </div>
            </div>

            {/* AI Native Video Editor */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all group overflow-hidden">
              <h3 className="text-2xl font-bold text-foreground mb-3">Editor de Video con IA</h3>
              <p className="text-muted mb-6">Control total con IA potente directamente desde el editor.</p>
              <div className="relative bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl overflow-hidden aspect-video border border-border/50 group-hover:border-primary/30 transition-all shadow-2xl">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                >
                  <source src="/VIDEO%20INBODY.mp4" type="video/mp4" />
                </video>
                <span className="absolute bottom-3 right-3 px-2 py-1 text-[10px] uppercase tracking-[0.3em] bg-black/70 text-white rounded-full">
                  demo
                </span>
              </div>
            </div>

            {/* Use your own style or characters */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all group overflow-hidden">
              <h3 className="text-2xl font-bold text-foreground mb-3">Usa tu propio estilo o personajes</h3>
              <p className="text-muted mb-6">Consistencia hecha fácil.</p>
              <div className="relative bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl overflow-hidden aspect-video border border-border/50 group-hover:border-primary/30 transition-all shadow-2xl">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                >
                  <source src="/VIDEO%20RENOPARTES%20MECATRONICA%200BH.mp4" type="video/mp4" />
                </video>
                <span className="absolute bottom-3 right-3 px-2 py-1 text-[10px] uppercase tracking-[0.3em] bg-black/70 text-white rounded-full">
                  demo
                </span>
              </div>
            </div>

            {/* AI Sound */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all group overflow-hidden">
              <h3 className="text-2xl font-bold text-foreground mb-3">Sonido IA</h3>
              <p className="text-muted mb-6">Voiceovers, efectos y música—perfectamente sincronizados.</p>
              <div className="relative bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl overflow-hidden aspect-video border border-border/50 group-hover:border-primary/30 transition-all shadow-2xl">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                >
                  <source src="/VIDEO%20LIVERPOOL.mp4" type="video/mp4" />
                </video>
                <span className="absolute bottom-3 right-3 px-2 py-1 text-[10px] uppercase tracking-[0.3em] bg-black/70 text-white rounded-full">
                  demo
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Section removed as requested */}



      {/* How It Works section removed as requested */}
      {/* Compu Section ocultada como solicitaste */}

      {/* Socials Gallery Section */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Más ejemplos en nuestras redes sociales</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* YouTube Video 1 */}
            <div className="aspect-video rounded-xl overflow-hidden border border-border shadow-lg bg-card">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/rN6eqchDcqY"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            {/* YouTube Video 2 */}
            <div className="aspect-video rounded-xl overflow-hidden border border-border shadow-lg bg-card">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/JkrF5F1fnk0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            {/* YouTube Video 3 */}
            <div className="aspect-video rounded-xl overflow-hidden border border-border shadow-lg bg-card">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/94Mjc1fUaM8"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="flex gap-6 justify-center">
            <a
              href="https://youtube.com/@adnova__digital?si=806dONxbJsuZ61aT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#FF0000] hover:bg-red-700 text-white rounded-xl font-semibold transition-all hover:scale-105 gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
              YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20">Precios</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Planes y Precios
            </h3>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Elige el plan perfecto para tus necesidades y comienza a crear videos increíbles hoy
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-card border border-border rounded-2xl p-8 flex flex-col hover:border-primary/30 transition-all">
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-foreground mb-2">Starter</h4>
                <p className="text-muted">Perfecto para comenzar</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">$24,000</span>
                  <span className="text-muted">MXN/mes</span>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-primary/10 text-primary">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground">5 Videos/mes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-primary/10 text-primary">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-muted">$4,800 por video</span>
                </div>
              </div>

              <Link href="/signup" className="w-full py-4 rounded-xl border border-border text-foreground font-semibold hover:bg-muted/10 transition-all text-center">
                Comenzar
              </Link>
            </div>

            {/* Core Plan - POPULAR */}
            <div className="bg-gradient-to-b from-card to-card/50 border border-primary/50 rounded-2xl p-8 flex flex-col relative transform md:-translate-y-4">
              <div className="absolute top-0 right-0 left-0 -mt-4 flex justify-center">
                <span className="bg-primary text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">Más Popular</span>
              </div>

              <div className="mb-6 mt-2">
                <h4 className="text-2xl font-bold text-foreground mb-2">Core</h4>
                <p className="text-primary/80 font-medium">Ideal para negocios</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-white">$36,000</span>
                  <span className="text-muted">MXN/mes</span>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-primary text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white font-medium">10 Videos/mes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-primary/20 text-primary">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-muted">$3,600 por video</span>
                </div>
              </div>

              <Link href="/signup" className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark hover:scale-105 transition-all text-center shadow-lg shadow-primary/25">
                Comenzar
              </Link>
            </div>

            {/* Growth Plan */}
            <div className="bg-card border border-border rounded-2xl p-8 flex flex-col hover:border-primary/30 transition-all">
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-foreground mb-2">Growth</h4>
                <p className="text-muted">Para crecer rápido</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">$85,000</span>
                  <span className="text-muted">MXN/mes</span>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-primary/10 text-primary">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground">25 Videos/mes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-primary/10 text-primary">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-muted">$3,400 por video</span>
                </div>
              </div>

              <Link href="/signup" className="w-full py-4 rounded-xl border border-border text-foreground font-semibold hover:bg-muted/10 transition-all text-center">
                Comenzar
              </Link>
            </div>

          </div>

          {/* Enterprise Plan */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-card border border-border p-8 rounded-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-2">
                    <span className="text-xs font-bold tracking-wider uppercase text-primary border border-primary/20 px-2 py-1 rounded bg-primary/10">Enterprise</span>
                  </div>
                  <h4 className="text-2xl font-bold text-foreground mb-2">Solución Empresarial</h4>
                  <p className="text-muted mb-4">
                    Para equipos grandes con necesidades personalizadas
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-foreground">50+ Videos/mes</span>
                    </div>
                    <div className="hidden md:block text-muted">•</div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-foreground font-semibold">Precio Personalizado</span>
                    </div>
                  </div>
                </div>
                <div className="shrink-0">
                  <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-foreground text-background font-bold hover:bg-white/90 transition-all">
                    Contactar Ventas
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Enterprise Section */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-foreground mb-6">¿Necesitas Soporte Empresarial?</h3>
          <p className="text-xl text-muted mb-8">
            Trabaja con nuestro equipo de Studio para personalizar una plantilla para tu marca o negocio
            y automatizar todo tu pipeline de producción a escala.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-white font-bold hover:scale-105 transition-all"
            >
              Comenzar Gratis
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground rounded-xl hover:bg-muted/10 transition-colors font-medium text-lg"
            >
              Contactar Ventas
            </Link>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-2xl font-bold text-primary mb-4">Adnova Studio</div>
            <p className="text-muted mb-6">Plataforma de Creación de Video con IA</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted mb-8">
            <Link href="/#pricing" className="hover:text-primary transition-colors">Precios</Link>
            <Link href="/support" className="hover:text-primary transition-colors">Soporte</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Política de Privacidad</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Términos de Servicio</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contacto</Link>
          </div>
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://youtube.com/@adnova__digital?si=806dONxbJsuZ61aT"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                <path d="M22 7.5C22 5.57 20.43 4 18.5 4H5.5C3.57 4 2 5.57 2 7.5V16.5C2 18.43 3.57 20 5.5 20H18.5C20.43 20 22 18.43 22 16.5V7.5Z" fill="#FF0000" />
                <path d="M13 15L17.5 12L13 9V15Z" fill="white" />
              </svg>
              YouTube
            </a>
          </div>
          <div className="text-center text-sm text-muted">
            <p className="mt-2">2025. Todos los Derechos Reservados.</p>
            <p className="mt-4">
              <Link href="/editor-login" className="text-xs text-muted/50 hover:text-primary transition-colors">
                🎬 Editor Access
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ComputerSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const currentVideoIndex = useRef(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isSoundOn, setIsSoundOn] = useState(false)

  // Videos are defined at module scope to avoid useEffect dependency warnings

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoEnd = () => {
      // After first video, loop through remaining videos
      if (currentVideoIndex.current === 0) {
        // First video finished, move to second
        currentVideoIndex.current = 1
      } else if (currentVideoIndex.current === videos.length - 1) {
        // Last video finished, loop back to second video (skip first)
        currentVideoIndex.current = 1
      } else {
        // Move to next video
        currentVideoIndex.current += 1
      }

      // Change source and play
      video.src = videos[currentVideoIndex.current]
      video.play().catch(() => { })
    }

    video.addEventListener('ended', handleVideoEnd)
    return () => video.removeEventListener('ended', handleVideoEnd)
  }, [])

  const togglePlayPause = () => {
    const video = videoRef.current
    if (!video) return

    if (isVideoPlaying) {
      video.pause()
      setIsVideoPlaying(false)
    } else {
      video.play().catch(() => { })
      setIsVideoPlaying(true)
    }
  }

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsSoundOn(!video.muted)
  }

  return (
    <section className="relative aspect-video max-w-5xl mx-auto my-20 rounded-2xl overflow-hidden shadow-2xl border border-border group" aria-label="Compu background video">
      <div className="absolute inset-0 bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop={false}
          playsInline
          preload="auto"
        >
          <source src={videos[0]} type="video/mp4" />
        </video>
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label={isVideoPlaying ? "Pausar" : "Reproducir"}
        >
          {isVideoPlaying ? (
            <PauseIcon className="h-20 w-20 text-white drop-shadow-2xl hover:scale-110 transition-transform" />
          ) : (
            <PlayIcon className="h-20 w-20 text-white drop-shadow-2xl hover:scale-110 transition-transform" />
          )}
        </button>

        {/* Sound toggle - Absolute positioned inside relative container */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={toggleSound}
            className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white hover:bg-black/80 transition-colors"
            aria-label={isSoundOn ? "Silenciar" : "Activar sonido"}
          >
            {isSoundOn ? (
              <SpeakerWaveIcon className="h-5 w-5" />
            ) : (
              <SpeakerXMarkIcon className="h-5 w-5" />
            )}
            <span className="font-medium text-sm">{isSoundOn ? 'Sound On' : 'Sound Off'}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
