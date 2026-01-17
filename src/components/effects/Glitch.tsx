/**
 * Glitch 故障效果组件
 * - RGB 分离
 * - 随机位移
 * - 闪烁
 */

import { useRef, useEffect } from 'react'
import type { ReactNode } from 'react'

interface GlitchProps {
  children: ReactNode
  intensity?: number // 0-1 强度
  active?: boolean
  className?: string
}

export function Glitch({
  children,
  intensity = 0.5,
  active = true,
  className = '',
}: GlitchProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active || !containerRef.current) return

    // TODO: 实现 GSAP 或 CSS 动画
    // 1. 随机触发 glitch
    // 2. RGB 分离偏移
    // 3. 位置抖动
    // 4. 透明度闪烁

    const element = containerRef.current

    // 临时 CSS 变量控制
    element.style.setProperty('--glitch-intensity', String(intensity))

    return () => {
      element.style.removeProperty('--glitch-intensity')
    }
  }, [active, intensity])

  return (
    <div
      ref={containerRef}
      className={`glitch-wrapper ${active ? 'glitch-active' : ''} ${className}`}
      data-text={typeof children === 'string' ? children : undefined}
    >
      {/* 主内容 */}
      <div className="glitch-content">{children}</div>

      {/* RGB 分离层 */}
      {active && (
        <>
          <div className="glitch-layer glitch-layer--r" aria-hidden="true">
            {children}
          </div>
          <div className="glitch-layer glitch-layer--b" aria-hidden="true">
            {children}
          </div>
        </>
      )}
    </div>
  )
}

export default Glitch
