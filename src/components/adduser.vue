<template>
  <div class="adds">

    <el-row :span="24">
      <h2>添加用户</h2>
      <el-form :model="me" status-icon :rules="rules" ref="me" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="me.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input type="text" v-model="me.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model.number="me.tel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('me')">提交</el-button>
          <el-button @click="resetForm('me')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
  import api from '@/api/index'

  export default {
    name: "adduser",
    data() {
      // 姓名验证
      let names = (rule, value, callback) => {
        var reg = /^(([a-zA-Z+\.?\·?a-zA-Z+]{2,30}$)|([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,30}$))/;
        if (!value) {
          return callback(new Error('姓名不能为空'));
        } else {
          if (!reg.test(value)) {
            return callback(new Error('姓名输入有误，请重新输入'));
          } else {
            callback();
          }
        }
      };
      // 手机号验证
      let tels = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          if (value.length !== 11 && !(/^1[34578]\d{9}$/.test(value))) {
            return callback(new Error('请输入正确的手机号或格式'))
          } else {
            callback();
          }
        }
      };
      return {
        me: {
          name: '',
          pass: '000000', //默认密码
          address: '',
          tel: ''
        },
        rules: {
          name: [{validator: names, required: true, trigger: 'blur'}],
          address: [{required: true, message: '地址不能为空', trigger: 'blur'}],
          tel: [{validator: tels, trigger: 'blur'}],
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //  获取到数据，发送后台
            api.adduser(this.me).then(res => {
              if (res.data.code === '000') {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.$refs[formName].resetFields();
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
      ,
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
  .adds {
    width: 100%;
    height: 100%;
    line-height: 30px;
    margin-top: 10px;
    background: #fff;
  }

  h2 {
    margin: 40px 0;
  }

  .el-form-item {
    width: 80%;
  }
</style>
