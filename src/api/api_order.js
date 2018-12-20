/**
 * Created by jerry on 2017/11/13.
 * 图书相关api
 */
import * as API from './'

export default {

  //查询获取order列表(通过page分页)
  orderGetList: params => {
    // {startPage : 1,recordNum : 10,status:0,hotelId:hotelId}
    return API.POSTJSON('/pc/order/page', params)
  },
  // 1-日租 2-时租 3- 长租
  orderGet1: params => {
    // {startPage : 1,recordNum : 10,hotelId:hotelId}
    return API.GET(`/pc/order/page/type/1`)
  },
  orderGet2: params => {
    // {startPage : 1,recordNum : 10,hotelId:hotelId}
    return API.GET(`/pc/order/page/type/2`)
  },
  orderGet3: params => {
    // {startPage : 1,recordNum : 10,hotelId:hotelId}
    return API.GET(`/pc/order/page/type/3`)
  },

  //通过id查询订单
  orderGet: id => {
    //return API.GET(`/api/v1/hotels/${id}`)
    return API.POST(`/pc/scale/${id}`)
  },
  // 订单新增，手动分房
  orderPost: params => {
    return API.POSTJSON(`pc/order`, params)
  }
}
