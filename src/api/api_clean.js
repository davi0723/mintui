import * as API from './'

export default {

  cleanGet: params => {
    return API.POSTJSON('/pc/cleanOrder/page', params)
  },

  //单个删除
  cleanDelete: id => {
    return API.POST(`/pc/cleanOrder/status`,{cleanOrderId:id,status:2})
  },

  //批量删除，传ids数组
  cleanDeleteList: (ids) => {
    return API.DELETE(`/api/v1/books/batch/${ids}`)
  }

}
