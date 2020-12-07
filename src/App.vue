<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <nav class="navbar col-12 flex-md-nowrap ml-auto px-2">
          <div class="col-md-1 navbar-brand m-0">
            DYSEN
          </div>
          <div class="col-md-5">
            <SearchForm/>
          </div>
          <div class="col-md-4 ml-auto text-right">
            <row>
              DYSEN is developed part of the <a href="https://dylen.acdh.oeaw.ac.at/">DYLEN</a> project.
            </row>
            <row>
              <a href="https://dylen.acdh.oeaw.ac.at/imprint">Imprint</a>
            </row>
          </div>
        </nav>
      </div>
      <main>
        <div class="row">
          <div class="col-md-6">
            <div class="row pb-1">
              <div class="col-md-12 vis-component half-height mb-1">
                <FreqChart :chartProp="chartData.yearlyFreqData" :key="chartKey" elKey="1"/>
              </div>
            </div>
            <div class="row pb-1">
              <div class="col-md-12 vis-component half-height mb-1">
                <SentimentChart :chartProp="chartData.yearlySentimentData" :key="chartKey" elKey="2"/>
              </div>
            </div>
          </div>
          <div class="col-md-6 vis-component full-height">
            <div class="vis-component-inner">
              <div class="head d-flex">
                <b-link class="mr-1" @click="$bvModal.show('scatter-modal')">
                  <info-icon></info-icon>
                </b-link>
                <span class="vis-title">Sentiment and Frequency Distributions per Media Source</span>
              </div>
              <b-modal id="scatter-modal" title="Sentiment and Frequency Distributions per Media Source" ok-only scrollable>Explanation on this component</b-modal>
              <div class="col pt-2">
                <label for="range-year">Year Selection:</label>
                <vue-range-slider
                  ref="slider"
                  v-model="selectedYear"
                  :min="$store.state.availableYears[0]"
                  :max="$store.state.availableYears[$store.state.availableYears.length - 1]"
                  :data="$store.state.availableYears">
                </vue-range-slider>
              </div>
              <BubbleChart :chartProp="chartData.scatterplotData" :key="chartKey" elKey="3"/>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>

import SearchForm from '@/components/SearchForm';
import FreqChart from '@/components/FreqChart';
import SentimentChart from '@/components/SentimentChart';
import BubbleChart from '@/components/BubbleChart';
import 'vue-range-component/dist/vue-range-slider.css';
import VueRangeSlider from 'vue-range-component';
import { InfoIcon } from 'vue-feather-icons';

