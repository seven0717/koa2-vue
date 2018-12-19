<template>
  <div class="news">
    <el-table
      highlight-current-row
      @row-click="xiangqing"
      :data="opt"
      height="400"
      style="width: 100%;">
      <el-table-column
        prop="date"
        label="时间"
        >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="jian"
        label="简介">
      </el-table-column>
    </el-table>

    <el-dialog
      :title="news.title"
      :visible.sync="centerDialogVisible"
      center>
      <el-row>
        <el-col :span="12">
          <div class="sg">来源：<a :href="news.url" target="_blank">{{ news.lai }}</a></div>
        </el-col>
        <el-col :span="12">
          <div class="sg">发布时间：{{ news.date }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="sg">{{ news.jian }}</div>
        </el-col>
      </el-row>
      <hr>
      <el-row>
        <el-col>
          <div class="sg">{{ news.cont }}</div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">关 闭</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "news",
    props:{
      opt:[Array]
    },
    data() {
      return {
        centerDialogVisible:false,
        news:{}
      }
    },
    methods:{
      xiangqing(row){
        this.centerDialogVisible = true
        this.news = row;
      }
    }
  }
</script>

<style scoped>
.news{
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.sg{
  line-height: 2;
}
</style>
