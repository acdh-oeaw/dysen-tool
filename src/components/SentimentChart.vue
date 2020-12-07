<template>
  <div class="vis-component-inner" ref="chart">
    <div class="head d-flex">
      <b-link class="mr-1" @click="$bvModal.show(chartInfoModalId)">
        <info-icon></info-icon>
      </b-link>
      <span class="vis-title">Yearly Sentiment Score Distributions</span>
    </div>
    <b-modal :id="chartInfoModalId" title="Yearly Sentiment Score Distributions" ok-only scrollable>Explanation on this component</b-modal>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import {
  InfoIcon,
} from 'vue-feather-icons';

export default {
  components: {
    InfoIcon,
  },
  props: {
    chartProp: Array,
    elKey: Number,
  },
  data() {
    return {
      chartInfoModalId: `chart-info-modal-${this.elKey}`,
      chartOptions: {
        exporting: {
          enabled: false,
        },
        chart: {
          animation: false,
          type: 'line',
          height: 0,
          spacingBottom: 7,
          spacingTop: 15,
          spacingLeft: 2,
          spacingRight: 10,
        },
        title: false,
        xAxis: {
          title: false,
          allowDecimals: false,
        },
        yAxis: {
          title: {
            text: 'Normalised Frequency (per 1m tokens)',
          },
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          series: {
            animation: false,
            marker: {
              radius: 2,
              symbol: 'circle',
            },
            lineWidth: 1.5,
            stickyTracking: false
          },
        },
        series: this.chartProp,
      },
    };
  },
  mounted() {
    this.defineChartHeight();
  },
  created() {
    window.addEventListener("resize", this.resizeHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    resizeHandler() {
      this.defineChartHeight();
    },
    defineChartHeight() {
      const chartHeight = this.$refs.chart.parentElement.clientHeight - 34;
      if (chartHeight) this.chartOptions.chart.height = chartHeight;
    }
  }
};
</script>
