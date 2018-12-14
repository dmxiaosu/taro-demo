import Taro, {Component, Config} from '@tarojs/taro'
import {View, Image, ScrollView} from '@tarojs/components'
import './index.scss'
import Api from './../../api/index'

export default class Index extends Component<{}, any> {
  config: Config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super(...arguments)
    this.state = {
      stories: [],
      top_stories: [{image: '', title: '', id: ''}],
      date: '',
      is_loading: false
    }
  }

  componentWillMount() {
    Taro.startPullDownRefresh()
    this.loadData()
  }

  getStringDate(str: string) {
    let y = str.substring(0, 4)
    let m = str.substring(4, 6)
    let d = str.substring(6, 8)
    return y + '年' + m + '月' + d + '日'
  }

  loadData() {
    Api.getList((res: any) => {
      this.setState({
        stories: [{type: 1, title: '今日新闻'}, ...res.data.stories],
        top_stories: res.data.top_stories,
        date: res.data.date
      })
    })
  }

  onShareAppMessage() {
    return {
      title: '测试的小程序',
      path: '/pages/home/index',
    }
  }

  handleClick(id: number) {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
  }

  // 下拉加载更多

  scrolltolower() {
    if (this.state.is_loading) return false
    this.setState({is_loading: true})
    Api.beforeData(this.state.date, res => {
      let arr = [...this.state.stories, {type: 1, title: this.getStringDate(res.data.date)}, ...res.data.stories]
      this.setState({
        date: res.data.date,
        stories: arr,
        is_loading: false
      })
    })
  }

  // 上拉
  scrollToUpper() {
    console.log('上拉')
    // Taro.startPullDownRefresh()
    // this.loadData()
  }

  render() {
    return (
      <ScrollView
        className='index'
        scrollY
        style='height:100vh'
        scrollWithAnimation
        lowerThreshold={100}
        upperThreshold={100}
        onScrollToLower={this.scrolltolower.bind(this)}
        onScrollToUpper={this.scrollToUpper.bind(this)}>
        <View className='top-box' onClick={this.handleClick.bind(this, this.state.top_stories[0].id)}>
          <View className='text bc'></View>
          <View className='text2'>{this.state.top_stories[0].title}</View>
          <Image className='image' src={this.state.top_stories[0].image}></Image>
        </View>
        <View className='content'>
          {
            this.state.stories.map((v: any, index: number) => {
              return (
                v.type === 0 ? (<View className='box' key={index} onClick={this.handleClick.bind(this, v.id)}>
                  <View className='title'>{v.title}</View>
                  <View className='img-box'>
                    <Image className='img' src={v.images[0]}></Image>
                  </View>
                </View>) : (
                  <View className='tag'>{v.title}</View>
                )
              )
            })
          }
        </View>
      </ScrollView>
    )
  }
}

