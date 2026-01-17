/**
 * 顶部导航菜单
 * - 固定在页面顶部
 * - 点击快速滚动到对应场景
 * - 当前场景高亮显示
 * - 包含语言切换器
 */

import { useCallback, useMemo } from 'react'
import { useSceneStore } from '@/stores/sceneStore'
import { useTranslation } from '@/i18n'
import { IconSkillPocket } from '@/components/ui/Icons'

// 场景滚动位置配置 (对应 500vh 的滚动高度 - 移除了 Explode 场景)
const SCENE_POSITIONS = {
  collapse: 0,
  tear: 0.20,
  order: 0.55,
  download: 0.80,
}

export function Navigation() {
  const { scrollProgress, prologueComplete } = useSceneStore()
  const { language, toggleLanguage, t } = useTranslation()

  // 导航项目 - 移除了 Icons
  const navItems = useMemo(() => [
    { id: 'collapse', label: t.nav?.collapse || 'Chaos', position: SCENE_POSITIONS.collapse },
    { id: 'tear', label: t.nav?.tear || 'Features', position: SCENE_POSITIONS.tear },
    { id: 'order', label: t.nav?.order || 'Order', position: SCENE_POSITIONS.order },
    { id: 'download', label: t.nav?.download || 'Download', position: SCENE_POSITIONS.download },
  ], [t])

  // 当前活跃的场景
  const activeScene = useMemo(() => {
    if (scrollProgress < 0.18) return 'collapse'
    if (scrollProgress < 0.50) return 'tear'
    if (scrollProgress < 0.75) return 'order'
    return 'download'
  }, [scrollProgress])

  // 滚动到指定场景
  const scrollToScene = useCallback((position: number) => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const targetScroll = position * scrollHeight
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    })
  }, [])

  // 序幕未完成时不显示
  if (!prologueComplete) return null

  return (
    <nav className="navigation">
      {/* Logo */}
      <a
        className="nav-logo"
        onClick={() => scrollToScene(0)}
        role="button"
        tabIndex={0}
      >
        <IconSkillPocket size={28} className="nav-logo-icon" />
        <span className="nav-logo-text">SkillPocket</span>
      </a>

      {/* 导航项目 */}
      <div className="nav-items">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeScene === item.id ? 'is-active' : ''}`}
            onClick={() => scrollToScene(item.position)}
          >
            <span className="nav-item-label">{item.label}</span>
            <span className="nav-item-indicator" />
          </button>
        ))}
      </div>

      {/* 语言切换器 */}
      <button
        className="nav-lang-switcher"
        onClick={toggleLanguage}
        aria-label={`Switch to ${language === 'en' ? 'Chinese' : 'English'}`}
      >
        <span className={`lang-option ${language === 'en' ? 'is-active' : ''}`}>
          EN
        </span>
        <span className="lang-divider">/</span>
        <span className={`lang-option ${language === 'zh' ? 'is-active' : ''}`}>
          中
        </span>
      </button>

      {/* 进度条 */}
      <div className="nav-progress">
        <div
          className="nav-progress-bar"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </nav>
  )
}

export default Navigation
