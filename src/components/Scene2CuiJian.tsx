import { useEffect, useRef } from 'react'
import { gsap } from '@/hooks/useGsap'
import TimelineNode from './TimelineNode'
import { cuiJianTimeline } from '@/data/timeline-cuijian'

export default function Scene2CuiJian() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
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
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-[#0f0505] to-[#120808]" />

      {/* Decorative red line on the side */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-cuijian-red/30 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-20">
          <span className="text-cuijian-red font-mono text-sm tracking-[0.5em] uppercase">
            Chapter 01
          </span>
          <h2 className="font-serif-cn text-4xl md:text-6xl mt-4 text-white font-black">
            崔健
          </h2>
          <p className="text-white/40 mt-3 text-sm tracking-widest">
            中国摇滚之父 · 用音乐撕裂时代
          </p>
          <div className="mt-6 w-16 h-[2px] bg-cuijian-red mx-auto" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {cuiJianTimeline.map((item, index) => (
            <TimelineNode
              key={item.year}
              item={item}
              index={index}
              variant="red"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
