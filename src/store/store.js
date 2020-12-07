import Vue from 'vue';
import Vuex from 'vuex';
import Highcharts from 'highcharts';

import dysenData from '@/store/data.json';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    availableWords: dysenData.stl,
    availableYears: [0],
    selectedWord: dysenData.stl[0],
    selectedWordObj: {},
    selectedYear: dysenData.yList[dysenData.yList.length - 1],
    yearlyFreqData: [],
    yearlySentimentData: [],
    scatterplotData: { data: [], freqBaseline: 0 }
  },
  mutations: {
    updateSelectedWord (state, word) {
      state.selectedWord = word;
    },
    updateSelectedYear (state, year) {
      state.selectedYear = year;
    },
    updateSelectedWordSeriesData (state, word = state.selectedWord) {
      let yearlyFreqData = [];
      let yearlySentimentData = [];
      let chartDataSources = [];
      let availableYears = [];
      // Find the series object for the selected word
      const selectedWordObj = dysenData.series.find(obj => {
        return obj.sT === word;
      });
      // Process data for both line charts and the determine the available years
      for (const yearData of selectedWordObj.yS) {
        availableYears.push(yearData.y);
        for (const dataPoint of yearData.dP) {
          if (chartDataSources.includes(dataPoint.s)) {
            const sourceObjIndex = yearlyFreqData.findIndex(obj => {
              return obj.name === dataPoint.s;
            });
            yearlyFreqData[sourceObjIndex].data.push([yearData.y, dataPoint.rF]);
            // Start: Temp: Random sentiment score
            if (dataPoint.sS === 0) dataPoint.sS = Math.round( (Math.random() * 2 - 1) * 1e2 ) / 1e2 ;
            // End: Temp: Random sentiment score
            yearlySentimentData[sourceObjIndex].data.push([yearData.y, dataPoint.sS]);
          } else {
            chartDataSources.push(dataPoint.s);
            yearlyFreqData.push({
              name: dataPoint.s,
              data: [[yearData.y, dataPoint.rF]],
            });
            // Start: Temp: Random sentiment score
            if (dataPoint.sS === 0) dataPoint.sS = Math.round( (Math.random() * 2 - 1) * 1e2 ) / 1e2 ;
            // End: Temp: Random sentiment score
            yearlySentimentData.push({
              name: dataPoint.s,
              data: [[yearData.y, dataPoint.sS]]
            });
          }
        }
      }
      state.selectedWordObj = selectedWordObj;
      state.availableYears = availableYears;
      state.selectedYear = availableYears[state.availableYears.length - 1];
      state.yearlyFreqData = yearlyFreqData;
      state.yearlySentimentData = yearlySentimentData;
    },
    updateSelectedYearSeriesData (state) {
      let scatterplotDataSeries;
      let freqBaseline;
      const selectedWordObj = state.selectedWordObj;
      const selectedSeriesObj = selectedWordObj.yS.find(obj => {
        return obj.y === state.selectedYear;
      });
      if (selectedSeriesObj) {
        freqBaseline = selectedSeriesObj.rF;
        scatterplotDataSeries = selectedSeriesObj.dP.map((obj) => {
          const sourceIndexInFreqChartData = state.yearlyFreqData.findIndex(objFreq => {
            return objFreq.name === obj.s;
          });
          return {
            data: [
              {
                name: obj.s,
                x: obj.sS,
                y: obj.rF,
                color: Highcharts.getOptions().colors[sourceIndexInFreqChartData]
              }
            ]
          }
        });
      }
      state.scatterplotData = {
        data: scatterplotDataSeries,
        freqBaseline
      };
    }
  },
  getters: {
    availableWords: (state) => state.availableWords,
    availableYears: (state) => state.availableYears,
    selectedWord: (state) => state.selectedWord,
    selectedYear: (state) => state.selectedYear,
    yearlyFreqData: (state) => state.yearlyFreqData,
    yearlySentimentData: (state) => state.yearlySentimentData,
    scatterplotData: (state) => state.scatterplotData,
  },
  actions: {
    onApplicationLoad({ commit }) {
      commit('updateSelectedWordSeriesData');
      commit('updateSelectedYearSeriesData');
    },
    onSelectedWordChange({ commit }, word) {
      commit('updateSelectedWord', word);
      commit('updateSelectedWordSeriesData', word);
      commit('updateSelectedYearSeriesData');
    },
    onSelectedYearChange({ commit }, year) {
      commit('updateSelectedYear', year);
      commit('updateSelectedYearSeriesData');
    },
  }
})

export default store;
