import Taro, {Component} from '@tarojs/taro'
import {Swiper, SwiperItem, View, Image} from '@tarojs/components'

class Swipers extends Component<{ data: any }, any> {
  constructor() {
    super(...arguments)
  }

  handlerClick(id: number) {
    console.log(3123123)
    Taro.navigateTo({
      url: `pages/detail/index?id=${id}`
    })
  }

  render() {
    return (
      <Swiper className='test-h' indicatorColor='#666' indicatorActiveColor='#fff' indicatorDots autoplay={false}>
        {
          this.props.data.map((v: any, index: number) => {
            return (
              <SwiperItem key={index} style='width:100%'>
                <View className='si-box'>
                  <Image className='image' src={v.image}></Image>
                  <View className='text bc'></View>
                  <View className='text2' onClick={this.handlerClick.bind(this, v.id)}>{v.title}</View>
                </View>
              </SwiperItem>
            )
          })
        }
      </Swiper>
    )
  }
}

export default Swipers
