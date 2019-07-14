<template>
	<div class="layout v-header">
		<Menu mode="horizontal" :theme="theme1" :active-name="activeName">
			<div class="layout-logo">系统名称</div>
			<!-- <div class="layout-button">
				<Button type="ghost">注销</Button>
			</div> -->
	        <div class="layout-nav">
			    <router-link to="/demo" class="navbar-brand" v-if="CONFIG_ROLE.STANDARDLOGISTICSCOST">
				    <MenuItem name="1">
				        <Icon type="demo"></Icon>例1
				    </MenuItem>
			    </router-link>
			</div>
		</Menu>
	</div>
</template>
<script>
export default {
  name: 'THeader',
  data () {
    return {
      theme1: 'dark',
      activeName: this.$route.name,
      CONFIG_ROLE: window.CONFIG_ROLE
    }
  }
}
</script>
