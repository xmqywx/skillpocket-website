/**
 * Scanlines 扫描线效果
 * - CRT 显示器风格的水平线
 */

interface ScanlinesProps {
  opacity?: number
  lineHeight?: number // 线条间距 (px)
  animate?: boolean
  className?: string
}

export function Scanlines({
  opacity = 0.1,
  lineHeight = 2,
  animate = false,
  className = '',
}: ScanlinesProps) {
  return (
    <div
      className={`scanlines ${animate ? 'scanlines--animate' : ''} ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity,
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent ${lineHeight}px,
          rgba(0, 0, 0, 0.3) ${lineHeight}px,
          rgba(0, 0, 0, 0.3) ${lineHeight * 2}px
        )`,
        zIndex: 9999,
      }}
    />
  )
}

export default Scanlines
