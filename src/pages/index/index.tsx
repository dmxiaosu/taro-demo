import Taro, {Component, Config} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import './index.scss'
import Api from './../../api/index'
import Swipers from './swiper'

export default class Index extends Component<{}, any> {
  config: Config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super(...arguments)
    this.state = {
      stories: [],
      top_stories: []
    }
  }

  componentWillMount() {
    this.loadData()
  }

  loadData() {
    Api.getList((res: any) => {
      this.setState({stories: res.data.stories, top_stories: res.data.top_stories})
    })
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  handlerClick(id: number) {
    Taro.navigateTo({
      url: `pages/detail/index?id=${id}`
    })
  }

  render() {
    return (
      <View className='index'>
        <View className='top-box'>
          <Swipers data={this.state.top_stories}/>
        </View>
        <View className='content'>
          {
            this.state.stories.map((v: any, index: number) => {
              return (
                <View className='box' key={index} onClick={this.handlerClick.bind(this, v.id)}>
                  <View className='title'>{v.title}</View>
                  <View>
                    <Image className='img' src={v.images[0]}></Image>
                  </View>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}