export default {
  name: 'App',
  components: {
    SearchForm, FreqChart, SentimentChart, BubbleChart, VueRangeSlider, InfoIcon
  },
  data() {
    return {
      chartKey: 0,
    }
  },
  mounted() {
  },
  computed: {
    chartData: {
      get() {
        return this.$store.getters.chartData;
      }
    },
    selectedYear: {
      get() {
        return this.$store.getters.selectedYear;
      },
      set(val) {
        this.$store.commit('changeSelectedYear', val);
      },
    },
  },
  watch: {
    chartData: {
      handler() {
        this.chartKey += 1;
      },
      deep: true,
    },
    selectedYear: {
      handler() {
        this.chartKey += 1;
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss">

body {
  background-color: #F1F1F1 !important;
}

.feather {
  width: 14px;
  height: 14px;
  vertical-align: text-bottom;
}

.highcharts-root {

  .highcharts-point {
    opacity: 0.95;
  }

  .highcharts-tooltip-box {
    stroke-opacity: 0.5;
    fill: #f5f6f9;
  }

  .highcharts-shadow {
    display: none;
  }

  .highcharts-data-label * {
    font-size: 12px;
  }

}

.vis-component.tooltip-overflow {
  z-index: 99;

  .vis-component-inner {
    overflow: visible;

    .main-svg {
      overflow: visible;
    }

  }

}

.bg-series-color-0 {
  background-color: #4e79a7;
  fill: #4e79a7;
}
.stroke-series-color-0 {
  stroke: #4e79a7;
}
.bg-series-color-1 {
  background-color: #f28e2b;
  fill: #f28e2b;
}
.stroke-series-color-1 {
  stroke: #f28e2b;
}
.bg-series-color-2 {
  background-color: #e15759;
  fill: #e15759;
}
.stroke-series-color-2 {
  stroke: #e15759;
}
.bg-series-color-3 {
  background-color: #76b7b2;
  fill: #76b7b2;
}
.stroke-series-color-3 {
  stroke: #76b7b2;
}
.bg-series-color-4 {
  background-color: #edc948;
  fill: #edc948;
}
.stroke-series-color-4 {
  stroke: #edc948;
}
.bg-series-color-5 {
  background-color: #ff9da7;
}
.bg-series-color-6 {
  background-color: #FF9655;
}
.bg-series-color-7 {
  background-color: #FFF263;
}
.bg-series-color-8 {
  background-color: #6AF9C4;
}

/*
 * Content
 */

main {
  padding-top: 3px;
}

.navbar {
  border-bottom: 5px solid #88dbdf;
  background-color: #fff;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.03);
  z-index: 99;
}

.vis-component.half-height {
  height: calc(50vh - 47px);
}

.vis-component.full-height {
  height: calc(100vh - 75px);
  display: flex;
  align-items: stretch;
}

.vis-component {
  padding: .25rem !important;

  .multi-map-child:nth-child(n+2) {
    margin-top: 15px;
  }

  .vis-component-inner {
    border-radius: 0.25rem;
    background-color: #fff;
    border: solid 1px #dde4ea;
    overflow: hidden;
    width: 100%;

    .loading-spinner {
      position: absolute;
      width: 100%;
      background-color: #ffffffa8;
      height: 100%;
      top: 0;
      padding: 100px 13px;
      z-index: 9;
    }

    .actions {
      button {
        padding: 0 0.25rem;
        margin-left: 0.5rem;
      }
      &.move-component-btn {
        cursor: grab !important;
      }
    }

    .highcharts-data-table {
      max-height: 400px;
      overflow-y: auto;
    }

    .highcharts-table-caption {
      display: none;
    }

  }

  .head {
    border-bottom: 1px solid #dee2e6;
    padding: 0.30rem 0.5rem;
    background-color: #f0f7fd;
    align-items: baseline;

    .vis-title {
      font-weight: 500;
      font-size: 0.8rem;
    }

  }

}

.no-min-height {
  .vis-component-inner {
    min-height: auto;
  }
}

.vis-intro-component {

  .vis-component-inner {
    min-height: auto !important;
  }

}

.vis-intro-wrapper {

  .vis-component-inner {
    min-height: auto !important;
  }

}

.vis-separator {
  padding: .5rem !important;
}

.v-step {
  z-index: 9999;
  font-size: 1.2rem;
}

.kwic-table {

  td.annotations {
    padding: 0.15rem;

    .multiselect {
      min-height: auto;
    }

    .multiselect__select {
      height: 27px;
      width: 22px;
    }

    .multiselect__tags {
      min-height: auto;
      padding: 0px 16px 0 4px;
      height: 26px;
    }

    .multiselect__tag {
      margin-bottom: 0;
      margin-right: 3px;
      margin-top: 3px;
      padding: 2px 16px 3px 5px;
      font-size: 12px;
    }

    .multiselect__tag-icon {
      width: 17px;
      line-height: 16px;
    }

    .multiselect__placeholder {
      margin-bottom: -1px;
      font-size: 12px;
    }

    .multiselect__input {
      font-size: 12px;
      padding: 0;
    }

    .multiselect__content-wrapper {
      font-size: 12px;
    }

    .multiselect__option {
      min-height: auto;
      padding: 6px;
    }

    .multiselect__option:after {
      font-size: 12px;
      padding: 6px 3px;
      line-height: 12px;
    }

  }

}


</style>
