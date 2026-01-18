/**
 * 第3页：下载
 * 平台选择 + 下载链接 + 统计数据
 */

import { useEffect, useState } from 'react'
import { useTranslation } from '@/i18n'
import { IconApple, IconWindows, IconGitHub } from '@/components/ui/Icons'

interface DownloadProps {
  state: 'hidden' | 'entering' | 'complete'
}

const TECH_STACK = ['Electron', 'React', 'TypeScript', 'Claude API', 'SQLite']

export function Download({ state }: DownloadProps) {
  const { t } = useTranslation()
  const [animationPhase, setAnimationPhase] = useState(0)
  const [selectedPlatform, setSelectedPlatform] = useState<'macos' | 'windows'>('macos')
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  // 动画序列
  useEffect(() => {
    if (state === 'entering') {
      setAnimationPhase(0)
      const t1 = setTimeout(() => setAnimationPhase(1), 200)
      const t2 = setTimeout(() => setAnimationPhase(2), 400)
      const t3 = setTimeout(() => setAnimationPhase(3), 600)
      const t4 = setTimeout(() => setAnimationPhase(4), 800)
      const t5 = setTimeout(() => setAnimationPhase(5), 1000)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
        clearTimeout(t4)
        clearTimeout(t5)
      }
    } else if (state === 'complete') {
      setAnimationPhase(5)
    }
  }, [state])

  const DOWNLOAD_LINKS = {
    macos: {
      name: t.download.platforms.macos,
      Icon: IconApple,
      options: [
        { label: t.download.options.appleSilicon, arch: 'arm64', size: '45 MB' },
        { label: t.download.options.intel, arch: 'x64', size: '48 MB' },
      ],
    },
    windows: {
      name: t.download.platforms.windows,
      Icon: IconWindows,
      options: [
        { label: t.download.options.win64, arch: 'x64', size: '52 MB' },
      ],
    },
  }

  const STATS = [
    { value: '1000+', label: t.download.stats.skills },
    { value: '500+', label: t.download.stats.icons },
    { value: '100%', label: t.download.stats.local },
    { value: '0', label: t.download.stats.cloud },
  ]

  const getDownloadUrl = () => {
    return `https://github.com/xmqywx/skill-pocket/releases/latest`
  }

  return (
    <div className="download-page">
      <div className="download-wrapper">
        {/* 标题 */}
        <div
          className="download-header"
          style={{
            opacity: animationPhase >= 1 ? 1 : 0,
            transform: animationPhase >= 1 ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <h2 className="download-title">
            <span className="title-line">{t.download.ready}</span>
            <span className="title-line title-line--accent">{t.download.download}</span>
          </h2>
          <p className="download-desc">{t.download.desc}</p>
        </div>

        {/* 平台选择 */}
        <div
          className="platform-selector"
          style={{
            opacity: animationPhase >= 2 ? 1 : 0,
            transform: animationPhase >= 2 ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <button
            className={`platform-tab ${selectedPlatform === 'macos' ? 'is-active' : ''}`}
            onClick={() => setSelectedPlatform('macos')}
          >
            <span className="platform-icon"><IconApple size={24} /></span>
            <span className="platform-name">{DOWNLOAD_LINKS.macos.name}</span>
          </button>
          <button
            className={`platform-tab ${selectedPlatform === 'windows' ? 'is-active' : ''}`}
            onClick={() => setSelectedPlatform('windows')}
          >
            <span className="platform-icon"><IconWindows size={24} /></span>
            <span className="platform-name">{DOWNLOAD_LINKS.windows.name}</span>
          </button>
        </div>

        {/* 下载选项 */}
        <div
          className="download-options"
          style={{
            opacity: animationPhase >= 3 ? 1 : 0,
          }}
        >
          {DOWNLOAD_LINKS[selectedPlatform].options.map((option, i) => {
            const linkId = `${selectedPlatform}-${option.arch}`
            return (
              <a
                key={linkId}
                href={getDownloadUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={`download-option ${hoveredLink === linkId ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredLink(linkId)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  opacity: animationPhase >= 3 ? 1 : 0,
                  transform: animationPhase >= 3 ? 'translateX(0)' : 'translateX(-20px)',
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div className="option-info">
                  <span className="option-marker">■</span>
                  <span className="option-label">{option.label}</span>
                </div>
                <div className="option-meta">
                  <span className="option-size">{option.size}</span>
                  <span className="option-arrow">→</span>
                </div>
              </a>
            )
          })}
        </div>

        {/* 统计数据 */}
        <div
          className="download-stats"
          style={{
            opacity: animationPhase >= 4 ? 1 : 0,
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-item"
              style={{
                opacity: animationPhase >= 4 ? 1 : 0,
                transform: animationPhase >= 4 ? 'scale(1)' : 'scale(0.8)',
                transitionDelay: `${i * 0.08}s`,
              }}
            >
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* 技术栈 */}
        <div
          className="download-tech"
          style={{
            opacity: animationPhase >= 5 ? 1 : 0,
          }}
        >
          <span className="tech-label">{t.download.builtWith}</span>
          <div className="tech-list">
            {TECH_STACK.map((tech, i) => (
              <span
                key={tech}
                className="tech-item"
                style={{
                  opacity: animationPhase >= 5 ? 1 : 0,
                  transitionDelay: `${i * 0.05}s`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 底部链接 */}
        <div
          className="download-footer"
          style={{
            opacity: animationPhase >= 5 ? 1 : 0,
          }}
        >
          <div className="footer-links">
            <a href="https://github.com/xmqywx/skill-pocket" target="_blank" rel="noopener noreferrer" className="footer-link">
              <IconGitHub size={18} />
              GitHub
            </a>
            <a href="https://github.com/xmqywx/skill-pocket/issues" target="_blank" rel="noopener noreferrer" className="footer-link">
              Issues
            </a>
            <a href="https://github.com/xmqywx/skill-pocket/releases" target="_blank" rel="noopener noreferrer" className="footer-link">
              Releases
            </a>
          </div>

          <div className="footer-meta">
            <span className="meta-item">v0.1.0</span>
            <span className="meta-divider">|</span>
            <span className="meta-item">MIT License</span>
          </div>
        </div>

        {/* 版权 */}
        <div
          className="download-copyright"
          style={{ opacity: animationPhase >= 5 ? 0.4 : 0 }}
        >
          <p>{t.download.copyright}</p>
        </div>
      </div>
    </div>
  )
}

export default Download
