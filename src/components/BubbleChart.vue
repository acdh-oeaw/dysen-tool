<template>
  <highcharts :options="chartOptions" ref="chart" :highcharts="Highcharts"></highcharts>
</template>

<script>

export default {
  components: {
  },
  props: {
    chartProp: Object,
    elKey: Number,
  },
  data() {
    return {
      chartOptions: {
        exporting: {
          enabled: false,
        },
        chart: {
          animation: false,
          type: 'scatter',
          height: 0,
          spacingBottom: 15,
          spacingTop: 15,
          spacingLeft: 2,
          spacingRight: 10,
        },
        title: false,
        xAxis: {
          min: -1,
          max: 1,
          title: {
            enabled: true,
            text: "Sentiment Score",
          },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true,
          plotLines: [{
            color: 'red',
            dashStyle: 'dot',
            width: 2,
            value: 0,
            label: {
              rotation: 0,
              y: -5,
              style: {
                fontStyle: 'italic',
                fontSize: '10',
              },
              textAlign: 'center',
              text: 'Baseline (Neutral)',
            },
            zIndex: 3,
          }],
        },
        yAxis: {
          title: {
            text: "Normalised Frequency (per 1m tokens)",
          },
          plotLines: [{
            color: 'red',
            dashStyle: 'dot',
            width: 2,
            value: this.chartProp.freqBaseline,
            label: {
              rotation: 0,
              y: -5,
              x: 60,
              style: {
                fontStyle: 'italic',
                fontSize: '10',
              },
              textAlign: 'center',
              text: 'Baseline (Average Frequency)',
            },
            zIndex: 3,
          }],
        },
        legend: {
          enabled: false,
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'top',
          y: -15,
          margin: 15,
        },
        plotOptions: {
          series: {
            animation: false,
            dataLabels: {
              enabled: true,
              format: '{point.name}',
            },
            stickyTracking: false,
          },
          scatter: {
            dataLabels: {
              format: '{point.name}',
              enabled: true,
            },
            marker: {
              radius: 8,
              fillOpacity: 0.3,
              symbol: 'circle',
              states: {
                hover: {
                  enabled: true,
                  lineColor: 'rgb(100,100,100)',
                },
              },
            },
            states: {
              hover: {
                marker: {
                  enabled: false,
                },
              },
            },
          },
        },
        tooltip: {
          pointFormat:
            '<span><b>{point.name}</b></span>:<br/>Sentiment Score: {point.x}%<br/> Normalised Frequency: {point.y}<br/>',
          shared: true,
        },
        series: this.chartProp.data,
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
      const chartHeight = this.$refs.chart.$el.parentElement.parentElement.clientHeight - 34 - 65;
      if (chartHeight) this.chartOptions.chart.height = chartHeight;
    }
  }
};
</script>
