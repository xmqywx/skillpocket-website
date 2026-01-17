/**
 * 场景状态管理
 */

import { create } from 'zustand'

type SceneName = 'prologue' | 'collapse' | 'tear' | 'explode' | 'order' | 'download'

interface SceneState {
  // 当前场景
  currentScene: SceneName
  setCurrentScene: (scene: SceneName) => void

  // 滚动进度
  scrollProgress: number
  setScrollProgress: (progress: number) => void

  // 是否完成序幕
  prologueComplete: boolean
  setPrologueComplete: (complete: boolean) => void

  // 音效开关
  soundEnabled: boolean
  toggleSound: () => void

  // 是否处于"低配模式"
  lowPerformanceMode: boolean
  setLowPerformanceMode: (low: boolean) => void
}

export const useSceneStore = create<SceneState>((set) => ({
  currentScene: 'prologue',
  setCurrentScene: (scene) => set({ currentScene: scene }),

  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),

  prologueComplete: false,
  setPrologueComplete: (complete) => set({ prologueComplete: complete }),

  soundEnabled: false, // 默认静音
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  lowPerformanceMode: false,
  setLowPerformanceMode: (low) => set({ lowPerformanceMode: low }),
}))

export default useSceneStore
