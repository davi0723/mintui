/**
 * Created by jerry on 2017/11/13.
 * 图书相关api
 */
import * as API from './'

export default {

  roleGet: () => {
    return API.POST(`/pc/role`)
    // {ret:1/0,msg:'success',data:''}
  },
  roleDelete:id=>{
    return API.POST(`/pc/role/del/${id}`)
  },
}
