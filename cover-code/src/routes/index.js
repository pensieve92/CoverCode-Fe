import Vue from 'vue';
import VueRouter from 'vue-router';
import menus from '@/constents/menu';

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
			beforeEnter: function (to, from, next) {
				// console.log(':menu to', to);
				// console.log(':menu from', from);
				const isMenu = menus.find(menu => menu.title === to.params.menu);
				if (isMenu) {
					next();
				} else {
					// not Found Page
					// '/error' 로하면 무한루프를 탄다.
					// deepth를 2단계로 해야 무한루프에 빠지지 않는다.
					next('/error/404');
				}
			},
		},
		{
			path: '/:menu/:postId',
			component: () => import('@/views/PostPage.vue'),
		},
		{
			path: '*',
			component: () => import('@/views/NotFoundPage.vue'),
		},
	],
});
