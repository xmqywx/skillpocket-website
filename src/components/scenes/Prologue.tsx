/**
 * 序幕：屏幕测试
 * - 老电视信号、闪烁、噪声
 * - 快速闪过的乱码文字
 * - > SYSTEM READY_
 */

import { useRef, useEffect } from 'react'
import { useSceneStore } from '@/stores/sceneStore'

interface PrologueProps {
  onComplete?: () => void
}

export function Prologue({ onComplete }: PrologueProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const setCurrentScene = useSceneStore((state) => state.setCurrentScene)

  useEffect(() => {
    // TODO: 实现屏幕测试动画
    // 1. CRT 开机效果
    // 2. 扫描线
    // 3. 随机噪点
    // 4. 乱码文字闪烁
    // 5. "SYSTEM READY_" 打字效果
  }, [])

  const handleInteraction = () => {
    setCurrentScene('collapse')
    onComplete?.()
  }

  return (
    <section
      ref={containerRef}
      className="scene scene--prologue"
      onClick={handleInteraction}
      onWheel={handleInteraction}
    >
      {/* CRT 效果层 */}
      <div className="crt-overlay" />

      {/* 噪点层 */}
      <div className="noise-overlay" />

      {/* 扫描线层 */}
      <div className="scanline-overlay" />

      {/* 主内容 */}
      <div className="prologue-content">
        <span className="system-text">&gt; SYSTEM READY_</span>
      </div>

      {/* 提示 */}
      <div className="prologue-hint">
        <span>[ ANY KEY TO CONTINUE ]</span>
      </div>
    </section>
  )
}

export default Prologue
