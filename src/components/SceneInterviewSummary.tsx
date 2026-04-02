import { useEffect, useRef } from 'react'
import { gsap } from '@/hooks/useGsap'

export default function SceneInterviewSummary() {
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
      className="relative py-24 md:py-32 overflow-hidden w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-[#0d0d0d] to-bg" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="text-convergence-light/50 font-mono text-sm tracking-[0.5em] uppercase">
            Highlights
          </span>
          <h2 className="font-serif-cn text-3xl md:text-5xl mt-4 text-white font-black">
            访谈精华
          </h2>
          <p className="text-white/30 mt-3 text-sm tracking-wider">
            四个话题，一场跨越时代的对话
          </p>
          <div className="mt-6 w-16 h-[2px] bg-convergence-light/20 mx-auto" />
        </div>

        {/* Pending — interview not yet conducted */}
        <div className="text-center mt-10">
          <p className="font-serif-cn text-white/30 text-lg tracking-widest">待定</p>
          <p className="text-white/15 text-sm mt-2">访谈尚未进行，敬请期待</p>
        </div>
      </div>
    </section>
  )
}
