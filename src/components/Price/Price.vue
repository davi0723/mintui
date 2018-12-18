<template>
  <div>
    <!-- <p>{{HotelStateList}}</p> -->
    <!-- <mt-button class='titlebtn' v-for='(item,index) in activeOptions' :key='item.activeID' @click.native='activeBtn(item,index)' :class='activeClass(index)'>{{item.title}}</mt-button> -->
    <!-- <mt-tab-container v-model="active">
      <mt-tab-container-item v-for='item in activeOptions' :key='item.activeID' :id="item.activeID"> -->
    <mt-cell v-for='val in HotelStateList' :key='val.id' @click.native='jumpto(val.id)' style='height:100px;'>
      <h3 class='titleLeft'>{{val.scaleName}}</h3>
      <!-- <h3 style='color:red'>{{val[item.prop]}}</h3><h3>元/{{item.period}}</h3> -->
    </mt-cell>
    <!-- </mt-tab-container-item>
    </mt-tab-container> -->
  </div>
</template>
<script>
import HotelState from '../../api/api_hotel_and_scale.js'
import cookie from '../../common/cookie.js'
import { mapGetters } from 'vuex'
export default {
  name: 'Price',
  data() {
    return {
      active: 'daily',
      HotelStateList: [],
      // activeOptions: [{
      //   title: '时租',
      //   activeID: 'hour',
      //   url: '/hour',
      //   period: '小时',
      //   prop: 'realHourAmount'
      // }, {
      //   title: '日租',
      //   activeID: 'daily',
      //   url: '/daily',
      //   period: '天',
      //   prop: 'realAmount'
      // }, {
      //   title: '长租',
      //   activeID: 'long',
      //   url: '/long',
      //   period: '月',
      //   prop: 'realMonthAmount'
      // }],
      activeID: 1,
    }
  },
  computed: {
    ...mapGetters(['currentID']),
  },
  created() {
    this.$store.commit('setHeader', '房价管理')
  },
  mounted() {
    this.HotelStateListGet()
  },
  methods: {
    HotelStateListGet() {
      let hotelID = this.currentID || cookie.getCookie('currentID')
      HotelState.scaleGet(hotelID).then(result => {
        if (result && result.ret === 1) {
          this.HotelStateList = result.data
          console.log(result.data)
        }
      })
    },
    // activeBtn(item, index) {
    //   this.active = item.activeID
    //   this.activeID = index
    // },
    // activeClass(index) {
    //   return index === this.activeID ? 'red' : ''
    // },
    jumpto(id) {
      // if (url === '/daily') {
      this.$router.push(`/pricefix/${id}`)
      // }
    }
  }
}

</script>
<style scoped>
.titleLeft {
  position: absolute;
  left: 10px;
  top: 23px;
  color: black;
}

.red {
  color: red;
  background-color: orange;
}

/*.titlebtn {
  width: 32%;
  height: 50px;
  margin-bottom: 30px;
  margin-top: 30px;
}*/

</style>
