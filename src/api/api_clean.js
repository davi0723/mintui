import * as API from './'

export default {
  // 清洁订单列表
  cleanGetList: params => {
    // {startPage : 1,recordNum : 10, status:0 未派单 1 清洁中 2已完成}
    return API.GET('/pc/cleanOrder/page', params)
  },
  //单个删除
  cleanDelete: id => {
    return API.POST(`/pc/cleanOrder/status`, { cleanOrderId: id, status: 2 })
  },
  //手动派单
  cleanPatch: cleanOrderId => {
    return API.POST(`pc/cleanOrder/dispatch/${cleanOrderId}`)
  }
  //批量删除，传ids数组
  cleanDeleteList: (ids) => {
    return API.DELETE(`/api/v1/books/batch/${ids}`)
  }
  // 查询清洁工
  workerGetList: hotelId => {
    return API.GET(`pc/worker/hotel/${hotelId}`)
    // 返回{id:id,user:{id:id,status:0-空闲 1-繁忙 2-休息}}
  }
}
