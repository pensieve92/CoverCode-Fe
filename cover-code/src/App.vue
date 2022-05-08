<template>
	<div id="app">
		<!-- ::문제:: router-link 를 사용할까 -->
		<!-- ::::::: 아니면 Tab을  사용해서 전체를 로딩해오는게 좋은 걸까?? -->
		<!-- >>>>>>> 데이터를 가져오는 방식에 따라 결정해야할것 같다 -->

		<!-- :::A::: Tab을 사용하면 전체 데이터를 미리 가져와야한다. -->
		<!-- :::B::: router를 사용시 $router.push()를 해야한다. keen-ui에서 적용할 수 있는지 연구해바야한다. -->
		<!-- ::결론:: 지금 상황에서는 router를 사용하고, 디자인을 적용시킬수 있을지 없을지 확인해보자!!! -->

		<!-- history   -->
		<!-- 2022.05.07 -->
		<!-- 생각해보니 데이터만 바뀌고 내용 형식은 같기 때문에 Router를 사용할 필요가 없다..-->
		<!-- 1개의 router에 파라미터만 받는 (router.param.type?) 다이나믹 라우터를 사용해도 충분할듯 -->
		<!-- ui-tab 내부에 <router-view>를 넣어준다.. -->
		<!-- App.vue : vue 기본 페이지-->
		<!--    ㄴ Home.vue >>> router path : /  -->

		<!-- 2022.05.07 -->
		<!--    home 버튼도 만들려면 Tab보다 Toolbar를 사용하는게 나음!!-->

		<!-- 2022.05.08 -->
		<!-- ㄴ 아님.. ui-tab에 <router-view를 넣으면 해결될듯..-->

		<div class="page__demo-group page__demo-group--has-tabs">
			<ui-toolbar
				brand="Coco"
				remove-brand-divider
				text-color="white"
				type="colored"
				:raised="false"
			>
				<div slot="actions">
					<ui-icon-button
						color="white"
						icon="search"
						size="large"
						type="secondary"
					></ui-icon-button>

					<ui-icon-button
						color="white"
						has-dropdown
						icon="more_vert"
						ref="dropdownButton8"
						size="large"
						type="secondary"
					>
						<ui-menu
							contain-focus
							has-icons
							slot="dropdown"
							:options="menuOptions"
							@close="$refs.dropdownButton8.closeDropdown()"
						></ui-menu>
					</ui-icon-button>
				</div>
			</ui-toolbar>

			<ui-tabs
				ref="tabs"
				background-color="primary"
				fullwidth
				indicator-color="white"
				text-color-active="white"
				text-color="white"
				type="text"
				:confirmTabChange="changeTab"
			>
				<!-- :id를 넣지 않으면 자동으로 unique id를 생성해서 넣어준다. -->
				<!-- uniqe id생성 -->
				<ui-tab
					v-for="menu of menus"
					:id="menu.title"
					:key="menu.key"
					:title="menu.title"
				>
					<!-- views -->
					<router-view></router-view>
				</ui-tab>
			</ui-tabs>
		</div>
	</div>
</template>

<script>
const menuOptions = [
	{
		label: 'Settings',
	},
	{
		label: 'About',
	},
	{
		label: 'Help',
	},
];
import 'keen-ui/src/bootstrap';
import menus from '@/constents/menu';
export default {
	name: 'App',
	data() {
		return {
			menuOptions,
			menus,
		};
	},
	computed: {
		textColor() {
			if (this.backgroundColor === 'default') {
				return 'black';
			}
			return 'white';
		},
		indicatorColor() {
			if (this.backgroundColor === 'default') {
				return 'primary';
			}
			return 'white';
		},
	},
	methods: {
		async changeTab(o, n) {
			// history
			// 2022.05.08
			// 내부에서 setActiveTab()를 사용하면 무한루프에 빠진다.

			// setActiveTab() > changTab()을 호출한다.
			// changeTab 내부에  setActiveTab()를 호출하면 무한루프에 빠진다.
			// this.$refs.tabs.setActiveTab('Js');

			if (n.title === o.title) return;
			if (n.title === 'Home') {
				await this.$router.push('/');
			} else {
				await this.$router.push('/' + n.title);
			}
		},
	},
};
</script>

<!--<style lang="scss">-->
<!--//@import '~styles/imports';-->
<!--.page&#45;&#45;ui-toolbar {-->
<!--	.page__demo-group {-->
<!--		margin-bottom: rem(48px);-->
<!--		&.has-photo-cover {-->
<!--			background-position: 50%;-->
<!--			background-size: cover;-->
<!--			height: rem(300px);-->
<!--		}-->
<!--	}-->
<!--	.page__demo-group&#45;&#45;photo-1 {-->
<!--		background-image: url('https://i.imgur.com/Fln32Fv.jpg');-->
<!--	}-->
<!--	.page__demo-group&#45;&#45;photo-2 {-->
<!--		background-image: url('https://i.imgur.com/vFBagiE.jpg');-->
<!--	}-->
<!--	.page__demo-group&#45;&#45;has-tabs {-->
<!--		.ui-tabs__header {-->
<!--			box-shadow: 0 2px 2px rgba(black, 0.2);-->
<!--		}-->
<!--	}-->
<!--}-->
<!--</style>-->
