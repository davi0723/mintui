/**
 * Created by jerry on 2017/11/13.
 * 图书相关api
 */
import * as API from './'

export default {

  roleGet: () => {
    return API.POST(`/pc/role`)
  },
  roleDelete:id=>{
    return API.POST(`/pc/role/del/${id}`)
  },
}
