<template>
  <div>
    <h2>{{id}}</h2>
    <mt-swipe :auto="0" class='swipe' v-for='(item,index) in list' :key='item.label'>
      <mt-swipe-item>
        <div class="sss" :style='"background-color:"+colorlist[index%3]'></div>
        <h2 class="l">{{item.label}}</h2><br />
        <h1 class="l2">￥ {{item.money}}</h1>
        <span class="l3">共{{item.num}}笔</span>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
import API from '../../api/api_count.js'
import util from '../../common/util.js'
export default {
  name: 'Dashboard',
  data() {
    return {
      list: [{
        label: '昨日总收入',
        money: 1212,
        num: 152
      }, {
        label: '今日营收',
        money: 1250,
        num: 125
      }, {
        label: '今日退款',
        money: 10,
        num: 1345
      }, {
        label: '本月总收入',
        money: 120,
        num: 125
      }, {
        label: '本月总退款',
        money: 120,
        num: 125
      }],
      id: '哎哟有房',
      money: 200,
      num: 122225,
      colorlist: ['#4a90e2', '#ffb740', '#f96e7f']
    }
  },
  created() {
    this.$store.commit('setHeader', '哎哟有房/首页')
    this.getlist()
    // this.$store.dispatch('loadHotels')
  },
  methods: {
    handleChange(a) {
      console.log(a)
    },
    getlist() {
      // const that = this
      const params = {
        'sDate': util.formatDate.format(new Date(), 'yyyy-MM-dd'),
        'hotelId': null,
        'scaleId': null
      }
      API.booked().then(result => {
        if (result && result.ret === 1) {
          this.list[0].money = result.order
          this.list[0].num = result.data
        }
      }).catch(e => console.log(e.message))
      API.booked(params).then(result => {
        // console.log(params, result)
        if (result && result.ret === 1) {
          this.list[1].money = result.order
          this.list[1].num = result.data
        }
      }).catch(e => console.log(e.message))
      API.findmonth().then(result => {
        if (result && result.ret === 1) {
          this.list[3].money = result.order
          this.list[3].num = result.data
        }
      }).catch(e => console.log(e.message))

      API.refundd().then(result => {
        if (result && result.ret === 1) {
          this.list[2].money = result.order
          this.list[2].num = result.data
        }
      }).catch(e => console.log(e.message))
      API.refundm().then(result => {
        if (result && result.ret === 1) {
          this.list[4].money = result.order
          this.list[4].num = result.data
        }
      }).catch(e => console.log(e.message))
    },
  }
}

</script>
<style scoped>
.swipe {
  height: 113px;
  margin-top: 30px;
  /* border: 1px solid grey; */
  border-radius: 0px 0px 8px 8px;
  box-shadow: 2px 2px 20px #e1e1e1;
}

.sss,
.l,
.l2,
.l3 {
  position: absolute;
}
.sss{
  width: 100%;
  height: 35px;
}

.l {
  left: 20px;
  color: #fff;
  font-size: 20px;
  top: -10px;
}

.l2 {
  left: 30px;
  top: 50px;
  color: blue;
  font-size: 32px
}

.l3 {
  right: 20px;
  top: 80px;
}

</style>
