<template>
	<div class="ui-collapsible" :class="classes">
		<div
			class="ui-collapsible__header"
			:aria-controls="id"
			:aria-expanded="isOpen ? 'true' : 'false'"
			:tabindex="disabled ? null : 0"
			@click.prevent="toggleCollapsible"
			@keydown.enter.prevent="toggleCollapsible"
			@keydown.space.prevent="toggleCollapsible"
			style="width: inherit"
		>
			<div class="ui-collapsible__header-content" style="width: 100%">
				<div
					style="
						display: inline-block;
						font-weight: 500;
						width: calc(100% - 116px);
					"
				>
					<b>
						{{ post.title }}
					</b>
				</div>
				<!-- TODO: @click, stop, prevent 자세히 알아보기-->
				<span style="float: right">
					<span> {{ post.creDate }} </span>
					<ui-icon-button
						icon="description"
						color="default"
						size="normal"
						@click.stop.prevent="clickIcon"
					></ui-icon-button>
				</span>
			</div>

			<ui-icon class="ui-collapsible__header-icon" v-if="!removeIcon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
				>
					<path d="M7.406 7.828L12 12.422l4.594-4.594L18 9.234l-6 6-6-6z" />
				</svg>
			</ui-icon>
		</div>

		<transition
			@enter="onEnter"
			@after-enter="afterEnter"
			@before-leave="beforeLeave"
			@leave="onLeave"
		>
			<div
				class="ui-collapsible__body-wrapper"
				ref="bodyWrapper"
				:aria-hidden="isOpen ? null : 'true'"
				:id="id"
				v-show="isOpen"
			>
				<div class="ui-collapsible__body">
					<Viewer :initialValue="post.content" height="100px" />
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import UUID from '@/helpers/uuid';
import { Viewer } from '@toast-ui/vue-editor';

export default {
	name: 'PostCard',
	components: { Viewer },
	props: {
		post: {
			type: Object,
			default: () => {},
		},
		open: {
			type: Boolean,
			default: false,
		},
		title: String, //TODO slot 자리안데 들어가는 값이 라서 default를 안줌? 아니면 String의 default 값이 '' 인가?
		removeIcon: {
			type: Boolean,
			default: false,
		},
		disableRipple: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			isOpen: this.open,
			id: UUID.short('ui-collapsible-'),
		};
	},

	computed: {
		classes() {
			return [{ 'is-open': this.isOpen }, { 'is-disabled': this.disabled }];
		},
	},

	watch: {
		open() {
			if (this.isOpen !== this.open) {
				this.isOpen = this.open;
			}
		},
	},

	mounted() {
		// Remove the max-height to allow the element to grow if it's open initially
		if (this.isOpen) {
			this.$refs.bodyWrapper.style.maxHeight = 'none';
		}
	},

	methods: {
		clickIcon() {
			console.log('clickIcon');
			// this.$router.push(this.$route.path + '/' + this.post.id + '?mode=');
			this.$router.push(this.$route.path + '/' + this.post.id);
		},

		toggleCollapsible() {
			// console.log('toggleCollapsible', e);
			// console.log('toggleCollapsible', e.target);
			if (this.disabled) {
				return;
			}

			this.isOpen = !this.isOpen;
		},

		onEnter(el) {
			this.$emit('open');
			el.style.maxHeight = el.scrollHeight + 'px';
		},

		afterEnter(el) {
			// Remove the max-height to allow the element to grow
			el.style.maxHeight = 'none';
		},

		beforeLeave(el) {
			// Restore max-height for the leave transition
			el.style.maxHeight = el.scrollHeight + 'px';

			// Force repaint
			el.offsetHeight; // eslint-disable-line no-unused-expressions
		},

		onLeave(el) {
			el.style.maxHeight = 0;
			this.$emit('close');
		},
	},
};
</script>
