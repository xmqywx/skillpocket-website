/**
 * 第三幕：图标爆破 - AI图标生成展示
 * - 展示 AI 图标生成功能
 * - 输入提示 → 图标爆发生成
 */

import { useRef, useEffect, useState, useMemo } from 'react'
import { useTranslation } from '@/i18n'

interface ExplodeProps {
  progress: number
}

// 生成的图标样式展示
const ICON_STYLES = [
  { name: '3D', color: '#6C5CE7' },
  { name: 'Gradient', color: '#FF6B6B' },
  { name: 'Flat', color: '#4ECDC4' },
  { name: 'Linear', color: '#45B7D1' },
  { name: 'Duotone', color: '#96CEB4' },
]

// 生成的图标数据
const GENERATED_ICONS = [
  {
    id: 1,
    prompt: 'rocket',
    svg: `<svg viewBox="0 0 64 64" fill="none"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#667EEA"/><stop offset="100%" style="stop-color:#764BA2"/></linearGradient></defs><rect x="8" y="8" width="48" height="48" rx="12" fill="url(#g1)"/><path d="M32 18c-3 6-3 12 0 18 3-6 3-12 0-18z" fill="white"/><path d="M29 33l-3 6h6l-3-6z" fill="white" fill-opacity="0.8"/><path d="M35 33l3 6h-6l3-6z" fill="white" fill-opacity="0.8"/><circle cx="32" cy="26" r="3" fill="#667EEA"/><path d="M30 39c1 3 1.5 4 2 4s1-1 2-4c-1.5 1.5-2.5 1.5-4 0z" fill="#FCD34D"/></svg>`,
    position: { x: 15, y: 25 },
    rotation: -12,
  },
  {
    id: 2,
    prompt: 'star',
    svg: `<svg viewBox="0 0 64 64" fill="none"><defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#f093fb"/><stop offset="100%" style="stop-color:#f5576c"/></linearGradient></defs><rect x="8" y="8" width="48" height="48" rx="12" fill="url(#g2)"/><path d="M32 16l4 12h12l-10 7 4 13-10-8-10 8 4-13-10-7h12z" fill="white"/></svg>`,
    position: { x: 75, y: 20 },
    rotation: 8,
  },
  {
    id: 3,
    prompt: 'heart',
    svg: `<svg viewBox="0 0 64 64" fill="none"><defs><linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#FF6B6B"/><stop offset="100%" style="stop-color:#ee5a5a"/></linearGradient></defs><rect x="8" y="8" width="48" height="48" rx="12" fill="url(#g3)"/><path d="M32 44c-8-6-14-11-14-17 0-4 3-7 7-7 3 0 5 1.5 7 4 2-2.5 4-4 7-4 4 0 7 3 7 7 0 6-6 11-14 17z" fill="white"/></svg>`,
    position: { x: 45, y: 60 },
    rotation: -5,
  },
  {
    id: 4,
    prompt: 'code',
    svg: `<svg viewBox="0 0 64 64" fill="none"><defs><linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#4ECDC4"/><stop offset="100%" style="stop-color:#44A08D"/></linearGradient></defs><rect x="8" y="8" width="48" height="48" rx="12" fill="url(#g4)"/><path d="M26 24l-8 8 8 8M38 24l8 8-8 8M34 20l-4 24" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
    position: { x: 25, y: 70 },
    rotation: 15,
  },
  {
    id: 5,
    prompt: 'bolt',
    svg: `<svg viewBox="0 0 64 64" fill="none"><defs><linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#FFD93D"/><stop offset="100%" style="stop-color:#FF9F1C"/></linearGradient></defs><rect x="8" y="8" width="48" height="48" rx="12" fill="url(#g5)"/><path d="M35 14L22 34h10l-3 16 15-22H32l3-14z" fill="white"/></svg>`,
    position: { x: 70, y: 55 },
    rotation: -20,
  },
  {
    id: 6,
    prompt: 'home',
    svg: `<svg viewBox="0 0 64 64" fill="none"><defs><linearGradient id="g6" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#6C5CE7"/><stop offset="100%" style="stop-color:#a29bfe"/></linearGradient></defs><rect x="8" y="8" width="48" height="48" rx="12" fill="url(#g6)"/><path d="M20 30v14h8v-10h8v10h8V30L32 20l-12 10z" fill="white"/></svg>`,
    position: { x: 55, y: 35 },
    rotation: 10,
  },
  {
    id: 7,
    prompt: 'settings',
    svg: `<svg viewBox="0 0 64 64" fill="none"><defs><linearGradient id="g7" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#74b9ff"/><stop offset="100%" style="stop-color:#0984e3"/></linearGradient></defs><rect x="8" y="8" width="48" height="48" rx="12" fill="url(#g7)"/><circle cx="32" cy="32" r="6" stroke="white" stroke-width="2.5" fill="none"/><path d="M32 18v-2M32 48v-2M18 32h-2M48 32h-2M22 22l-1.5-1.5M43.5 43.5L42 42M42 22l1.5-1.5M20.5 43.5L22 42" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    position: { x: 10, y: 50 },
    rotation: 25,
  },
  {
    id: 8,
    prompt: 'music',
    svg: `<svg viewBox="0 0 64 64" fill="none"><defs><linearGradient id="g8" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#fd79a8"/><stop offset="100%" style="stop-color:#e84393"/></linearGradient></defs><rect x="8" y="8" width="48" height="48" rx="12" fill="url(#g8)"/><circle cx="24" cy="40" r="5" fill="white"/><circle cx="40" cy="36" r="5" fill="white"/><path d="M29 40V22l16-4v18" stroke="white" stroke-width="2.5" fill="none"/></svg>`,
    position: { x: 85, y: 40 },
    rotation: -8,
  },
]

