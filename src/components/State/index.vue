<template>
  <div>
    <!-- button -->
    <!-- <mt-button plain class='btn'>预定日历</mt-button> -->
    <!-- state -->
    <div style="margin-top:30px;position:relative">
      <div v-for='(v,k) in stateList' :key='v.id' style="height:150px;">
        <div class='layerleft'><h2>{{v.scaleName}}</h2>
        </div>
        <div class='layerright'>
          <div :style='"margin-left:"+marginLeft+"px"' class='layerrightmove'>
            <div v-for='(item,index) in statearr' :key='index' class="div1">
              <!-- {{item}} -->
              <div class="div2" @touchstart='dragphonestart($event)' @touchmove='dragphone($event)'>
                <p>{{item.split('-')[1]}}.{{item.split('-')[2]}}</p>
                <p style="height:8px;margin-top:-10px;color:#9b9b9b;">周{{week[new Date(item.split('-')).getDay()]}}</p>
              </div>
              <div v-if='stateRoomCount[k]&&stateRoomCountOrderable[k]' class="div3" @touchstart='dragphonestart($event)' @touchmove='dragphone($event)'>
                <p v-if='stateRoomCountOrderable[k][item]'><span style="color:green">{{stateRoomCount[k]-stateRoomCountOrderable[k][item]}}&nbsp;</span>/&nbsp;{{stateRoomCount[k]}}</p>
                <p v-else style="color:green">满房</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import API from '../../api/api_price.js'
import util from '../../common/util.js'
import hotelState from '../../api/api_hotel_and_scale.js'
import cookie from '../../common/cookie.js'
import { Toast } from 'mint-ui'
export default {
  name: 'State',
  data() {
    return {
      week: ['日', '一', '二', '三', '四', '五', '六'],
      // statearr: [],
      marginLeft: 0,
      startScreenX: 0,
      stateRoomCount: [],
      stateRoomCountOrderable: [],
      stateid: 0,
      sheetVisible: false,
      // popupVisible: false,
      stateList: []
    }
  },
  computed: {
    ...mapGetters(['currentID']),
    statearr() {
      let statearr = []
      const date = util.format(new Date(), 'yyyy-MM-dd')
      const [y, M, d] = date.split('-')
      for (let i = 1; i <= 60; i++) {
        let a = new Date(y, (Number(M) - 1), (Number(d) + i))
        let b = util.format(a, 'yyyy-MM-dd')
        // console.log('-----', a.toLocaleString(), b)
        statearr.push(b)
      }
      return statearr
    },
  },
  created() {
    this.$store.commit('setHeader', '房态管理')
  },
  mounted() {
    let a = 3
    try {
      this.getStateLists()
    } catch (err) {
      if (a > 0) {
        setTimeout(() => {
          this.getStateLists()
          a--
        }, 3000)
      }
      Toast(err.message)
    }
  },
  methods: {
    getStateLists() {
      let id = this.currentID || cookie.getCookie('currentID')
      hotelState.scaleGetList(id).then(result => {
        if (result && result.ret === 1) {
          this.stateList = result.data
          return this.stateList
        } else {
          throw new Error('sb')
        }
      }).then(result => {
        result.forEach((v, k) => {
          this.getarr(v.id, k)
        })
      })
    },
    dragphone(e) {
      console.log(e)
      let step = ((this.startScreenX - e.changedTouches[0].screenX) / 10)
      if (this.marginLeft - step > 0) {
        this.marginLeft = 0
      } else if (this.marginLeft - step < -1620) {
        this.marginLeft = -1620
      } else {
        this.marginLeft = this.marginLeft - step
      }
    },
    dragphonestart(e) {
      // console.log('ee', e.changedTouches[0].screenX)
      this.startScreenX = e.changedTouches[0].screenX
    },
    getarr(id, k) {
      API.listPreOrder30(id).then(result => {
        // console.log(result)
        if (result && result.ret === 1) {
          this.stateRoomCount[k] = result.order
          this.stateRoomCount.push(1)
          this.stateRoomCountOrderable[k] = result.data
          this.stateRoomCountOrderable.push('1')
        }
      }).catch(() => {})
    }
  }
}

</script>
<style scoped>
.btn {
  margin-top: 20px;
  width: 49%;
  border: 0;
  color: blue;
  border-bottom: 3px solid green;
  border-radius: 0 0 0 0;
}

.layerleft {
  position: absolute;
  left: 0;
  width: 20%;
  height: 143px;
  background-color: orange;
  display: inline;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}

.layerright {
  border-top: 1px solid black;
  width: 80%;
  margin-left: 20%;
  overflow: hidden;
}

.layerrightmove {
  /* margin-left: -430px; */
  /* width: 100%; */
  height: 150px;
  /* margin: 0 0; */
  overflow: hidden;
  white-space: nowrap;
  z-index: -1;
  /* background: #ffffff; */
}

.div1 {
  border-bottom: 1px solid black;
  border-left: 1px solid #9b9b9b;
  height: 143px;
  width: 60px;
  display: inline-block;
  margin-left: -1px;
  margin-bottom: -1px;
}

.div2 {
  /* border: 1px solid #666666; */
  background-color: #e4e4e4;
  height: 63px;
  padding-top: 1px;
}

.div3 {
  padding-top: 1px;
  /* border: 1px solid #666666; */
  background-color: #fff;
  height: 78px;
}

</style>
