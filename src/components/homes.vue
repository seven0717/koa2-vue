<template>
  <div>
    跳转登陆{{ user }}
  </div>
</template>

<script>
  import api from '@/api/index.js';
export default {
  name:'Homes',
  data(){
    return {
      user:''
    }
  },
  mounted() {
    api.homes().then(res => {
      // 解析成功
      this.user = localStorage.getItem('user')
      console.log(res);
    }).catch(err => {
      console.log(`错误 - ${err}`)
    })
  },
}
</script>

