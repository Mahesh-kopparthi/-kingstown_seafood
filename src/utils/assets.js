/**
 * Resolve a public-folder asset path against Vite's runtime base URL.
 *
 * Vite replaces `import.meta.env.BASE_URL` at build time:
 *   - dev:        '/'
 *   - production: '/kingstown-seafood/'   (matches vite.config base)
 *
 * Usage:
 *   asset('/images/bg.mp4')        → '/kingstown-seafood/images/bg.mp4'
 *   asset('/images/mainlogo.png')  → '/kingstown-seafood/images/mainlogo.png'
 */
export function asset(path) {
  // import.meta.env.BASE_URL always ends with '/'
  // path always starts with '/' — strip the leading slash before joining
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}${path}`
}
