<template>
  <div>
    <mt-swipe :auto="4000" class='mtswipe'>
      <mt-swipe-item v-for='item in list' :key="item.id">
        <div class="btn1">
          <mt-button plain size='small' type='primary' @click='deleteImg(item.id)'>删除照片</mt-button>
          <mt-button plain size='small' type='primary' @click='setIndex(item.id)'>首页展示</mt-button>
          <mt-button plain size='small' type='primary'>上传照片
            <input v-show='true' ref="file" type="file" class="file-input" accept="image/*" :multiple="false" @change="change" />
          </mt-button>
        </div>
        <img  :src='`https://www.aiyoyoufang.com/pic/${item.picUrl}`' alt="" height="200" width="100%" />
      </mt-swipe-item>
    </mt-swipe>
    <div class="mob">
      <!-- <mt-cell>
        <p>房间类型</p>
        <span>></span>
      </mt-cell> -->
      <mt-cell>
        <p>接受时租</p>
        <mt-switch v-model="value"></mt-switch>
      </mt-cell>
      <mt-cell value=">">
        <p>房间描述</p>
        <span>></span>
      </mt-cell>
      <mt-cell>
        <p>所有房间</p>
        <mt-button plain @click='jumpto'>修改房型</mt-button>
      </mt-cell>
      <mt-cell>
        <p>入住须知</p>
        <span>></span>
      </mt-cell>
      <mt-cell>
        <p>房间资源</p>
        <span>></span>
      </mt-cell>
      <mt-cell @click.native='setPrice()'>
        <p>价格设置</p>
        <b>></b>
      </mt-cell>
    </div>
    <mt-cell>
      <mt-button type='primary' size='large'>保存修改</mt-button>
    </mt-cell>
    <mt-popup v-model="popupVisible" position="middle" popup-transition="popup-fade">
      <div style="width:240px">
        <h3>设置房价</h3>
        <mt-field type="number" placeholder="请输入钟点房价格"></mt-field>
        <mt-field type="number" placeholder="请输入过夜房价格"></mt-field>
        <mt-field type="number" placeholder="请输入服务费价格"></mt-field>
        <mt-button size='large' @click.native='popupVisible=false'>确定</mt-button>
        <p></p>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import API from '../../api/api_room_and_img.js'
import { Toast } from 'mint-ui'
export default {
  name: 'IMG',
  data() {
    return {
      list: null,
      value: true,
      sheetVisible: false,
      popupVisible: false
    }
  },
  props: ['id'],
  created() {
    this.imgGet()
  },
  methods: {
    imgGet() {
      API.imgGet(this.id).then(res => {
        if (res && res.ret === 1) {
          console.log(res)
          this.list = res.data
        }
      }).catch(err => {
        console.log(err.message)
      })
    },
    change(e) {
      let file = e.target.files[0]
      console.log(file)
      let formData = new FormData()
      formData.append('imgFile', file)
      //总大小
      API.imgPost(this.id, formData).then(result => {
        if (result && result.ret === 1) {
          Toast('图片上传成功')
          this.imgGet()
        }
        // this.uploadImgList.push(formData);
        // this.size = this.size + file.size;
      }).catch((e) => { console.log(e.message) })
    },
    deleteImg(id) {
      API.imgDelete(id).then(res => {
        if (res && res.ret === 1) {
          Toast('删除图片成功')
          this.imgGet()
        }
      }).catch(err => { Toast(err.message) })
    },
    setIndex(id) {
      API.imgSetIndex(id).then(res => {
        if (res && res.ret === 1) {
          Toast('设置图片首页展示成功')
          this.imgGet()
        }
      }).catch(err => { Toast(err.message) })
    },
    jumpto() {
      console.log(this.id)
      this.$router.push(`/room/${this.id}`)
    },
    setPrice() {
      console.log('a')
      this.popupVisible = true
      // this.$router.push(`/price/${this.id}`)
    }
  }
}

</script>
<style>
.mtswipe {
  height: 200px;
  background: #231;
}

.btn1 {
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  border: 0;
  /* z-index: 2; */
}

.mob P {
  position: absolute;
  left: 20px;
  top: 5px;
}

.file-input {
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
}

</style>
