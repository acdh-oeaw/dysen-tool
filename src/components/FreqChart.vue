<template>
  <highcharts :options="chartOptions" ref="chart"></highcharts>
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
          type: 'spline',
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
            label: {
              connectorAllowed: false,
            },
            marker: {
              radius: 6,
            },
            dataLabels: {
              enabled: false,
              align: 'center',
              padding: 8,
              format: '{point.y} %',
            },
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
