/**
 * Greenline Industrial Icons
 * Deep green (#2D6A4F) strokes with lime green (#74C365) accent dots
 * Technical drawing style - precise geometry like a blueprint
 */

interface IconProps {
  size?: number
  className?: string
}

// Search Icon - Magnifying glass with crosshair
export function IconSearch({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <circle cx="28" cy="28" r="14" stroke="#2D6A4F" strokeWidth="1.5"/>
      <path d="M38 38L52 52" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 18V22" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 34V38" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18 28H22" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M34 28H38" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="28" cy="28" r="2" fill="#74C365"/>
      <circle cx="52" cy="52" r="2.5" fill="#74C365"/>
      <circle cx="12" cy="12" r="2" fill="#74C365"/>
    </svg>
  )
}

// Create Icon - Plus in circle with corner marks
export function IconCreate({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <circle cx="32" cy="32" r="20" stroke="#2D6A4F" strokeWidth="1.5"/>
      <path d="M32 22V42" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 32H42" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 20V8H20" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M44 8H56V20" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M56 44V56H44" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 56H8V44" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="8" r="2.5" fill="#74C365"/>
      <circle cx="56" cy="56" r="2.5" fill="#74C365"/>
      <circle cx="32" cy="32" r="2" fill="#74C365"/>
    </svg>
  )
}

// Store Icon - Building with awning
export function IconStore({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M10 26L14 14H50L54 26" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="10" y="26" width="44" height="28" stroke="#2D6A4F" strokeWidth="1.5"/>
      <rect x="26" y="38" width="12" height="16" stroke="#2D6A4F" strokeWidth="1.5"/>
      <rect x="14" y="32" width="8" height="8" stroke="#2D6A4F" strokeWidth="1.5"/>
      <rect x="42" y="32" width="8" height="8" stroke="#2D6A4F" strokeWidth="1.5"/>
      <path d="M10 26C14 30 18 26 22 30C26 26 30 30 34 26C38 30 42 26 46 30C50 26 54 30 54 26" stroke="#2D6A4F" strokeWidth="1.5"/>
      <circle cx="32" cy="10" r="2.5" fill="#74C365"/>
      <circle cx="8" cy="40" r="2" fill="#74C365"/>
      <circle cx="56" cy="32" r="1.5" fill="#74C365"/>
    </svg>
  )
}

// Settings Icon - Gear
export function IconSettings({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <circle cx="32" cy="32" r="8" stroke="#2D6A4F" strokeWidth="1.5"/>
      <path d="M32 10V18" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M32 46V54" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 32H18" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M46 32H54" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16.5 16.5L22 22" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M42 42L47.5 47.5" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16.5 47.5L22 42" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M42 22L47.5 16.5" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="32" cy="10" r="2.5" fill="#74C365"/>
      <circle cx="10" cy="32" r="2" fill="#74C365"/>
      <circle cx="54" cy="32" r="2" fill="#74C365"/>
      <circle cx="32" cy="54" r="2" fill="#74C365"/>
    </svg>
  )
}

// Download Icon - Arrow with tray
export function IconDownload({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 8V42" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 32L32 44L44 32" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 48H52V54H12V48Z" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 48L20 40H44L52 48" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="32" cy="8" r="2.5" fill="#74C365"/>
      <circle cx="32" cy="44" r="2" fill="#74C365"/>
      <circle cx="12" cy="54" r="2" fill="#74C365"/>
    </svg>
  )
}

// MySkills Icon - Book/Document
export function IconMySkills({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="14" y="10" width="36" height="44" rx="2" stroke="#2D6A4F" strokeWidth="1.5"/>
      <path d="M22 10V54" stroke="#2D6A4F" strokeWidth="1.5"/>
      <path d="M28 20H42" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 28H38" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 36H40" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 44H36" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="50" cy="14" r="2.5" fill="#74C365"/>
      <circle cx="10" cy="50" r="2" fill="#74C365"/>
      <circle cx="54" cy="46" r="1.5" fill="#74C365"/>
    </svg>
  )
}

