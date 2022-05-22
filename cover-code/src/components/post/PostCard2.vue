<template>
	<!-- 목적:	포스트 간략 표시-->
	<!-- 내용: 제목 + 작성일 + 간단내용 + 최종 히스토리 or 최종 covered code + 이론, 작동 설명?-->

	<!-- TODO : ui-collapsible header에 아이콘 넣을 수 있는지 확인하기 -->
	<!-- 상세 화면으로 바로 갈 수 있는지 확인해야함 -->

	<!-- uiIconButton 아이콘을 넣기는 했는데 클릭 이벤트가 제대로 안먹힘.. -->
	<!-- uiButton을 넣으면 클릭이벤트가 먹는다..-->

	<!-- UiCollapsible 복붙해서 커스텀해서 사용하자!! -->
	<!-- [상세아이콘] [타이틀] [업데이트날] [위아래아이콘] -->
	<!-- [Use] [Explain] -->

	<div>
		<div>PostCard</div>
		<div class="" style="width: 95%">
			<ui-collapsible open>
				<!--history-->
				<!-- 2022.05.09 -->

				<!-- slot을 파려면 -->
				<!-- <slot name="header"> Test </slot> -->
				<!-- slot에 넣을려면 -->
				<!-- 1. -->
				<!-- <template slot="header">{{}}</template>-->
				<!-- 2. -->
				<!--        <template v-slot:footer>-->
				<!--          <p>Here's some contact info</p>-->
				<!--        </template>-->
				<!-- End -->

				<!-- slot에 파라미터 자리 파기  -->
				<!--  <slot v-bind:user="user">      -->
				<!--      {{ user.lastName }}    :: default  -->
				<!--    </slot>      -->

				<!-- slot에 파라미터도 넣기  -->
				<!-- <current-user>       -->
				<!--  <template v-slot:default="slotProps">				-->
				<!--     {{ slotProps.user.firstName }}     :: {{ user.lastName }}자리 -->
				<!--   </template>       -->
				<!-- </current-user>       -->

				<!-- 결론-->
				<!-- slot에서 v-slot 으로 바뀔예정-->

				<!--  <template #default="slotProps">				-->
				<!--				<template slot="header">test</template>-->

				<template v-slot:header>
					<p>Here's some contact info</p>
				</template>

				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur
				nemo suscipit ipsa molestias, tempora dolor natus modi et incidunt
				tenetur!
			</ui-collapsible>

			<ui-collapsible open>
				<div slot="header">
					<div style="display: inline-block">
						<b> HTML supported in header headerheaderheaderheaderheader</b>
					</div>
					<ui-icon-button
						icon="description"
						color="default"
						size="normal"
						@click="clickIcon"
					></ui-icon-button>
					<ui-button @click="clickIcon">
						<ui-icon>description</ui-icon>
					</ui-button>
					<div style="float: right; display: inline-block">
						<span>업데이트일: 2022.05.14</span>
					</div>
				</div>
				<br />
				<b style="color: green">Use</b>
				간략한 설명 : slot="header" >>> #header <br />
				Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br />
				Consectetur nemo suscipit ipsa molestias, tempora dolor natus modi et
				incidunt tenetur!
				<br />
				<br />
				<b style="color: blue">Explain</b><br />
				버전 업데이트로 인해 사라질예정...
			</ui-collapsible>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PostCard',
	methods: {
		clickIcon() {
			console.log('click');
		},
	},
};
</script>

<style scoped></style>
