<template>
  <div>
    <!-- 标题栏 -->
    <mt-header :title="header">
      <!-- <router-link to="/" slot="left"> -->
      <mt-button v-if='menuShow' slot="left" icon="more" @click='showMenu'>菜单</mt-button>
      <mt-button v-else slot="left" icon="back" @click='urlback'>返回</mt-button>
      <!-- </router-link> -->
      <mt-button slot="right" @click='logout'>退出登录</mt-button>
    </mt-header>
    <!-- 导航栏 -->
    <!-- <mt-popup v-model="menuVisible" position="left">
      <mt-index-list>
        <img src="../../../static/logo.png">
        <div v-for='item in $router.options.routes[1].children' :key='item.path'>
          <template>
            <mt-cell :title="item.name" v-if='item.menuShow' @click.native='jumpto(item.path)'>
              <img v-if='item.path===path' slot="icon" :src="item.log2" />
              <img v-else slot="icon" :src="item.log" />
            </mt-cell>
          </template>
        </div>
      </mt-index-list>
    </mt-popup> -->
    <!-- 内容区间 -->
    <router-view></router-view>
  </div>
</template>
<script>
// import { Toast } from 'mint-ui'
// import Dashboard from './Dashboard.vue'
import API from '../../api/api_login.js'
// import cookie from '../../common/cookie.js'
import { mapState } from 'vuex'
import { bus } from '../../bus.js'
export default {
  name: 'Home',
  data() {
    return {
      selected: 1,
      menuVisible: false,
    }
  },
  computed: {
    ...mapState(['menuShow', 'header']),
    path() {
      return this.$route.path
    }
  },
  components: {
    // Dashboard
  },
  mounted() {
    bus.$on('goto', (url) => {
      this.$router.push(url)
    })
  },
  methods: {
    showMenu() {
      this.menuVisible = !this.menuVisible
    },
    jumpto(url) {
      console.log(url)
      this.menuVisible = false
      this.$router.push(url)
    },
    logout() {
      API.logout().then(result => {
        console.log(result)
        if (result && result.ret === 1) {
          this.$router.push('/login')
        } else if (result.ret === 0 && /^session*/.test(result.data)) {
          this.$router.push('/login')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    urlback() {
      this.$router.go(-1)
    }
  }
}

</script>
