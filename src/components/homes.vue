<template>
  <div class="homes">
    <el-container style="border: 1px solid #eee;">
      <el-header style="text-align: right; font-size: 12px">
        <el-menu
          router
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="/homes">列表项</el-menu-item>
          <el-menu-item index="/homes/two">增加用户</el-menu-item>
          <el-menu-item index="/homes/three">消息中心</el-menu-item>
          <el-menu-item index="/homes/four">订单管理</el-menu-item>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="n-m">{{ user }}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a"> <router-link tag="li" :to="{name:'admin'}">查看</router-link></el-dropdown-item>
              <el-dropdown-item command="b">新增</el-dropdown-item>
              <el-dropdown-item command="c">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
  import api from '@/api/index.js';

  export default {
    name: 'Homes',
    data() {
      return {
        user: '',
        uri: '/homes'
      }
    },
    methods: {
      // 用户操作
      handleCommand(m) {
        switch (m) {
          case 'a':
            console.log('a');
            break;
          case 'b':
            console.log('b');
            break;
          case 'c':
            this.$confirm('确认退出吗','提示',{}).then(() => {
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              this.$router.push('/');
            })
            break;
        }
      }
    },
    mounted() {
      api.homes().then(res => {
        // 解析成功
        this.user = localStorage.getItem('user')
      }).catch(err => {
        console.log(`错误 - ${err}`)
      })
    },
  }
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-main {
    line-height: 0;
  }

  .el-dropdown, .n-m {
    color: #fff;
  }
</style>

