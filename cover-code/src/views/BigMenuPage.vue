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
			<PostCardList :propData="sampleData"></PostCardList>
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
			sampleData: [
				{
					id: '1',
					title: 'Test1',
					category: 'vue',
					content: '# help',
					creDate: '2022.06.11',
				},
				{
					id: '2',
					title: 'Test2',
					category: 'vue',
					content: '# help',
					creDate: '2022.06.11',
				},
			],
		};
	},
	methods: {
		addPost(post) {
			console.log('post', post);
			this.sampleData.push(post);
		},
		closeModal(btn) {
			if (btn === 'write') this.openedModal.write = false;
		},
	},
};
</script>
