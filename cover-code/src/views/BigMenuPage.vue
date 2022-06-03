<template>
	<div>
		<div>
			<div style="display: flex; flex-direction: row-reverse">
				<ui-button
					color="primary"
					size="small"
					class="mb05r"
					@click="openModal('modal802')"
					>글쓰기
				</ui-button>
			</div>
			<PostCardList></PostCardList>
		</div>
		<ui-modal ref="modal802" size="auto" title="Auto width modal">
			<ui-select
				error="You must select at least 2 colours"
				has-search
				help="Select 2 or more colours"
				label="Favourite colours"
				multiple
				placeholder="Select some colours"
				:invalid="select10Touched && select10.length < 2"
				@touch="selectTouch"
				:options="colours"
				v-model="select10"
			></ui-select>
			<!--      @touch="select10Touched = true"-->

			<ui-textbox
				autocomplete="off"
				error="This field is required"
				help="If you have multiple names, enter the one you prefer"
				label="Title"
				placeholder="Enter your name"
				required
				:invalid="textbox10Touched && modal802Content.length === 0"
				@touch="textbox10Touched = true"
				v-model="modal802Content"
			></ui-textbox>

			<div slot="footer">
				<ui-button color="primary">Say Hi</ui-button>
				<ui-button @click="closeModal('modal802')">Close</ui-button>
			</div>
		</ui-modal>
	</div>
</template>

<script>
import PostCardList from '@/components/post/PostCardList';

export default {
	name: 'BigMenuPage',
	components: { PostCardList },
	data() {
		return {
			modal802Content: 'hello coco',
			textbox10Touched: false,
			select10: [],
			select10Touched: false,
			colours: [
				{
					label: 'js',
					value: 'js',
				},
				{
					label: 'vue',
					value: 'vue',
				},
				{
					label: 'java',
					value: 'java',
				},
				{
					label: 'oracle',
					value: 'oracle',
				},
				{
					label: 'mybatis',
					value: 'mybatis',
				},
			],
		};
	},
	methods: {
		openModal(ref) {
			console.log('select10.length', this.select10.length);
			console.log(':select10Touched', this.select10Touched);
			console.log(':invalid', this.select10.length < 2);
			console.log(':invalid', this.select10Touched && this.select10.length < 2);
			this.$refs[ref].open();
		},
		closeModal(ref) {
			console.log('select10.length', this.select10.length);
			console.log(':select10Touched', this.select10Touched);
			console.log(':invalid', this.select10.length < 2);
			console.log(':invalid', this.select10Touched && this.select10.length < 2);
			this.$refs[ref].close();
		},
		selectTouch() {
			// 2022.06.03
			// 얘가 동작을 안함...
			console.log('selectTouch', this.select10Touched);
			return !this.select10Touched;
		},
	},
};
</script>

<style scoped></style>
