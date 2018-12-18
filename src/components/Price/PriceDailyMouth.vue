<template>
  <div>
    <!-- 当月 -->
    <div v-for='n in 2' :key='n'>
      <mt-cell :title='y[n-1]+"年"+m[n-1]+"月"'></mt-cell>
      <div>
        <div v-for='item in week' class="datediv" :key='item'>{{item}}</div>
        <div v-if='t[n-1].getDay()!==0' style="display:inline;margin:-4px;">
          <div v-for='item in t[n-1].getDay()' :key='item' class="datediv">&nbsp;</div>
        </div>
        <div v-for='item in datalist[n-1]' class="datediv" :key='item.date' @click='changePrice(item)'>
          <div>{{item.date}}</div>
          <div class="money">¥{{item.price}}</div>
        </div>
        <div style="display:inline;margin:-4px;">
          <div v-for='item in 7' :key='item+200' class="datediv">&nbsp;</div>
        </div>
      </div>
    </div>
    <!-- 弹出窗口 -->
    <mt-popup v-model="popupVisible" position="middle" popup-transition="popup-fade" :closeOnClickModal='false'>
      <div style="width:240px">
        <h3>设置{{changedMonth}}月{{changedDate}}号的房价</h3>
        <mt-field type="number" label='日租价' v-model='changedPrice' placeholder="请输入日租价格"></mt-field>
        <mt-button size='large' @click.native='fixprice'>确定</mt-button>
        <p></p>
        <mt-button size='large' @click.native='cacelfix'>取消</mt-button>
        <p></p>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import API from '../../api/api_price.js'
import { Toast, MessageBox } from 'mint-ui'

const t = new Date()
const y = t.getFullYear()
const m = t.getMonth() + 1
const d = t.getDate()
const days = new Date(y, m, 0).getDate()

const tNext = new Date(y, m + 1, 0)
const yNext = tNext.getFullYear()
const mNext = tNext.getMonth() + 1
const daysNext = tNext.getDate()

export default {
  name: 'PriceDetail',
  data() {
    return {
      t: [t, tNext],
      y: [y, yNext],
      m: [m, mNext],
      // d: d,
      days: [days, daysNext],
      daysNext: daysNext,
      week: ['日', '一', '二', '三', '四', '五', '六'],
      price: 20,
      changedPrice: 0,
      changedDate: 0,
      changedMonth: 0,
      changedYear: 0,
      popupVisible: false,
      datamap0: new Array(32),
      datamap1: new Array(32),
    }
  },
  computed: {
    datalist() {
      const arr = []
      for (let i = d; i <= days; i++) {
        arr.push({
          'date': i,
          'month': m,
          'year': y,
          'price': this.datamap0[i],
        })
      }
      const arr1 = []
      for (let i = 1; i <= daysNext; i++) {
        arr1.push({
          'date': i,
          'year': yNext,
          'month': mNext,
          'price': this.datamap1[i],
        })
      }
      return [arr, arr1]
    }
  },
  props: ['id'],
  methods: {
    mPrice(n) {
      const that = this
      const params = {
        id: this.id,
        year: this.y[n],
        month: this.m[n]
      }
      API.priceGetMonth(params).then(res => {
        console.log('res:', res)
        // that.price = res.order.realAmount
        if (res && res.ret === 1) {
          for (let i = that[`datamap${n}`].length - 1; i >= 0; i--) {
            that[`datamap${n}`][i] = res.order.realAmount
          }
          that[`datamap${n}`].push(1)
          if (res.data.length !== 0) {
            for (let i = res.data.length - 1; i >= 0; i--) {
              that[`datamap${n}`][`${res.data[i].day}`] = res.data[i].realAmount
              that[`datamap${n}`].push(1)
            }
            console.log(that.datalist)
          }
        }
      }).catch(err => {
        Toast({
          message: err.message,
          duration: 900
        })
      })
    },
    changePrice(a) {
      console.log(a)
      this.popupVisible = true
      this.changedPrice = a.price
      this.changedDate = a.date
      this.changedMonth = a.month
      this.changedYear = a.year
    },
    fixprice() {
      if (!this.changedPrice) {
        MessageBox({
          title: '温馨提示',
          message: '请输入日租价格'
        })
        return
      }
      this.popupVisible = false
      this[`datamap${this.m.indexOf(this.changedMonth)}`][this.changedDate] = this.changedPrice
      this[`datamap${this.m.indexOf(this.changedMonth)}`].push(1)
      API.m({
        scaleId: this.id,
        realAmount: this.changedPrice,
        priceDate: `${this.changedYear}-${String(this.changedMonth).padStart(2, '00')}-${String(this.changedDate).padStart(2, '00')}`
      }).then(res => {
        console.log(res)
        if (res && res.ret === 1) {
          Toast({
            message: '价格修改成功',
            duration: 900
          })
          this.changedPrice = 0
          this.changedDate = 0
          this.changedMonth = 0
          this.changedYear = 0
        }
      }).catch(err => {
        Toast({
          message: err.message,
          duration: 900
        })
      })
    },
    cacelfix() {
      this.popupVisible = false
      Toast({
        message: '已经取消修改价格',
        duration: 800
      })
      this.changedDate = 0
      this.changedPrice = 0
      this.changedMonth = 0
      this.changedYear = 0
    }
  },
  created() {
    this.mPrice(0)
    this.mPrice(1)
    this.$store.commit('setHeader', '房价日历')
    /*API.listPreOrder30(this.id).then(res => {
      console.log(res)
    }).catch(err => console.log(err.message))*/
  }
}

</script>
<style scoped>
.datediv {
  width: 14%;
  height: 60px;
  display: inline-block;
  /* border: 1px solid yellow; */
  vertical-align: top;
}

.money {
  margin: 0;
  padding: 0;
  /* border: 1px solid red; */
  margin-top: 10px;
  color: red;
}

</style>
