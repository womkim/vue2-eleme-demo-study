/**
* @id 客户ID
* @key  保存客户信息的键名
* @value  键名对应的键值
*/
export function saveToLocal (id, key, value) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage.__seller__ = JSON.stringify(seller)
}

/**
* @id 客户ID
* @key  保存客户信息的键名
* @def  没有数据时，设置默认值
*/
export function loadToLocal (id, key, def) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    return def
  }
  let sellerID = JSON.parse(seller)[id]
  if (!sellerID) {
    return def
  }
  return sellerID[key] || def
}
