<template>
  <div class="vis-component-inner">
    <div class="head d-flex">
      <span class="vis-title">Title</span>
    </div>
    <highcharts :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script>

export default {
  props: {
    chartProp: Array,
    elKey: Number,
  },
  data() {
    return {
      showTableIcon: true,
      showChartIcon: false,
      showChartElement: true,
      chartOptions: {
        exporting: {
          enabled: false,
        },
        chart: {
          type: 'line',
          zoomType: 'x',
          height: 350,
          spacingBottom: 20,
          spacingTop: 20,
          spacingLeft: 10,
          spacingRight: 20,
        },
        title: false,
        xAxis: {
          title: {
            text: 'Years',
          },
          allowDecimals: false,
        },
        yAxis: {
          title: {
            text: 'Frequency',
          },
        },
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'top',
          y: -15,
          margin: 5,
        },
        plotOptions: {
          series: {
            animation: false,
            label: {
              connectorAllowed: false,
            },
            marker: {
              radius: 2,
            },
            dataLabels: {
              enabled: false,
              align: 'center',
              padding: 8,
              format: '{point.y} %',
            },
            lineWidth: 1,
            stickyTracking: false
          },
          spline: {
            dataLabels: {
              // enabled: true
            },
            // enableMouseTracking: false
          },
        },
        series: this.chartProp,
        tooltip: {
          // pointFormat: this.chartProp.pointFormat,
          shared: true,
        },
      },
    };
  },
};
</script>
