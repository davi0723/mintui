<template>
  <div>
    <mt-field label="挂牌价" placeholder="300元/晚" v-model='price'></mt-field>
    <div style=" background: linear-gradient(to right,#e2e2e2,#fff);height:10px;"></div>
    <div v-for="item in options" :key='item.title'>
      <mt-cell>
        <mt-switch v-model="item['is'+item.prop]"></mt-switch>
        <span style="position:absolute;left:30px;">{{item.title}}</span>
      </mt-cell>
      <div v-if="item['is'+item.prop]">
        <div v-for='(prop,index) in item.props' :key='index'>
          <mt-field v-if='prop.ui==="field"' :label="prop.title" placeholder="" v-model='prop.prop'></mt-field>
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
    <br />
    <mt-button size='large' @click.native='settingFix(item)'>确认设置</mt-button>
  </div>
</template>
<script>
// import APIPrice from '../../api/api_price.js'
export default {
  name: 'PricePut',
  data() {
    return {
      price: '',
      asas: 20,
      // 价格数据
      priceData: {},
      // 修改选项
      options: [{
        title: '日租',
        prop: 'Daily',
        isDaily: true,
        props: [{
          prop: 'realAmount',
          title: '日租价格',
          ui: 'field'
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
          porp: 'realServiceAmount',
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
          porp: 'realServiceAmount',
          ui: 'field',
          title: '押金'
        }]
      }, {
        title: '水电单独计费',
        prop: 'Hour1',
        isHour1: true,
        props: [{
          prop: 'realHourAmount',
          ui: 'field',
          title: '电费(元/度)'
        }, {
          porp: 'realServiceAmount',
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

  }
}

</script>
