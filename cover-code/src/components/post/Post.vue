<template>
	<!-- 목적:	포스트 상세내용 -->
	<!-- 내용: 상세 게시글 markdown editor 사용 예정..-->
	<!-- markdown-it 사용해보자!!-->
	<!-- markdown-it-vue 안됨.. >> 얘는 vue3 버전인듯!!! -->

	<!-- vue2-markdown-it  -->
	<!-- why 제대로 import가 안되지??//-->
	<!-- npm install vue2-markdown-it --save-->

	<!-- 2022.05.25 -->
	<!-- 새로운 마크다운 perfect-markdown 사용해보기-->
	<!-- perfect-markdown 은 vuex가 필요하다 -->

	<div>
		<div>Post</div>
		<div id="main">
			<pmd
				v-model="value"
				:showToolbar="true"
				:showTextarea="true"
				:plugins="{ katex: true }"
				:imgWidthHeightAttr="{ width: true, height: false }"
			></pmd>
		</div>
	</div>
</template>

<script>
// import pmd from 'perf';
export default {
	name: 'Post',
	components: {},
	data() {
		return {
			value: '# hi markdown',
		};
	},
};
</script>

<style scoped></style>
