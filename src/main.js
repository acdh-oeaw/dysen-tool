import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';
import store from './store/store';
import vSelect from 'vue-select'
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';
import seriesLabel from 'highcharts/modules/series-label';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-select/dist/vue-select.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(HighchartsVue);
Vue.prototype.Highcharts = Highcharts;

Highcharts.setOptions({
  credits: false,
});

Highcharts.setOptions({
  colors: ["#4e79a7","#f28e2c","#e15759","#76b7b2","#59a14f","#edc949","#af7aa1","#ff9da7","#9c755f","#bab0ab"],
});

seriesLabel(Highcharts);

Vue.component('v-select', vSelect)

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');