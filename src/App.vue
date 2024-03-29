<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <nav class="navbar col-12 flex-md-nowrap ml-auto px-2">
          <div class="col-md-1 navbar-brand m-0">
            DYSEN
          </div>
          <div class="col-md-5 m-auto">
            <SearchForm/>
          </div>
          <div class="col-md-6 ml-auto text-right">
            <div>
              The DYSEN project is funded by the Stadt Wien Kultur.
            </div>
            <div>
              <a id="how-to" href="#" @click="$bvModal.show('howto-modal')">How to use this tool?</a>
              <span> | </span>
              <a href="https://dylen.acdh.oeaw.ac.at/dysen/" target="_blank">More about the project</a>
              <span> | </span>
              <a href="https://dylen.acdh.oeaw.ac.at/imprint" target="_blank">Imprint</a>
            </div>
          </div>
        </nav>
      </div>
      <main>
        <div class="row">
          <div class="col-md-6">
            <div class="row pb-1">
              <div class="col-md-12 vis-component half-height mb-1">
                <FreqChart/>
              </div>
            </div>
            <div class="row pb-1">
              <div class="col-md-12 vis-component half-height mb-1">
                <SentimentChart/>
              </div>
            </div>
          </div>
          <div class="col-md-6 vis-component full-height">
            <BubbleChart/>
          </div>
        </div>
      </main>
    </div>
    <b-modal id="howto-modal" title="How to use this tool?" ok-only scrollable>
      <p><strong>Data Source</strong></p>
      <p>As a data source the Austrian Media Corpus (AMC) was used, which contains over 44 Mio. articles from different Austrian news outlets from the last decades with about 10 billion running words. In the tool the time span 1991 to 2017 is covered.</p>
      <p><strong>Selected Politicians</strong></p>
      <p>To retrieve a list of Viennese politicians the politician archive of Vienna (POLAR) from the Vienna City and State Archives is used [1]. Regarding the AMC corpus [2] which includes media from the year 1986 to 2018 the result list is limited to politicians which were active in the timeframe between 1986 to 2020. Therefore, the politicians which were active between the 13<sup>th</sup> and the 20<sup>th</sup> parliamentary term were selected.</p>
      <p>The list contains politicians with the following political functions:</p>
      <ul>
        <li>All members of the Vienna City Council and members of the Vienna State Parliament</li>
        <li>All members of the Vienna City Senate and the Vienna State Government</li>
      </ul>
      <p><strong>Method</strong></p>
      <p>The sentiment scores are calculated with the help of the dictionary Austrian Language Polarity in Newspapers (ALPiN). Available: <a href="https://phaidra.univie.ac.at/view/o:1169855"> https://phaidra.univie.ac.at/view/o:1169855</a></p>
      <p><strong>Exclusion criteria</strong></p>
      <ul>
        <li>Less than 100 hits (matching fullname) or less than 10 sentiment scores over the whole timespan: the politician is not selected.</li>
        <li>Less than 10 hits per year/media/politician: the corresponding calculated sentiment score is excluded.</li>
        <li>Normalised frequency below 0,001: the corresponding year/media/politician is excluded.</li>
      </ul>
      <p><strong>References</strong></p>
      <p>[1] D. B. Steininger. (29.03.2020).<em> Wiener Politikerinnen und Politiker 1945 - aktuell</em>. Available:<a href="https://www.wien.gv.at/advuew/internet/AdvPrSrv.asp?Layout=histpolsuche&amp;Type=S&amp;Hlayout=histpolsuche&amp;HP=Y&amp;RF=02&amp;ICD=2011021810192827"> https://www.wien.gv.at/advuew/internet/AdvPrSrv.asp?Layout=histpolsuche&amp;Type=S&amp;Hlayout=histpolsuche&amp;HP=Y&amp;RF=02&amp;ICD=2011021810192827</a></p>
      <p>[2] Ransmayr, Jutta, K. M&ouml;rth, and M. Ďurčo. (2017, 29.03.2020). <em>AMC (Austrian Media Corpus) &ndash; Korpusbasierte Forschungen zum &ouml;sterreichischen Deutsch. In Digitale Methoden der Korpusforschung in &Ouml;sterreich (= Ver&ouml;ffentlichungen zur Linguistik und Kommunikationsforschung Nr. 30)</em>. Available:<a href="https://amc.acdh.oeaw.ac.at/"> https://amc.acdh.oeaw.ac.at/</a></p>
    </b-modal>
  </div>
</template>

<script>

import SearchForm from '@/components/SearchForm';
import FreqChart from '@/components/FreqChart';
import SentimentChart from '@/components/SentimentChart';
import BubbleChart from '@/components/BubbleChart';

export default {
  name: 'App',
  components: {
    SearchForm, FreqChart, SentimentChart, BubbleChart
  },
  data() {
    return {
    }
  },
  mounted() {
    this.$store.dispatch('onApplicationLoad');
  },
  computed: {
  },
  watch: {
  },
}
</script>

<style lang="scss">
body {
  background-color: #F1F1F1 !important;
}

.modal {
  a {
    word-break: break-word;
  }
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

.navbar-brand {
  font-size: 1.5rem !important;
  font-weight: 600 !important;
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
