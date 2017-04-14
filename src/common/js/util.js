/**
* 解析URL参数
*/
export function urlParse () {
  let url = window.location.search
  let query = {}
  let reg = /[?&][^?&]+=[^?&/]+/g
  let params = url.match(reg)
  if (params) {
    params.forEach((item) => {
      let param = item.substring(1).split('=')
      query[param[0]] = param[1]
    })
  }
  return query
}
