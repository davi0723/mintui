<template>
  <div>
    <div :auto="0" class='hotellist' v-for='(item,index) in hotels' :key='item.id'>
      <div class="hotelmenu" @click='jumpto(index)'>
        <div class="l0" :style="'backgroundColor:'+colorarr[index%colorarr.length]"></div>
        <h2 class="l1">{{item.hotelName}}</h2>
        <h4 class="l2">{{item.location}}</h4>
        <span class="l3">{{item.city}}{{item.county}}</span>
      </div>
      <div v-if='path'>
        <StylePrice v-show='index===showSubmenu' :id='item.id'></StylePrice>
      </div>
      <div v-else>
        <RoomStyle v-show='index===showSubmenu' :id='item.id'></RoomStyle>
      </div>
    </div>
  </div>
</template>
<script>
import API from '../../api/api_hotel_and_scale.js'
import StylePrice from '../Price'
import RoomStyle from '../RoomStyle'
// import util from '../../../common/util.js'
import { mapGetters } from 'vuex'
export default {
  name: 'Hotel',
  data() {
    return {
      showSubmenu: 0,
      startPage: 1,
      recordNum: 20,
      loading: false,
      colorarr: ['#4a90e2', '#f9687a', '#ffb740']
    }
  },
  created() {
    console.log(this.hotels)
  },
  computed: {
    ...mapGetters(['hotels']),
    path() {
      return this.$route.path === '/price'
    }
  },
  components: {
    RoomStyle,
    StylePrice
  },
  methods: {
    jumpto(id) {
      this.showSubmenu = id
    },
    search() {
      let that = this
      let params = {
        startPage: that.startPage,
        recordNum: that.recordNum,
      }
      that.loading = true
      API.hotelGet(params).then(function(result) {
        that.loading = false
        if (result && result.ret === 1 && result.data) {
          that.hotels = result.data
          // console.log('酒店:', result.data)
        }
      }).catch(function(error) {
        that.loading = false
        console.log(error)
      })
    },
  }
}

</script>
<style>
.hotellist {
  margin-top: 30px;
  border: 1px solid #e1e1e1;
  border-radius: 8px 8px 8px 8px;
  box-shadow: 2px 2px 20px #e1e1e1;
}

.hotelmenu {
  height: 85px;
  position: relative;
}

.l0,
.l1,
.l2,
.l3 {
  height: 85px;
  position: absolute;
}

.l0 {
  width: 14px;
  /* background: grey; */
}

.l0 h2 {
  margin-top: 40px;
}

.l1 {
  left: 40px;
  height: 25px;
  font-family: PingFangSC;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #3c3c3c;
}

.l2 {
  left: 40px;
  top: 40px;
  font-family: PingFangSC;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #9b9b9b;
}

.l3 {
  right: 20px;
  top: 50px;
  font-family: PingFangSC;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #9b9b9b;
}

</style>
