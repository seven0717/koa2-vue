<template>
  <div class="hello">
    <el-row>
      <el-col>
        <h1>欢迎使用xxx系统</h1>
      </el-col>
      <el-row>
        <el-col :lg="{span:8,offset:8}" :xs="24" :md="{span:8,offset:8}" :sm="{span:12,offset:6}">
          <el-form :model="forms" status-icon :rules="rules2" ref="forms" label-width="60px" class="formclass">
            <el-form-item label="账号" prop="user">
              <el-input
                type="text"
                v-model="forms.user"
                autocomplete="off"
                @keyup.enter.native="submitForm('forms')"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="forms.pass"
                autocomplete="off"
                @keyup.enter.native="submitForm('forms')"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="loginLoadingState" @click="submitForm('forms')">{{ logins }}
              </el-button>
              <el-button @click="resetForm('forms')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
  import api from '@/api/index.js';
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        forms: {
          user: "",
          pass: ""
        },
        loginLoadingState: false,
        logins: '登陆',
        rules2: {
          user: {required: true, message: "请输入账号", trigger: "blur"},
          pass: {required: true, message: "请输入密码", trigger: "blur"}
        }
      };
    },
    methods: {
      ...mapMutations(['LOGIN']),
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.loginLoadingState = true;
            this.logins = '正在登陆...';
            // 1.向后台传输数据，并接收返回值
            api.denglu(this.forms, {timeout: 5000}).then(data => {
              // 从后台成功取到数据
              if (data.data.status === 200) { //成功取到数据
                this.loginLoadingState = false;
                this.logins = '登陆';
                localStorage.setItem('token', data.data.token) //存储token
                localStorage.setItem('user', data.data.user) //存储用户
                this.LOGIN({
                  token:data.data.token,
                  user:data.data.user
                });
                this.$router.push('/homes');
              } else {
                if (data.data.status === 1000) { // 没有取到数据
                  this.$router.push('/');
                  this.loginLoadingState = false;
                  this.logins = '登陆';
                }
              }

            })
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<style scoped>
  .hello{
    margin-top: 160px;
  }
</style>
