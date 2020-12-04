<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <nav class="navbar fixed-top flex-md-nowrap shadow ml-auto px-2">
          <div class="col-md-2 navbar-brand text-center m-0">
            DYSEN
          </div>
          <div class="col-md-6">
            <SearchForm/>
          </div>
        </nav>
      </div>
      <main>
        <div class="row">
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-12 vis-component">
                <FreqChart :chartProp="yearlyData.yearlyFreqData" :key="yearlyChartKey"/>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 vis-component">
                <FreqChart :chartProp="yearlyData.yearlySentimentData" :key="yearlyChartKey"/>
              </div>
            </div>
          </div>
          <div class="col-md-6 vis-component">
            <BubbleChart :chartProp="bubbleData" :key="yearlyChartKey"/>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>

import SearchForm from '@/components/SearchForm';
import FreqChart from '@/components/FreqChart';
import BubbleChart from '@/components/BubbleChart';

export default {
  name: 'App',
  components: {
    SearchForm, FreqChart, BubbleChart
  },
  data() {
    return {
      freqChartKey: 0,
    }
  },
  mounted() {
  },
  computed: {
    yearlyData: {
      get() {
        return this.$store.getters.yearlyData;
      }
    },
    bubbleData: {
      get() {
        return this.$store.getters.bubbleData;
      }
    },
  },
  watch: {
    yearlyData: {
      handler() {
        this.yearlyChartKey += 1;
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss">
/*
 * Dashboard CSS
 */
@import url('https://fonts.googleapis.com/css?family=Barlow&display=swap');
@import url('https://fonts.googleapis.com/css?family=Signika&display=swap');

body {
  font-size: .8rem;
  font-family: 'Barlow', sans-serif;
  background-color: #f5f6f9;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

.highcharts-root {

  * {
    font-family: 'Barlow', sans-serif !important;
    font-weight: 400 !important;
  }

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
[role="main"] {
  padding-top: 133px; /* Space for fixed navbar */
}

@media (min-width: 768px) {
  [role="main"] {
    padding-top: 48px; /* Space for fixed navbar */
  }
}

/*
.sidebar, .navbar-brand {
  min-width: 135px;
}
*/

main {
  /*max-width: calc(100% - 135px) !important;*/
}

main {
  padding-top: 54px;
}

main, .navbar {
  /*width: calc(100% - 145px) !important;*/
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
    min-height: 300px;
    overflow: hidden;

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
    align-items: center;
    min-height: 36px;

    .vis-title {
      font-weight: 500;
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
