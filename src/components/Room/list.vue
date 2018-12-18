<template>
  <div>
    <div v-show='list.length===0'>
      暂无房间
    </div>
    <mt-cell-swipe v-for='item in list' :key='item.roomName'>
      <span class="mobP">房间号：{{item.roomName}}</span>
      <p class="mobb" @click='changeStyle'>修改房型</p>
      <!-- <mt-button class="mobb" plain size='small'>修改房型</mt-button> -->
      {{roomStatus[item.status]}}
    </mt-cell-swipe>
  </div>
</template>
<script>
import API from '../../api/api_room_and_img.js'
import { Toast } from 'mint-ui'
export default {
  name: 'RoomList',
  data() {
    return {
      list: [],
      roomStatus: ['未上线', '可预订', '已入住', '清洁中', '维修中']
    }
  },
  props: ['id'],
  created() {
    this.findList(this.id)
    this.$store.commit('setHeader', '房型修改')
  },
  methods: {
    findList(id) {
      API.roomGetList(id).then(res => {
        console.log('res:', res)
        if (res && res.ret === 1) {
          this.list = res.data
        } else {
          throw new Error('shibai')
        }
      }).catch(err => {
        Toast(err.message)
      })
    },
    changeStyle() {
      Toast('err.message')
    }
  }
}

</script>
<style scoped>
.mobP {
  position: absolute;
  left: 20px;
  /* top: 5px; */
}

.mobb {
  position: absolute;
  left: 50%;
  top: 2px;
  margin-left: -10px;
  color: blue;
}

</style>
