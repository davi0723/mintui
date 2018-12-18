const setCookie = (name, value, day) => {
  if (day !== 0) { //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
    const expires = day * 24 * 60 * 60 * 1000
    const date = new Date(+new Date() + expires)
    document.cookie = `${name}=${escape(value)};expires=${date.toUTCString()}`
  } else {
    document.cookie = `${name}=${escape(value)}`
  }
}
export default {
  setCookie: setCookie,
  delCookie(name) {
    setCookie(name, 'null', -1)
  },
  getCookie(name) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (document.cookie.match(reg)) {
      return unescape(document.cookie.match(reg)[2])
    } else { return null }
  },
}
