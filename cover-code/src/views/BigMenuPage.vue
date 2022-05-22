<template>
	<div>
		<div>
			{{ $route.params.menu }}
		</div>
		<div>
			<PostCardList></PostCardList>
		</div>
	</div>
</template>

<script>
import PostCardList from '@/components/post/PostCardList';

export default {
	name: 'BigMenuPage',
	components: { PostCardList },
};
</script>

<style scoped></style>
