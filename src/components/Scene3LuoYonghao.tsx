import { useEffect, useRef } from 'react'
import { gsap } from '@/hooks/useGsap'
import TimelineNode from './TimelineNode'
import { luoYonghaoTimeline } from '@/data/timeline-luoyonghao'

export default function Scene3LuoYonghao() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
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
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080812] via-[#0a0a20] to-[#0c0c1a]" />

      {/* Decorative blue line */}
      <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-luoyonghao-blue/50 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-20">
          <span className="text-luoyonghao-silver/60 font-mono text-sm tracking-[0.5em] uppercase">
            Chapter 02
          </span>
          <h2 className="font-serif-cn text-4xl md:text-6xl mt-4 text-white font-black">
            罗永浩
          </h2>
          <p className="text-white/40 mt-3 text-sm tracking-widest">
            理想主义者的征途 · 认真到底
          </p>
          <div className="mt-6 w-16 h-[2px] bg-luoyonghao-silver/50 mx-auto" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {luoYonghaoTimeline.map((item, index) => (
            <TimelineNode
              key={item.year}
              item={item}
              index={index}
              variant="blue"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
