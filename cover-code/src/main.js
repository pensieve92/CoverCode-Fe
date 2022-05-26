import Vue from 'vue';
import App from '@/App.vue';
import router from '@/routes';
import KeenUI from 'keen-ui';
import store from '@/store';
import pmd from 'perfect-markdown';
import 'keen-ui/dist/keen-ui.css';

Vue.use(pmd, { store });
Vue.use(KeenUI);

Vue.config.productionTip = false;
// EventBus 생성
Vue.prototype.$bus = new Vue();

new Vue({
	store,
	render: h => h(App),
	router,
}).$mount('#app');
