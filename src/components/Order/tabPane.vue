<template>
  <div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <mt-cell v-for="(v,k) in orderList" :key='k' class='cell'>
        <!-- 头像 -->
        <!-- <img v-if='v.user' :src="v.user.headUrl" onerror="this.src='http://www.echartsjs.com/images/logo.png'"/> -->
        <div>
          <p class="cellp0">
            {{orderType[v.orderType]}}
          </p>
          <p class="cellp1">姓名：
            <span v-if='v.user'>{{String(v.user.realName)}}</span>
          </p>
          <p class="cellp2">电话：
            <span>{{String(v.phone)}}</span>
          </p>
          <p class="cellp6">房号：
            <span style="color:black">{{String(v.roomSn)}}</span>
          </p>
          <p class="cellp3">时间：
            <span v-if='v.hotel'>{{v.startTime}}</span>
          </p>
          <p class="cellp5">
            <span v-if='v.hotel' class="endt">{{v.endTime}}</span>
          </p>
          <p class="cellp4">价格：
            <span style="color:blue">{{v.totalPrice}}</span>
          </p>
        </div>
      </mt-cell>
    </div>
  </div>
</template>
<script>
import API from '../../api/api_order.js'
import { mapGetters } from 'vuex'
export default {
  name: 'tabPane',
  data() {
    return {
      list: [1],
      startPage: 1,
      recordNum: 10,
      orderList: [],
      recordSum: null,
      loading: true,
      page: 1,
      orderType: ['你妹', '日租', '时租', '长租'],
    }
  },
  props: ['id'],
  created() {
    this.getPageOrder()
  },
  computed: {
    ...mapGetters(['currentID']),
  },
  methods: {
    getPageOrder() {
      const params = {
        startPage: this.startPage,
        recordNum: this.recordNum,
        status: this.id,
        hotelId: this.currentID
      }
      API.orderGetList(params).then(result => {
        if (result && result.ret === 1) {
          this.orderList = result.data
          this.recordSum = result.order.recordSum
          this.loading = !(result.order.recordSum > (this.startPage * this.recordNum))
          console.log(this.loading)
        }
      }).catch(e => console.log(e.message))
    },
    loadMore() {
      this.loading = true
      this.startPage++
      const params = {
        startPage: this.startPage,
        recordNum: this.recordNum,
        status: this.id,
        hotelId: this.currentID
      }
      setTimeout(() => {
        API.orderGetList(params).then(result => {
          // console.log('order:', result)
          if (result && result.ret === 1) {
            this.recordSum = result.order.recordSum
            this.orderList.push(...result.data)
            this.loading = !(result.order.recordSum > (this.startPage * this.recordNum))
          }
        }).catch(e => console.log(e.message))
      }, 2000)
    }
  }
}

</script>
<style scoped>
.cell {
  height: 126px;
  min-width: 300px;
}

.cell img {
  width: 80px;
  height: 80px;
  top: 20px;
  position: absolute;
  left: 20px;
  /* border-radius: 20px 20px 20px 20px; */
}

.cell P {
  position: absolute;
  left: 95px;
}

.cell .cellp1 {
  top: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cell .cellp2 {
  top: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cell .cellp3 {
  top: 36px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cell .cellp5 {
  top: 50px;
  left: 147px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cell .cellp4 {
  top: 88px;
}

.cell .cellp6 {
  top: 70px;
}

.cell .cellp0 {
  /* top: 70px; */
  top: 0;
  left: 20px;
  background: grey;
  width: 55px;
  height: 55px;
  padding-top: 45px;
  font-size: 20px;
  color: yellow;
}

</style>
