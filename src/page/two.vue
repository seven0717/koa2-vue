<template>
  <div>
    <el-row :gutter="10">
      <!--图形化数据-->
      <el-col :span="12">
        <div class="grid-content">
          <highchartsC :options="options" :styles="styles" ref="simpleChart"></highchartsC>
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
  import Vue from 'vue'
  import date from '@/utils/date.js'
  import highchartsC from '../components/highcharts/highcharts'
  import news from '../components/news'
  import adduser from '../components/adduser'
  import guanggao from '../components/guanggao'
  import qs from 'qs'

  export default {
    name: "two",
    data() {
      return {
        news: [],
        options: {
          title: {
            text: '用户增加量'
          },
          xAxis: {
            categories:['一月','2月','3月']
          },
          yAxis: {
            title: {
              text: '用户量'
            },
            lineWidth: 2,
            lineColor: '#F33',
            id: 'test'
          },
          series: [{
            name: '月/用户增加',
            data: [],
            color: '#F33'
          },
            {
              name: '日/访问量',
              data: [3, 6, 5, 4.5, 14, 25, 22, 25, 2.3, 13, 19, 6],
              color: 'orange'
            }]
        },
        styles: {
          width: 100,
          height: 100
        }
      };
    },
    mounted() {
      // 获取新闻数据
      this.api.news().then(res => {
        if (res.data.code === '111') {
          let ss = res.data.res;
          // 时间格式转换
          for (let i = 0; i < ss.length; i++) {
            ss[i].date = date(ss[i].date, 'yyyy-MM-dd HH:mm:ss')
          }
          this.news = ss;
        }
      });
      //  获取图形化数据
      this.api.hchar().then(res => {

        var op = [];
        if (res.data.code === '111') {
          // console.log(res.data.res.map());
          //  获取年
          for (let i = 0; i < res.data.res.length; i++) {
            this.$set(this.$refs.simpleChart.options.xAxis,res.data.res[i].nian);
          }
          console.log(this.$set(this.$refs.simpleChart.options.xAxis.categories,['一月','2月','3月']));
          // this.$refs.simpleChart.options.series[0].data = op;
          // console.log(this.options.series.data);
          console.log(this.$refs.simpleChart.options.xAxis.categories);
        }
      })
    },
    components: {
      highchartsC,
      news,
      adduser,
      guanggao
    }
  }
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
