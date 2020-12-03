import Vue from 'vue';
import Vuex from 'vuex';

import dysenData from '@/store/data_export_data_omitted_on_year_lvl_v1.1.json';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    availableWords: dysenData.searchTermList,
    availableYears: dysenData.yearList,
    selectedWord: dysenData.searchTermList[0],
    selectedYear: dysenData.yearList[dysenData.yearList.length - 1],
    yearlySentimentData: [],
    scatterplotData: [],
  },
  mutations: {
    changeSelectedWord (state, word) {
      state.selectedWord = word;
    },
    changeSelectedYear (state, year) {
      state.selectedYear = year;
    },
  },
  getters: {
    availableWords: (state) => state.availableWords,
    availableYears: (state) => state.availableYears,
    selectedWord: (state) => state.selectedWord,
    selectedYear: (state) => state.selectedYear,
    yearlyData(state) {
      let yearlyFreqData = [];
      let yearlySentimentData = [];
      let chartDataSources = [];
      const selectedWordObj = dysenData.series.find(obj => {
        return obj.searchTerm === state.selectedWord;
      });
      for (const yearData of selectedWordObj.yearSeries) {
        for (const dataPoint of yearData.dataPoints) {
          if (chartDataSources.includes(dataPoint.source)) {
            const sourceObjIndex = yearlyFreqData.findIndex(obj => {
              return obj.name === dataPoint.source;
            });
            yearlyFreqData[sourceObjIndex].data.push([yearData.year, dataPoint.relativeFrequency]);
              // Temp: Random sentiment score
              if (dataPoint.sentimentScore === 0) dataPoint.sentimentScore = Math.random() * 2 - 1;
            yearlySentimentData[sourceObjIndex].data.push([yearData.year, dataPoint.sentimentScore]);
          } else {
            chartDataSources.push(dataPoint.source);
            yearlyFreqData.push({
              name: dataPoint.source,
              data: [[yearData.year, dataPoint.relativeFrequency]]
            });
              // Temp: Random sentiment score
              if (dataPoint.sentimentScore === 0) dataPoint.sentimentScore = Math.random() * 2 - 1;
            yearlySentimentData.push({
              name: dataPoint.source,
              data: [[yearData.year, dataPoint.sentimentScore]]
            });
          }
        }
      }
      return {yearlyFreqData, yearlySentimentData};
    },
  },
  actions: {
  }
})

export default store;
