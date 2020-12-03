<template>
  <div>
    <div class="vis-component-inner">
      <div class="head d-flex">
        <b-link class="mr-1" @click="$bvModal.show('info-modal')">
          <info-icon></info-icon>
        </b-link>
        <span class="vis-title">Sentiment and Frequency Distributions per Media Source</span>
      </div>
      <b-modal id="info-modal" title="Sentiment and Frequency Distributions per Media Source" ok-only scrollable>Explanation on this component</b-modal>
      <highcharts :options="chartOptions" ref="bubble-chart"></highcharts>
    </div>
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
    chartProp: Object,
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
          type: 'bubble',
          zoomType: 'xy',
          height: 360,
          spacingBottom: 20,
          spacingTop: 20,
          spacingLeft: 10,
          spacingRight: 20,
          style: {
            cursor: 'crosshair',
          },
        },
        title: false,
        xAxis: {
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
        series: this.chartProp.series,
      },
    };
  },
  methods: {
  },
  watch: {
  },
};
</script>