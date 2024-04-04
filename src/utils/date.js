export function addOneDay(date) {
  var newDate = new Date(date)
  newDate.setDate(newDate.getDate() + 1)
  // 获取年、月、日
  var year = newDate.getFullYear()
  // 月份从 0 开始，所以需要加 1
  var month = ('0' + (newDate.getMonth() + 1)).slice(-2)
  var day = ('0' + newDate.getDate()).slice(-2)

  // 返回格式化后的日期字符串
  return year + '-' + month + '-' + day
}

export function getEndDay(date) {
  var currentDate = new Date(date)
  // 第一天
  var endDay
  if (currentDate.getDate() === 1) {
    // 下个月的第一天
    endDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    // 减去一天，得到当月的最后一天
    endDay.setDate(endDay.getDate() - 1)
  } else {
    // 获取下月的同一天 的前一天
    endDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate() - 1)
  }
  // 获取年、月、日
  var year = endDay.getFullYear()
  // 月份从 0 开始，所以需要加 1
  var month = ('0' + (endDay.getMonth() + 1)).slice(-2)
  var day = ('0' + endDay.getDate()).slice(-2)
  return year + '-' + month + '-' + day
}
