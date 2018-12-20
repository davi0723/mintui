<template>
  <div>
    <!-- 类型 -->
    <mt-cell style='height:70px'>
      <h3 class='titleLeft'>入住期限</h3>
    </mt-cell>
    <mt-field label='入住时间' type="date" v-model='msgDate '>
    </mt-field>
    <mt-field label='入住天数' type="number" v-model='msgDayNumber'></mt-field>
    <mt-field label="房型选择" v-if='hotelStyle.length!==0 ' :readonly='true' @click.native='hotelStyleChoose=true'>
      <p v-if='hotelStyleChoosed'>{{hotelStyle[hotelStyleChooseIndex].scaleName}} ></p>
      <p v-else>点击选择房号></p>
    </mt-field>
    <mt-field label="房号选择" v-if='hotelStyleChoosed' :readonly='true'>
      <!-- <p>{{hotelStyle[hotelStyleChooseIndex].scaleName}} ></p> -->
      <div v-if='roomNumberArr.length!==0'>
        <mt-badge v-for='(item,index) in roomNumberArr' :key='item.id' style='width:40px;margin-left:5px;margin-top:10px' @click.native='roomNumberChoose(index)' :type='roomType(index)'>{{item.roomNum}}</mt-badge>
      </div>
      <p v-else>房间已满</p>
    </mt-field>
    <!-- hotelStyle -->
    <mt-popup v-model="hotelStyleChoose" position="bottom" style='width:100%'>
      <mt-cell v-for='(item,index) in hotelStyle' :key='item.id' :title='item.scaleName' @click.native='hotelStyleChooseFunc(index)'></mt-cell>
    </mt-popup>
    <!-- orderSource -->
    <mt-popup v-model="clientFromChoose" position="bottom" style='width:100%'>
      <mt-cell v-for='(item,index) in orderSource' :key='index' :title='item' @click.native='clientFromChooseFun(index)'></mt-cell>
    </mt-popup>
    <!-- paymentChoose -->
    <mt-popup v-model="paymentChoose" position="bottom" style='width:100%'>
      <mt-cell v-for='(item,index) in payment' :key='index' :title='item' @click.native='paymentChooseFun(index)'></mt-cell>
    </mt-popup>
    <!-- 入住信息 -->
    <mt-cell style='height:70px'>
      <h3 class='titleLeft'>入住信息</h3>
    </mt-cell>
    <mt-field label="姓名" v-model='msgUsername' placeholder="请输入姓名">
    </mt-field>
    <mt-field label="手机号" v-model='msgPhoneNumber' placeholder="请输入手机号" type='tel'>
    </mt-field>
    <mt-field label="客户来源" :readonly='true' @click.native='clientFromChoose=true'>
      <p>{{orderSource[msgUserFrom]}} ></p>
    </mt-field>
    <mt-field label="支付方式" v-show='msgUserFrom===3' :readonly='true' @click.native='paymentChoose=true'>
      <p>{{payment[paymentChooseIndex]}} ></p>
    </mt-field>
    <mt-field label="订单总价" v-model='msgAmount' type="number">
    </mt-field>
    <mt-button size='large' type='danger' style='margin-top:30px;margin-bottom:30px' @click.native='roomAssignComfirm'>确定分房</mt-button>
  </div>
