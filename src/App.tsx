/**
 * SkillPocket Website - Main App
 * 分页动画系统：滚动触发页面切换，动画自动播放到最终状态
 */

import { useEffect, useState, useRef, useCallback } from 'react'
import { useSceneStore } from '@/stores/sceneStore'

// Pages
import { Landing, Features, Download } from '@/components/pages'

// Effects
import { Noise, Scanlines, CircuitMatrix } from '@/components/effects'

// Styles
import '@/styles/globals.css'

// 页面状态类型
type PageState = 'hidden' | 'entering' | 'complete'

function App() {
  const { lowPerformanceMode } = useSceneStore()
  const [currentPage, setCurrentPage] = useState(0)
  const [pageStates, setPageStates] = useState<PageState[]>(['entering', 'hidden', 'hidden'])
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)
  const lastScrollTime = useRef(0)

  // 处理滚动触发的页面切换
  const handleWheel = useCallback((e: WheelEvent) => {
    const now = Date.now()
    // 防抖：至少间隔 800ms
    if (now - lastScrollTime.current < 800) return
    if (isScrolling.current) return

    const direction = e.deltaY > 0 ? 1 : -1
    const nextPage = currentPage + direction

    if (nextPage >= 0 && nextPage < 3) {
      lastScrollTime.current = now
      isScrolling.current = true

      setCurrentPage(nextPage)

      // 更新页面状态
      setPageStates(prev => {
        const newStates = [...prev]
        // 当前离开的页面设为 complete
        newStates[currentPage] = 'complete'
        // 新进入的页面设为 entering
        newStates[nextPage] = 'entering'
        return newStates
      })

      // 动画完成后解锁滚动
      setTimeout(() => {
        isScrolling.current = false
        // 将当前页面设为 complete
        setPageStates(prev => {
          const newStates = [...prev]
          newStates[nextPage] = 'complete'
          return newStates
        })
      }, 1200) // 动画时长
    }
  }, [currentPage])

  // 键盘导航
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault()
      handleWheel({ deltaY: 100 } as WheelEvent)
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault()
      handleWheel({ deltaY: -100 } as WheelEvent)
    }
  }, [handleWheel])

  // 触摸支持
  const touchStartY = useRef(0)
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    const deltaY = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(deltaY) > 50) {
      handleWheel({ deltaY } as WheelEvent)
    }
  }, [handleWheel])

  // 绑定事件
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)

    // 首页动画完成后标记为 complete
    const timer = setTimeout(() => {
      setPageStates(prev => {
        const newStates = [...prev]
        newStates[0] = 'complete'
        return newStates
      })
    }, 2000)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      clearTimeout(timer)
    }
  }, [handleWheel, handleKeyDown, handleTouchStart, handleTouchEnd])

  return (
    <div className="app" ref={containerRef}>
      {/* 电路矩阵艺术动画背景 */}
      <CircuitMatrix opacity={0.6} speed={1} density={1} />

      {/* 全局效果层 */}
      {!lowPerformanceMode && (
        <>
          <Noise opacity={0.015} />
          <Scanlines opacity={0.02} />
        </>
      )}

      {/* 页面指示器 */}
      <div className="page-indicator">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={`page-dot ${currentPage === i ? 'is-active' : ''}`}
            onClick={() => {
              if (!isScrolling.current && i !== currentPage) {
                handleWheel({ deltaY: i > currentPage ? 100 : -100 } as WheelEvent)
              }
            }}
          />
        ))}
      </div>

      {/* 页面容器 */}
      <main className="pages-container">
        {/* 第1页：首页艺术动画 */}
        <section
          className={`page page--landing ${currentPage === 0 ? 'is-active' : ''} ${pageStates[0]}`}
          style={{
            transform: `translateY(${-currentPage * 100}vh)`,
          }}
        >
          <Landing state={pageStates[0]} />
        </section>

        {/* 第2页：功能展示 */}
        <section
          className={`page page--features ${currentPage === 1 ? 'is-active' : ''} ${pageStates[1]}`}
          style={{
            transform: `translateY(${(1 - currentPage) * 100}vh)`,
          }}
        >
          <Features state={pageStates[1]} />
        </section>

        {/* 第3页：下载 */}
        <section
          className={`page page--download ${currentPage === 2 ? 'is-active' : ''} ${pageStates[2]}`}
          style={{
            transform: `translateY(${(2 - currentPage) * 100}vh)`,
          }}
        >
          <Download state={pageStates[2]} />
        </section>
      </main>

      {/* 滚动提示 */}
      {currentPage < 2 && pageStates[currentPage] === 'complete' && (
        <div className="scroll-hint">
          <span className="scroll-hint-text">Scroll</span>
          <div className="scroll-hint-arrow">↓</div>
        </div>
      )}
    </div>
  )
}

export default App
