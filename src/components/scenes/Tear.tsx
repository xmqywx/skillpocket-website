/**
 * 第二幕：功能展示
 * - 现代 Bento Grid 布局
 * - 优雅的渐入动画
 * - 突出应用截图展示
 */

import { useRef, useMemo, useState, useEffect } from 'react'
import { useTranslation } from '@/i18n'
import { IconMySkills, IconIcons, IconSearch, IconFolder } from '@/components/ui/Icons'

interface TearProps {
  progress: number
}

// 获取 base URL
const BASE_URL = import.meta.env.BASE_URL || '/'

// 应用截图数据
const APP_SCREENSHOTS = [
  { id: 'myskills', src: `${BASE_URL}screenshots/myskills.png`, title: 'My Skills' },
  { id: 'icons', src: `${BASE_URL}screenshots/icons.png`, title: 'Icons' },
  { id: 'setting', src: `${BASE_URL}screenshots/setting.png`, title: 'Settings' },
]

export function Tear({ progress }: TearProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const [activeScreenshot, setActiveScreenshot] = useState(0)

  // 自动轮播截图
  useEffect(() => {
    if (progress > 0.2) {
      const interval = setInterval(() => {
        setActiveScreenshot(prev => (prev + 1) % APP_SCREENSHOTS.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [progress])

  // 功能数据 - 简化
  const features = useMemo(() => [
    { id: 'skills', Icon: IconMySkills, title: t.tear.features.skills.title, desc: t.tear.features.skills.description },
    { id: 'icons', Icon: IconIcons, title: t.tear.features.icons.title, desc: t.tear.features.icons.description },
    { id: 'search', Icon: IconSearch, title: t.tear.features.search.title, desc: t.tear.features.search.description },
    { id: 'organize', Icon: IconFolder, title: t.tear.features.organize.title, desc: t.tear.features.organize.description },
  ], [t])

  // 动画进度计算
  const opacity = Math.min(1, progress * 2.5)
  const translateY = (1 - Math.min(1, progress * 2)) * 40

  return (
    <section ref={containerRef} className="scene scene--features">
      <div
        className="features-container"
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        {/* 简洁标题 */}
        <header className="features-header">
          <span className="features-eyebrow">{t.tear.subtitle}</span>
          <h2 className="features-title">{t.tear.title}</h2>
        </header>

        {/* Bento Grid 布局 */}
        <div className="bento-grid">
          {/* 大卡片 - 应用截图 */}
          <div className="bento-card bento-card--large">
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
                animationDelay: `${index * 0.1}s`,
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
    </section>
  )
}

export default Tear
