import { useEffect, useRef } from 'react'
import { gsap } from '@/hooks/useGsap'

export default function Scene6Ending() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bg to-[#0d0808]" />

      <div ref={contentRef} className="relative z-10 text-center px-6">
        {/* Final quote */}
        <blockquote className="font-serif-cn text-2xl md:text-4xl lg:text-5xl text-white/80 leading-relaxed max-w-3xl mx-auto">
          我要从南走到北
          <br />
          <span className="text-cuijian-gold">我还要从白走到黑</span>
        </blockquote>

        <div className="mt-12 w-12 h-[1px] bg-white/20 mx-auto" />

        <p className="mt-8 font-serif-cn text-lg md:text-xl text-white/40 tracking-wider">
          献给所有还在路上的人
        </p>

        <div className="mt-16 flex items-center justify-center gap-4 text-white/20 text-sm">
          <span>崔健 × 罗永浩</span>
          <span>·</span>
          <span>致敬站</span>
        </div>
      </div>
    </section>
  )
}
