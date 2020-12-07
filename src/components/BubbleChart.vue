<template>
  <div class="vis-component-inner">
    <div class="head d-flex">
      <b-link class="mr-1" @click="$bvModal.show('scatter-modal')">
        <info-icon></info-icon>
      </b-link>
      <span class="vis-title">Sentiment and Frequency Distributions per Media Source</span>
    </div>
    <b-modal id="scatter-modal" title="Sentiment Score and Frequency Distributions per Media Source and Year" ok-only scrollable>Explanation on this component</b-modal>
    <div class="col pt-2 year-slider-row">
      <label for="range-year">Year Selection:</label>
      <vue-slider
        ref="slider"
        v-model="selectedYear"
        :min="availableYears[0]"
        :max="availableYears[availableYears.length - 1]"
        :data="availableYears"
        :lazy="true"
        :adsorb="true"
        :duration="0.3"
        :marks="marks"
        :tooltip="'none'"
      />
    </div>
    <highcharts :options="chartOptions" ref="chart" :highcharts="Highcharts"></highcharts>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import { InfoIcon } from 'vue-feather-icons';

export default {
  components: {
    VueSlider, InfoIcon
  },
  props: {
    chartProp: Object,
    elKey: String,
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
  computed: {
    selectedYear: {
      get() {
        return this.$store.getters.selectedYear;
      },
      set(val) {
        this.$store.dispatch('onSelectedYearChange', val);
      },
    },
    availableYears: {
      get() {
        return this.$store.getters.availableYears;
      },
    },
    marks() {
      return this.availableYears;
    }
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
      const chartHeight = this.$refs.chart.$el.parentElement.parentElement.clientHeight - 34 - 90;
      if (chartHeight) this.chartOptions.chart.height = chartHeight;
    }
  }
};
</script>

<style lang="scss" scoped>
.year-slider-row {
  font-size: 0.9rem;
  min-height: 90px;
  padding: 0 15px 0 25px;

  .vue-slider {
    padding: 3px 7px 5px 5px !important;

    .vue-slider-mark-label {
      transform: rotate(-45deg);
      left: -20px;
    }

  }
}
</style>
