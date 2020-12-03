<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          DYSEN
        </div>
        <div class="col-md-6">
          <SearchForm/>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-12">
              <FreqChart :chartProp="yearlyData.yearlyFreqData" :key="yearlyChartKey"/>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <FreqChart :chartProp="yearlyData.yearlySentimentData" :key="yearlyChartKey"/>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          Scatterplot
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import SearchForm from '@/components/SearchForm';
import FreqChart from '@/components/FreqChart';

export default {
  name: 'App',
  components: {
    SearchForm, FreqChart
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

<style>
#app {
  /*
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  */
  color: #2c3e50;
  margin-top: 20px;
}
</style>
