<template>
  <div>
    <el-row v-for="(item) in 2" :gutter="10">
      <el-col :span="6" v-for="(o, index) in 4" :key="o">
        <el-card class="box-card">
          <div slot="header" class="">
            <el-row>
              <el-col :span="12"><div class="grid-content bg-purple"><span>卡片名称</span></div></el-col>
              <el-col :span="12"><div class="grid-content bg-purple-light"><el-button style="float: right; padding: 0" type="text">操作按钮</el-button></div></el-col>
            </el-row>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "three",
    data() {
      return {
        currentDate: new Date()
      };
    }
  }
</script>

<style scoped>
  .el-row{
    margin-bottom: 10px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    /*width: 480px;*/
  }.grid-content {
    line-height: 20px;
   }
  .bg-purple{
    text-align: left;
  }
</style>
