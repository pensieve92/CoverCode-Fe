<template>
	<div>
		<div>
			<div class="itemLeft mt-05r">
				<ui-button
					color="primary"
					size="small"
					class="mb05r"
					@click="openedModal.write = true"
					>글쓰기
				</ui-button>
			</div>
			<PostCardList :propData="posts"></PostCardList>
		</div>
		<PostAddTitleModal
			v-if="openedModal.write"
			@add="addPost"
			@close="closeModal('write')"
			:pCategory="$route.params.menu"
		/>
	</div>
</template>

<script>
import PostCardList from '@/components/post/PostCardList';
import PostAddTitleModal from '@/components/post/modal/PostAddTitleModal';

export default {
	name: 'BigMenuPage',
	components: { PostAddTitleModal, PostCardList },
	data() {
		return {
			openedModal: {
				write: false,
			},
		};
	},
	computed: {
		posts() {
			return this.$store.getters['post/postsAll'];
		},
	},
	methods: {
		addPost(post) {
			// this.closeModal('write');
			// this.posts.push(post);
			// posts.addPost(post);
			//
			// console.log('addPost', posts.getPostsByCategory(this.$route.params.menu));
			// this.$router.push(this.$route.path + '/' + post.id + '?mode=edit');
		},
		closeModal(btn) {
			if (btn === 'write') this.openedModal.write = false;
		},
	},
};
</script>
