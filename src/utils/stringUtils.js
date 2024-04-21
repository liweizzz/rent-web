export function isNotEmpty(str) {
  if (!str && str.length === 0) {
    return false
  }
  if (!str.trim()) {
    return false
  }
  return true
}

export function isNotEmptyArray(arr) {
  return Array.isArray(arr) && arr.length !== 0
}
