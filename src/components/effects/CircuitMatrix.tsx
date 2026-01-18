/**
 * CircuitMatrix - 电路矩阵艺术动画
 * 几何线条组成的电路网格，数据流穿梭其中
 * 鼠标交互：激活附近节点，产生能量脉冲
 */

import { useRef, useEffect, useCallback } from 'react'

interface CircuitMatrixProps {
  opacity?: number
  speed?: number
  density?: number
}

interface Node {
  x: number
  y: number
  connections: number[]
  energy: number
  pulsePhase: number
}

interface DataPacket {
  fromNode: number
  toNode: number
  progress: number
  speed: number
  color: string
  size: number
  trail: { x: number; y: number; alpha: number }[]
}

interface Circuit {
  nodes: Node[]
  packets: DataPacket[]
}

export function CircuitMatrix({
  opacity = 0.6,
  speed = 1,
  density = 1
}: CircuitMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const circuitRef = useRef<Circuit>({ nodes: [], packets: [] })
  const timeRef = useRef(0)
  const mouseRef = useRef({ x: -1000, y: -1000, active: false })
  const lastSpawnRef = useRef(0)

  // 颜色配置 - 使用网站的绿色主题
  const colors = {
    primary: '#2D6A4F',
    accent: '#74C365',
    dim: 'rgba(45, 106, 79, 0.25)',
    glow: 'rgba(116, 195, 101, 0.8)',
    background: '#080c0a',
    mouseGlow: 'rgba(116, 195, 101, 0.15)',
  }

  // 初始化电路网格
  const initCircuit = useCallback((width: number, height: number) => {
    const nodes: Node[] = []
    const gridSize = Math.floor(70 / density)
    const cols = Math.ceil(width / gridSize) + 1
    const rows = Math.ceil(height / gridSize) + 1

    // 创建节点网格（带随机偏移）
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if ((row + col) % 2 === 0 || Math.random() > 0.6) {
          const offsetX = (Math.random() - 0.5) * gridSize * 0.25
          const offsetY = (Math.random() - 0.5) * gridSize * 0.25
          nodes.push({
            x: col * gridSize + offsetX,
            y: row * gridSize + offsetY,
            connections: [],
            energy: Math.random() * 0.2,
            pulsePhase: Math.random() * Math.PI * 2,
          })
        }
      }
    }

    // 建立连接
    const maxDist = gridSize * 1.6
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x
        const dy = nodes[j].y - nodes[i].y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < maxDist && Math.random() > 0.35) {
          nodes[i].connections.push(j)
          nodes[j].connections.push(i)
        }
      }
    }

    // 过滤没有连接的节点
    const connectedNodes = nodes.filter(n => n.connections.length > 0)

    // 重新映射连接索引
    const indexMap = new Map<number, number>()
    nodes.forEach((node, oldIndex) => {
      const newIndex = connectedNodes.indexOf(node)
      if (newIndex !== -1) {
        indexMap.set(oldIndex, newIndex)
      }
    })

    connectedNodes.forEach(node => {
      node.connections = node.connections
        .map(i => indexMap.get(i))
        .filter((i): i is number => i !== undefined)
    })

    circuitRef.current = {
      nodes: connectedNodes,
      packets: [],
    }
  }, [density])

  // 从指定节点生成数据包
  const spawnPacketFromNode = useCallback((nodeIndex: number) => {
    const { nodes, packets } = circuitRef.current
    if (packets.length > 80 * density) return

    const node = nodes[nodeIndex]
    if (!node || node.connections.length === 0) return

    const toNode = node.connections[Math.floor(Math.random() * node.connections.length)]

    packets.push({
      fromNode: nodeIndex,
      toNode,
      progress: 0,
      speed: (0.008 + Math.random() * 0.012) * speed,
      color: Math.random() > 0.25 ? colors.accent : colors.primary,
      size: 2.5 + Math.random() * 2,
      trail: [],
    })
  }, [speed, density, colors.accent, colors.primary])

  // 随机生成数据包
  const spawnRandomPacket = useCallback(() => {
    const { nodes } = circuitRef.current
    if (nodes.length === 0) return
    const nodeIndex = Math.floor(Math.random() * nodes.length)
    spawnPacketFromNode(nodeIndex)
  }, [spawnPacketFromNode])

  // 鼠标激活附近节点
  const activateNearbyNodes = useCallback((mx: number, my: number) => {
    const { nodes } = circuitRef.current
    const radius = 120
    const now = Date.now()

    nodes.forEach((node, idx) => {
      const dx = node.x - mx
      const dy = node.y - my
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < radius) {
        const intensity = 1 - dist / radius
        node.energy = Math.min(1, node.energy + intensity * 0.5)

        // 从激活的节点发射数据包
        if (intensity > 0.5 && now - lastSpawnRef.current > 50) {
          if (Math.random() > 0.6) {
            spawnPacketFromNode(idx)
            lastSpawnRef.current = now
          }
        }
      }
    })
  }, [spawnPacketFromNode])

  // 绘制函数
  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const { nodes, packets } = circuitRef.current
    const mouse = mouseRef.current
    timeRef.current += 0.016

    // 清空画布
    ctx.fillStyle = colors.background
    ctx.fillRect(0, 0, width, height)

    // 绘制鼠标光晕
    if (mouse.active) {
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 150)
      gradient.addColorStop(0, 'rgba(116, 195, 101, 0.12)')
      gradient.addColorStop(0.5, 'rgba(45, 106, 79, 0.05)')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.fillRect(mouse.x - 150, mouse.y - 150, 300, 300)

      // 激活附近节点
      activateNearbyNodes(mouse.x, mouse.y)
    }

    // 绘制连接线
    nodes.forEach((node, i) => {
      node.connections.forEach(j => {
        if (j > i) {
          const target = nodes[j]

          // 根据两端节点能量决定线条亮度
          const lineEnergy = Math.max(node.energy, target.energy)
          const alpha = 0.15 + lineEnergy * 0.4

          ctx.strokeStyle = `rgba(45, 106, 79, ${alpha})`
          ctx.lineWidth = 1 + lineEnergy * 0.5

          ctx.beginPath()
          ctx.moveTo(node.x, node.y)

          // 直角连接线（电路风格）
          const midX = (node.x + target.x) / 2
          const midY = (node.y + target.y) / 2

          if (Math.abs(node.x - target.x) > Math.abs(node.y - target.y)) {
            ctx.lineTo(midX, node.y)
            ctx.lineTo(midX, target.y)
          } else {
            ctx.lineTo(node.x, midY)
            ctx.lineTo(target.x, midY)
          }
          ctx.lineTo(target.x, target.y)
          ctx.stroke()
        }
      })
    })

    // 更新和绘制数据包
    for (let i = packets.length - 1; i >= 0; i--) {
      const packet = packets[i]
      packet.progress += packet.speed

      const from = nodes[packet.fromNode]
      const to = nodes[packet.toNode]
      if (!from || !to) {
        packets.splice(i, 1)
        continue
      }

      // 计算位置
      let x: number, y: number
      const midX = (from.x + to.x) / 2
      const midY = (from.y + to.y) / 2

      if (Math.abs(from.x - to.x) > Math.abs(from.y - to.y)) {
        if (packet.progress < 0.5) {
          const t = packet.progress * 2
          x = from.x + (midX - from.x) * t
          y = from.y
        } else {
          const t = (packet.progress - 0.5) * 2
          x = midX + (to.x - midX) * t
          y = from.y + (to.y - from.y) * t
        }
      } else {
        if (packet.progress < 0.5) {
          const t = packet.progress * 2
          x = from.x
          y = from.y + (midY - from.y) * t
        } else {
          const t = (packet.progress - 0.5) * 2
          x = from.x + (to.x - from.x) * t
          y = midY + (to.y - midY) * t
        }
      }

      // 尾迹
      packet.trail.unshift({ x, y, alpha: 1 })
      if (packet.trail.length > 15) packet.trail.pop()

      // 绘制尾迹
      packet.trail.forEach((point, idx) => {
        const alpha = (1 - idx / packet.trail.length) * 0.7
        const hex = packet.color
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        const size = packet.size * (1 - idx / packet.trail.length * 0.6)
        ctx.fillRect(point.x - size/2, point.y - size/2, size, size)
      })

      // 数据包主体
      ctx.shadowColor = colors.glow
      ctx.shadowBlur = 10
      ctx.fillStyle = packet.color
      ctx.fillRect(x - packet.size/2, y - packet.size/2, packet.size, packet.size)
      ctx.shadowBlur = 0

      // 激活节点
      if (packet.progress < 0.1) from.energy = Math.min(1, from.energy + 0.2)
      if (packet.progress > 0.9) to.energy = Math.min(1, to.energy + 0.2)

      // 到达终点
      if (packet.progress >= 1) {
        const nextConnections = to.connections.filter(c => c !== packet.fromNode)
        if (nextConnections.length > 0 && Math.random() > 0.4) {
          packet.fromNode = packet.toNode
          packet.toNode = nextConnections[Math.floor(Math.random() * nextConnections.length)]
          packet.progress = 0
          packet.trail = []
        } else {
          packets.splice(i, 1)
        }
      }
    }

    // 绘制节点
    nodes.forEach(node => {
      node.energy *= 0.96

      const pulse = Math.sin(timeRef.current * 2 + node.pulsePhase) * 0.5 + 0.5
      const baseSize = 2.5
      const energySize = node.energy * 5
      const size = baseSize + energySize + pulse * 0.8

      if (node.energy > 0.15) {
        ctx.shadowColor = colors.glow
        ctx.shadowBlur = 12 * node.energy
      }

      ctx.fillStyle = node.energy > 0.4
        ? colors.accent
        : `rgba(45, 106, 79, ${0.35 + node.energy * 0.65})`

      ctx.beginPath()
      ctx.rect(node.x - size/2, node.y - size/2, size, size)
      ctx.fill()
      ctx.shadowBlur = 0
    })

    // 随机生成数据包
    if (Math.random() < 0.05 * speed * density) {
      spawnRandomPacket()
    }

  }, [colors, spawnRandomPacket, activateNearbyNodes, speed, density])

  // 鼠标事件处理
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // 动画循环
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      initCircuit(rect.width, rect.height)
    }

    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      draw(ctx, rect.width, rect.height)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [draw, initCircuit])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

export default CircuitMatrix
