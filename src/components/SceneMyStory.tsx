import { useEffect, useRef } from 'react'
import { gsap } from '@/hooks/useGsap'

export default function SceneMyStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)

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

      gsap.from(storyRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-[#0d0d0d] to-bg" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12">
          <span className="text-convergence-light/50 font-mono text-sm tracking-[0.5em] uppercase">
            My Story
          </span>
          <h2 className="font-serif-cn text-3xl md:text-5xl mt-4 text-white font-black">
            我和两位名人的故事
          </h2>
          <div className="mt-6 w-16 h-[2px] bg-convergence-light/20 mx-auto" />
        </div>

        {/* Story content */}
        <div ref={storyRef} className="space-y-8">
          {/* 崔健部分 */}
          <div className="p-6 md:p-8 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-cuijian-red" />
              <h3 className="font-serif-cn text-lg md:text-xl text-white/80 font-bold">
                花房姑娘与吉他
              </h3>
            </div>
            <p className="font-serif-cn text-white/50 leading-[1.9] text-sm md:text-base">
              花房姑娘这首歌可以说贯穿我27岁人生，从13岁刚上县城初中，懵懂的年纪，刚听到这首歌就被击中，指着大海的方向的精神一直鼓舞着我。15岁得到人生的第一把吉他，会弹唱的第一首歌就是花房姑娘。21在大学门口弹唱了这首歌（主页有视频），去杭州实习干程序员，后面在杭州的西溪湿地里面、在深圳的红树林里面都响彻过我花房姑娘的歌声。这首歌和崔健让我爱上吉他，后面在漂泊的岁月又爱上blues即兴，真正爱上音乐。
            </p>
          </div>

          {/* 罗永浩部分 */}
          <div className="p-6 md:p-8 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-luoyonghao-silver" />
              <h3 className="font-serif-cn text-lg md:text-xl text-white/80 font-bold">
                深夜的相声与成长
              </h3>
            </div>
            <p className="font-serif-cn text-white/50 leading-[1.9] text-sm md:text-base">
              毕业后的很长一段在外漂泊的岁月，压力大的时候经常失眠，睡前都会听老罗的相声。有讽刺、心酸、不服输、不认命的诙谐的语言一遍遍激励着我，使我成长。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
