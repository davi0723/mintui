<template>
  <div id="login">
    <h2>欢迎登录哎哟有房</h2>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field label="密  码" placeholder="请输入密码" type="password" v-model="password" @keyup.enter.native='handleButtonClick'></mt-field>
    <mt-button type="default" size="large" @click="handleButtonClick">登录</mt-button>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
// import API from '../../api/api_order.js'
import API from '../../api/api_login.js'
import cookie from '../../common/cookie.js'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  created() {
    cookie.delCookie('currentID')
    // cookie.delCookie('access-1u2s3e4r')
  },
  methods: {
    handleButtonClick() {
      if (this.username === '') {
        Toast('用户名不能为空')
        return false
      } else if (this.password === '') {
        Toast('密码不能为空')
        return false
      } else {
        const params = {
          'loginName': this.username,
          'password': this.password
        }
        const that = this
        API.login(params).then(result => {
          if (result && result.ret === 1) {
            cookie.setCookie('access-1u2s3e4r', 'nrwhhhwjgsn')
            that.$store.dispatch('loadHotels')
            that.$router.push({ path: '/' })
          } else {
            Toast('登录失败')
          }
        }).catch(err => {
          Toast('登录失败')
          console.log(err)
        })
      }
    }
  }
}

</script>
<style scoped>
h2 {
  margin-top: 80px;
  margin-bottom: 80px;
}

#login {
  width: 260px;
  margin: 0 auto;
}

</style>
