/**
 * Created by jerry on 2017/11/13.
 * 图书相关api
 */
import * as API from './'

export default {
  // 根据房间id查询
  roomGet: id => {
    return API.GET(`/pc/room/${id}`)
  },
  // 根据房型查询房间列表
  roomGetList: scaleId => {
    return API.GET(`/pc/room/scale/${scaleId}`)
  },
  // 查询可以预定的房间
  roomGetOrderable: params => {
    // 包含起止时间,房间ID
    return API.GET(`/pc/room/free/${params.id}`, params)
  },
  // 新增房间
  roomPost: params => {
    // {roomNum : roomNum,字数限制20 必填
    //   roomName : roomName,字数限制20
    //   roomScaleId : scaleId,
    //   lockType：lockType,锁类型 1 哎呦有房 2果加   必填
    //   roomSale：roomSale,是否出售 0 不是 1 是
    //   isGate:isGate   是否大门  必填
    //   parentId：parentId  大门id
    //   mac : mac,  必填
    //   register:register,
    //   hotelId:hotelId,
    //   ammeter:ammeter,是否安装智能电表 0 否 1 是
    //   ammeterNo:ammeterNo,电表设备号
    //   ammeterPrice:ammeterPrice,电表单价（单位元
    //   property:property,是否代缴物业 0 否 1 是
    //   water:water,是否代缴水费 0 否 1 是
    //   gas:gas 是否代缴燃气费 0 否 1 是
    // }
    return API.POSTJSON(`/pc/room`, params)
  },
  // 修改房间
  roomPut: params => {
    return API.PUT(`/pc/room`, params)
  },
  // 删除房间
  roomDelete: roomId => {
    return API.DELETE(`/pc/room/${roomId}`)
  },
  // 查询大门信息
  roomGetParent: hotelId => {
    return API.GET(`/pc/room/parent/${hotelId}`)
  },
  // 锁房
  roomLock: roomId => {
    return API.POST(`pc/room/lock/${roomId}`)
  },
  // 报修
  roomRepair: roomId => {
    return API.POST(`/pc/room/repair/${roomId}`)
  },
  // 上线
  roomOnline: roomId => {
    return API.POST(`/pc/room/online/${roomId}`)
  },
  //查询图片列表
  imgGetList: scaleId => {
    return API.GET(`/pc/scale/pic/${scaleId}`)
  },
  //上传酒店类型图片
  imgPost: (id, data) => {
    return API.POSTIMG(`/pc/scale/pic/${id}`, data)
  },
  //删除图片,picId:pictureId
  imgDelete: picId => {
    return API.DELETE(`/pc/scale/pic/${picId}`)
  },
  // 设置图片为首页展示,id:pictureId
  imgSetIndex: id => {
    return API.POST(`/pc/scale/pic/logo/${id}`)
  },
  /* removeBatch: (ids) => {
     return API.DELETE(`/api/v1/hotels/batch/${ids}`)
   },*/
  // 房间新增设备
  devPost: params => {
    /*{devName : devName,字数限制20
      logo : logo,base64 大小不超过200kb
      description:description,字数限制64
      sort:sort,
      devType:devType  1.普通设备 2.检修设备
    }*/
    return API.POSTJSON(`/pc/room/dev`, params)
  },
  // 查询房型所有设备
  devGetListActive: scaleId => {
    return API.GET(`/pc/room/dev/scale/${scaleId}`)
  },
  // 查询所有设备
  devGetList: () => {
    return API.GET(`/pc/room/dev`)
  },
  // 查询单个设备
  devGet: devId => {
    return API.GET(`/pc/room/dev/${devId}`)
  },
  // 删除单个设备
  devDelete: devId => {
    return API.DELETE(`/pc/room/dev/${devId}`)
  },
  getData: () => {
    return API.GET(`/api/online`)
  },
  gateData: () => {
    return API.GET(`/api/gateway`)
  }

}
