import { useLanguageStore } from './languageStore'
import { translations } from './translations'

export function useTranslation() {
  const { language, setLanguage, toggleLanguage } = useLanguageStore()
  const t = translations[language]

  return {
    t,
    language,
    setLanguage,
    toggleLanguage,
    isEnglish: language === 'en',
    isChinese: language === 'zh',
  }
}
