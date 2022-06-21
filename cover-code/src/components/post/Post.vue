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
			:initialValue="postContent"
			initialEditType="markdown"
			:options="editorOptions"
			height="700px"
			previewStyle="vertical"
		/>
		<Viewer
			ref="viewer"
			v-if="!isEditMode"
			:initialValue="viewerText"
			height="100px"
		/>
	</div>
</template>

<script>
import { Editor, Viewer } from '@toast-ui/vue-editor';

import '@toast-ui/editor/dist/toastui-editor.css';
// import dummyPosts from '@/store/dummyPosts';

export default {
	name: 'Post',
	components: { Editor, Viewer },
	computed: {
		isEditMode() {
			return this.mode === 'edit';
		},
		postContent() {
			return `${this.post.title} \n ${this.post.content}`;
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
	},
	data() {
		return {
			viewer: {
				content: '',
			},
			post: {
				id: '',
				title: 'test1',
				content: 'text content',
				description: 'text description',
			},
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
		search() {
			const postId = this.$route.params.postId;
			console.log('postId', postId);
			// const list = dummyPosts();
			// console.log('list', list);
			// const post = dummyPosts().find(post => post.id === postId);
			// console.log('post', post);
			// if (post && post.id) {
			// 	this.post = post;
			// }
		},
		//   @param {number} id 숫자타입의 아이디
		// @returns {string} template 템플릿 초기값
		clickBtn(mode) {
			console.log('mode', mode);
			// this.$emit('changeMode', mode);
			if (mode === 'edit') {
				// this.isEditMode = true;
			} else if (mode === 'save') {
				let html = this.$refs.editor.invoke('getHTML');
				let markdown = this.$refs.editor.invoke('getMarkdown');
				this.$refs.viewer.invoke('setMarkdown', markdown);

				// this.viewer.content = html;
				console.log('html', html);
				console.log('markdown', markdown);
				// this.isEditMode = false;
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
		this.search();
	},
	destroyed() {
		console.log('Post destroyed');
	},
};
</script>

<style scoped></style>
