import Vue from 'vue';
import App from '@/App.vue';
import router from '@/routes';
import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';
import '@/assets/common.css';
import moment from 'moment';

moment.locale('ko');

Vue.use(KeenUI);

Vue.config.productionTip = false;
// EventBus 생성
// Vue.prototype.$EventBus = new Vue();

new Vue({
	render: h => h(App),
	router,
}).$mount('#app');
