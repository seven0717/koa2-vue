<template>
  <div>
    <el-row :gutter="10">
      <!--图形化数据-->
      <el-col :span="12">
        <div class="grid-content">
          <highchartsC :options="options" ref="simpleChart"></highchartsC>
        </div>
      </el-col>
      <!--新闻中心-->
      <el-col :span="12">
        <div class="grid-content news">
          <news :opt="news"></news>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <!--添加用户-->
      <el-col :span="12">
        <div class="grid-content">
          <adduser></adduser>
        </div>
      </el-col>
      <!--广告位-->
      <el-col :span="12">
        <div class="grid-content">
          <guanggao></guanggao>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from "vue";
import date from "@/utils/date.js";
import highchartsC from "../components/highcharts/highcharts";
import news from "../components/news";
import adduser from "../components/adduser";
import guanggao from "../components/guanggao";
import options from "../components/highcharts/chart.js";

export default {
  name: "two",
  data() {
    let option = options.bar;
    return {
      news: [],
      id: "chart",
      options: option
    };
  },
  computed: {},
  mounted() {
    // 获取新闻数据
    this.api.news().then(res => {
      if (res.data.code === "111") {
        let ss = res.data.res;
        // 时间格式转换
        for (let i = 0; i < ss.length; i++) {
          ss[i].date = date(ss[i].date, "yyyy-MM-dd HH:mm:ss");
        }
        this.news = ss;
      }
    });
  },
  beforeMount() {
    //  获取图形化数据
    this.api.hchar().then(res => {
      var nian = [];
      var yue = [];
      var ri = [];
      if (res.data.code === "111") {
        //  获取年
        for (let i = 0; i < res.data.res.length; i++) {
          nian.push(res.data.res[i].nian);
          yue.push(res.data.res[i].yue);
          ri.push(res.data.res[i].ri);
        }
        // 年
        this.$refs.simpleChart.chart.xAxis[0].update({
          categories: nian
        });
        // 月
        this.$refs.simpleChart.chart.series[0].update({
          data: yue.map(Number)
        });
        // 日
        this.$refs.simpleChart.chart.series[1].update({
          data: ri.map(Number)
        });
      }
    });
  },
  components: {
    highchartsC,
    news,
    adduser,
    guanggao
  }
};
</script>

<style scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  height: 400px;
}

.news {
  width: 100%;
  height: 400px;
  background: #fff;
}
</style>
