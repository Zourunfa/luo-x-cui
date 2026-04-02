import { useEffect, useRef } from 'react'
import { gsap } from '@/hooks/useGsap'
import type { TimelineItem } from '@/data/timeline-cuijian'

interface TimelineNodeProps {
  item: TimelineItem
  index: number
  variant: 'red' | 'blue'
}

export default function TimelineNode({ item, index, variant }: TimelineNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null)

  const isRed = variant === 'red'
  const accentColor = isRed ? 'text-cuijian-gold' : 'text-luoyonghao-silver'
  const dotColor = isRed ? 'bg-cuijian-red' : 'bg-luoyonghao-blue'
  const isLeft = index % 2 === 0

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!nodeRef.current) return

      gsap.from(nodeRef.current, {
        x: isLeft ? -80 : 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: nodeRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      })

      // Quote text highlight animation
      const quote = nodeRef.current.querySelector('.quote-text')
      if (quote) {
        gsap.from(quote, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: nodeRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    })

    return () => ctx.revert()
  }, [isLeft])

  return (
    <div
      ref={nodeRef}
      className={`relative flex items-start gap-6 md:gap-10 py-8 md:py-12 ${
        isLeft ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      {/* Timeline line and dot */}
      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[1px] bg-white/10" />
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${dotColor} z-10 shadow-lg`}
        style={{
          boxShadow: isRed
            ? '0 0 12px rgba(139, 0, 0, 0.6)'
            : '0 0 12px rgba(26, 26, 62, 0.8)',
        }}
      />

      {/* Content card */}
      <div
        className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}
      >
        <span
          className={`font-mono text-sm ${accentColor} tracking-wider font-semibold`}
        >
          {item.year}
        </span>
        <h3 className="font-serif-cn text-xl md:text-2xl mt-1 text-white/90 font-bold">
          {item.title}
        </h3>
      </div>

      {/* Spacer for center line */}
      <div className="w-2/12" />

      {/* Quote and description */}
      <div
        className={`w-5/12 ${isLeft ? 'text-left pl-8' : 'text-right pr-8'}`}
      >
        <blockquote
          className={`quote-text font-serif-cn text-lg md:text-xl italic ${accentColor} leading-relaxed`}
        >
          「{item.quote}」
        </blockquote>
        <p className="mt-3 text-sm md:text-base text-white/50 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  )
}
