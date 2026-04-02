import { useLenis } from '@/hooks/useLenis'
import { useGsapInit } from '@/hooks/useGsap'
import Scene1Opening from '@/components/Scene1Opening'
import SceneSplitTimeline from '@/components/SceneSplitTimeline'
import Scene4Convergence from '@/components/Scene4Convergence'
import SceneMyStory from '@/components/SceneMyStory'
// import SceneInterviewSummary from '@/components/SceneInterviewSummary'
// import Scene5Interview from '@/components/Scene5Interview'
import Scene6Ending from '@/components/Scene6Ending'

export default function App() {
  useLenis()
  useGsapInit()

  return (
    <div className="bg-bg min-h-screen">
      <div className="grain-overlay" />
      <main>
        <Scene1Opening />
        <SceneSplitTimeline />
        <SceneMyStory />
        <Scene4Convergence />
        {/* <SceneInterviewSummary />
        <Scene5Interview /> */}
        <Scene6Ending />
      </main>
    </div>
  )
}
