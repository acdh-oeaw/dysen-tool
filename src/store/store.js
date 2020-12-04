import Vue from 'vue';
import Vuex from 'vuex';

import dysenData from '@/store/data.json';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    availableWords: dysenData.stl,
    availableYears: dysenData.yList,
    selectedWord: dysenData.stl[0],
    selectedYear: dysenData.yList[dysenData.yList.length - 1],
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
        return obj.sT === state.selectedWord;
      });
      for (const yearData of selectedWordObj.yS) {
        for (const dataPoint of yearData.dP) {
          if (chartDataSources.includes(dataPoint.s)) {
            const sourceObjIndex = yearlyFreqData.findIndex(obj => {
              return obj.name === dataPoint.s;
            });
            yearlyFreqData[sourceObjIndex].data.push([yearData.y, dataPoint.rF]);
            // Start: Temp: Random sentiment score
            if (dataPoint.sS === 0) dataPoint.sS = Math.random() * 2 - 1;
            // End: Temp: Random sentiment score
            yearlySentimentData[sourceObjIndex].data.push([yearData.y, dataPoint.sS]);
          } else {
            chartDataSources.push(dataPoint.s);
            yearlyFreqData.push({
              name: dataPoint.s,
              data: [[yearData.y, dataPoint.rF]]
            });
            // Start: Temp: Random sentiment score
            if (dataPoint.sS === 0) dataPoint.sS = Math.random() * 2 - 1;
            // End: Temp: Random sentiment score
            yearlySentimentData.push({
              name: dataPoint.s,
              data: [[yearData.y, dataPoint.sS]]
            });
          }
        }
      }
      return {yearlyFreqData, yearlySentimentData};
    },
    bubbleData(state) {
      let bubbleChartData;
      const selectedWordObj = dysenData.series.find(obj => {
        return obj.sT === state.selectedWord;
      });
      const selectedSeriesObj = selectedWordObj.yS.find(obj => {
        return obj.y === state.selectedYear;
      });
      if (selectedSeriesObj) {
        bubbleChartData = selectedSeriesObj.dP.map((obj) => {
          // Start: Temp: Random sentiment score
          //if (obj.sS === 0) obj.sS = Math.random() * 2 - 1;
          // End: Temp: Random sentiment score
          return {
            name: obj.s,
            x: obj.sS,
            y: obj.rF
          }
        });
      }
      return {
        data: bubbleChartData,
        freqBaseline: selectedSeriesObj.rF
      };
    }
  },
  actions: {
  }
})

export default store;
