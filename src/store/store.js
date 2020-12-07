import Vue from 'vue';
import Vuex from 'vuex';
import Highcharts from 'highcharts';

import dysenData from '@/store/data.json';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    availableWords: dysenData.stl,
    availableYears: [],
    selectedWord: dysenData.stl[0],
    selectedYear: dysenData.yList[dysenData.yList.length - 1],
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
    chartData(state) {
      let yearlyFreqData = [];
      let yearlySentimentData = [];
      let chartDataSources = [];
      let availableYears = [];
      const selectedWordObj = dysenData.series.find(obj => {
        return obj.sT === state.selectedWord;
      });
      for (const yearData of selectedWordObj.yS) {
        availableYears.push(yearData.y);
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
      state.availableYears = availableYears;
      let scatterplotDataSeries;
      let freqBaseline;
      const selectedSeriesObj = selectedWordObj.yS.find(obj => {
        return obj.y === state.selectedYear;
      });
      if (selectedSeriesObj) {
        freqBaseline = selectedSeriesObj.rF;
        scatterplotDataSeries = selectedSeriesObj.dP.map((obj) => {
          const sourceIndexInFreqChartData = yearlyFreqData.findIndex(objFreq => {
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
      return {
        yearlyFreqData, 
        yearlySentimentData, 
        scatterplotData: {
          data: scatterplotDataSeries,
          freqBaseline
        }
      };
    },
  },
  actions: {
  }
})

export default store;
