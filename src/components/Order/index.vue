<template>
  <div>
    <mt-navbar v-model="selected">
      <mt-tab-item v-for='(item,index) in statusList' :id='index' :key='item.id' fixed>{{item.label}}</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item v-for='(item,index) in statusList' :id='index' :key='item.id'>
        <tabPane :id='item.id'></tabPane>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import tabPane from './tabPane.vue'

export default {
  name: 'Order',
  data() {
    return {
      selected: 1,
      statusList: [{
        id: 1,
        label: '待入住',
      }, {
        id: 2,
        label: '已入住',
      /*}, {
        id: 3,
        label: '已取消',*/
      }, {
        id: 4,
        label: '已退房',
      }, {
        id: 7,
        label: '已完成',
      }, ],
    }
  },
  components: {
    tabPane
  },
  created() {
    this.$store.commit('setHeader', '订单管理')
  },
  methods: {

  }
}

</script>
<style>
</style>
