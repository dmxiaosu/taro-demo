import Taro from '@tarojs/taro'
import request from './request'

// H5端走代理 小程序不用
const baseUrl = Taro.getEnv() === 'WEB' ? 'zh' : 'https://news-at.zhihu.com'
export default {
  getList(cb) {
    return request.get(`${baseUrl}/api/4/news/latest`).then(cb)
  },
  getDetail(id, cb) {
    return request.get(`${baseUrl}/api/4/news/${id}`).then(cb)
  }
}