</template>
<script>
import APIHotel from '../../api/api_hotel_and_scale.js'
import APIOrder from '../../api/api_order.js'
import APIRoom from '../../api/api_room_and_img.js'
import cookie from '../../common/cookie.js'
import { mapGetters } from 'vuex'
import { Toast, MessageBox } from 'mint-ui'
export default {
  name: 'RoomAssign',
  data() {
    return {
      msgDate: `${new Date().getFullYear()}-${String(new Date().getMonth()).padStart(2, '00')}-${String(new Date().getDate()).padStart(2, '00')}`,
      msgDayNumber: 1,
      msgUsername: '',
      msgPhoneNumber: null,
      msgUserFrom: 1,
      msgAmount: null,
      hotelStyle: [],
      hotelStyleChoose: false,
      hotelStyleChooseIndex: 0,
      roomSn: '',
      roomId: null,
      roomNumberArr: ['sd'],
      roomNumberChoosed: 0,
      hotelStyleChoosed: false,
      clientFromChoose: false,
      orderSource: ['哎呦有房', '美团', '携程', '散客', '其它'],
      payment: ['支付宝', '微信', '现金'],
      paymentChoose: false,
      paymentChooseIndex: 0,
    }
  },
  mounted() {
    this.findById()
    this.$store.commit('setHeader', '手动分房')
  },
  computed: {
    ...mapGetters(['currentID']),
    endTime() {
      let [y, m, d] = this.msgDate.split('-')
      let t = new Date(y, m, d)
      let t1 = new Date(t.getTime() + this.msgDayNumber * (24 * 3600 * 1000))
      let y1 = t1.getFullYear()
      let m1 = String(t1.getMonth() + 1).padStart(2, '00')
      let d1 = String(t1.getDate()).padStart(2, '00')
      return `${y1}-${m1}-${d1}`
    }
  },
  methods: {
    paymentChooseFun(index) {
      this.paymentChooseIndex = index
      this.paymentChoose = false
    },
    clientFromChooseFun(index) {
      this.msgUserFrom = index
      this.clientFromChoose = false
    },
    findById() {
      let hotelID = this.currentID || cookie.getCookie('currentID')
      APIHotel.scaleGetList(hotelID).then(result => {
        console.log(result)
        if (result && result.ret === 1) {
          this.hotelStyle = result.data
        }
      }).catch(err => console.log(err.message))
    },
    findRoomOrderable(id) {
      const params = {
        'id': id,
        'startDate': this.msgDate,
        'endDate': this.endTime
      }
      APIRoom.roomGetOrderable(params).then(result => {
        if (result && result.ret === 1) {
          this.roomNumberArr = result.data
          console.log(result.data)
          this.roomSn = result.data[this.roomNumberChoosed].roomNum
          this.roomId = result.data[this.roomNumberChoosed].id
        }
      }).catch(err => console.log(err.message))
    },
    hotelStyleChooseFunc(index) {
      console.log(this.msgDate)
      this.roomNumberChoosed = 0
      this.hotelStyleChoosed = true
      this.hotelStyleChooseIndex = index
      this.hotelStyleChoose = false
      this.findRoomOrderable(this.hotelStyle[index].id)
    },
    roomType(index) {
      return this.roomNumberChoosed === index ? 'error' : 'success'
    },
    roomNumberChoose(index) {
      this.roomNumberChoosed = index
      this.roomSn = this.roomNumberArr[index].roomNum
      console.log(this.roomSn)
      this.roomId = this.roomNumberArr[index].id
    },
    roomAssignComfirm() {
      if (!this.hotelStyleChoosed) {
        Toast({
          message: '请先选择房间类型',
          duration: 800
        })
        return false
      }
      if ((!this.msgPhoneNumber) || (!(/^1[34578]\d{9}$/.test(this.msgPhoneNumber)))) {
        Toast({
          message: '请输入正确的手机号',
          duration: 800
        })
        return false
      }
      let hotelID = this.currentID || cookie.getCookie('currentID')
      const params = {
        hotelId: hotelID,
        scaleId: this.hotelStyle[this.hotelStyleChooseIndex].id,
        startTime: this.msgDate,
        endTime: this.endTime,
        totalPrice: this.msgAmount,
        orderType: 1,
        orderSource: this.msgUserFrom, //3美团,2散客,4携程,5airbnb,6小猪短租,7途家,8自如,9链家,10安居客
        roomUser: this.msgUsername,
        phone: this.msgPhoneNumber,
        roomId: this.roomId,
        roomSn: this.roomSn,
        serviceAmount: null
      }
      APIOrder.orderPost(params).then(result => {
        console.log(result)
        if (result && result.ret === 1) {
          MessageBox({
            title: '分房成功',
            message: `房号:${result.data.roomSn},<br/>房间密码已发送到手机:${result.data.phone}`,
          })
          this.hotelStyleChoosed = false
          this.msgDate = `${new Date().getFullYear()}-${String(new Date().getMonth()).padStart(2, '00')}-${String(new Date().getDate()).padStart(2, '00')}`
          this.msgDayNumber = 1
          this.msgUsername = ''
          this.msgPhoneNumber = null
          this.msgUserFrom = 1
          this.msgAmount = null
          this.roomSn = ''
          this.roomId = null
          this.roomNumberArr = ['sd']
          this.roomNumberChoosed = 0
        }
      }).catch(err => {
        console.log(err.message)
        Toast({
          message: err.message,
          duration: 800
        })
      })
    }
  }
}

</script>
<style scoped>
.titleLeft {
  position: absolute;
  left: 10px;
  bottom: -5px;
  color: black;

}

.titleright {
  width: 70%;
  margin-left: 29%;
}

</style>