export function Explode({ progress }: ExplodeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [typedText, setTypedText] = useState('')
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const { t } = useTranslation()

  const TYPING_PROMPTS = t.explode.prompts

  // 计算阶段
  const phase = useMemo(() => {
    if (progress < 0.15) return 'typing'
    if (progress < 0.25) return 'processing'
    if (progress < 0.35) return 'flash'
    if (progress < 0.5) return 'wave'
    return 'scatter'
  }, [progress])

  // 打字效果
  useEffect(() => {
    if (phase === 'typing' || phase === 'processing') {
      const prompt = TYPING_PROMPTS[currentPromptIndex] || ''
      const totalProgress = progress * 10
      const charIndex = Math.floor(totalProgress * prompt.length)
      setTypedText(prompt.slice(0, Math.min(charIndex, prompt.length - 1)))

      if (charIndex >= prompt.length && currentPromptIndex < TYPING_PROMPTS.length - 1) {
        setTimeout(() => setCurrentPromptIndex(prev => prev + 1), 100)
      }
    }
  }, [progress, phase, currentPromptIndex])

  // 计算图标可见性
  const isIconVisible = (index: number) => {
    return phase === 'scatter' && progress > 0.35 + index * 0.06
  }

  // 计算图标位置（爆炸效果）
  const getIconStyle = (icon: typeof GENERATED_ICONS[0], index: number) => {
    const visible = isIconVisible(index)
    const scatterProgress = Math.max(0, (progress - 0.35 - index * 0.06) * 3)

    return {
      left: `${icon.position.x}%`,
      top: `${icon.position.y}%`,
      transform: visible
        ? `translate(-50%, -50%) rotate(${icon.rotation}deg) scale(${0.8 + scatterProgress * 0.2})`
        : `translate(-50%, -50%) scale(0) rotate(${icon.rotation + 180}deg)`,
      opacity: visible ? Math.min(1, scatterProgress * 2) : 0,
    }
  }

  return (
    <section ref={containerRef} className="scene scene--explode">
      {/* 输入区域 */}
      <div
        className="explode-terminal"
        style={{
          opacity: phase !== 'scatter' ? 1 : 0.3,
          transform: phase === 'scatter' ? 'translateY(-100px) scale(0.8)' : 'translateY(0)',
        }}
      >
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
          </div>
          <span className="terminal-title">{t.explode.terminal}</span>
        </div>
        <div className="terminal-body">
          <div className="terminal-line">
            <span className="prompt">&gt;</span>
            <span className="typed-text">{typedText}</span>
            <span className="cursor">|</span>
          </div>
          {phase === 'processing' && (
            <div className="terminal-line terminal-line--dim">
              <span className="prompt">[</span>
              <span className="loading-bar" style={{ width: `${(progress - 0.15) * 500}%` }} />
              <span className="prompt">]</span>
              <span className="loading-percent">{Math.floor((progress - 0.15) * 500)}%</span>
            </div>
          )}
        </div>
      </div>

      {/* 闪光效果 */}
      {phase === 'flash' && (
        <div className="explode-flash" style={{ opacity: 1 - (progress - 0.25) * 10 }} />
      )}

      {/* 冲击波 */}
      {(phase === 'wave' || phase === 'scatter') && (
        <div className="explode-wave">
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="wave-ring"
              style={{
                width: `${100 + (progress - 0.35) * 800 * i}px`,
                height: `${100 + (progress - 0.35) * 800 * i}px`,
                opacity: Math.max(0, 1 - (progress - 0.35) * 3 - i * 0.2),
                borderColor: i % 2 === 0 ? 'rgba(255,0,0,0.3)' : 'rgba(0,0,255,0.3)',
              }}
            />
          ))}
        </div>
      )}

      {/* 生成的图标 */}
      <div className="explode-icons">
        {GENERATED_ICONS.map((icon, index) => (
          <div
            key={icon.id}
            className="generated-icon"
            style={getIconStyle(icon, index)}
          >
            <div
              className="icon-svg"
              dangerouslySetInnerHTML={{ __html: icon.svg }}
            />
            <span className="icon-label">{icon.prompt}</span>

            {/* 裂痕效果 */}
            <svg className="icon-crack" viewBox="0 0 100 100">
              <path
                d="M50 0 L55 25 L70 20 L60 45 L80 50 L55 55 L65 80 L50 60 L35 85 L40 55 L15 60 L40 45 L25 25 L45 30 Z"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* 样式展示 */}
      <div
        className="style-showcase"
        style={{
          opacity: phase === 'scatter' ? Math.min(1, (progress - 0.6) * 5) : 0,
          transform: phase === 'scatter' && progress > 0.6 ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        <span className="showcase-label">{t.explode.styles}</span>
        <div className="style-list">
          {ICON_STYLES.map((style, i) => (
            <div
              key={style.name}
              className="style-item"
              style={{
                '--style-color': style.color,
                opacity: progress > 0.65 + i * 0.05 ? 1 : 0,
              } as React.CSSProperties}
            >
              <span className="style-dot" />
              <span className="style-name">{style.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 统计数据 */}
      <div
        className="explode-stats"
        style={{
          opacity: phase === 'scatter' ? 0.6 : 0,
        }}
      >
        <div className="stat-item">
          <span className="stat-value">{Math.floor(progress * 1000)}+</span>
          <span className="stat-label">{t.explode.stats.generated}</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">5</span>
          <span className="stat-label">{t.explode.stats.styles}</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">SVG</span>
          <span className="stat-label">{t.explode.stats.output}</span>
        </div>
      </div>

      {/* 屏幕裂痕装饰 */}
      <svg className="screen-cracks" viewBox="0 0 100 100" preserveAspectRatio="none">
        {phase === 'scatter' && (
          <>
            <path d="M30,30 L35,15 L42,35 L55,20 L48,42" fill="none" stroke="rgba(255,0,0,0.2)" strokeWidth="0.15" />
            <path d="M70,60 L78,48 L82,68 L90,55" fill="none" stroke="rgba(0,0,255,0.2)" strokeWidth="0.15" />
            <path d="M15,70 L25,62 L20,78 L35,72" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.1" />
          </>
        )}
      </svg>
    </section>
  )
}

export default Explode
