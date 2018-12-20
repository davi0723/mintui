/**
 * Created by jerry on 2017/11/13.
 * 用户相关api
 */
import * as API from './'

export default {
  // 按月查询房价
  priceGetByMonth: params => {
    const id = params.id
    return API.GET(`/pc/scale/price/month/${id}`, params)
  },
  // 按天查询房价
  priceGetByDay: params => {
    const id = params.id
    return API.POST(`/pc/scale/price/day/${id}`, params)
  },
  // 房价新增
  pricePost: params => {
    /* {scaleId : scaleId,
      realAmount : realAmount,
      realHourAmount:realHourAmount,
      realMonthAmount:realMonthAmount,
      priceDate : priceDate ('2018-08-28'),
    } */
    return API.POSTJSON('/pc/scale/price', params)
  },
  // 房价修改，modify
  pricePut: params => {
    return API.PUT('/pc/scale/price', params)
  },
  // 房价查询
  // priceGet: scaleId => {
  //   return API.GET(`/pc/scale/${scaleId}`)
  // },
  listPreOrder30: id => {
    return API.GET(`/pc/room/book/${id}`)
  }
}
