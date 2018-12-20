/**
 * Created by davi
 * 酒店房型api
 */
import * as API from './'

export default {
  // 酒店下线
  hotelLineOff: hotelid => {
    return API.POST(`/pc/hotel/offline/${hotelid}`)
  },
  // 酒店上线
  hotelLineOn: hotelid => {
    return API.POST(`/pc/hotel/online/${hotelid}`)
  },
  //查询获取酒店列表
  hotelGetList: params => {
    // {startPage : 1,recordNum : 10}
    return API.POSTJSON('/pc/hotel/page', params)
  },
  // 查询单个酒店
  hotelGet: hotelId => {
    return API.GET(`/pc/hotel/${hotelId}`)
  },
  // 增加酒店
  hotelPost: params => {
    /* {hotelName : hotelName,  字数限制 64
      province : province,
      city : city,
      county : county,
      longitude : longitude,
      latitude : latitude,
      location : location,必填
      phone : phone, 必填
      cleanType:cleanType,必填 1-外包 2-自扫
      userId:userId,必填
      hotelType:hotelType,物业类型 1.酒店 2.民宿 3.公寓    必填
      description:description 字数限制 256
      isPark:isPark, 是否智能停车 0/1   必填
      isSale:isSale, 是否出售 0/1  必填
      cleaners:cleaners  cleanType=1 必填
    } */
    return API.POSTJSON(`/pc/hotel`, params)
  },
  hotelPut: params => {
    return API.PUT(`/pc/hotel`, params)
  },
  //通过酒店ID查找房型
  scaleGetList: hotelId => {
    return API.POST(`/pc/scale/hotel/${hotelId}`)
  },
  // 房型查询
  sacleGet: scaleId => {
    return API.GET(`/pc/scale/${scaleId}`)
  },
  // 增加房型
  scalePost: params => {
    /* {scaleName : scaleName, 字数限制 32  必填
      description : description,字数限制 128
      hotelId : hotelId,
      roomSize :roomSize, 必填
      bedNum :bedNum, 必填
      bedSize :bedSize,必填
      isHour：isHour 必填 0/1
      isDay：isDay 必填 0/1
      isMonth：isMonth 必填 0/1
      isSublet：isSublet 必填 0/1
      devIds:devIds
      serviceAmount :serviceAmount, isHour 为1 必填
      realHourAmount：realHourAmount isHour 为1 必填
      realAmount：realAmount isDay为1 必填
      realMonthAmount：realMonthAmount isMonth为1 必填
      deposit :deposit isMonth为1 必填
      cleanAmount:cleanAmount 清洁费用 单位 元
      roomPattern：roomPattern 房间格局 1.一室 2.二室 3.三室 4.四室 5.四室以上
      payment：payment 付款方式 1.月付 2.季付 3半年付 4 年付
      book_mark：book_mark 预定须知 字数限制500 多条以;隔开
      room_mark：room_mark 入住须知 字数限制500 多条以;隔开
      contract：contract 合同 字数限制2000 富文本解析
    }   */
    return API.POSTJSON(`/pc/scale`, params)
  },
  // 房型修改
  scalePut: params => {
    return API.PUT(`/pc/scale`, params)
  },
  // 房型删除
  scaleDelete: scaleId => {
    return API.DELETE(`/pc/sacle/${scaleId}`)
  }
}
