<template>
	<!-- 목적:	포스트 상세내용 -->
	<!-- 내용: 상세 게시글 markdown editor 사용 예정..-->
	<!-- markdown-it 사용해보자!!-->
	<!-- markdown-it-vue 안됨.. >> 얘는 vue3 버전인듯!!! -->

	<!-- vue2-markdown-it  -->
	<!-- why 제대로 import가 안되지??//-->
	<!-- npm install vue2-markdown-it --save-->

	<!-- 2022.05.25 -->
	<!-- 새로운 마크다운 perfect-markdown 사용해보기-->
	<!-- perfect-markdown 은 vuex가 필요하다 -->

	<!-- 2022.05.28 -->
	<!-- toastui 사용해보기 -->

	<div>
		<div class="itemLeft mt-05r">
			<ui-button
				v-if="isEditMode"
				color="primary"
				@click="clickBtn('save')"
				size="small"
				class="ml025r"
				>저장</ui-button
			>
			<ui-button
				v-if="!isEditMode"
				color="primary"
				@click="clickBtn('edit')"
				size="small"
				class="ml025r"
				>수정</ui-button
			>
			<ui-button
				v-if="!isEditMode"
				color="primary"
				@click="clickBtn('add')"
				size="small"
				class="ml025r"
				>추가</ui-button
			>
		</div>
		<Editor
			ref="editor"
			class="mt05r"
			v-if="isEditMode"
			:initialValue="editorValue"
			initialEditType="markdown"
			:options="editorOptions"
			height="700px"
			previewStyle="vertical"
		/>
		<Viewer
			ref="viewer"
			v-if="!isEditMode"
			:initialValue="editorValue"
			height="100px"
		/>
	</div>
</template>

<script>
import { Editor, Viewer } from '@toast-ui/vue-editor';

import '@toast-ui/editor/dist/toastui-editor.css';

export default {
	name: 'Post',
	components: { Editor, Viewer },
	computed: {
		isEditMode() {
			return this.mode === 'edit';
		},
		editorValue() {
			// TODO 이름 바꾸고 싶은데 멀로 바꾸지??
			return `# ${this.post.title} \n\n ${this.post.content}`;
		},
	},
	props: {
		mode: {
			type: String,
			default: 'view',
			validator: value => {
				return ['edit', 'view'].indexOf(value) > -1 ? value : 'view';
			},
		},
		post: {
			type: Object,
			default: () => ({}),
		},
	},
	data() {
		return {
			viewer: {
				content: '',
			},
			// post: {},
			// isEditMode: false,
			baseTemplate: `# titleZone

\t\t/**
\t\t * @description js 샘플 템프릿
\t\t * @author JeonBang
\t\t * @since 2022.06.04
\t\t */
\t\tsample() {
\t\t\t// Final Result

\t\t\treturn 'ok';
\t\t\t// Scenario 1:

\t\t\t// Scenario 2:
\t\t\t// Scenario 3:

\t\t},`,
			viewerText:
				'# This is Viewer.\n ' +
				'[![npm version](http://img.shields.io/npm/v/markdown-it-anchor.svg?style=flat-square)](https://www.npmjs.org/package/markdown-it-anchor)\n ' +
				'```java \n Hello World.\n ```\nHello World.\n Hello World.\n Hello World.\n Hello World.\n Hello World.\n Hello World.\n Hello World.',
			viewerOptions: {
				minHeight: '50px', // 안먹힌다..
			},
			editorOptions: {
				minHeight: '600px',
				language: 'en-US',
				useCommandShortcut: true,
				usageStatistics: true,
				hideModeSwitch: false,
				toolbarItems: [
					['heading', 'bold', 'italic', 'strike'],
					['hr', 'quote'],
					['ul', 'ol', 'task', 'indent', 'outdent'],
					['table', 'image', 'link'],
					['code', 'codeblock'],
					['scrollSync'],
				],
			},
			openedModal: {
				add: false,
			},
		};
	},
	methods: {
		//   @param {number} id 숫자타입의 아이디
		// @returns {string} template 템플릿 초기값
		clickBtn(mode) {
			console.log('mode', mode);
			// this.$emit('changeMode', mode);
			if (mode === 'edit') {
				// this.isEditMode = false;
				// this.mode = 'view';
				// TODO mode를 어디서 받을건지!!
				// mode를 변경해줘야하는데 emit을 사용해서 부모를 변경
				// 아니면 mode를 prop으로 받지 말고 이페이지에서
				// 으흠.. 모드를 어떻게 처리할건지 생각해보기

				// DONE PAGE의 역활!!
				// page는 $route의 params나 query를 받아주는 역할로 사용하자!!

				this.$emit('changeMode', mode);
			} else if (mode === 'save') {
				// TODO props의 Post를 저장해야하는데
				// props가 Object이면 변경이 가능함 >> watch가 안됨!
				// Object props 변경 수정을 허용할껀가??! 허용하기 싫은데...

				// DONE js 기본 데이터타입, 참조 데이터타입
				// Props의 Type을 기본데이터타입과 참조데이터타입 나눠서 사용하기
				// 1. 기본 데이터 타입[null, undefined, 문자열, 숫자, 불린] 원시값 : $emit('something')
				// 1-1. 초기 값으로 사용하는 경우는 로컬데이터 속성으로 정의
				// DONE prop >> initial + Something으로 네이밍하기
				// props: ['initialCounter'],
				//   data: function () {
				//   return {
				//     counter: this.initialCounter
				//   }
				// }
				// 1-2.변환해야하는 경우는 computed
				// .trim() 처럼 크게 의미없는 함수를 사용해서 정의하는게 어떤가?
				// props: ['size'],
				//   computed: {
				//   normalizedSize: function () {
				//     return this.size.trim().toLowerCase()
				//   }
				// }
				// 2. 참조 데이터 타입[Object > Array, Function, RegExp] : this.post.something = someone
				// this.post = { title: 'title',}; >>> 허용X
				// this.post.content = markdown >>> 허용O

				this.post.content = this.$refs.editor.invoke('getMarkdown');
				this.$store.dispatch('post/updatePost', this.post).then(() => {
					this.$emit('changeMode', 'view');
				});
			} else if (mode === 'add') {
				// openModal
				this.openedModal.add = true;
			}
		},
		closeModal(btn) {
			if (btn === 'add') this.openedModal.add = false;
		},
		clickEdit() {},
		clickSave() {},
		clickAdd() {},
	},
	created() {
		console.log('Post created');
	},
	destroyed() {
		console.log('Post destroyed');
	},
};
</script>

<style scoped></style>
