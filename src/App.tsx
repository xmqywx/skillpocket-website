/**
 * SkillPocket Website - Main App
 * 解构主义 / 实验激进 设计
 */

import { useEffect, useMemo } from 'react'
import { useSceneStore } from '@/stores/sceneStore'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

// Scenes - 移除了 Explode
import { Prologue, Collapse, Tear, Order, Download } from '@/components/scenes'

// Effects
import { Noise, Scanlines, WaveDistortion } from '@/components/effects'

// UI
import { Cursor } from '@/components/ui/Cursor'
import { Progress } from '@/components/ui/Progress'
import { Navigation } from '@/components/ui/Navigation'

// Styles
import '@/styles/globals.css'

// 场景配置 - 移除了 Explode，调整过渡区间
const SCENES = {
  collapse: { start: 0, end: 0.25, fadeOut: 0.20 },
  tear: { start: 0.18, end: 0.55, fadeIn: 0.20, fadeOut: 0.50 },
  order: { start: 0.48, end: 0.80, fadeIn: 0.52, fadeOut: 0.75 },
  download: { start: 0.72, end: 1, fadeIn: 0.75 },
}

function App() {
  // 启用平滑滚动
  useSmoothScroll()

  const scrollProgress = useScrollProgress()
  const {
    prologueComplete,
    setPrologueComplete,
    setScrollProgress,
    lowPerformanceMode,
  } = useSceneStore()

  // 同步滚动进度到 store
  useEffect(() => {
    setScrollProgress(scrollProgress)
  }, [scrollProgress, setScrollProgress])

  // 计算各场景进度 (0-1)
  const getSceneProgress = (start: number, end: number) => {
    if (scrollProgress < start) return 0
    if (scrollProgress > end) return 1
    return (scrollProgress - start) / (end - start)
  }

  // 计算场景透明度 - 使用平滑的淡入淡出
  const getSceneOpacity = (scene: keyof typeof SCENES) => {
    const config = SCENES[scene]
    const p = scrollProgress

    // 淡入
    if ('fadeIn' in config && config.fadeIn !== undefined) {
      if (p < config.fadeIn) return 0
      if (p < config.start + 0.05) {
        return (p - config.fadeIn) / (config.start + 0.05 - config.fadeIn)
      }
    } else if (p < config.start) {
      return 0
    }

    // 淡出
    if ('fadeOut' in config && config.fadeOut !== undefined) {
      if (p > config.end) return 0
      if (p > config.fadeOut) {
        return 1 - (p - config.fadeOut) / (config.end - config.fadeOut)
      }
    } else if (p > config.end) {
      return 0
    }

    return 1
  }

  // 场景进度和透明度 - 移除了 explode
  const scenes = useMemo(() => ({
    collapse: {
      progress: getSceneProgress(SCENES.collapse.start, SCENES.collapse.end),
      opacity: getSceneOpacity('collapse'),
    },
    tear: {
      progress: getSceneProgress(SCENES.tear.start, SCENES.tear.end),
      opacity: getSceneOpacity('tear'),
    },
    order: {
      progress: getSceneProgress(SCENES.order.start, SCENES.order.end),
      opacity: getSceneOpacity('order'),
    },
    download: {
      progress: getSceneProgress(SCENES.download.start, SCENES.download.end),
      opacity: getSceneOpacity('download'),
    },
  }), [scrollProgress])

  const handlePrologueComplete = () => {
    setPrologueComplete(true)
  }

  return (
    <div className="app">
      {/* 顶部导航菜单 (含语言切换器) */}
      <Navigation />

      {/* 自定义光标 */}
      <Cursor />

      {/* 全局效果层 */}
      {!lowPerformanceMode && (
        <>
          <Noise opacity={0.03} />
          <Scanlines opacity={0.05} />
          <WaveDistortion strength={35} maxRipples={6} />
        </>
      )}

      {/* 进度指示器 */}
      {prologueComplete && <Progress progress={scrollProgress} />}

      {/* 序幕 - 屏幕测试 */}
      {!prologueComplete && (
        <Prologue onComplete={handlePrologueComplete} />
      )}

      {/* 主内容 - 滚动驱动 */}
      {prologueComplete && (
        <main className="main-content">
          {/* 占位高度用于滚动 - 减少到 500vh (移除了 Explode 场景) */}
          <div style={{ height: '500vh' }}>
            {/* 第一幕：文字崩塌 */}
            <section
              className="scene-container"
              style={{
                opacity: scenes.collapse.opacity,
                pointerEvents: scenes.collapse.opacity > 0.1 ? 'auto' : 'none',
              }}
            >
              <Collapse progress={scenes.collapse.progress} />
            </section>

            {/* 第二幕：功能展示 */}
            <section
              className="scene-container"
              style={{
                opacity: scenes.tear.opacity,
                pointerEvents: scenes.tear.opacity > 0.1 ? 'auto' : 'none',
              }}
            >
              <Tear progress={scenes.tear.progress} />
            </section>

            {/* 第三幕：秩序降临 */}
            <section
              className="scene-container"
              style={{
                opacity: scenes.order.opacity,
                pointerEvents: scenes.order.opacity > 0.1 ? 'auto' : 'none',
              }}
            >
              <Order progress={scenes.order.progress} />
            </section>

            {/* 第四幕：下载 */}
            <section
              className="scene-container"
              style={{
                opacity: scenes.download.opacity,
                pointerEvents: scenes.download.opacity > 0.1 ? 'auto' : 'none',
              }}
            >
              <Download progress={scenes.download.progress} />
            </section>
          </div>
        </main>
      )}
    </div>
  )
}

export default App
