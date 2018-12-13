import Taro from '@tarojs/taro'

export default {
  get(url, para = {}) {
    return Taro.request({url: url, data: para})
  }
}
