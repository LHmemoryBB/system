
import dayjs from 'dayjs' 
// 时间格式化为：yyyy-MM-dd HH:mm:ss
export function dateTimeFormat(time) {
    return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}
// 时间格式化为：yyyy-MM-dd
export function dateFormat(time) {
    return dayjs(time).format('YYYY-MM-DD')
}
// 时间格式化为：HH:mm:ss
export function timeFormat(time) {
    return dayjs(time).format('HH:mm:ss')
}
 
// 判断日期是不是今天
export function dateIsToday(time) {
    return dayjs(time).isSame(dayjs(), 'day');
}