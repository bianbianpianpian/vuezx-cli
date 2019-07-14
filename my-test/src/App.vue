<template>
  <div id="app">
    <div v-if="CONFIG_ROLE !== null">
      <THeader></THeader>
      <div class="content">
          <router-view></router-view>
      </div>
    </div>
    <div v-if="no_auth === true" class="no-auth">
      <div>
        暂无权限，请联系管理员！咚咚号：fpe
      </div>
    </div>
  </div>
</template>

<script>
import THeader from '@/common-components/THeader'
import { CONFIG, CONFIG_ROLE, CONFIG_IS_AUTH } from './services/config'
export default {
  name: 'App',
  components: {
    THeader
  },
  data () {
    return {
      CONFIG_ROLE: null,
      no_auth: false
    }
  },
  methods: {
    loadData () {
      window.$.ajax({
        url: CONFIG.URL.querypermcontent,
        type: 'GET',
        data: {
          systemid: 'fulfillment-cost'
        },
        // dataType: 'jsonp',
        xhrFields: {
          withCredentials: true
        },
        success: (res, textStatus, jqXHR) => {
          // console.log('ok!!!!', res)
          // res = res.data
          // console.log('前端配置', CONFIG_ROLE)
          if (res.statusCode === 1) {
            let CONFIG_ROLE_RES = res.data
            // console.log('????', CONFIG_ROLE_RES)
            let tmp = {}
            // console.log('获取权限ok', CONFIG_ROLE_RES)
            for (let i = 0; i < CONFIG_ROLE.length; i++) {
              for (let j = 0; j < CONFIG_ROLE_RES.length; j++) {
                if (CONFIG_ROLE[i].id === CONFIG_ROLE_RES[j].id) {
                  CONFIG_ROLE[i].checked = CONFIG_ROLE_RES[j].checked
                  if (CONFIG_ROLE[i].checked === 'true') {
                    tmp[CONFIG_ROLE[i].id] = true
                  } else {
                    tmp[CONFIG_ROLE[i].id] = false
                  }
                }
              }
            }
            window.CONFIG_ROLE = this.CONFIG_ROLE = tmp
            // console.log(this.CONFIG_ROLE)
          } else {
            this.no_auth = true
          }
        },
        error: (xhr, textStatus) => {
          console.log('错误')
          // this.no_auth = true
          this.$Message.error('获取权限失败!')
        }
      })
    }
  },
  mounted () {
    if (CONFIG_IS_AUTH) {
      this.loadData()
    } else {
      let tmp = {}
      for (let i = 0; i < CONFIG_ROLE.length; i++) {
        tmp[CONFIG_ROLE[i].id] = CONFIG_ROLE[i].checked
      }
      window.CONFIG_ROLE = this.CONFIG_ROLE = tmp
    }
  }
}
</script>