// Icons/Palette Icon
export function IconIcons({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 8C18 8 8 18 8 32C8 46 18 56 32 56C36 56 40 54 40 50C40 48 39 46 40 44C41 42 44 40 48 40C52 40 56 36 56 32C56 18 44 8 32 8Z" stroke="#2D6A4F" strokeWidth="1.5"/>
      <circle cx="20" cy="24" r="4" stroke="#2D6A4F" strokeWidth="1.5"/>
      <circle cx="16" cy="38" r="4" stroke="#2D6A4F" strokeWidth="1.5"/>
      <circle cx="28" cy="46" r="4" stroke="#2D6A4F" strokeWidth="1.5"/>
      <circle cx="32" cy="28" r="4" stroke="#2D6A4F" strokeWidth="1.5"/>
      <circle cx="20" cy="24" r="2" fill="#74C365"/>
      <circle cx="32" cy="28" r="2" fill="#74C365"/>
      <circle cx="52" cy="12" r="2.5" fill="#74C365"/>
      <circle cx="48" cy="48" r="1.5" fill="#74C365"/>
    </svg>
  )
}

// Folder Icon
export function IconFolder({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M8 18V50C8 52 10 54 12 54H52C54 54 56 52 56 50V22C56 20 54 18 52 18H30L26 12H12C10 12 8 14 8 16V18Z" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 22H56" stroke="#2D6A4F" strokeWidth="1.5"/>
      <path d="M20 32H44" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 40H36" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="26" cy="12" r="2.5" fill="#74C365"/>
      <circle cx="56" cy="18" r="2" fill="#74C365"/>
      <circle cx="8" cy="50" r="2" fill="#74C365"/>
    </svg>
  )
}

// Refresh/Sync Icon
export function IconRefresh({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 12C20 12 12 22 12 32" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M32 52C44 52 52 42 52 32" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 24L12 32L20 32" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M52 40L52 32L44 32" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="32" cy="32" r="4" stroke="#2D6A4F" strokeWidth="1.5"/>
      <circle cx="32" cy="12" r="2.5" fill="#74C365"/>
      <circle cx="32" cy="52" r="2.5" fill="#74C365"/>
      <circle cx="32" cy="32" r="2" fill="#74C365"/>
    </svg>
  )
}

// Favorite/Star Icon
export function IconFavorite({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 10L38 26H54L42 36L46 52L32 44L18 52L22 36L10 26H26L32 10Z" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 18L36 28H44L38 34L40 44L32 40L24 44L26 34L20 28H28L32 18Z" stroke="#2D6A4F" strokeWidth="1"/>
      <circle cx="32" cy="10" r="2.5" fill="#74C365"/>
      <circle cx="54" cy="26" r="2" fill="#74C365"/>
      <circle cx="10" cy="26" r="2" fill="#74C365"/>
    </svg>
  )
}

// Globe Icon
export function IconGlobe({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <circle cx="32" cy="32" r="22" stroke="#2D6A4F" strokeWidth="1.5"/>
      <ellipse cx="32" cy="32" rx="10" ry="22" stroke="#2D6A4F" strokeWidth="1.5"/>
      <ellipse cx="32" cy="32" rx="4" ry="22" stroke="#2D6A4F" strokeWidth="1"/>
      <path d="M10 32H54" stroke="#2D6A4F" strokeWidth="1.5"/>
      <path d="M14 20H50" stroke="#2D6A4F" strokeWidth="1"/>
      <path d="M14 44H50" stroke="#2D6A4F" strokeWidth="1"/>
      <circle cx="32" cy="10" r="2.5" fill="#74C365"/>
      <circle cx="10" cy="32" r="2" fill="#74C365"/>
      <circle cx="54" cy="32" r="2" fill="#74C365"/>
    </svg>
  )
}

// Tags Icon
export function IconTags({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M12 32L12 16L28 16L44 32L28 48L12 32Z" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 32L20 20L32 20L48 36L32 52L20 40" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="20" cy="24" r="3" stroke="#2D6A4F" strokeWidth="1.5"/>
      <circle cx="20" cy="24" r="1.5" fill="#74C365"/>
      <circle cx="44" cy="32" r="2.5" fill="#74C365"/>
      <circle cx="52" cy="44" r="2" fill="#74C365"/>
    </svg>
  )
}

// Upload Icon
export function IconUpload({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 42V8" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 20L32 8L44 20" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 48H52V54H12V48Z" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 48L20 40H44L52 48" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="32" cy="8" r="2.5" fill="#74C365"/>
      <circle cx="32" cy="42" r="2" fill="#74C365"/>
      <circle cx="52" cy="54" r="2" fill="#74C365"/>
    </svg>
  )
}

