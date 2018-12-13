import Taro, {Component, Config} from '@tarojs/taro'
import {View, RichText,Image} from "@tarojs/components";
import Api from './../../api/index'
import './index.scss'

export default class Detail extends Component<{}, any> {
  config: Config = {
    navigationBarTitleText: '详情'
  }

  constructor() {
    super(...arguments)
    this.state = {
      data: ''
    }
  }

  componentWillMount() {
    Api.getDetail(this.$router.params.id, res => {
      this.setState({data: res.data})
    })
  }

  render() {
    return (
      <View className='detail'>
        <View className='top'>
          <Image className='img' src={this.state.data.image} />
          <View className='text'>{this.state.data.title}</View>
        </View>
        <RichText nodes={this.state.data.body}/>
      </View>
    )
  }
}
