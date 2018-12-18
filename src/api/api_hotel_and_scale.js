/**
 * Created by jerry on 2017/11/13.
 * 图书相关api
 */
import * as API from './'

export default {

  //查询获取酒店列表
  hotelGet: params => {
    return API.POSTJSON('/pc/hotel/page', params)
    // return API.GET('/api/v1/hotels/', params)
  },

  //通过酒店ID查找房型
  scaleGet: id => {
    // return API.GET(`/api/v1/hotels/${id}`)
    return API.POST(`/pc/scale/${id}`)
  },
  // 增加酒店
  HotelPost: params => {
    return API.POSTJSON(`/pc/hotel/add`, params)
  },
  // 增加房型
  scalePost: params => {
    return API.POSTJSON(`/pc/scale/add`, params)
  },
  // 房型修改
  scalePut: params => {
    return API.POSTJSON(`/pc/scale/m`, params)
  }
}
