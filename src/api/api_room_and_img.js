/**
 * Created by jerry on 2017/11/13.
 * 图书相关api
 */
import * as API from './'

export default {
  // 查找房间房号清单信息，返回数组
  roomGetList: id => {
    return API.POST(`/pc/room/${id}`)
  },
  // 查询可以预定的房间
  roomGetOrderable: params => {
    // 包含起止时间,房间ID
    return API.POST(`/pc/room/free/${params.id}`, params)
  },
  // 新增房间
  roomPost: params => {
    return API.POSTJSON(`/pc/room/add`, params)
  },
  // 删除房间
  roomDelete: id => {
    return API.POSTJSON(`/pc/room/del/${id}`)
  },
  //查询图片列表,id:scaleId
  imgGetList: id => {
    return API.POSTJSON(`/pc/scale/pic/list/${id}`)
  },
  //上传酒店类型图片
  imgPost: (id, data) => {
    return API.POSTIMG(`/pc/scale/pic/${id}`, data)
  },
  //删除图片,id:pictureId
  imgDelete: id => {
    return API.POST(`/pc/scale/pic/del/${id}`)
  },
  // 设置图片为首页展示,id:pictureId
  imgSetIndex: id => {
    return API.POST(`/pc/scale/pic/logo/${id}`)
  },
  /* removeBatch: (ids) => {
     return API.DELETE(`/api/v1/hotels/batch/${ids}`)
   },*/
  getData: () => {
    return API.GET(`/api/online`)
  },
  gateData: () => {
    return API.GET(`/api/gateway`)
  }

}
