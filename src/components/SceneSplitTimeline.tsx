import React, { useEffect, useRef } from 'react'
import { gsap } from '@/hooks/useGsap'
import { cuiJianTimeline } from '@/data/timeline-cuijian'
import { luoYonghaoTimeline } from '@/data/timeline-luoyonghao'

export default function SceneSplitTimeline() {
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

      const leftItems = sectionRef.current?.querySelectorAll('.timeline-left-item')
      leftItems?.forEach((item) => {
        gsap.from(item, {
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      const rightItems = sectionRef.current?.querySelectorAll('.timeline-right-item')
      rightItems?.forEach((item) => {
        gsap.from(item, {
          x: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      const divider = sectionRef.current?.querySelector('.center-divider-line')
      if (divider) {
        gsap.from(divider, {
          scaleY: 0,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const maxLen = Math.max(cuiJianTimeline.length, luoYonghaoTimeline.length)
  const pairs: { left: (typeof cuiJianTimeline)[number] | null; right: (typeof luoYonghaoTimeline)[number] | null }[] = []

  for (let i = 0; i < maxLen; i++) {
    pairs.push({
      left: i < cuiJianTimeline.length ? cuiJianTimeline[i] : null,
      right: i < luoYonghaoTimeline.length ? luoYonghaoTimeline[i] : null,
    })
  }

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background split */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-gradient-to-b from-bg via-[#0f0505] to-[#120808]" />
        <div className="w-1/2 bg-gradient-to-b from-bg via-[#080812] to-[#0a0a20]" />
      </div>

      <div className="relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 px-6">
          <span className="font-mono text-sm tracking-[0.5em] uppercase text-white/40">
            Parallel
          </span>
          <h2 className="font-serif-cn text-3xl md:text-5xl mt-4 text-white font-black">
            两条河
          </h2>
          <p className="text-white/30 mt-3 text-sm tracking-widest">
            不同的源头，相同的精神
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="w-8 h-[2px] bg-cuijian-red/60" />
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <div className="w-8 h-[2px] bg-luoyonghao-silver/30" />
          </div>
        </div>

        {/* Split timeline - centered container */}
        <div className="relative max-w-5xl mx-auto px-6 md:px-16" style={{margin: '0 auto'}}>
          {/* Center divider line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
            <div className="center-divider-line w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          </div>

          {/* Unified 3-column grid for consistent column widths */}
          <div className="grid grid-cols-[1fr_80px_1fr]">
            {pairs.map((pair, i) => {
              const isLast = i === pairs.length - 1

              return (
                <React.Fragment key={i}>
                  {/* Left column: Cui Jian */}
                  <div className="py-8 md:py-12 pr-4 md:pr-8">
                    {pair.left ? (
                      <div className="timeline-left-item text-right">
                        <h3 className="font-serif-cn text-lg md:text-2xl text-white/90 font-bold">
                          {pair.left.title}
                        </h3>
                        <blockquote className="mt-2 font-serif-cn text-sm md:text-lg italic text-cuijian-gold/80 leading-relaxed">
                          「{pair.left.quote}」
                        </blockquote>
                        <p className="mt-2 text-xs md:text-sm text-white/35 leading-relaxed">
                          {pair.left.description}
                        </p>
                      </div>
                    ) : null}
                  </div>

                  {/* Center column: dot + year */}
                  <div className="flex flex-col items-center py-8 md:py-12 relative">
                    <div
                      className="w-3 h-3 rounded-full bg-cuijian-red z-10 flex-shrink-0"
                      style={{ boxShadow: '0 0 10px rgba(139,0,0,0.5)' }}
                    />
                    <span className="mt-2 font-mono text-[10px] md:text-xs text-white/40 tracking-wider">
                      {pair.left?.year || pair.right?.year}
                    </span>
                    {isLast && (
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 rounded-full pointer-events-none"
                        style={{
                          background:
                            'radial-gradient(circle, rgba(245,230,200,0.15) 0%, rgba(245,230,200,0.05) 40%, transparent 70%)',
                        }}
                      />
                    )}
                  </div>

                  {/* Right column: Luo Yonghao */}
                  <div className="py-8 md:py-12 pl-4 md:pl-8">
                    {pair.right ? (
                      <div className="timeline-right-item text-left">
                        <h3 className="font-serif-cn text-lg md:text-2xl text-white/90 font-bold">
                          {pair.right.title}
                        </h3>
                        <blockquote className="mt-2 font-serif-cn text-sm md:text-lg italic text-luoyonghao-silver/80 leading-relaxed">
                          「{pair.right.quote}」
                        </blockquote>
                        <p className="mt-2 text-xs md:text-sm text-white/35 leading-relaxed">
                          {pair.right.description}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </React.Fragment>
              )
            })}
          </div>

          {/* Bottom hint */}
          <div className="text-center mt-12">
            <p className="font-serif-cn text-white/30 text-lg tracking-wider">
              两条河，终将汇入同一片海
            </p>
            <div className="mt-4 flex items-center justify-center gap-1">
              <div className="w-6 h-[1px] bg-cuijian-red/40" />
              <div className="w-3 h-3 rounded-full border border-convergence-light/30" />
              <div className="w-6 h-[1px] bg-luoyonghao-silver/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
