import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: () => import('@/views/Home.vue'),
		},
		{
			path: '/js',
			component: () => import('@/views/Js.vue'),
		},
		{
			path: '/vue',
			component: () => import('@/views/Vue.vue'),
		},
		{
			path: '/java',
			component: () => import('@/views/Java.vue'),
		},
	],
});
