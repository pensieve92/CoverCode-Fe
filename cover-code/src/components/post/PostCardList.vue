<template>
	<!-- 목적:	포스트카드의 리스트 표시 -->
	<!-- 내용: PostCard 컴포넌트를 10개씩 뿌려준다.-->
	<div>
		<!-- TODO title="title123" 이렇게 넣으면 css가 적용되고     -->
		<!-- #header에 변수를 넣을면 css가 적용안된다.-->
		<!-- <slot name='header'> 여기 안에는 아무것도 넣지 말아야 한다.!! <slot>-->
		<!--			<PostCard style="width: 95%" title="title123">-->
		<PostCard style="width: 95%">
			<template #header>title123</template>
			<template #date>2022.05.22</template>
			<template #default>
				<PostCardBody>
					<template #useTitle></template>
					<template #useContent></template>
					<template #explainContent></template>
				</PostCardBody>
			</template>
		</PostCard>
	</div>
</template>

<script>
import PostCard from '@/components/post/PostCard';
import PostCardBody from '@/components/post/PostCardBody';

export default {
	name: 'PostCardList',
	components: { PostCard, PostCardBody },
};
</script>

<style scoped></style>
