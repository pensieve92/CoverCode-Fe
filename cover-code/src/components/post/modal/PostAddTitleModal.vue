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
			@keydown-enter.prevent="clickAdd"
		></ui-textbox>

		<div slot="footer">
			<ui-button color="primary" @click="clickAdd">Add</ui-button>
			<ui-button @click="close">Close</ui-button>
		</div>
	</ui-modal>
</template>
<script>
import modalMixin from '@/components/mixins/common/modal.mixin';
import { initPost } from '@/components/post';

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
			// console.log('clickAdd');
			// FIXED 2022.06.22 javascript 에서 post Add할때 addForm
			// 기본 default 값을 가진 Object를 만들어서
			// 계속 재사용하고 싶다.
			// 어떻게 사용하는게 좋을까??
			// vuex에다가 initform 만들어서 사용하기 >> uuid가 새로 안생성된다
			// const로 뺴야하나? ㅡmethod로 뺴야지 새로 생성 될거 같은데..
			if (this.isValid()) {
				// vuex에서 getters는 처음에 호출될때 한번 만들고, 그다음부터는 만들어진 결과를 가지고 있다각
				// 다음 호출시에 이미 생성된 결과를 리턴한다.!!
				// const inputParam = this.$store.getters['post/postInit'];

				const inputParam = initPost();
				for (const key in this.input) {
					// array to string - category
					if (typeof this.input[key].value === 'object') {
						inputParam[key] = this.input[key].value
							.map(item => item.value)
							.join(',');
					} else {
						inputParam[key] = this.input[key].value;
					}
				}
				console.log('--1-- clickAdd');
				this.$emit('add', inputParam);
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
