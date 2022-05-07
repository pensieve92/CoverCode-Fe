import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/', // App.vue의 router-view 영역에 들어가는 view
			component: () => import('@/views/Home.vue'),
		},
		{
			path: '/:menu',
			component: () => import('@/views/BigMenuPage.vue'),
		},
	],
});
