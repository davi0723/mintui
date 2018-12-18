/**
 * Created by jerry on 2017/11/13.
 * 图书相关api
 */
import * as API from './'

export default {

  //查询获取order列表(通过page分页)
  orderGetList: params => {
    return API.POSTJSON('/pc/order/page', params)
  },

  //通过id查询订单
  orderGet: id => {
    //return API.GET(`/api/v1/hotels/${id}`)
    return API.POST(`/pc/scale/${id}`)
  },
  // 订单新增，手动分房
  orderPost: params => {
    return API.POSTJSON(`pc/order/add`, params)
  }
}
