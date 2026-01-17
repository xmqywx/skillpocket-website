/**
 * Noise 噪点效果组件
 * - 使用 CSS 静态噪点背景，避免 Canvas 重绘造成的闪烁
 * - 通过 CSS animation 实现微妙的动态效果
 */

interface NoiseProps {
  opacity?: number
  className?: string
}

export function Noise({
  opacity = 0.05,
  className = '',
}: NoiseProps) {
  return (
    <div
      className={`noise-overlay ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity,
        zIndex: 9999,
      }}
    />
  )
}

export default Noise
