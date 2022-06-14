<template>
	<Post :mode="mode" :post="post" @changeMode="changeMode"></Post>
</template>

<script>
import Post from '@/components/post/Post';

export default {
	name: 'PostPage',
	components: { Post },
	created() {
		// %route에서 postId 가져와서 조회?
		// 조회를 굳이 다시해야하나.
		// title add 시 저장하고
		// 1. data만 넘겨서 page에 뿌려 주고 싶은데
		// 그렇게 할려면,
		// push() 할떄 Object를 넘기거나 > emit으로 부모 컴포넌트에서 처리해야함 >> 별로 안좋은거 같음
		// 2. 리스트에서 id로조회 하거나
		this.search();
	},
	props: {},
	data() {
		return {
			post: {},
			mode: this.$route.query.mode.toString(),
		};
	},
	methods: {
		changeMode(mode) {
			this.mode = mode;
		},
		search() {
			this.post = this.$store.getters['post/postsById'](
				this.$route.params.postId,
			);
		},
	},
};
</script>

<style scoped></style>
