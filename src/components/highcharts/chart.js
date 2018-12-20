module.exports = {
  bar: {
    chart: {
      type: 'line'
    },
    title: {
      text: '用户量'
    },
    subtitle: {
      text: '数据来源: WorldClimate.com'
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: '数量'
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          // 开启数据标签
          enabled: true
        },
        // 关闭鼠标跟踪，对应的提示框、点击事件会失效
        enableMouseTracking: true
      }
    },
    series: [{
      name: '月/注册量',
      data: []
    }, {
      name: '日/访问量',
      data: []
    }]
  }
}
