'use client'

import Image from 'next/image'

// Inner circle logos (Closer to center)
const innerLogos = [
    { src: '/gpt.png', alt: 'ChatGPT', size: 40 },
    { src: '/Claude_AI_symbol.svg.png', alt: 'Claude', size: 40 },
    { src: '/luma.png', alt: 'Luma', size: 40 },
]

// Outer circle logos (Further from center)
const outerLogos = [
    { src: '/elevenlabs.webp', alt: 'ElevenLabs', size: 40 },
    { src: '/flux.webp', alt: 'Flux', size: 40 },
    { src: '/synthesia-logo-hd.webp', alt: 'Synthesia', size: 100 }, // Synthesia logo is usually wide, maybe adjust
    { src: '/veo3.webp', alt: 'Veo3', size: 40 },
    { src: '/videogram.webp', alt: 'Videogram', size: 40 },
]

export default function OrbitSection() {
    return (
        <section className="py-24 bg-black overflow-hidden relative">
            {/* Background gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Potenciado por los mejores modelos de IA
                </h2>
                <p className="text-muted mb-16 max-w-2xl mx-auto">
                    Integramos las tecnologías más avanzadas para garantizar resultados de calidad profesional.
                </p>

                <div className="relative flex items-center justify-center h-[600px] w-full max-w-[800px] mx-auto">

                    {/* Center Content */}
                    <div className="absolute z-20 flex flex-col items-center justify-center p-6 bg-black/80 backdrop-blur-md rounded-full border border-primary/30 w-32 h-32 md:w-40 md:h-40 shadow-[0_0_30px_rgba(177,82,224,0.3)]">
                        <span className="text-3xl md:text-4xl mb-1">🧠</span>
                        <span className="font-bold text-white text-sm md:text-base">Adnova Core</span>
                    </div>

                    {/* Inner Orbit Ring */}
                    <div className="absolute inset-0 m-auto w-[280px] h-[280px] md:w-[350px] md:h-[350px] border border-white/10 rounded-full animate-orbit">
                        {innerLogos.map((logo, index) => {
                            // Calculate position on the circle
                            const angle = (360 / innerLogos.length) * index;
                            // We use transform directly on the container, but to place items we can use absolute + rotate
                            // But since the parent is animating (spinning), we just need to fix them at positions.
                            // Actually, placing them is tricky if we just rely on parent spin. 
                            // Better: Place them at specific angles using CSS, then let the parent spin.
                            return (
                                <div
                                    key={`inner-${index}`}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    style={{
                                        transform: `translate(-50%, -50%) rotate(${angle}deg) translate(140px) rotate(-${angle}deg)`,
                                        // translate(140px) implies radius. 280px width / 2 = 140px.
                                        // The second rotate cancels the first so item stays upright relative to orbit... 
                                        // BUT global parent is spinning.
                                        // To keep them upright while parent spins: Item needs 'animate-orbit-reverse'
                                    }}
                                >
                                    <div className="animate-orbit-reverse flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-card border border-white/10 rounded-full p-3 shadow-lg hover:scale-110 transition-transform hover:border-primary/50">
                                        <Image
                                            src={logo.src}
                                            alt={logo.alt}
                                            width={logo.size}
                                            height={logo.size}
                                            className="object-contain w-full h-full"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Outer Orbit Ring */}
                    <div className="absolute inset-0 m-auto w-[450px] h-[450px] md:w-[600px] md:h-[600px] border border-white/5 rounded-full animate-orbit-slow" style={{ animationDirection: 'reverse' }}>
                        {outerLogos.map((logo, index) => {
                            const angle = (360 / outerLogos.length) * index;
                            // Radius approx 225px (mobile) / 300px (desktop)
                            // Note: inline style for translate needs to be responsive or fixed to the ring size.
                            // Since ring size changes with media query, hardcoded translate in style might be off.
                            // Better approach: Use a wrapper for each item that is 100% height of ring, rotated, then item at top?
                            // Let's stick to the 'translate radius' method but we need consistent radius.
                            // Setup: The wrapper div IS the ring.
                            // So if we position absolute top-0 left-1/2, it's at the top edge.
                            // Then rotate the WRAPPER around the center.

                            return (
                                <div
                                    key={`outer-${index}`}
                                    className="absolute top-1/2 left-1/2"
                                    style={{
                                        height: '100%',
                                        // This div effectively spans the diameter if we set it right? No.
                                        // Better: wrapper positioned at center, rotated by Angle. 
                                        // Child positioned at distance R.
                                        transform: `rotate(${angle}deg) translate(225px) rotate(-${angle}deg)` // Mobile radius default
                                        // We will use CSS classes/variables for radius ideally, or just pick a safe middle ground.
                                        // On web: 300px. On mob: 225px.
                                        // Let's try a percentage based approach? 'translate(50%)' of the parent width?
                                        // parent is w-[450px] -> 50% is 225px. Perfect!
                                    }}
                                >
                                    {/* 
                      Correction: nested transforms are tricky.
                      If I rotate the parent div 45deg, the coordinate system rotates.
                      Then translate(50vw) moves it along that angled axis.
                      Then rotate(-45deg) untwists the child.
                      
                      AND the whole ring container `animate-orbit` is spinning.
                      
                      The `translate(50%)` approach works if the element width is defined relative to the parent?
                      No, translate % refers to the element's own box model usually.
                      
                      Let's stick to pixels for now, keeping it simpler.
                      The ring width is fixed in pixels (450/600).
                      I will output a specific simpler structure:
                      Container: Absolute Center.
                      Item: Absolute, style = transform: rotate(deg) translate(Radius px) rotate(-deg).
                      
                      Wait, radius depends on screen size (md:w-[600px] vs w-[450px]).
                      I can't easily put conditional logic inside the style tag for Tailwind breakpoints.
                      
                      Alternative: Use Tailwind classes for positioning:
                      `top-0 left-1/2 -translate-x-1/2` puts it at the top edge (12 o'clock).
                      Then I just need to rotate the container to spread them out?
                      
                      Let's try this:
                        1. The ring is the container.
                        2. Each item is a child `absolute top-1/2 left-1/2`.
                        3. Each item has a `style="custom-transform"`
                        4. But since I can't do media queries in inline styles easily...
                        
                      Okay, I'll allow a slight visual discrepancy on mobile vs desktop or just pick a size that fits both or use `min(..., ...)` logic if possible.
                      Actually, `translate(50%)` of the PARENT width would be `translate(100cqw)` if using container queries, but that's new.
                      
                      Let's use the standard CSS technique:
                      .item-wrapper {
                         position: absolute;
                         top: 50%;
                         left: 50%;
                         width: 100%;  <-- width of the ring diameter
                         height: 0;
                         transform: translate(-50%, -50%) rotate(var(--angle));
                      }
                      .item {
                         position: absolute;
                         right: 0; top: 0; transform: translate(50%, -50%);
                         // This puts it at the "End" of the diameter (Right edge)
                      }
                      
                      This relies on width=100% of parent. This is Responsive!
                   */}

                                    <div
                                        className="absolute top-1/2 left-1/2 w-full h-0 -translate-x-1/2 -translate-y-1/2"
                                        style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
                                    >
                                        <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2">
                                            {/* This item needs to counter-rotate the ORBIT animation AND the static placement rotation?
                             The static rotation `rotate(${angle}deg)` rotates the 'arm'. The item inside is upright relative to the screen IF we don't rotate it?
                             No, if I rotate the arm 90deg, the item at the end is also rotated 90deg.
                             So I need `rotate(-${angle}deg)`.
                             PLUS, the whole system is spinning via `animate-orbit-slow`.
                             So I also need `animate-orbit-slow-reverse`.
                         */}
                                            <div
                                                style={{ transform: `rotate(-${angle}deg)` }}
                                                className="animate-orbit-slow" // Countering the reverse orbit of the ring?
                                            // Ring: animate-orbit-slow (reverse)
                                            // To keep item upright: animate-orbit-slow (normal)
                                            >
                                                <div className="flex items-center justify-center w-14 h-14 md:w-20 md:h-20 bg-black/90 border border-white/20 rounded-full p-3 shadow-xl hover:scale-110 transition-transform hover:border-primary/50">
                                                    <Image
                                                        src={logo.src}
                                                        alt={logo.alt}
                                                        width={logo.size}
                                                        height={logo.size}
                                                        className="object-contain w-full h-full"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    )
}
