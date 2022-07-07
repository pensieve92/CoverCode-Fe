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
		// isEditMode: {
		// 	get() {
		// 		return this.mode === 'edit';
		// 	},
		// 	set(newValue) {
		// 		console.log('🍉🍉 ' + 'newValue' + ' : ', newValue);
		// 		return newValue;
		// 	},

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
	},
	data() {
		return {
			viewer: {
				content: '',
			},
			post: {},
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
			// TODO VUEX getters, dispatch시
			// 비동기 로직 수행순서 확인하기
			// adddedPost 로그가 제일 늦게 찍힘..
			// router.push시, await??
			// TODO
			// PostPage에서 search하는게 아니라 , Post에서 Search?
			// 상관이 있나??
			// 로그가 너무 많고, 중복되는 로직(search)을 하나씩 걷어내면서 확인해바야할듯

			const post = this.$store.getters['post/postsById'](postId);
			console.log('🍉🍉 ' + 'post' + ' : ', post);

			if (post && post.id) {
				this.post = post;
			}
		},
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
