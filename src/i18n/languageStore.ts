import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Language } from './translations'

interface LanguageState {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'en', // Default to English
      setLanguage: (lang) => set({ language: lang }),
      toggleLanguage: () => set({ language: get().language === 'en' ? 'zh' : 'en' }),
    }),
    {
      name: 'skillpocket-language',
    }
  )
)
