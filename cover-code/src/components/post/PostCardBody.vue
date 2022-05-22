<template>
	<div>
		<b style="color: green">Use</b>
		<span style="padding-left: 5px">
			<slot name="useTitle">title를 입력해주세요</slot>
		</span>
		<br />
		<div>
			<slot name="useContent">컨텐츠를 입력해주섿요</slot>
		</div>
		<br />
		<b style="color: blue">Explain</b><br />
		<div>
			<slot name="explainContent">설명을 입력해주세요</slot>
		</div>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'PostCardBody',
};
</script>

<style scoped></style>