// User Icon
export function IconUser({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <circle cx="32" cy="20" r="12" stroke="#2D6A4F" strokeWidth="1.5"/>
      <path d="M10 54C10 42 20 34 32 34C44 34 54 42 54 54" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="32" cy="8" r="2.5" fill="#74C365"/>
      <circle cx="10" cy="54" r="2" fill="#74C365"/>
      <circle cx="54" cy="54" r="2" fill="#74C365"/>
    </svg>
  )
}

// Code Icon
export function IconCode({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M20 18L8 32L20 46" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M44 18L56 32L44 46" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M38 12L26 52" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="32" r="2.5" fill="#74C365"/>
      <circle cx="56" cy="32" r="2.5" fill="#74C365"/>
      <circle cx="26" cy="52" r="2" fill="#74C365"/>
    </svg>
  )
}

// Terminal Icon
export function IconTerminal({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="8" y="12" width="48" height="40" rx="4" stroke="#2D6A4F" strokeWidth="1.5"/>
      <path d="M8 20H56" stroke="#2D6A4F" strokeWidth="1.5"/>
      <path d="M16 30L24 38L16 46" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M30 46H44" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="14" cy="16" r="2" fill="#74C365"/>
      <circle cx="22" cy="16" r="2" fill="#2D6A4F"/>
      <circle cx="30" cy="16" r="2" fill="#2D6A4F"/>
      <circle cx="24" cy="38" r="2" fill="#74C365"/>
    </svg>
  )
}

// Apple/macOS Icon - Apple Company Logo Style
export function IconApple({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Apple logo shape */}
      <path d="M44 22c-3-4-6-5-10-5-2 0-4 1-4 1s-2-1-4-1c-4 0-8 3-10 7-4 8-2 20 5 28 2 3 5 4 7 4 2 0 3-1 4-1 1 0 2 1 4 1 2 0 5-1 7-4 7-8 9-20 5-28z" stroke="#2D6A4F" strokeWidth="1.5" fill="none"/>
      {/* Leaf */}
      <path d="M32 16c0-7 5-11 10-12" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="42" cy="4" r="2" fill="#74C365"/>
      <circle cx="32" cy="52" r="1.5" fill="#74C365"/>
    </svg>
  )
}

// Windows Icon
export function IconWindows({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M8 16L28 12V30H8V16Z" stroke="#2D6A4F" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M32 11L56 6V30H32V11Z" stroke="#2D6A4F" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 34H28V52L8 48V34Z" stroke="#2D6A4F" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M32 34H56V58L32 53V34Z" stroke="#2D6A4F" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="8" cy="16" r="2.5" fill="#74C365"/>
      <circle cx="56" cy="6" r="2.5" fill="#74C365"/>
      <circle cx="56" cy="58" r="2" fill="#74C365"/>
    </svg>
  )
}

// GitHub Icon
export function IconGitHub({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 8C18 8 8 18 8 32C8 44 16 54 28 56V48C24 49 22 46 21 44C20 42 18 40 16 40C18 40 20 42 22 44C24 46 28 46 28 44V40C18 38 14 34 14 28C14 25 15 22 17 20C16 18 16 15 17 12C17 12 20 12 24 15C27 14 30 14 32 14C34 14 37 14 40 15C44 12 47 12 47 12C48 15 48 18 47 20C49 22 50 25 50 28C50 34 46 38 36 40V44C36 48 36 50 36 56C48 54 56 44 56 32C56 18 46 8 32 8Z" stroke="#2D6A4F" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="32" cy="8" r="2.5" fill="#74C365"/>
      <circle cx="8" cy="32" r="2" fill="#74C365"/>
      <circle cx="36" cy="56" r="2" fill="#74C365"/>
    </svg>
  )
}

// Bolt/Lightning Icon
export function IconBolt({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M36 8L16 36H30L28 56L48 28H34L36 8Z" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="36" cy="8" r="2.5" fill="#74C365"/>
      <circle cx="28" cy="56" r="2.5" fill="#74C365"/>
      <circle cx="16" cy="36" r="2" fill="#74C365"/>
    </svg>
  )
}

