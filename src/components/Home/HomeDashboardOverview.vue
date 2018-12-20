<template>
  <div>
    <!-- currentID -->
    <!-- <p>currentHotelID2:{{currentID}}</p> -->
    <div v-for='n in overview' :key='n.label' class="abc">
      <h3>{{n.label}}</h3>
      <p>{{n.title}}：{{n.orderCount}}</p>
      <p>{{n.title0}}：{{n.orderAmount}}</p>
    </div>
  </div>
</template>
<script>
import APICount from '../../api/api_count.js'
import { mapGetters } from 'vuex'
import { bus } from '../../bus.js'
export default {
  name: 'HomeDashboardOverview',
  data() {
    return {
      overview: [{
        label: '昨日收益',
        title0: '总金额',
        title: '订单量',
        orderCount: 0,
        orderAmount: 0,
        func: 'orderBooked',
        daily: true
      }, {
        label: '评论',
        title0: null,
        title: '评论数',
        orderCount: 0,
        orderAmount: 0,
        func: 'recordComment',
        daily: false
      }, {
        label: '当月营收',
        title0: '总金额',
        title: '订单量',
        orderCount: 0,
        orderAmount: 0,
        func: 'orderBookedMonth',
        daily: false
      }, {
        label: '用户浏览',
        title0: null,
        title: '浏览量',
        orderCount: 0,
        orderAmount: 0,
        func: 'recordScan',
        daily: false
      }]
    }
  },
  computed: {
    ...mapGetters(['currentID'])
  },
  mounted() {
    this.overview.forEach((v, k) => {
      this.overviewDataLoad(v, k)
    })
    // bus.$emit('currentIDChange')
    bus.$on('currentIDChange', () => {
      this.overview.forEach((v, k) => {
        this.overviewDataLoad(v, k)
      })
    })
  },
  methods: {
    overviewDataLoad(obj, index) {
      let day1 = new Date()
      day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000)
      let s1 = day1.getFullYear() + '-' + String((day1.getMonth() + 1)).padStart(2, '00') + '-' + String(day1.getDate()).padStart(2, '00')
      const params = {
        hotelId: this.currentID,
        sDate: obj.daily ? s1 : null
      }
      // console.log('s1', s1)
      APICount[obj.func](params).then(result => {
        if (result && result.ret === 1) {
          console.log(obj.label, result)
          this.overview[index].orderCount = result.data || 0
          this.overview[index].orderAmount = result.order || 0
        }
      }).catch(err => {
        console.log(err.message)
      })
    }
  }
}

</script>
<style scoped>
.abc {
  width: 45%;
  /* height: 100px; */
  background: orange;
  margin-top: 20px;
  margin-left: 1px;
  margin-right: 1px;
  display: inline-block;
  border-radius: 10px 10px 10px 60px;
}

</style>
