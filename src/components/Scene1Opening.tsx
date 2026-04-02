import { useEffect, useRef } from 'react'
import { gsap } from '@/hooks/useGsap'

export default function Scene1Opening() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in characters one by one
      const chars = titleRef.current?.querySelectorAll('.char')
      if (!chars) return

      gsap.set(chars, { opacity: 0, y: 40 })
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.5,
      })

      // Parallax on scroll out
      gsap.to(titleRef.current, {
        y: -150,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const line1 = '我曾经问个不休'.split('')
  const line2 = '你何时跟我走'.split('')
  const line3 = '可你却总是笑我'.split('')
  const line4 = '一无所有'.split('')

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Subtle particle background */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-cuijian-gold/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div ref={titleRef} className="text-center z-10 px-6">
        <div className="font-serif-cn text-3xl md:text-5xl lg:text-6xl leading-relaxed tracking-widest">
          <div className="mb-4">
            {line1.map((char, i) => (
              <span key={i} className="char inline-block text-cuijian-gold">
                {char}
              </span>
            ))}
          </div>
          <div className="mb-4">
            {line2.map((char, i) => (
              <span key={i} className="char inline-block text-white/90">
                {char}
              </span>
            ))}
          </div>
          <div className="mb-4">
            {line3.map((char, i) => (
              <span key={i} className="char inline-block text-white/60">
                {char}
              </span>
            ))}
          </div>
          <div className="mt-8">
            {line4.map((char, i) => (
              <span
                key={i}
                className="char inline-block text-cuijian-red text-5xl md:text-7xl lg:text-8xl font-black"
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-12 text-white/30 text-sm tracking-[0.3em] font-serif-cn">
          — 崔健 · 1986
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
        <span className="text-xs tracking-widest">SCROLL</span>
        <div className="w-[1px] h-8 bg-white/20 animate-pulse" />
      </div>
    </section>
  )
}
