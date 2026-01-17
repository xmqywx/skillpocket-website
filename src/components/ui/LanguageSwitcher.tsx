/**
 * Language Switcher Component
 * Toggle between English and Chinese
 */

import { useTranslation } from '@/i18n'

export function LanguageSwitcher() {
  const { language, toggleLanguage, t } = useTranslation()

  return (
    <button
      className="language-switcher"
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'en' ? 'Chinese' : 'English'}`}
    >
      <span className={`lang-option ${language === 'en' ? 'is-active' : ''}`}>
        {t.language.en}
      </span>
      <span className="lang-divider">/</span>
      <span className={`lang-option ${language === 'zh' ? 'is-active' : ''}`}>
        {t.language.zh}
      </span>
    </button>
  )
}

export default LanguageSwitcher
