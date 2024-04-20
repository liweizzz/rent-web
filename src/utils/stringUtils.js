export function isNotEmpty(str) {
  if (!str && str.length === 0) {
    return false
  }
  if (!str.trim()) {
    return false
  }
  return true
}
