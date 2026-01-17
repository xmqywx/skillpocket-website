/**
 * Translations for SkillPocket Website
 * Default: English
 */

export type Language = 'en' | 'zh'

export const translations = {
  en: {
    // Collapse Scene
    collapse: {
      subtitle1: 'MANAGE YOUR CLAUDE SKILLS',
      subtitle2: 'GENERATE BEAUTIFUL ICONS',
      scrollHint: '↓ SCROLL TO DECONSTRUCT ↓',
      system: {
        skillManager: '[SYS] SKILL_MANAGER v2.1.0',
        memory: '[MEM]',
        cpu: '[CPU]',
        warning: '[WARN] SYSTEM_OVERLOAD_DETECTED',
        error: '[ERR] CRITICAL_FAILURE_IMMINENT',
      },
    },

    // Tear Scene
    tear: {
      title: 'FEATURES',
      subtitle: 'Extract order from chaos, make skill management elegant',
      features: {
        skills: {
          title: 'Skill Manager',
          titleCn: 'Skill Manager',
          description: 'Auto-scan and manage your Claude Skills, one-click import, categorize, search',
        },
        icons: {
          title: 'AI Icon Generator',
          titleCn: 'Icon Generator',
          description: 'Input a description, AI generates beautiful SVG icons with multiple styles',
        },
        search: {
          title: 'Smart Search',
          titleCn: 'Smart Search',
          description: 'Fuzzy search, tag filtering, quickly find the Skill you need',
        },
        organize: {
          title: 'Organization',
          titleCn: 'Organization',
          description: 'Custom tags and categories, keep your skill library organized',
        },
        export: {
          title: 'Export & Share',
          titleCn: 'Export & Share',
          description: 'One-click export Skill files, easily share with other developers',
        },
        sync: {
          title: 'Local Sync',
          titleCn: 'Local Sync',
          description: 'Auto-sync Claude local Skills directory, real-time updates',
        },
      },
      appPreview: 'APP PREVIEW',
      tags: 'TAGS',
      searchPlaceholder: 'Search skills...',
      loading: '[LOADING] skill_database.json',
      parsing: '[PARSE] extracting metadata...',
      loaded: '[OK] skills loaded',
    },

    // Explode Scene
    explode: {
      terminal: 'icon-generator',
      prompts: ['create icon: rocket_', 'style: 3D gradient_', 'generating..._'],
      styles: 'AVAILABLE STYLES',
      stats: {
        generated: 'Icons Generated',
        styles: 'Style Options',
        output: 'Vector Output',
      },
    },

    // Order Scene
    order: {
      undoChaos: 'UNDO THE CHAOS',
      restoring: 'RESTORING ORDER',
      tagline: '"From chaos, we create order."',
      highlights: {
        scan: { title: 'Fast Scan', desc: 'Auto-discover local Skills' },
        ai: { title: 'AI Icons', desc: 'One-click beautiful icons' },
        search: { title: 'Smart Search', desc: 'Fuzzy match quick locate' },
        organize: { title: 'Categorize', desc: 'Tag system keeps order' },
        sync: { title: 'Real-time Sync', desc: 'Auto file watching' },
        storage: { title: 'Safe Storage', desc: 'Local storage, privacy safe' },
      },
      testimonials: [
        { text: '"Finally I can manage my messy pile of Skills"', author: '@developer' },
        { text: '"AI icon generation is amazing, each one is unique"', author: '@designer' },
        { text: '"From chaos to order, this is the tool I need"', author: '@creator' },
      ],
    },

    // Download Scene
    download: {
      ready: '> READY TO',
      download: 'DOWNLOAD_',
      desc: 'Free download, runs locally, no internet required, privacy safe',
      platforms: {
        macos: 'macOS',
        windows: 'Windows',
      },
      options: {
        appleSilicon: 'Apple Silicon (M1/M2/M3)',
        intel: 'Intel',
        win64: 'Windows 10/11 (64-bit)',
      },
      stats: {
        skills: 'Skills Managed',
        icons: 'Icons Generated',
        local: 'Local Storage',
        cloud: 'Cloud Dependency',
      },
      builtWith: 'BUILT WITH',
      copyright: '© 2024 SkillPocket. All rights reserved.',
      tagline: 'From chaos, we create order.',
    },

    // Navigation
    nav: {
      collapse: 'Chaos',
      tear: 'Features',
      explode: 'Icons',
      order: 'Order',
      download: 'Download',
    },

    // Language switcher
    language: {
      en: 'EN',
      zh: '中',
    },
  },

  zh: {
    // Collapse Scene
    collapse: {
      subtitle1: '管理你的 CLAUDE 技能',
      subtitle2: '生成精美图标',
      scrollHint: '↓ 滚动解构 ↓',
      system: {
        skillManager: '[系统] 技能管理器 v2.1.0',
        memory: '[内存]',
        cpu: '[处理器]',
        warning: '[警告] 检测到系统过载',
        error: '[错误] 即将发生严重故障',
      },
    },

    // Tear Scene
    tear: {
      title: '功能特性',
      subtitle: '从混乱中提取秩序，让技能管理变得优雅',
      features: {
        skills: {
          title: 'Skill 管理',
          titleCn: 'Skill Manager',
          description: '自动扫描并管理你的 Claude Skills，一键导入、分类、搜索',
        },
        icons: {
          title: 'AI 图标生成',
          titleCn: 'Icon Generator',
          description: '输入描述，AI 自动生成精美 SVG 图标，支持多种风格',
        },
        search: {
          title: '智能搜索',
          titleCn: 'Smart Search',
          description: '模糊搜索、标签过滤，快速找到你需要的 Skill',
        },
        organize: {
          title: '分类整理',
          titleCn: 'Organization',
          description: '自定义标签和分类，让技能库井井有条',
        },
        export: {
          title: '导出分享',
          titleCn: 'Export & Share',
          description: '一键导出 Skill 文件，轻松分享给其他开发者',
        },
        sync: {
          title: '本地同步',
          titleCn: 'Local Sync',
          description: '自动同步 Claude 本地 Skills 目录，实时更新',
        },
      },
      appPreview: '应用预览',
      tags: '标签',
      searchPlaceholder: '搜索技能...',
      loading: '[加载] skill_database.json',
      parsing: '[解析] 提取元数据...',
      loaded: '[完成] 技能已加载',
    },

    // Explode Scene
    explode: {
      terminal: '图标生成器',
      prompts: ['创建图标: 火箭_', '风格: 3D渐变_', '生成中..._'],
      styles: '可用风格',
      stats: {
        generated: '图标已生成',
        styles: '风格选项',
        output: '矢量输出',
      },
    },

    // Order Scene
    order: {
      undoChaos: '撤销混乱',
      restoring: '恢复秩序中',
      tagline: '"从混乱中，我们创造秩序。"',
      highlights: {
        scan: { title: '快速扫描', desc: '自动发现本地 Skills' },
        ai: { title: 'AI 图标', desc: '一键生成精美图标' },
        search: { title: '智能搜索', desc: '模糊匹配快速定位' },
        organize: { title: '分类管理', desc: '标签系统井井有条' },
        sync: { title: '实时同步', desc: '自动监听文件变化' },
        storage: { title: '安全存储', desc: '本地存储隐私无忧' },
      },
      testimonials: [
        { text: '"终于可以管理我那一堆乱七八糟的 Skills 了"', author: '@developer' },
        { text: '"AI 图标生成太惊艳了，每个都是独一无二的"', author: '@designer' },
        { text: '"从混乱到秩序，这就是我需要的工具"', author: '@creator' },
      ],
    },

    // Download Scene
    download: {
      ready: '> 准备',
      download: '下载_',
      desc: '免费下载，本地运行，无需联网，隐私安全',
      platforms: {
        macos: 'macOS',
        windows: 'Windows',
      },
      options: {
        appleSilicon: 'Apple Silicon (M1/M2/M3)',
        intel: 'Intel',
        win64: 'Windows 10/11 (64位)',
      },
      stats: {
        skills: 'Skills 管理',
        icons: '图标生成',
        local: '本地存储',
        cloud: '云端依赖',
      },
      builtWith: '技术栈',
      copyright: '© 2024 SkillPocket. 保留所有权利。',
      tagline: '从混乱中，我们创造秩序。',
    },

    // Navigation
    nav: {
      collapse: '混乱',
      tear: '功能',
      explode: '图标',
      order: '秩序',
      download: '下载',
    },

    // Language switcher
    language: {
      en: 'EN',
      zh: '中',
    },
  },
} as const

export type TranslationKey = keyof typeof translations.en
