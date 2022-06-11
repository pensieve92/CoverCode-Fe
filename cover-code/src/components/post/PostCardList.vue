<template>
	<!-- 목적:	포스트카드의 리스트 표시 -->
	<!-- 내용: PostCard 컴포넌트를 10개씩 뿌려준다.-->
	<div class="tabBody">
		<!-- TODO title="title123" 이렇게 넣으면 css가 적용되고     -->
		<!-- #header에 변수를 넣을면 css가 적용안된다.-->
		<!-- <slot name='header'> 여기 안에는 아무것도 넣지 말아야 한다.!! <slot>-->
		<!--			<PostCard style="width: 95%" title="title123">-->
		<PostCard v-for="post in propData" :key="post.id" style="width: inherit">
			<template #header>{{ post.title }}</template>
			<template #date>{{ post.creDate }}</template>
			<template #default>
				<Viewer :initialValue="post.content" height="100px" />
				<!--				<PostCardBody>-->
				<!--					<template #useTitle></template>-->
				<!--					<template #useContent></template>-->
				<!--					<template #explainContent></template>-->
				<!--				</PostCardBody>-->
			</template>
		</PostCard>
	</div>
</template>

<script>
import PostCard from '@/components/post/PostCard';
import { Viewer } from '@toast-ui/vue-editor';

export default {
	name: 'PostCardList',
	components: { PostCard, Viewer },
	props: {
		propData: {
			type: Array,
			default: () => {
				return [];
			},
		},
	},
	data() {
		return {
			viewerText: 'test',
		};
	},
};
</script>

<style scoped></style>
