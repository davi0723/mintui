<template>
  <div>
    <!-- button -->
    <!-- <mt-button plain class='btn'>今日房态</mt-button> -->
    <div v-show='stateList.length!==0'>
      <h4 plain class="p0" @click='sheetVisible=true '>
        <h3 v-if='stateList[stateid]'>
          <!-- {{stateList[stateid].hotel.hotelName}} -->{{stateList[stateid].scaleName}}
        </h3>
        <img src="../../../static/btn_back@2x.png" height="40" width="40" alt="" />
      </h4>
    </div>
    <!-- list -->
    <mt-popup v-model="sheetVisible" position="left">
      <mt-index-list>
        <img src="../../../static/logo2.png" height="71" width="172" alt="">
        <div v-for='(v,k) in stateList' :key='v.id'>
          <mt-cell :title="v.scaleName" @click.native='changeState(k)'>
            <div style="width:120px"></div>
          </mt-cell>
        </div>
      </mt-index-list>
    </mt-popup>
    <!-- state -->
    <div>
      <div class="layer1" v-for='(item,index) in arr' :key='item'>
        <mt-button class="layer2" :class='"c"+(index+1)' :style='"height:60px;background-color:"+grey[index]' @click.native='filterRoom(index)'>{{item}}{{roomlist.filter(v=>v.status===(index+1)).length}}间</mt-button>
      </div>
    </div>
    <div v-if='roomFilter.length!==0' style="margin-top:30px;">
      <div v-for='item in roomFilter' class="roomdiv" :class='"c"+(item.status)' :key='item.id'>{{item.roomName}}</div><div v-for='k in 5' :key='k+100' class="roomdiv"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ROOM from '../../api/api_room_and_img.js'
import hotelState from '../../api/api_hotel_and_scale.js'
import cookie from '../../common/cookie.js'
export default {
  name: 'StateToday',
  data() {
    return {
      // week: ['日', '一', '二', '三', '四', '五', '六'],
      // statearr: [],
      roomlist: [],
      roomFilter: [],
      arr: ['可预订', '入住中', '清洁中', '维修中'],
      stateid: 0,
      sheetVisible: false,
      // popupVisible: false,
      stateList: [],
      grey: ['', '', '', '']
    }
  },
  computed: {
    ...mapGetters(['currentID'])
  },
  created() {
    this.$store.commit('setHeader', '今日房态')
  },
  mounted() {
    this.getStateLists()
    setTimeout(() => {
      this.findList(this.stateList[this.stateid].id)
    }, 500)
  },
  methods: {
    getStateLists() {
      let id = this.currentID || cookie.getCookie('currentID')
      console.log(id)
      hotelState.scaleGetList(id).then(result => {
        if (result && result.ret === 1) {
          this.stateList = result.data
        }
      })
    },
    findList(id) {
      ROOM.roomGetList(id).then(res => {
        console.log('res:', res)
        if (res && res.ret === 1) {
          res.data.sort((a, b) => {
            const a0 = a.roomName.split('-')
            const a1 = b.roomName.split('-')
            if (a0[0] === a1[0]) {
              if (a0.length === a1.length) {
                return Number(a0[1]) - Number(a1[1])
              } else {
                return a0.length - a1.length
              }
            } else {
              return Number(a0[0]) - Number(a1[0])
            }
          })
          this.roomlist = res.data
          this.roomFilter = res.data
        } else {
          throw new Error('shibai')
        }
      }).catch(err => {
        console.log(err.message)
      })
    },
    changeState(a) {
      // console.log(a)
      this.stateid = a
      this.sheetVisible = false
      this.grey = ['', '', '', '']
      this.findList(this.stateList[a].id)
    },
    filterRoom(id) {
      this.roomFilter = this.roomlist.filter(v => v.status === id + 1)
      this.grey = ['grey', 'grey', 'grey', 'grey']
      this.grey[id] = ''
    }
  }
}

</script>
<style scoped>
.p0 {
  position: relative;
  width: 50%;
  left: 20px;
  font-family: PingFangSC;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #030303;
}

.p0 img {
  position: absolute;
  left: 100%;
  top: -10px;
}

.btn {
  border: 0;
  color: blue;
  border-radius: 0 0 0 0;
  border-bottom: 3px solid green;
}

.layer1 {
  /*   border: 1px solid #666666; */
  width: 23%;
  height: 60px;
  margin-left: 1px;
  margin-right: 1px;
  display: inline-block;
  /* border-radius: 10px 10px 10px 10px; */
  /* background-color: #f1f1f1; */
  margin-top: 20px;
  position: relative;
}

.c1 {
  background-color: #08d66e;
}

.c2 {
  background-color: #f8d347;
}

.c3 {
  background-color: #08afd6;
}

.c4 {
  background-color: #ff8e6c;
}

.layer2 {
  padding-top: 10px;
  padding-bottom: 10px;
  font-family: PingFangSC;
  font-size: 20px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
  border-radius: 10px 10px 10px 10px;
}

.roomdiv {
  display: inline-block;
  width: 18%;
  height: 40px;
  padding-top: 10px;
  vertical-align: top;
  /*border: 1px solid red;*/
  border: none;
  /* background: grey; */
  margin: 2px 2px 2px 2px;
}

</style>
