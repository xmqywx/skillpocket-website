/**
 * 第1页：首页
 * 艺术动画 + 品牌标题
 */

import { useEffect, useState } from 'react'
import { useTranslation } from '@/i18n'

interface LandingProps {
  state: 'hidden' | 'entering' | 'complete'
}

export function Landing({ state }: LandingProps) {
  const { t } = useTranslation()
  const [animationPhase, setAnimationPhase] = useState(0)

  // 动画序列
  useEffect(() => {
    if (state === 'entering' || state === 'complete') {
      // 阶段1: 标题出现
      const t1 = setTimeout(() => setAnimationPhase(1), 300)
      // 阶段2: 副标题出现
      const t2 = setTimeout(() => setAnimationPhase(2), 800)
      // 阶段3: 完全显示
      const t3 = setTimeout(() => setAnimationPhase(3), 1300)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
      }
    }
  }, [state])

  return (
    <div className="landing">
      {/* 主标题 */}
      <div className={`landing-content ${animationPhase >= 1 ? 'is-visible' : ''}`}>
        <h1 className="landing-title">
          <span className="title-word">
            {'SKILL'.split('').map((char, i) => (
              <span
                key={i}
                className="title-char"
                style={{
                  animationDelay: `${i * 0.08}s`,
                  opacity: animationPhase >= 1 ? 1 : 0,
                  transform: animationPhase >= 1 ? 'translateY(0)' : 'translateY(40px)',
                }}
              >
                {char}
              </span>
            ))}
          </span>
          <span className="title-word title-word--accent">
            {'POCKET'.split('').map((char, i) => (
              <span
                key={i}
                className="title-char"
                style={{
                  animationDelay: `${(i + 5) * 0.08}s`,
                  opacity: animationPhase >= 1 ? 1 : 0,
                  transform: animationPhase >= 1 ? 'translateY(0)' : 'translateY(40px)',
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        {/* 副标题 */}
        <p
          className="landing-subtitle"
          style={{
            opacity: animationPhase >= 2 ? 1 : 0,
            transform: animationPhase >= 2 ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {t.landing?.subtitle || 'Your Personal Skill Manager'}
        </p>

        {/* 描述 */}
        <p
          className="landing-desc"
          style={{
            opacity: animationPhase >= 3 ? 1 : 0,
            transform: animationPhase >= 3 ? 'translateY(0)' : 'translateY(15px)',
          }}
        >
          {t.landing?.desc || 'Manage, organize, and master your development skills'}
        </p>
      </div>

      {/* 装饰元素 */}
      <div className="landing-decoration">
        <div
          className="decoration-line decoration-line--left"
          style={{ opacity: animationPhase >= 2 ? 0.3 : 0 }}
        />
        <div
          className="decoration-line decoration-line--right"
          style={{ opacity: animationPhase >= 2 ? 0.3 : 0 }}
        />
      </div>
    </div>
  )
}

export default Landing
