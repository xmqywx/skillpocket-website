/**
 * 第五幕：下载
 * - 终端风格下载页
 * - 平台选择和下载链接
 * - 更多信息和 CTA
 */

import { useRef, useState, useMemo } from 'react'
import { useTranslation } from '@/i18n'
import { IconApple, IconWindows, IconGitHub } from '@/components/ui/Icons'

interface DownloadProps {
  progress: number
}

const TECH_STACK = ['Electron', 'React', 'TypeScript', 'Claude API', 'SQLite']

export function Download({ progress }: DownloadProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<'macos' | 'windows'>('macos')
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const { t } = useTranslation()

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

  // 计算各元素可见性
  const isVisible = useMemo(() => ({
    header: progress > 0.1,
    platforms: progress > 0.2,
    stats: progress > 0.4,
    tech: progress > 0.6,
    footer: progress > 0.8,
  }), [progress])

  const getDownloadUrl = (_platform: string, _arch: string) => {
    return `https://github.com/xmqywx/skill-pocket/releases/latest`
  }

  return (
    <section ref={containerRef} className="scene scene--download">
      <div className="download-wrapper">
        {/* 头部标题 */}
        <div
          className="download-header"
          style={{
            opacity: isVisible.header ? 1 : 0,
            transform: isVisible.header ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <h2 className="download-title">
            <span className="title-line">{t.download.ready}</span>
            <span className="title-line title-line--accent">{t.download.download}</span>
          </h2>
          <p className="download-desc">
            {t.download.desc}
          </p>
        </div>

        {/* 平台选择 */}
        <div
          className="platform-selector"
          style={{
            opacity: isVisible.platforms ? 1 : 0,
          }}
        >
          <button
            className={`platform-tab ${selectedPlatform === 'macos' ? 'is-active' : ''}`}
            onClick={() => setSelectedPlatform('macos')}
          >
            <span className="platform-icon">
              <IconApple size={24} />
            </span>
            <span className="platform-name">{DOWNLOAD_LINKS.macos.name}</span>
          </button>
          <button
            className={`platform-tab ${selectedPlatform === 'windows' ? 'is-active' : ''}`}
            onClick={() => setSelectedPlatform('windows')}
          >
            <span className="platform-icon">
              <IconWindows size={24} />
            </span>
            <span className="platform-name">{DOWNLOAD_LINKS.windows.name}</span>
          </button>
        </div>

        {/* 下载选项 */}
        <div
          className="download-options"
          style={{
            opacity: isVisible.platforms ? 1 : 0,
          }}
        >
          {DOWNLOAD_LINKS[selectedPlatform].options.map((option, i) => {
            const linkId = `${selectedPlatform}-${option.arch}`
            return (
              <a
                key={linkId}
                href={getDownloadUrl(selectedPlatform, option.arch)}
                target="_blank"
                rel="noopener noreferrer"
                className={`download-option ${hoveredLink === linkId ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredLink(linkId)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  opacity: progress > 0.25 + i * 0.1 ? 1 : 0,
                  transform: progress > 0.25 + i * 0.1 ? 'translateX(0)' : 'translateX(-20px)',
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
            opacity: isVisible.stats ? 1 : 0,
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-item"
              style={{
                opacity: progress > 0.45 + i * 0.05 ? 1 : 0,
                transform: progress > 0.45 + i * 0.05 ? 'scale(1)' : 'scale(0.8)',
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
            opacity: isVisible.tech ? 1 : 0,
          }}
        >
          <span className="tech-label">{t.download.builtWith}</span>
          <div className="tech-list">
            {TECH_STACK.map((tech, i) => (
              <span
                key={tech}
                className="tech-item"
                style={{
                  opacity: progress > 0.65 + i * 0.04 ? 1 : 0,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 分隔线 */}
        <div
          className="download-divider"
          style={{
            opacity: isVisible.footer ? 0.3 : 0,
          }}
        >
          {'─'.repeat(50)}
        </div>

        {/* 底部链接 */}
        <div
          className="download-footer"
          style={{
            opacity: isVisible.footer ? 1 : 0,
          }}
        >
          <div className="footer-links">
            <a
              href="https://github.com/xmqywx/skill-pocket"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <span className="link-icon">
                <IconGitHub size={18} />
              </span>
              GitHub
            </a>
            <a
              href="https://github.com/xmqywx/skill-pocket/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <span className="link-icon">
                <IconGitHub size={18} />
              </span>
              Issues
            </a>
            <a
              href="https://github.com/xmqywx/skill-pocket/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <span className="link-icon">
                <IconGitHub size={18} />
              </span>
              Releases
            </a>
          </div>

          <div className="footer-meta">
            <span className="meta-item">v0.1.0</span>
            <span className="meta-divider">|</span>
            <span className="meta-item">MIT License</span>
            <span className="meta-divider">|</span>
            <span className="meta-item">Made with ♥</span>
          </div>
        </div>

        {/* 版权信息 */}
        <div
          className="download-copyright"
          style={{
            opacity: progress > 0.9 ? 0.4 : 0,
          }}
        >
          <p>{t.download.copyright}</p>
          <p className="copyright-sub">{t.download.tagline}</p>
        </div>
      </div>

      {/* 背景装饰 */}
      <div className="download-bg">
        <div className="bg-grid" style={{ opacity: 0.02 }} />
        <div
          className="bg-glow"
          style={{
            opacity: progress > 0.5 ? 0.1 : 0,
            background: 'radial-gradient(circle at 50% 100%, rgba(108, 92, 231, 0.3) 0%, transparent 50%)',
          }}
        />
      </div>
    </section>
  )
}

export default Download
