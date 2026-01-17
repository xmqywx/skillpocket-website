/**
 * 第一幕：文字崩塌
 * - SKILLPOCKET 文字从正常到崩塌
 * - 抖动 → 错位 → RGB分裂 → 像素飞散
 */

import { useRef, useEffect, useState, useMemo } from 'react'
import { useTranslation } from '@/i18n'

interface CollapseProps {
  progress: number
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
}

const LETTERS = 'SKILLPOCKET'.split('')
const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`01'

export function Collapse({ progress }: CollapseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [glitchLetters, setGlitchLetters] = useState<string[]>(LETTERS)
  const { t } = useTranslation()

  // 计算各阶段
  const phase = useMemo(() => {
    if (progress < 0.15) return 'stable'
    if (progress < 0.35) return 'shake'
    if (progress < 0.55) return 'split'
    if (progress < 0.75) return 'scatter'
    return 'dissolve'
  }, [progress])

  // 字母抖动和故障效果
  useEffect(() => {
    if (phase === 'shake' || phase === 'split') {
      const interval = setInterval(() => {
        setGlitchLetters(LETTERS.map((letter) => {
          if (Math.random() < 0.3) {
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          }
          return letter
        }))
      }, 80)
      return () => clearInterval(interval)
    } else {
      setGlitchLetters(LETTERS)
    }
  }, [phase])

  // 生成粒子
  useEffect(() => {
    if (phase === 'scatter' || phase === 'dissolve') {
      const newParticles: Particle[] = []
      const count = phase === 'dissolve' ? 150 : 80
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: 50 + (Math.random() - 0.5) * 60,
          y: 50 + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4 - 2,
          size: Math.random() * 4 + 1,
          color: ['#fff', '#ff0000', '#0000ff', '#00ff00'][Math.floor(Math.random() * 4)],
          life: Math.random() * 0.5 + 0.5,
        })
      }
      setParticles(newParticles)
    }
  }, [phase])

  // 计算字母变换
  const getLetterStyle = (index: number) => {
    const baseDelay = index * 0.05

    let transform = ''
    let opacity = 1
    let filter = 'none'

    if (phase === 'shake') {
      const shakeX = Math.sin(Date.now() / 50 + index) * (5 + progress * 20)
      const shakeY = Math.cos(Date.now() / 60 + index) * (3 + progress * 15)
      transform = `translate(${shakeX}px, ${shakeY}px)`
    } else if (phase === 'split') {
      const splitX = (index - 5) * progress * 30
      const splitY = Math.sin(index * 0.8) * progress * 50
      const rotate = (index - 5) * progress * 15
      transform = `translate(${splitX}px, ${splitY}px) rotate(${rotate}deg)`
      filter = `hue-rotate(${index * 30}deg)`
    } else if (phase === 'scatter') {
      const scatterX = (index - 5) * progress * 80
      const scatterY = Math.pow(progress, 2) * 200 * (index % 2 === 0 ? 1 : -1)
      const rotate = progress * 360 * (index % 2 === 0 ? 1 : -1)
      transform = `translate(${scatterX}px, ${scatterY}px) rotate(${rotate}deg) scale(${1 - progress * 0.5})`
      opacity = 1 - progress
    } else if (phase === 'dissolve') {
      opacity = 0
    }

    return {
      transform,
      opacity,
      filter,
      transitionDelay: `${baseDelay}s`,
    }
  }

  return (
    <section ref={containerRef} className="scene scene--collapse">
      {/* 背景网格 */}
      <div className="collapse-grid" style={{ opacity: 0.1 - progress * 0.1 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="grid-line-h" style={{ top: `${i * 5}%` }} />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="grid-line-v" style={{ left: `${i * 5}%` }} />
        ))}
      </div>

      {/* 主标题 */}
      <div className="collapse-content">
        {/* RGB 分裂层 - 红 */}
        <div
          className="collapse-text collapse-text--r"
          style={{
            opacity: phase === 'split' || phase === 'scatter' ? 0.7 : 0,
            transform: `translate(${progress * 8}px, ${-progress * 4}px)`,
          }}
        >
          {glitchLetters.map((letter, i) => (
            <span key={i} className="letter" style={getLetterStyle(i)}>{letter}</span>
          ))}
        </div>

        {/* RGB 分裂层 - 蓝 */}
        <div
          className="collapse-text collapse-text--b"
          style={{
            opacity: phase === 'split' || phase === 'scatter' ? 0.7 : 0,
            transform: `translate(${-progress * 8}px, ${progress * 4}px)`,
          }}
        >
          {glitchLetters.map((letter, i) => (
            <span key={i} className="letter" style={getLetterStyle(i)}>{letter}</span>
          ))}
        </div>

        {/* 主文字层 */}
        <div
          className="collapse-text collapse-text--main"
          style={{ opacity: phase !== 'dissolve' ? 1 : 0 }}
        >
          {glitchLetters.map((letter, i) => (
            <span key={i} className="letter" style={getLetterStyle(i)}>{letter}</span>
          ))}
        </div>

        {/* 副标题 */}
        <div
          className="collapse-subtitle"
          style={{
            opacity: phase === 'stable' ? 1 - progress * 5 : 0,
            transform: `translateY(${progress * 30}px)`,
          }}
        >
          <span className="subtitle-line">{t.collapse.subtitle1}</span>
          <span className="subtitle-line subtitle-line--dim">{t.collapse.subtitle2}</span>
        </div>
      </div>

      {/* 粒子层 */}
      <div className="collapse-particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x + p.vx * progress * 50}%`,
              top: `${p.y + p.vy * progress * 50}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: p.life * (1 - progress),
            }}
          />
        ))}
      </div>

      {/* 故障条纹 */}
      {(phase === 'split' || phase === 'scatter') && (
        <div className="collapse-glitch-bars">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="glitch-bar"
              style={{
                top: `${10 + i * 12}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 30 + 10}%`,
                height: '2px',
                backgroundColor: i % 2 === 0 ? '#ff0000' : '#0000ff',
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>
      )}

      {/* 系统信息 */}
      <div className="collapse-system-info" style={{ opacity: 0.3 + progress * 0.3 }}>
        <div className="info-line">{t.collapse.system.skillManager}</div>
        <div className="info-line">{t.collapse.system.memory} {Math.floor(128 + progress * 512)}MB / 1024MB</div>
        <div className="info-line">{t.collapse.system.cpu} {Math.floor(15 + progress * 80)}%</div>
        <div className="info-line info-line--warning" style={{ opacity: progress > 0.3 ? 1 : 0 }}>
          {t.collapse.system.warning}
        </div>
        <div className="info-line info-line--error" style={{ opacity: progress > 0.5 ? 1 : 0 }}>
          {t.collapse.system.error}
        </div>
      </div>

      {/* 进度提示 */}
      <div className="collapse-hint" style={{ opacity: 1 - progress * 2 }}>
        <span>{t.collapse.scrollHint}</span>
      </div>
    </section>
  )
}

export default Collapse
