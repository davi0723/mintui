<template>
  <div>
    <div v-for='item in roomstyle' :key='item.id' class="sty">
      <mt-cell class='p0'>
        <button @click='jumpto(item.id)'><span>编辑</span></button>
        <h2 class='title1'>{{item.scaleName}}</h2>
      </mt-cell>
    </div>
  </div>
</template>
<script>
import API from '../../api/api_hotel_and_scale.js'
import RoomList from '../Room/list.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'RoomStyle',
  data() {
    return {
      roomstyle: []
    }
  },
  components: {
    RoomList
  },
  props: ['id'],
  computed: {
    ...mapGetters(['indextrue'])
  },
  methods: {
    jumpto(id) {
      this.$router.push(`/style/${id}`)
    }
  },
  created() {
    // this.$store.commit('index', 1)
    this.$store.commit('setHeader', '房型管理')
    API.scaleGetList(this.id).then(res => {
      // console.log('res:', res)
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
  height: 55px;
  border-radius: 2px;
  background-color: #ffffff;
}

.p0 button {
  position: absolute;
  top: 10px;
  right: 10px;
  height: 35px;
  /* box-shadow: none; */
  border: 0;
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

</style>
