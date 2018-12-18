<template>
<template>
  <div>
    <div>
      <mt-cell :title='y+"年 "+m+"月"' class='headcell'>
      </mt-cell>
      <mt-cell v-for='(item,index) in datalist' :key='index' class='maincell'>
        <h2 class='cellh2'>{{item.date}}号</h2>
        <h2 class='cellh3'>周{{item.week}}</h2>
        <p class="cellp1">时租价格</p>
        <p class="cellp0"><span @click='setprice(item)'>￥ {{item.price}}</span></p>
        <p class="cellp2">日租价格</p>
        <p class="cellp3"><span @click='setprice(item)'>￥ {{item.price2}}</span></p>
      </mt-cell>
    </div>
    <div>
      <mt-cell :title='(m===12?y+1:y)+"年 "+(m===12?0:m+1)+"月"' class='headcell'>
      </mt-cell>
      <mt-cell v-for='(item,index) in dateNextlist' :key='index' class='maincell'>
        <h2 class='cellh2'>{{item}}</h2>
        <p class="cellp1">日租价格</p>
        <p class="cellp0">￥ {{price}}</p>
        <p class="cellp2">时租价格</p>
        <p class="cellp3">￥ {{price2}}</p>
      </mt-cell>
    </div>
    <mt-popup v-model="popupVisible" position="middle" popup-transition="popup-fade" :closeOnClickModal='false'>
      <div style="width:240px">
        <h3>设置{{datefix}}号(周{{weekfix}})房价</h3>
        <mt-field type="number" label='时租价' v-model='pricefix' placeholder="请输入时租价格"></mt-field>
        <mt-field type="number" label='日租价' v-model='pricefix2' placeholder="请输入日租价格"></mt-field>
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
// import API2 from '../../api/api_hotel.js'
// import { bus } from '../../bus.js'
import { Toast } from 'mint-ui'
const t = new Date()
const y = t.getFullYear()
const m = t.getMonth() + 1
const d = t.getDate()
const days = new Date(y, m, 0).getDate()
const daysNext = new Date(m === 12 ? y + 1 : y, m === 12 ? 0 : m + 1, 0).getDate()
const week = ['日', '一', '二', '三', '四', '五', '六']

export default {
  name: 'PriceDetail',
  data() {
    return {
      y: y,
      m: m,
      price: 20,
      price2: 10,

      pricefix: 0,
      pricefix2: 0,

      datefix: 0,
      weekfix: '',

      datamap: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0,
        21: 0,
        22: 0,
        23: 0,
        24: 0,
        25: 0,
        26: 0,
        27: 0,
        28: 0,
        29: 0,
        30: 0,
        31: 0
      },
      datamap2: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0,
        21: 0,
        22: 0,
        23: 0,
        24: 0,
        25: 0,
        26: 0,
        27: 0,
        28: 0,
        29: 0,
        30: 0,
        31: 0
      },
      popupVisible: false
    }
  },
  computed: {
    datalist() {
      const arr = []
      // const map = new Map()
      let w = new Date().getDay()

      for (let i = d; i <= days; i++) {
        arr.push({
          'date': i,
          'week': week[(w % 7)],
          'price': this.datamap[`${i}`] || this.price,
          'price2': this.datamap2[`${i}`] || this.price2,
        })
        w++
      }
      return arr
    },
    dateNextlist() {
      const arr = []
      let w = new Date(y, m - 1, days).getDay()
      // console.log(w)
      for (let i = 1; i <= daysNext; i++) {
        w++
        arr.push(`${i}号周${week[(w % 7)]}`)
      }
      return arr
    }
  },
  props: ['id'],
  methods: {
    mPrice() {
      const that = this
      API.mPrice(this.id).then(res => {
        console.log('res:', res)
        if (res && res.ret === 1 && res.data.length !== 0) {
          that.price = res.order.realHourAmount
          that.price2 = res.order.realAmount
          for (let i = res.data.length - 1; i >= 0; i--) {
            that.datamap[`${res.data[i].day}`] = res.data[i].realHourAmount
            that.datamap2[`${res.data[i].day}`] = res.data[i].realAmount
            // that.price = res.data[i].realMonthAmount
          }
        }
      })
    },
    setprice(a) {
      console.log(a)
      /*MessageBox.prompt('请输入价格').then(({ value, action }) => {
        value
      }).catch(err => console.log(err.message))*/
      this.pricefix = a.price
      this.datefix = a.date
      this.weekfix = a.week
      this.pricefix2 = a.price2
      this.popupVisible = true
    },
    fixprice() {
      this.datamap[this.datefix] = this.pricefix
      this.datamap2[this.datefix] = this.pricefix2
      API.m({
        scaleId: this.id,
        realHourAmount: this.pricefix,
        realAmount: this.pricefix2,
        priceDate: `2018-11-${this.datefix}`
      }).then(res => {
        console.log(res)
        if (res && res.ret === 1) {
          this.popupVisible = false
          Toast({
            message: '价格修改成功',
            duration: 900
          })
          this.datefix = 0
          this.weekfix = ''
          this.pricefix = 0
          this.pricefix2 = 0
        }
      }).catch(err => {
        Toast({
          message: err.message,
          duration: 900
        })
      })
    },
    cacelfix() {
      Toast({
        message: '已经取消修改价格',
        duration: 800
      })
      this.popupVisible = false
      this.pricefix2 = 0
      this.datefix = 0
      this.weekfix = ''
      this.pricefix = 0
    }
  },
  created() {
    this.mPrice()
    API.tai(this.id).then(res => {
      console.log(res)
    }).catch(err => console.log(err.message))
  }
}

</script>
<style scoped>
.headcell {
  background-color: #f1f2f6;
}

.maincell {
  height: 77px;
}

.cellh2,
.cellh3 {
  position: absolute;
  left: 20px;
  width: 40px;
  text-align: center;
  /* top: 8px; */
  font-family: PingFangSC;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  /* color: #3c3c3c; */
  color: #000;
}

.cellh3 {
  top: 40px;
  font-size: 13px;
  color: grey;
}

.cellh2 {
  font-size: 18px;
  top: 8px;
}

.cellp1,
.cellp0 {
  position: absolute;
  right: 120px;
}

.cellp0,
.cellp3 {
  top: 35px;
  font-family: PingFangSC;
  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #4a90e2;
}

.cellp1,
.cellp2 {
  top: 10px;
}

.cellp2,
.cellp3 {
  position: absolute;
  right: 30px;
}

</style>
