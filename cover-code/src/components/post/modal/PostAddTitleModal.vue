<template>
	<ui-modal ref="modal" title="ADD NEW POST" @close="close">
		<ui-select
			ref="category"
			error="You must select at least 1 category"
			has-search
			help="Select 1 or more category"
			label="Category"
			multiple
			placeholder="Select some category"
			:invalid="checkValid('category')"
			@focus="input.category.isTouched = true"
			:options="input.category.option"
			v-model="input.category.value"
		></ui-select>

		<ui-textbox
			ref="title"
			autocomplete="off"
			error="This field is required"
			help="Enter new post title"
			label="Title"
			placeholder="Enter new title"
			required
			:invalid="checkValid('title')"
			@touch="input.title.isTouched = true"
			v-model="input.title.value"
			@keydown-enter="clickAdd"
		></ui-textbox>

		<div slot="footer">
			<ui-button color="primary" @click="clickAdd">Add</ui-button>
			<ui-button @click="close">Close</ui-button>
		</div>
	</ui-modal>
</template>
<script>
import modalMixin from '@/components/mixins/common/modal.mixin';
export default {
	name: 'PostAddTitleModal',
	mixins: [modalMixin],
	props: {
		pCategory: {
			type: String,
			default: '',
		},
	},

	created() {
		this.setCategory();
	},
	data() {
		return {
			input: {
				category: {
					value: [],
					option: [
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
					isTouched: false,
				},
				title: {
					value: '',
					isTouched: false,
					invalid: false,
				},
			},
		};
	},
	methods: {
		checkValid(key) {
			if (key === 'category') {
				return (
					this.input.category.isTouched && this.input.category.value.length < 1
				);
			} else if (key === 'title') {
				return (
					this.input.title.isTouched && this.input.title.value.length === 0
				);
			}
			return true;
		},
		clickAdd() {
			if (this.isValid()) {
				const inputParam = {};
				for (const key in this.input) {
					if (typeof this.input[key].value === 'object') {
						inputParam[key] = this.input[key].value.map(item => item.value);
					} else {
						inputParam[key] = this.input[key].value;
					}
				}
				console.log('inputParam', inputParam);
				return inputParam; // TODO >> Array에 추가하기
			}
		},
		setCategory() {
			const selected = this.input.category.option.find(
				category =>
					category.value.toUpperCase() === this.pCategory.toUpperCase(),
			);
			// console.log('selected', selected);
			this.input.category.value.push(selected);
		},
		isValid() {
			// focus
			function focus(input) {
				this.$refs[input].focus();
				return false;
			}

			// touch
			for (const input in this.input) {
				this.input[input].isTouched = true;
			}

			// check valid
			for (const input in this.input) {
				if (input === 'category') {
					if (this.input.category.value.length < 1) {
						return focus.call(this, input);
					}
				} else if (input === 'title') {
					if (this.input.title.value.length === 0) {
						return focus.call(this, input);
					}
				}
			}

			return true;
		},
	},
};
</script>
