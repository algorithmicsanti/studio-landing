'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { SparklesIcon } from '@heroicons/react/24/outline'
import { PauseIcon, PlayIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'
import OrbitSection from '@/components/orbit-section'

// Videos used by the ComputerSection (module scope to keep useEffect stable)
const videos = [
  '/VIDEO%20SEARS.mp4',      // Plays once first
  '/VIDEO%20LG%20TRUE%20WIRELESS.mp4',
  '/VIDEO%20INBODY.mp4',
  '/VIDEO%20RENOPARTES%20MECATRONICA%200BH.mp4',
  '/VIDEO%20LIVERPOOL.mp4',
]

export default function Home() {
  const [demoStep, setDemoStep] = useState(0)
  const [demoFormData, setDemoFormData] = useState({
    email: '',
    fullName: '',
    phone: '',
    company: '',
  })
  
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
    <div className="min-h-screen bg-background text-foreground flex flex-col -mt-16 md:-mt-10">

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Full Screen Video Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            className="w-full h-full object-cover scale-[1.02]"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/audi-hero.mp4" type="video/mp4" />
          </video>
          {/* Overlay to darken video for text readability */}
          <div className="absolute inset-0 bg-black/50 z-10" />
        </div>

        {/* Content Container */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center mt-32">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            Producción de
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-white">
              Video Ads con IA
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 drop-shadow-md">
            Crea anuncios de video para tu producto, marca o servicio <br /> en días, no semanas.
          </p>

          <Link
            href="#pricing"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-primary rounded-xl hover:bg-primary-dark hover:scale-105 shadow-[0_0_30px_rgba(177,82,224,0.5)] border border-primary-light/20"
            onClick={(e) => {
              e.preventDefault()
              // Scroll to pricing section
              setTimeout(() => {
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
              }, 100)
            }}
          >
            <SparklesIcon className="h-5 w-5 mr-2" />
            Comenzar Ahora
          </Link>
        </div>
      </section>

      {/* Orbit Section - moved to be second on the page */}
      <OrbitSection />


      {/* IA + Editores en el Workflow - sección de ancho completo con fondo negro */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">IA + Editores en el Workflow de Producción</h3>
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
              Ejemplos de nuestro trabajo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Video Composer */}
            <div className="bg-card border border-border rounded-2xl p-4 hover:border-primary/50 transition-all group overflow-hidden">
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
            <div className="bg-card border border-border rounded-2xl p-4 hover:border-primary/50 transition-all group overflow-hidden">
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
            <div className="bg-card border border-border rounded-2xl p-4 hover:border-primary/50 transition-all group overflow-hidden">
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
            <div className="bg-card border border-border rounded-2xl p-4 hover:border-primary/50 transition-all group overflow-hidden">
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
      <section id="pricing" className="py-24 px-6 border-t border-border relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Planes y Precios</h2>
            <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto">
              Nuestros paquetes se ajustan a tus necesidades.
              <br />
              Podemos entregarte desde 5 hasta 50 videos por mes.
            </p>
          </div>

          <div className="flex gap-4 justify-center mb-12 max-w-2xl mx-auto">
            {demoStep === 0 ? (
              // Step 0: Email input
              <div className="flex gap-3 w-full bg-card/50 backdrop-blur-xl border border-border rounded-full p-2 shadow-lg">
                <input
                  type="email"
                  placeholder="Ingresa tu correo empresarial"
                  value={demoFormData.email}
                  onChange={(e) => setDemoFormData({ ...demoFormData, email: e.target.value })}
                  className="flex-1 bg-transparent border-0 px-6 py-3 text-foreground placeholder:text-muted/60 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => {
                    if (demoFormData.email.includes('@') && demoFormData.email.length > 0) {
                      setDemoStep(1)
                    } else {
                      alert('Por favor ingresa un correo válido')
                    }
                  }}
                  className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
                >
                  Solicitar Demo
                </button>
              </div>
            ) : (
              // Steps 1-5: Form fields
              <div className="w-full max-w-2xl space-y-6">
                <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-lg">
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="w-full h-1 bg-border rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-300"
                        style={{ width: `${(demoStep / 4) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted">Paso {demoStep} de 3</p>
                  </div>

                  {/* Step 1: Full Name */}
                  {demoStep === 1 && (
                    <div className="animate-fadeIn space-y-4">
                      <label className="block text-lg font-medium text-foreground">¿Cuál es tu nombre completo?</label>
                      <input
                        type="text"
                        placeholder="Juan Pérez"
                        value={demoFormData.fullName}
                        onChange={(e) => setDemoFormData({ ...demoFormData, fullName: e.target.value })}
                        className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        autoFocus
                      />
                    </div>
                  )}

                  {/* Step 2: Phone */}
                  {demoStep === 2 && (
                    <div className="animate-fadeIn space-y-4">
                      <label className="block text-lg font-medium text-foreground">¿Cuál es tu teléfono?</label>
                      <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all">
                        <span className="text-muted">🇲🇽 +52</span>
                        <input
                          type="tel"
                          placeholder="1234567890"
                          value={demoFormData.phone}
                          onChange={(e) => setDemoFormData({ ...demoFormData, phone: e.target.value })}
                          className="flex-1 bg-transparent border-0 text-foreground placeholder:text-muted focus:outline-none"
                          autoFocus
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Company */}
                  {demoStep === 3 && (
                    <div className="animate-fadeIn space-y-4">
                      <label className="block text-lg font-medium text-foreground">¿En qué empresa trabajas?</label>
                      <input
                        type="text"
                        placeholder="Nombre de la empresa"
                        value={demoFormData.company}
                        onChange={(e) => setDemoFormData({ ...demoFormData, company: e.target.value })}
                        className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        autoFocus
                      />
                    </div>
                  )}

                  {/* Step 4: Success Message */}
                  {demoStep === 4 && (
                    <div className="animate-fadeIn text-center py-4 space-y-4">
                      <div className="text-5xl mb-4">✓</div>
                      <h3 className="text-2xl font-bold text-foreground">¡Gracias!</h3>
                      <p className="text-muted">Nos pondremos en contacto pronto para mostrate todo lo que puedes hacer con Adnova Studio.</p>
                    </div>
                  )}

                  {/* Buttons */}
                  {demoStep < 4 && (
                    <div className="flex gap-3 mt-8">
                      <button
                        onClick={() => setDemoStep(Math.max(0, demoStep - 1))}
                        disabled={demoStep === 1}
                        className="px-6 py-3 bg-muted/10 text-muted disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/20 rounded-lg font-medium transition-all"
                      >
                        ← Atrás
                      </button>
                      <button
                        onClick={() => {
                          if (demoStep === 3) {
                            // Submit form
                            const submitForm = async () => {
                              try {
                                const response = await fetch('/api/contact', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({
                                    ...demoFormData,
                                    to: 'sales@adnova.studio'
                                  }),
                                })
                                if (response.ok) {
                                  setDemoStep(4)
                                  setTimeout(() => {
                                    setDemoStep(0)
                                    setDemoFormData({
                                      email: '',
                                      fullName: '',
                                      phone: '',
                                      company: '',
                                    })
                                  }, 3000)
                                }
                              } catch (error) {
                                console.error(error)
                                alert('Hubo un error. Intenta de nuevo.')
                              }
                            }
                            submitForm()
                          } else {
                            setDemoStep(demoStep + 1)
                          }
                        }}
                        disabled={
                          (demoStep === 1 && !demoFormData.fullName) ||
                          (demoStep === 2 && !demoFormData.phone) ||
                          (demoStep === 3 && !demoFormData.company)
                        }
                        className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        {demoStep === 3 ? 'Enviar' : 'Siguiente →'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
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
