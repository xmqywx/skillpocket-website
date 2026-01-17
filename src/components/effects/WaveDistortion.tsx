/**
 * WaveDistortion - 3D水波纹效果
 * - 鼠标滑过产生水波荡漾效果
 * - 水波粼粼的光影感
 * - 沉浸式背景效果
 */

import { useRef, useEffect, useCallback } from 'react'

interface Ripple {
  x: number
  y: number
  radius: number
  strength: number
  age: number
  maxAge: number
  phase: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
}

interface WaveDistortionProps {
  strength?: number
  maxRipples?: number
  className?: string
}

export function WaveDistortion({
  strength = 50,
  maxRipples = 12,
  className = '',
}: WaveDistortionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ripplesRef = useRef<Ripple[]>([])
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 })
  const frameRef = useRef<number>(0)
  const timeRef = useRef<number>(0)

  // Greenline Industrial 颜色
  const primaryColor = { r: 45, g: 106, b: 79 } // #2D6A4F
  const accentColor = { r: 116, g: 195, b: 101 } // #74C365

  const createRipple = useCallback((x: number, y: number, velocity: number) => {
    const ripples = ripplesRef.current

    if (ripples.length >= maxRipples) {
      ripples.shift()
    }

    ripples.push({
      x,
      y,
      radius: 0,
      strength: Math.min(velocity * 0.6, strength),
      age: 0,
      maxAge: 180,
      phase: Math.random() * Math.PI * 2,
    })

    // 创建闪烁粒子
    const particles = particlesRef.current
    const particleCount = Math.min(Math.floor(velocity / 10), 8)
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 1 + Math.random() * 3
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 60 + Math.random() * 40,
        size: 1 + Math.random() * 2,
      })
    }
  }, [maxRipples, strength])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      const { prevX, prevY } = mouseRef.current
      const dx = e.clientX - prevX
      const dy = e.clientY - prevY
      const velocity = Math.sqrt(dx * dx + dy * dy)

      if (velocity > 8) {
        createRipple(e.clientX, e.clientY, velocity)
      }

      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        prevX: e.clientX,
        prevY: e.clientY,
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      timeRef.current += 0.016
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const ripples = ripplesRef.current
      const particles = particlesRef.current

      // 绘制涟漪
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i]
        ripple.age++
        ripple.radius += 4 + ripple.strength * 0.1

        const progress = ripple.age / ripple.maxAge
        const alpha = Math.pow(1 - progress, 2)

        if (progress >= 1) {
          ripples.splice(i, 1)
          continue
        }

        // 多层水波纹 - 3D深度效果
        const waveCount = 5
        for (let w = 0; w < waveCount; w++) {
          const waveProgress = w / waveCount
          const waveRadius = ripple.radius * (0.3 + waveProgress * 0.7)
          const waveAlpha = alpha * (1 - waveProgress * 0.6)

          // 波动变形
          const segments = 64
          ctx.beginPath()
          for (let s = 0; s <= segments; s++) {
            const angle = (s / segments) * Math.PI * 2

            // 水波动态变形
            const waveOffset = Math.sin(angle * 4 + ripple.phase + timeRef.current * 3 + w * 0.5) *
                              ripple.strength * 0.15 * (1 - progress)
            const r = waveRadius + waveOffset

            const x = ripple.x + Math.cos(angle) * r
            const y = ripple.y + Math.sin(angle) * r

            if (s === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
          ctx.closePath()

          // 渐变颜色 - 深绿到浅绿
          const gradient = ctx.createRadialGradient(
            ripple.x, ripple.y, waveRadius * 0.5,
            ripple.x, ripple.y, waveRadius
          )
          gradient.addColorStop(0, `rgba(${accentColor.r}, ${accentColor.g}, ${accentColor.b}, 0)`)
          gradient.addColorStop(0.7, `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${waveAlpha * 0.3})`)
          gradient.addColorStop(1, `rgba(${accentColor.r}, ${accentColor.g}, ${accentColor.b}, ${waveAlpha * 0.5})`)

          ctx.strokeStyle = gradient
          ctx.lineWidth = 2 - waveProgress * 1.5
          ctx.stroke()
        }

        // 水面高光反射
        const highlightCount = 8
        for (let h = 0; h < highlightCount; h++) {
          const angle = (h / highlightCount) * Math.PI * 2 + ripple.phase + timeRef.current * 2
          const dist = ripple.radius * (0.4 + Math.sin(timeRef.current * 5 + h) * 0.2)
          const hx = ripple.x + Math.cos(angle) * dist
          const hy = ripple.y + Math.sin(angle) * dist

          const shimmer = Math.sin(timeRef.current * 8 + h * 0.7) * 0.5 + 0.5
          const highlightAlpha = alpha * shimmer * 0.6

          // 绘制闪烁光点
          const highlightGrad = ctx.createRadialGradient(hx, hy, 0, hx, hy, 3 + shimmer * 2)
          highlightGrad.addColorStop(0, `rgba(${accentColor.r}, ${accentColor.g}, ${accentColor.b}, ${highlightAlpha})`)
          highlightGrad.addColorStop(0.5, `rgba(255, 255, 255, ${highlightAlpha * 0.8})`)
          highlightGrad.addColorStop(1, `rgba(${accentColor.r}, ${accentColor.g}, ${accentColor.b}, 0)`)

          ctx.beginPath()
          ctx.arc(hx, hy, 3 + shimmer * 2, 0, Math.PI * 2)
          ctx.fillStyle = highlightGrad
          ctx.fill()
        }

        // 水纹折射线
        const refractCount = 6
        for (let r = 0; r < refractCount; r++) {
          const baseAngle = (r / refractCount) * Math.PI * 2 + ripple.phase
          const waveAngle = baseAngle + Math.sin(timeRef.current * 2 + r) * 0.3

          const innerR = ripple.radius * 0.2
          const outerR = ripple.radius * 0.9

          const x1 = ripple.x + Math.cos(waveAngle) * innerR
          const y1 = ripple.y + Math.sin(waveAngle) * innerR
          const x2 = ripple.x + Math.cos(waveAngle) * outerR
          const y2 = ripple.y + Math.sin(waveAngle) * outerR

          // 曲线波动
          const midX = (x1 + x2) / 2 + Math.sin(timeRef.current * 4 + r) * ripple.strength * 0.3
          const midY = (y1 + y2) / 2 + Math.cos(timeRef.current * 4 + r) * ripple.strength * 0.3

          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.quadraticCurveTo(midX, midY, x2, y2)
          ctx.strokeStyle = `rgba(${accentColor.r}, ${accentColor.g}, ${accentColor.b}, ${alpha * 0.25})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      // 绘制闪烁粒子
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.98
        p.vy *= 0.98

        const pProgress = p.life / p.maxLife
        const pAlpha = Math.sin(pProgress * Math.PI) * 0.8

        if (pProgress >= 1) {
          particles.splice(i, 1)
          continue
        }

        // 粒子光晕
        const shimmer = Math.sin(timeRef.current * 10 + i) * 0.5 + 0.5
        const pGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
        pGrad.addColorStop(0, `rgba(255, 255, 255, ${pAlpha * shimmer})`)
        pGrad.addColorStop(0.5, `rgba(${accentColor.r}, ${accentColor.g}, ${accentColor.b}, ${pAlpha * 0.5})`)
        pGrad.addColorStop(1, `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, 0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = pGrad
        ctx.fill()
      }

      // 背景水波纹动 - 全局波动感
      const bgWaveAlpha = 0.02
      const bgWaveCount = 3
      for (let i = 0; i < bgWaveCount; i++) {
        const waveY = canvas.height * (0.3 + i * 0.25)
        const amplitude = 20 + i * 10

        ctx.beginPath()
        ctx.moveTo(0, waveY)

        for (let x = 0; x <= canvas.width; x += 10) {
          const y = waveY + Math.sin(x * 0.01 + timeRef.current * (1 + i * 0.3) + i * Math.PI / 3) * amplitude
          ctx.lineTo(x, y)
        }

        ctx.strokeStyle = `rgba(${accentColor.r}, ${accentColor.g}, ${accentColor.b}, ${bgWaveAlpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(frameRef.current)
    }
  }, [createRipple])

  return (
    <canvas
      ref={canvasRef}
      className={`wave-canvas ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9997,
      }}
    />
  )
}

export default WaveDistortion
