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
    },
    // 随机添加姓名
    // mounted() {
    //   function ad() {
    //     let xing = ["赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈",
    //       "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
    //       "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏",
    //       "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
    //       "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦",
    //       "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
    //       "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺",
    //       "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
    //       "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余",
    //       "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹"];
    //     let ming = ["子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛",
    //       "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊",
    //       "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政",
    //       "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建",
    //       "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋",
    //       "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅",
    //       "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡",
    //       "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕",
    //       "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵",
    //       "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"];
    //     let x = parseInt(10 * Math.random())* 10 + parseInt(10 * Math.random());
    //     xing = xing[x];
    //     let m = parseInt(10 * Math.random())* 10 + parseInt(10 * Math.random());
    //     ming = ming[m];
    //     var o = '';
    //     return  o = xing+ming;
    //   };
    //  this.me.name = ad()
    // }
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
