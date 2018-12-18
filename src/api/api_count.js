/**
 * Created by jerry on 2017/11/13.
 * 图书相关api
 */
import * as API from './'

export default {

  //查询获取预定book列表(通过page分页)
  booked: params => {
    // return API.POSTJSON('/pc/order/status/page', params)
    return API.POST('/pc/order/book', params)
  },

  //查询获取一条信息
  refund: params => {
    // return API.GET(`/api/v1/hotels/${id}`)
    return API.POSTJSON('/pc/refund/page', params)
    // return API.POST(`/pc/scale/${id}`)
  },
  // 按天查询退款
  refundd: params => {
    // return API.GET(`/api/v1/hotels/${id}`)
    return API.POST('/pc/refund/day', params)
    // return API.POST(`/pc/scale/${id}`)
  },
  // 按月查询退款
  refundm: params => {
    // return API.GET(`/api/v1/hotels/${id}`)
    return API.POST('/pc/refund/month', params)
    // return API.POST(`/pc/scale/${id}`)
  },
  // 按月查询订单
  findmonth: params => {
    // return API.POSTJSON('/pc/order/status/page', params)
    return API.POST('/pc/order/book/month', params)
  },
  // 查询浏览数
  recordScan: params => {
    return API.POST(`/pc/scan/record/date`, params)
  },
  recordComment: params => {
    return API.POST(`/pc/comment/date`, params)
  }

}
