<template>
	<Post :initial-mode="mode" :post="post" @changeMode="changeMode"></Post>
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
			mode: this.$route.query.mode || '',
		};
	},
	computed: {
		// TODO computed의 mode를 props로 전달하니까 안됬다.
		// DONE computed는 컴포넌트가 리렌더링 될 수 있게 로컬데이터를 참조하는게 아니라
		// 새로운 값을 연산해주는 역할
		// mode: {
		// 	get() {
		// 		return this.$route.query.mode || '';
		// 	},
		// 	set(value) {
		// 		console.log('🍉🍉 ' + 'computed' + ' : ', value);
		// 		return value;
		// 	},
		// },
	},
	methods: {
		/**
		 * editor, viewer 활성/비활성
		 * @param mode ['edit', 'view']
		 * @type String
		 */
		changeMode(mode) {
			console.log('🍉🍉 ' + 'changeMode' + ' : ', mode);
			this.mode = mode;
		},
		// search() {
		// 	this.post = this.$store.getters['post/postsById'](
		// 		this.$route.params.postId,
		// 	);
		// },
		async search() {
			// TODO Page에서 search를 할까?, 아니면 Post에서 search를 할까..
			// 우선 Page에서 $route의 query, param을 받는다.
			// 받은 $route의 정보를 Post로 넘기느냐? 아니면 page에서만 처리하느냐?
			// id, mode를 받아
			// mode는 그대로 전달, id도 그대로 전달!!
			// DONE $route에서 받은 파라메터만 사용하는 검색일경우
			// Page에서 search()해서 post 컴포넌트의 Prop으로 전달
			// Page에 컴포넌트가 많아지면 복잡해질수 있으니?
			// search 결과를 여러 컴포넌트에서 사용할 수도 있잖아..

			// TODO getter와 dispatch를 비교해보자
			// DONE getter는 가져오는 것만하고 dispatch는 데이터 변경만 수행할 수 있도록 하자!
			// getter를 사용할 때는 computed를 안에서 사용하여 변경내용을 적용하자
			const postId = this.$route.params.postId;
			console.log('---6--- postPage postId', postId);
			const post = this.$store.getters['post/postsById'](postId);
			console.log('---8--- postPage postId', post);
			if (post && post.id) {
				this.post = post;
			}
		},
	},
};
</script>

<style scoped></style>
