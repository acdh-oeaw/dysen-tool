<template>
  <div class="vis-component-inner">
    <div class="head d-flex">
      <b-link class="mr-1" @click="$bvModal.show('info-modal')">
        <info-icon></info-icon>
      </b-link>
      <span class="vis-title">Sentiment and Frequency Distributions per Media Source</span>
    </div>
    <b-modal id="info-modal" title="Sentiment and Frequency Distributions per Media Source" ok-only scrollable>Explanation on this component</b-modal>
    <highcharts :options="chartOptions" ref="bubble-chart" :highcharts="Highcharts"></highcharts>
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
      seriesData: this.chartProp.series,
      chartOptions: {
        exporting: {
          enabled: false,
        },
        chart: {
          type: 'scatter',
          height: 600,
          spacingBottom: 20,
          spacingTop: 20,
          spacingLeft: 10,
          spacingRight: 20,
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
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'top',
          y: -15,
          margin: 15,
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: '{point.source}',
            },
            stickyTracking: false,
          },
          scatter: {
            dataLabels: {
              format: '{point.source}',
              enabled: true,
            },
            marker: {
              radius: 8,
              fillOpacity: 0.3,
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
            '<span><b>{point.source}</b></span>:<br/>Relative freq: {point.x}%<br/> Absolute freq:: {point.y}<br/> Partition size: {point.z}<br/>',
          shared: true,
        },
        series: [{
          data: this.chartProp.data
        }]
      },
    };
  },
  methods: {
  },
  watch: {
  },
};
</script>
