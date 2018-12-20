/**
 * Created by jerry on 2017/11/13.
 * 图书相关api
 */
import * as API from './'

export default {

  //查询获取预定book列表(通过page分页)
  orderBookedMonth: params => {
    /*{
      sMonth : 某一月订单预定情况，不下发则查询当月所有订单情况, 格式： ‘2018-10’
      hotelId : 酒店id  不下发查询所有,
      scaleId : 酒店房间类型id, 不下发则查询所有
    }*/
    return API.GET('/pc/order/book/month', params)
  },
  orderBooked: params => {
    /*{
      sDate : 某一天订单预定情况，不下发则查询当前时间之后所有预定,
      hotelId : 酒店id  不下发查询所有,
      scaleId : 酒店房间类型id, 不下发则查询所有
    }*/
    return API.GET('/pc/order/book', params)
  },

  //查询获取一条信息
  refundGet: params => {
    return API.GET('/pc/refund/page', params)
  },
  // 按天查询订单退款总量/退款总金额
  refundDay: params => {
    return API.POST('/pc/refund/day', params)
  },
  // 按月查询退款
  refundMonth: params => {
    return API.POST('/pc/refund/month', params)
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
  // 查询评论数
  recordComment: params => {
    return API.GET(`/pc/comment/date`, params)
  }

}
