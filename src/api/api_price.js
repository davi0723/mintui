/**
 * Created by jerry on 2017/11/13.
 * 用户相关api
 */
import * as API from './'

export default {
  // 按月查询房价
  priceGetMonth: params => {
    const id = params.id
    return API.POST(`/pc/scale/price/month/${id}`, params)
  },
  // 房价新增
  pricePost: params => {
    return API.POSTJSON('/pc/scale/price/add', params)
  },
  // 房价修改，modify
  pricePut: params => {
    return API.POSTJSON('/pc/scale/price/m', params)
  },
  listPreOrder30: id => {
    return API.POSTJSON(`/pc/room/book/${id}`)
  }
}
