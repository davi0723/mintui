<template>
  <div v-if='hotels.length!==0'>
    <!-- ChooseHotelBTN -->
    <mt-button type="primary" size='large' plain @click='popupVisible=true'>
      <div v-if='currentHotel'>{{currentHotel.hotelName}}</div>
    </mt-button>
    <!-- ChooseHotelList -->
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" position='top' style='width:100%'>
      <mt-index-list>
        <mt-index-section index="酒店选择">
          <mt-cell v-for='item in hotels' :title="item.hotelName" :key='item.id' @click.native='hotelMenuShow(item.id)'></mt-cell>
        </mt-index-section>
      </mt-index-list>
    </mt-popup>
    <!-- currentID -->
    <home-dashboard-overview></home-dashboard-overview>
    <home-dashboard-functions></home-dashboard-functions>
  </div>
</template>
<script>
import HomeDashboardOverview from './HomeDashboardOverview.vue'
import HomeDashboardFunctions from './HomeDashboardFunctions.vue'
import cookie from '../../common/cookie.js'
import { mapGetters } from 'vuex'
import { bus } from '../../bus.js'
export default {
  name: 'HomeDashboard',
  components: { HomeDashboardFunctions, HomeDashboardOverview },
  data() {
    return {
      popupVisible: false
    }
  },
  mounted() {
    this.$store.commit('setHeader', '首页')
  },
  computed: {
    ...mapGetters(['hotels', 'currentID']),
    currentHotel() {
      return this.hotels.filter(v => v.id === this.currentID)[0]
    }
  },
  methods: {
    hotelMenuShow(index) {
      this.popupVisible = false
      this.$store.commit('setCurrentID', index)
      cookie.setCookie('currentID', `${index}`)
      bus.$emit('currentIDChange')
      /*console.log('cookie', cookie.getCookie('currentID'))*/
    }
  }
}

</script>