// Export/Share Icon
export function IconExport({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 8V36" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 20L32 8L44 20" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 32V52C12 54 14 56 16 56H48C50 56 52 54 52 52V32" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="32" cy="8" r="2.5" fill="#74C365"/>
      <circle cx="12" cy="32" r="2" fill="#74C365"/>
      <circle cx="52" cy="32" r="2" fill="#74C365"/>
    </svg>
  )
}

// Storage/Database Icon
export function IconStorage({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <ellipse cx="32" cy="16" rx="20" ry="8" stroke="#2D6A4F" strokeWidth="1.5"/>
      <path d="M12 16V32C12 36 20 40 32 40C44 40 52 36 52 32V16" stroke="#2D6A4F" strokeWidth="1.5"/>
      <path d="M12 32V48C12 52 20 56 32 56C44 56 52 52 52 48V32" stroke="#2D6A4F" strokeWidth="1.5"/>
      <circle cx="32" cy="8" r="2.5" fill="#74C365"/>
      <circle cx="12" cy="32" r="2" fill="#74C365"/>
      <circle cx="52" cy="48" r="2" fill="#74C365"/>
    </svg>
  )
}

// SkillPocket App Icon - Matches the actual app icon
export function IconSkillPocket({ size = 64, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <defs>
        <linearGradient id="sp-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F172A"/>
          <stop offset="100%" stopColor="#1E293B"/>
        </linearGradient>
        <linearGradient id="sp-glow" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#818CF8"/>
          <stop offset="100%" stopColor="#6366F1"/>
        </linearGradient>
      </defs>

      {/* Dark background */}
      <rect width="64" height="64" rx="14" fill="url(#sp-bg)"/>

      {/* Subtle grid hint */}
      <rect x="12" y="12" width="40" height="40" rx="3" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.5"/>

      {/* Top bracket */}
      <path
        d="M21 19 L31 19 C35 19, 38 22, 38 26 L38 29"
        stroke="url(#sp-glow)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bottom bracket (mirrored) */}
      <path
        d="M43 45 L33 45 C29 45, 26 42, 26 38 L26 35"
        stroke="url(#sp-glow)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Center dot */}
      <circle cx="32" cy="32" r="2.5" fill="#818CF8"/>
      <circle cx="32" cy="32" r="1.25" fill="white"/>
    </svg>
  )
}

// Designer Icon (for testimonials)
export function IconDesigner({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="8" y="8" width="48" height="40" rx="2" stroke="#2D6A4F" strokeWidth="1.5"/>
      <path d="M8 16H56" stroke="#2D6A4F" strokeWidth="1.5"/>
      <path d="M16 28L24 36L16 44" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M28 44H44" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 56L32 48L40 56" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="14" cy="12" r="2" fill="#74C365"/>
      <circle cx="22" cy="12" r="2" fill="#2D6A4F"/>
      <circle cx="24" cy="36" r="2" fill="#74C365"/>
    </svg>
  )
}

// Creator Icon (for testimonials)
export function IconCreator({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <circle cx="32" cy="32" r="20" stroke="#2D6A4F" strokeWidth="1.5"/>
      <path d="M32 12V20" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M32 44V52" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 32H20" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M44 32H52" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="32" cy="32" r="8" stroke="#2D6A4F" strokeWidth="1.5"/>
      <circle cx="32" cy="12" r="2.5" fill="#74C365"/>
      <circle cx="52" cy="32" r="2" fill="#74C365"/>
      <circle cx="32" cy="32" r="2" fill="#74C365"/>
    </svg>
  )
}

// Export all icons as a map
export const Icons = {
  search: IconSearch,
  create: IconCreate,
  store: IconStore,
  settings: IconSettings,
  download: IconDownload,
  mySkills: IconMySkills,
  icons: IconIcons,
  folder: IconFolder,
  refresh: IconRefresh,
  favorite: IconFavorite,
  globe: IconGlobe,
  tags: IconTags,
  upload: IconUpload,
  user: IconUser,
  code: IconCode,
  terminal: IconTerminal,
  apple: IconApple,
  windows: IconWindows,
  github: IconGitHub,
  bolt: IconBolt,
  export: IconExport,
  storage: IconStorage,
  skillpocket: IconSkillPocket,
  designer: IconDesigner,
  creator: IconCreator,
}

export default Icons
