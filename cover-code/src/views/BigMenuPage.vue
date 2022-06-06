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
			<PostCardList></PostCardList>
		</div>
		<PostAddTitleModal
			v-if="openedModal.write"
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
	methods: {
		closeModal(btn) {
			if (btn === 'write') this.openedModal.write = false;
		},
	},
};
</script>
