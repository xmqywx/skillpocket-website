/**
 * 自定义光标组件
 * - 像素风格小方块
 * - 悬停可点击时变为十字准星
 * - RGB 轨迹拖尾
 */

import { useRef, useEffect, useState } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'

interface CursorProps {
  color?: string
  size?: number
}

export function Cursor({ color = '#ffffff', size = 8 }: CursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const { x, y } = useMousePosition()
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    // 检测是否悬停在可点击元素上
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        !!target.closest('a') ||
        !!target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      setIsPointer(isClickable)
    }

    document.addEventListener('mouseover', handleMouseOver)
    return () => document.removeEventListener('mouseover', handleMouseOver)
  }, [])

  useEffect(() => {
    if (!cursorRef.current) return

    // 更新光标位置
    cursorRef.current.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px)`
  }, [x, y, size])

  return (
    <>
      {/* 隐藏系统光标的全局样式 */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* 拖尾效果 */}
      <div
        ref={trailRef}
        className="cursor-trail"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: size * 1.5,
          height: size * 1.5,
          pointerEvents: 'none',
          zIndex: 99998,
          transform: `translate(${x - size * 0.75}px, ${y - size * 0.75}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* RGB 分离拖尾 */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'rgba(255, 0, 0, 0.3)',
            transform: 'translate(-2px, 0)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 255, 0.3)',
            transform: 'translate(2px, 0)',
          }}
        />
      </div>

      {/* 主光标 */}
      <div
        ref={cursorRef}
        className={`cursor ${isPointer ? 'cursor--pointer' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isPointer ? size * 2 : size,
          height: isPointer ? size * 2 : size,
          background: isPointer ? 'transparent' : color,
          border: isPointer ? `1px solid ${color}` : 'none',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.15s, height 0.15s, background 0.15s',
        }}
      >
        {/* 十字准星 */}
        {isPointer && (
          <>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: 1,
                background: color,
                transform: 'translateY(-50%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: 1,
                background: color,
                transform: 'translateX(-50%)',
              }}
            />
          </>
        )}
      </div>
    </>
  )
}

export default Cursor
