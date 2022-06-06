export default {
	mounted() {
		console.log('mixin modal mounted');
		this.open();
	},
	methods: {
		open() {
			this.$refs['modal'].open();
		},
		close() {
			this.$emit('close');
		},
	},
};
