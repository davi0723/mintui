<template>
  <div>
    <div v-for='item in roomstyle' :key='item.id' class="sty">
      <mt-cell class='p0'>
        <button @click='jumpto(item.id)'><span>修改价格</span></button>
        <h2 class='title1'>{{item.scaleName}}</h2>
        <p class='p1'>今日时租价格：￥{{item.realHourAmount}}</p>
        <p class='p2'>今日整租价格：￥{{item.realAmount}}</p>
        <p class='p3'>服务费：￥{{item.serviceAmount}}</p>
      </mt-cell>
    </div>
  </div>
</template>
<script>
import API from '../../api/api_hotel_and_scale.js'
import { mapGetters } from 'vuex'
export default {
  name: 'StylePrice',
  data() {
    return {
      roomstyle: []
    }
  },
  props: ['id'],
  computed: {
    ...mapGetters(['indextrue'])
  },
  methods: {
    jumpto(id) {
      console.log(id)
      this.$router.push(`/price/${id}`)
    }
  },
  created() {
    // this.$store.commit('index', 1)
    this.$store.commit('setHeader', '房价管理')
    API.scaleGet(this.id).then(res => {
      console.log('res:', res)
      if (res && res.ret === 1) {
        this.roomstyle = res.data
      }
    })
  }
}

</script>
<style scoped>
.sty {
  /* top: 20px; */
  margin-top: 1px;
  border-radius: 0 10px 10px 5px;
}

.title1 {
  position: absolute;
  left: 30px;
  top: 0;
  font-family: PingFangSC;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #f5a623;
}

.p0 {
  /* width: 375px; */
  height: 105px;
  border-radius: 2px;
  background-color: #ffffff;
}

.p0 button {
  position: absolute;
  top: 20px;
  right: 10px;
  border: 0;
  height: 35px;
  border-radius: 2px;
  background-color: #4a90e2;
}

.p0 span {
  width: 56px;
  height: 20px;
  font-family: PingFangSC;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
}

.p1,
.p2,
.p3 {
  position: absolute;
  left: 30px;
  top: 35px;
  font-family: PingFangSC;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #9b9b9b;
}

.p2 {
  top: 60px;
}

.p3 {
  top: 60px;
  left: 180px;
}

</style>
