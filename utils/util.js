const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const moment = require('moment.min.js');
const showTime = function handleTime(time) {
  let now = moment(new Date(), 'YYYY-MM-DD HH:mm:ss')
  let diffHours = now.diff(time, 'hours') // 计算时间差值
  let diffDays = now.diff(time, 'days')
  let resultTime
  // 如果时间差小于21小时就显示时间差
  if (diffHours < 21) {
    resultTime = moment(time).fromNow()
  } else if (diffHours >= 21 && diffHours < 42) { // 如果相差时间大于24,小于48小时，就显示昨天+时间
    resultTime = '昨天 ' + moment(time).format('HH:mm')
  } else if (diffDays >= 2 && diffDays < 365) { // 相差时间大于2天，就显示月日+时间
    resultTime = moment(time).format('MM-DD HH:mm')
  } else { // 相差时间大于一年，就显示年月日+时间
    resultTime = moment(time).format('YYYY-MM-DD HH:mm')
  }
  return resultTime
}

module.exports = {
  formatTime: formatTime,
  showTime: showTime
}