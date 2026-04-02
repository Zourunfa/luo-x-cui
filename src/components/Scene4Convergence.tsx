import { useEffect, useRef } from 'react'
import { gsap } from '@/hooks/useGsap'

export default function Scene4Convergence() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineLeftRef = useRef<SVGLineElement>(null)
  const lineRightRef = useRef<SVGLineElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left line draws in from left
      gsap.from(lineLeftRef.current, {
        attr: { x2: 0 },
        duration: 2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'center center',
          scrub: 1,
        },
      })

      // Right line draws in from right
      gsap.from(lineRightRef.current, {
        attr: { x2: 800 },
        duration: 2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'center center',
          scrub: 1,
        },
      })

      // Center glow
      gsap.from(glowRef.current, {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center 70%',
          toggleActions: 'play none none reverse',
        },
      })

      // Main text reveal
      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c1a] via-bg to-bg" />

      {/* SVG Lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid meet"
      >
        <line
          ref={lineLeftRef}
          x1="0"
          y1="200"
          x2="400"
          y2="200"
          stroke="#8B0000"
          strokeWidth="2"
          opacity="0.8"
        />
        <line
          ref={lineRightRef}
          x1="800"
          y1="200"
          x2="400"
          y2="200"
          stroke="#c0c0d0"
          strokeWidth="2"
          opacity="0.5"
        />
      </svg>

      {/* Center glow */}
      <div
        ref={glowRef}
        className="absolute w-40 h-40 md:w-64 md:h-64 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(212,165,116,0.3) 0%, rgba(212,165,116,0.1) 40%, transparent 70%)',
        }}
      />

      {/* Text content */}
      <div ref={textRef}  className="relative z-10 text-center px-6">
        <h2 className="font-serif-cn text-3xl md:text-5xl lg:text-7xl font-black text-white leading-tight">
          当理想主义
          <br />
          <span className="text-convergence-light">遇到摇滚精神</span>
        </h2>
        <p className="mt-8 text-white/40 font-serif-cn text-lg md:text-xl tracking-wider">
          两条河，终将汇入同一片海
        </p>

        {/* Two names meeting */}
        <div className="mt-16 flex items-center justify-center gap-8 md:gap-16">
          <div className="text-right">
            <p className="font-serif-cn text-2xl md:text-4xl text-cuijian-red font-bold">
              崔健
            </p>
            <p className="text-white/30 text-xs mt-1 tracking-wider">
              摇滚 · 不妥协
            </p>
          </div>
          <div className="w-[1px] h-12 bg-white/20" />
          <div className="text-left">
            <p className="font-serif-cn text-2xl md:text-4xl text-luoyonghao-silver font-bold">
              罗永浩
            </p>
            <p className="text-white/30 text-xs mt-1 tracking-wider">
              理想 · 认真到底
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
