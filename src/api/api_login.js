/**
 * Created by jerry on 2017/11/13.
 * 用户相关api
 */
import * as API from './'

export default {
  //登录
  login: params => {
    // return API.POST('/api/v1/users/login', params)
    return API.POST('/pc/login', params)
  },
  logout: () => {
    return API.POST('/pc/logout')
  }
}
