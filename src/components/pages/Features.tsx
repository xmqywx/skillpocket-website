/**
 * 第2页：功能展示
 * Bento Grid 布局 + 自动播放动画
 */

import { useEffect, useState } from 'react'
import { useTranslation } from '@/i18n'
import { IconMySkills, IconIcons, IconSearch, IconFolder } from '@/components/ui/Icons'

interface FeaturesProps {
  state: 'hidden' | 'entering' | 'complete'
}

const BASE_URL = import.meta.env.BASE_URL || '/'

const APP_SCREENSHOTS = [
  { id: 'myskills', src: `${BASE_URL}screenshots/myskills.png`, title: 'My Skills' },
  { id: 'icons', src: `${BASE_URL}screenshots/icons.png`, title: 'Icons' },
  { id: 'setting', src: `${BASE_URL}screenshots/setting.png`, title: 'Settings' },
]

export function Features({ state }: FeaturesProps) {
  const { t } = useTranslation()
  const [animationPhase, setAnimationPhase] = useState(0)
  const [activeScreenshot, setActiveScreenshot] = useState(0)

  // 动画序列
  useEffect(() => {
    if (state === 'entering') {
      setAnimationPhase(0)
      const t1 = setTimeout(() => setAnimationPhase(1), 200)
      const t2 = setTimeout(() => setAnimationPhase(2), 500)
      const t3 = setTimeout(() => setAnimationPhase(3), 800)
      const t4 = setTimeout(() => setAnimationPhase(4), 1100)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
        clearTimeout(t4)
      }
    } else if (state === 'complete') {
      setAnimationPhase(4)
    }
  }, [state])

  // 截图轮播
  useEffect(() => {
    if (state === 'complete' || animationPhase >= 3) {
      const interval = setInterval(() => {
        setActiveScreenshot(prev => (prev + 1) % APP_SCREENSHOTS.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [state, animationPhase])

  const features = [
    { id: 'skills', Icon: IconMySkills, title: t.tear.features.skills.title, desc: t.tear.features.skills.description },
    { id: 'icons', Icon: IconIcons, title: t.tear.features.icons.title, desc: t.tear.features.icons.description },
    { id: 'search', Icon: IconSearch, title: t.tear.features.search.title, desc: t.tear.features.search.description },
    { id: 'organize', Icon: IconFolder, title: t.tear.features.organize.title, desc: t.tear.features.organize.description },
  ]

  return (
    <div className="features-page">
      <div
        className="features-container"
        style={{
          opacity: animationPhase >= 1 ? 1 : 0,
          transform: animationPhase >= 1 ? 'translateY(0)' : 'translateY(40px)',
        }}
      >
        {/* 标题 */}
        <header className="features-header">
          <span
            className="features-eyebrow"
            style={{
              opacity: animationPhase >= 1 ? 1 : 0,
              transform: animationPhase >= 1 ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            {t.tear.subtitle}
          </span>
          <h2
            className="features-title"
            style={{
              opacity: animationPhase >= 2 ? 1 : 0,
              transform: animationPhase >= 2 ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            {t.tear.title}
          </h2>
        </header>

        {/* Bento Grid */}
        <div className="bento-grid">
          {/* 截图卡片 */}
          <div
            className="bento-card bento-card--large"
            style={{
              opacity: animationPhase >= 3 ? 1 : 0,
              transform: animationPhase >= 3 ? 'scale(1)' : 'scale(0.95)',
            }}
          >
            <div className="bento-screenshot">
              {APP_SCREENSHOTS.map((screenshot, index) => (
                <img
                  key={screenshot.id}
                  src={screenshot.src}
                  alt={screenshot.title}
                  className={`bento-screenshot-img ${index === activeScreenshot ? 'is-active' : ''}`}
                />
              ))}
            </div>
            <div className="bento-screenshot-nav">
              {APP_SCREENSHOTS.map((screenshot, index) => (
                <button
                  key={screenshot.id}
                  className={`bento-nav-dot ${index === activeScreenshot ? 'is-active' : ''}`}
                  onClick={() => setActiveScreenshot(index)}
                  aria-label={screenshot.title}
                />
              ))}
            </div>
          </div>

          {/* 功能卡片 */}
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="bento-card bento-card--feature"
              style={{
                opacity: animationPhase >= 4 ? 1 : 0,
                transform: animationPhase >= 4 ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              <div className="bento-feature-icon">
                <feature.Icon size={32} />
              </div>
              <h3 className="bento-feature-title">{feature.title}</h3>
              <p className="bento-feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
