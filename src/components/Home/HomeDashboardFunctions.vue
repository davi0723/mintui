<template>
  <div>
    <!-- currentID -->
    <p style="margin-top:50px"></p>
    <div v-for='n in feature' :key='n.name' class="abc">
      <mt-button plain type='primary' size='large' class="btn" @click.native='jumpto(n)'>{{n.name}}</mt-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HomeDashboardFunctions',
  data() {
    return {
      feature: [
        {
          name: '订单管理',
          url: 'order'
        },
        {
          name: '今日房态',
          url: 'stateToday'
        },
        {
          name: '房态管理',
          url: 'state'
        },
        {
          name: '房价管理',
          url: 'price'
        },
        /*{
          name: '房源管理',
          url: 'room'
        },*/
        {
          name: '手动分房',
          url: 'roomassign'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['currentID'])
  },
  methods: {
    jumpto(item) {
      this.$router.push(`${item.url}`)
    }
  }
}

</script>
<style scoped>
.abc {
  width: 30%;
  height: 80px;
  /* background: grey; */
  margin-left: 1px;
  margin-right: 1px;
  display: inline-block;
}

.btn {
  height: 80%;
  width: 90%;
  border-radius: 50% 50% 50% 50%;
}

</style>
