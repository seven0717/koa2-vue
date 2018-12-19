<template>
  <div class="highcharts-container">
  </div>
</template>

<script>
  import Highcharts from "highcharts/highstock";
  import HighchartsMore from "highcharts/highcharts-more";
  import HighchartsDrilldown from "highcharts/modules/drilldown";
  import Highcharts3D from "highcharts/highcharts-3d";
  HighchartsMore(Highcharts);
  HighchartsDrilldown(Highcharts);
  Highcharts3D(Highcharts);

  export default {
    props: ["options", "styles"],
    name: "highcharts",
    data() {
      return {
        chart: null
      };
    },
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        this.$el.style.width = (this.styles.width || 100) + "%";
        this.$el.style.height = (this.styles.height || 100) + "%";
        this.chart = new Highcharts.Chart(this.$el, this.options);
      }
    }
  };
</script>

<style scoped>
  .highcharts-container {
    width: 800px;
    height: 400px;
  }
</style>
