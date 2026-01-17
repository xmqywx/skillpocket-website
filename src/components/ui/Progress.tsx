/**
 * 滚动进度指示器
 * - 垂直进度条
 * - 断断续续的风格（像信号不好）
 */

interface ProgressProps {
  progress: number // 0-1
  sections?: string[] // 章节名称
}

const DEFAULT_SECTIONS = [
  'INIT',
  'COLLAPSE',
  'TEAR',
  'EXPLODE',
  'ORDER',
  'DOWNLOAD',
]

export function Progress({
  progress,
  sections = DEFAULT_SECTIONS,
}: ProgressProps) {
  const currentSection = Math.floor(progress * sections.length)

  return (
    <div className="progress-indicator">
      {/* 进度条 */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            height: `${progress * 100}%`,
            background: 'linear-gradient(to bottom, #fff, #666)',
          }}
        />

        {/* 断点 - 模拟信号问题 */}
        {[0.2, 0.35, 0.5, 0.7, 0.85].map((pos, i) => (
          <div
            key={i}
            className="progress-gap"
            style={{
              top: `${pos * 100}%`,
              height: '2px',
              background: '#000',
            }}
          />
        ))}
      </div>

      {/* 当前章节名 */}
      <div className="progress-label">
        <span className="label-text">
          {sections[currentSection] || sections[sections.length - 1]}
        </span>
      </div>

      <style>{`
        .progress-indicator {
          position: fixed;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .progress-bar {
          position: relative;
          width: 2px;
          height: 200px;
          background: rgba(255, 255, 255, 0.1);
        }
        .progress-fill {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          transition: height 0.1s ease-out;
        }
        .progress-gap {
          position: absolute;
          left: 0;
          width: 100%;
        }
        .progress-label {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          font-family: monospace;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 2px;
        }
      `}</style>
    </div>
  )
}

export default Progress
