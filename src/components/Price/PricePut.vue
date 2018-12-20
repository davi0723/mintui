<template>
  <div>
    <mt-field label="日租价格" :placeholder='priceData.realAmount+"元/晚"' v-model='price' @blur.native.capture='priceSet' type='number'></mt-field>
    <div style=" background: linear-gradient(to right,#e2e2e2,#fff);height:10px;"></div>
    <div style="margin-bottom: 100px">
      <div v-for="item in options" :key='item.title'>
        <mt-cell>
          <mt-switch v-model="item['is'+item.prop]"></mt-switch>
          <span style="position:absolute;left:30px;">{{item.title}}</span>
        </mt-cell>
        <div v-if="item['is'+item.prop]">
          <div v-for='(prop,index) in item.props' :key='index'>
            <mt-field v-if='prop.ui==="field"' :label="prop.title" placeholder="" v-model='priceData[prop.prop]' :disabled='prop.disable'></mt-field>
            <mt-cell v-else-if='prop.ui==="link"' is-link :to='"/price/"+stateID'>
              <span style="position:absolute;left:30px;color: green">{{prop.title}}</span>
            </mt-cell>
            <mt-range v-else v-model="asas" :min="30" :max="100" :step="1" style='margin-top: 10px;margin-bottom: 10px' :barHeight='10'>
              <div slot="start" style="margin-left: 30px">{{prop.title}} : 30% </div>
              <div slot="end">100%</div>
            </mt-range>
          </div>
        </div>
      </div>
    </div>
    <mt-button type='primary' @click.native='pricePut()' style='position: fixed;bottom: 5px;left:2%;width: 96%'>确认设置</mt-button>
  </div>
</template>
<script>
import API from '../../api/api_hotel_and_scale.js'
import { Toast } from 'mint-ui'
export default {
  name: 'PricePut',
  data() {
    return {
      price: '',
      asas: 50,
      // 价格数据
      priceData: {
        realAmount: ''
      },
      // 修改选项
      options: [{
        title: '日租',
        prop: 'Daily',
        isDaily: true,
        props: [{
          prop: 'realAmount',
          title: '日租价格',
          ui: 'field',
          disable: true
        }, {
          // prop: 'realAmount',
          title: '房价日历',
          ui: 'link'
        }]
      }, {
        title: '时租',
        prop: 'Hour',
        isHour: true,
        props: [{
          prop: 'realHourAmount',
          ui: 'field',
          title: '时租价格'
        }, {
          prop: 'serviceAmount',
          ui: 'field',
          title: '服务费'
        }]
      }, {
        title: '长租折扣',
        prop: 'Month',
        isMonth: true,
        props: [{
          prop: 'realAmount0',
          ui: 'range',
          title: '七天折扣'
        }, {
          prop: 'realAmount',
          ui: 'range',
          title: '一月折扣'
        }, {
          prop: 'realAmount1',
          ui: 'range',
          title: '季度折扣'
        }, {
          porp: 'deposit',
          ui: 'field',
          title: '押金'
        }]
      }, {
        title: '水电单独计费',
        prop: 'Hour1',
        isHour1: true,
        props: [{
          prop: 'cleanAmount',
          ui: 'field',
          title: '电费(元/度)'
        }, {
          porp: 'hourAmount',
          ui: 'field',
          title: '水费(元/吨)'
        }]
      }],
      // 押金
      adapter: ['1', 2]
    }
  },
  computed: {
    stateID() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.priceDataGet()
  },
  methods: {
    priceDataGet() {
      API.sacleGet(this.stateID).then(result => {
        console.log(result)
        if (result && result.ret === 1) {
          this.priceData = result.data
          this.options[0].isDaily = Boolean(result.data.isDay)
          this.options[1].isHour = Boolean(result.data.isHour)
          this.options[2].isMonth = Boolean(result.data.isMonth)
        }
      }).catch(() => {})
    },
    priceSet() {
      if (this.price) {
        this.priceData.realAmount = this.price
        this.price = null
        this.pricePut()
      }
    },
    pricePut() {
      this.priceData.isDay = Number(this.options[0].isDaily)
      this.priceData.isHour = Number(this.options[1].isHour)
      this.priceData.isMonth = Number(this.options[2].isMonth)
      console.log('+++++++++', this.priceData)
      API.scalePut(this.priceData).then(result => {
        if (result && result.ret === 1) {
          Toast({
            message: '修改成功',
            duration: 800
          })
        } else {
          Toast({
            message: '修改价格失败',
            duration: 800
          })
        }
      }).catch(err => {
        Toast({
          message: err.message,
          duration: 800
        })
      })
    }
  }
}

</script>
