/**
 * 第四幕：秩序降临
 * - [ CTRL + Z ] 触发恢复
 * - 混乱 → 秩序的转变
 * - Logo 和产品展示
 */

import { useRef, useMemo } from 'react'
import { useTranslation } from '@/i18n'
import { IconBolt, IconIcons, IconSearch, IconFolder, IconRefresh, IconStorage, IconUser, IconDesigner, IconCreator, IconSkillPocket } from '@/components/ui/Icons'

interface OrderProps {
  progress: number
}

export function Order({ progress }: OrderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  // 产品亮点 - 使用Greenline Industrial图标
  const highlights = [
    { Icon: IconBolt, title: t.order.highlights.scan.title, desc: t.order.highlights.scan.desc },
    { Icon: IconIcons, title: t.order.highlights.ai.title, desc: t.order.highlights.ai.desc },
    { Icon: IconSearch, title: t.order.highlights.search.title, desc: t.order.highlights.search.desc },
    { Icon: IconFolder, title: t.order.highlights.organize.title, desc: t.order.highlights.organize.desc },
    { Icon: IconRefresh, title: t.order.highlights.sync.title, desc: t.order.highlights.sync.desc },
    { Icon: IconStorage, title: t.order.highlights.storage.title, desc: t.order.highlights.storage.desc },
  ]

  // 用户评价 - 使用SVG图标
  const testimonialIcons = [IconUser, IconDesigner, IconCreator]
  const testimonials = t.order.testimonials.map((item, i) => ({
    text: item.text,
    author: item.author,
    Icon: testimonialIcons[i],
  }))

  // 计算阶段
  const phase = useMemo(() => {
    if (progress < 0.15) return 'trigger'
    if (progress < 0.4) return 'restoring'
    if (progress < 0.7) return 'reveal'
    return 'showcase'
  }, [progress])

  // 恢复进度
  const restoreProgress = useMemo(() => {
    if (progress < 0.15) return 0
    if (progress > 0.5) return 1
    return (progress - 0.15) / 0.35
  }, [progress])

  return (
    <section ref={containerRef} className="scene scene--order">
      {/* CTRL+Z 触发器 */}
      <div
        className="order-trigger"
        style={{
          opacity: phase === 'trigger' ? 1 : 0,
          transform: `scale(${1 + progress * 2})`,
          pointerEvents: phase === 'trigger' ? 'auto' : 'none',
        }}
      >
        <div className="trigger-keys">
          <span className="key key--ctrl">CTRL</span>
          <span className="key-plus">+</span>
          <span className="key key--z">Z</span>
        </div>
        <p className="trigger-hint">{t.order.undoChaos}</p>
      </div>

      {/* 恢复动画层 */}
      <div
        className="order-restore"
        style={{
          opacity: phase === 'restoring' ? 1 : 0,
        }}
      >
        <div className="restore-text">{t.order.restoring}</div>
        <div className="restore-bar">
          <div
            className="restore-progress"
            style={{ width: `${restoreProgress * 100}%` }}
          />
        </div>
        <div className="restore-percent">{Math.floor(restoreProgress * 100)}%</div>
      </div>

      {/* 主内容 - Logo 和产品展示 */}
      <div
        className="order-main"
        style={{
          opacity: phase === 'reveal' || phase === 'showcase' ? 1 : 0,
          transform: phase === 'reveal' || phase === 'showcase' ? 'translateY(0)' : 'translateY(50px)',
        }}
      >
        {/* Logo */}
        <div className="order-logo-section">
          <div
            className="logo-icon"
            style={{
              transform: `scale(${progress > 0.4 ? 1 : 0})`,
              opacity: progress > 0.4 ? 1 : 0,
            }}
          >
<IconSkillPocket size={80} className="logo-svg" />
          </div>

          <h1
            className="logo-text"
            style={{
              opacity: progress > 0.45 ? 1 : 0,
              transform: progress > 0.45 ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <span className="logo-skill">Skill</span>
            <span className="logo-pocket">Pocket</span>
          </h1>

          <p
            className="logo-tagline"
            style={{
              opacity: progress > 0.5 ? 1 : 0,
            }}
          >
            {t.order.tagline}
          </p>
        </div>

        {/* 产品亮点 */}
        <div
          className="order-highlights"
          style={{
            opacity: phase === 'showcase' ? 1 : 0,
          }}
        >
          <div className="highlights-grid">
            {highlights.map((item, i) => (
              <div
                key={item.title}
                className="highlight-item"
                style={{
                  opacity: progress > 0.7 + i * 0.04 ? 1 : 0,
                  transform: progress > 0.7 + i * 0.04 ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                <span className="highlight-icon">
                  <item.Icon size={32} />
                </span>
                <div className="highlight-content">
                  <span className="highlight-title">{item.title}</span>
                  <span className="highlight-desc">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 用户评价 */}
        <div
          className="order-testimonials"
          style={{
            opacity: progress > 0.85 ? 1 : 0,
          }}
        >
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="testimonial"
              style={{
                opacity: progress > 0.87 + i * 0.04 ? 1 : 0,
                transform: progress > 0.87 + i * 0.04 ? 'translateX(0)' : `translateX(${(i - 1) * 30}px)`,
              }}
            >
              <span className="testimonial-avatar">
                <item.Icon size={32} />
              </span>
              <div className="testimonial-content">
                <p className="testimonial-text">{item.text}</p>
                <span className="testimonial-author">{item.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 背景装饰 - 渐变光晕 */}
      <div
        className="order-glow"
        style={{
          opacity: phase === 'showcase' ? 0.3 : 0,
          background: `radial-gradient(circle at 50% 30%, rgba(108, 92, 231, 0.4) 0%, transparent 60%)`,
        }}
      />

      {/* 残留的故障线 - 代表"伤疤" */}
      <div className="order-scars" style={{ opacity: 0.05 + (1 - restoreProgress) * 0.1 }}>
        <div className="scar scar--1" />
        <div className="scar scar--2" />
        <div className="scar scar--3" />
      </div>
    </section>
  )
}

export default Order
