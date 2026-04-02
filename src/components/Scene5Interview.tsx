import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/hooks/useGsap'

const quotes = [
  { text: '我曾经问个不休，你何时跟我走', author: '崔健' },
  { text: '我不是为了输赢，我就是认真', author: '罗永浩' },
  { text: '我要从南走到北，我还要从白走到黑', author: '崔健' },
  { text: '彪悍的人生不需要解释', author: '罗永浩' },
  { text: '现实像个石头，精神像个蛋', author: '崔健' },
  { text: '欠债还钱，天经地义', author: '罗永浩' },
]

export default function Scene5Interview() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const [currentQuote, setCurrentQuote] = useState(0)

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

  // Auto-cycle quotes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 bg-bg" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center justify-center min-h-screen">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="text-convergence-light/60 font-mono text-sm tracking-[0.5em] uppercase">
            The Interview
          </span>
          <h2 className="font-serif-cn text-3xl md:text-5xl mt-4 text-white font-black">
            对话
          </h2>
          <div className="mt-6 w-16 h-[2px] bg-convergence-light/30 mx-auto" />
        </div>

        {/* Quote carousel */}
        <div className="text-center mb-12 min-h-[120px] flex items-center justify-center">
          <div key={currentQuote} className="animate-fade-in">
            <blockquote className="font-serif-cn text-xl md:text-2xl italic text-convergence-light leading-relaxed">
              「{quotes[currentQuote].text}」
            </blockquote>
            <p className="mt-4 text-white/40 text-sm">
              — {quotes[currentQuote].author}
            </p>
          </div>
        </div>

        {/* Quote indicators */}
        <div className="flex justify-center gap-2 mb-16">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQuote(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentQuote
                  ? 'bg-convergence-light w-6'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center font-serif-cn text-white/25 text-sm tracking-wider">
          献给两位不妥协的理想主义者
        </div>
      </div>
    </section>
  )
}
