export default {
	namespaced: true,
	state: {
		//data
		posts: [
			{
				id: '1',
				category: 'vue',
				title: 'vue',
				content: 'vue',
				creDate: '2022.06.11',
			},
			{
				id: '2',
				category: 'js',
				title: 'js',
				content: 'js',
				creDate: '2022.06.11',
			},
			{
				id: '3',
				category: 'java',
				title: 'java',
				content: 'java',
				creDate: '2022.06.11',
			},
		],
	},
	mutations: {
		//state 변경
		ADD_POST(state, post) {
			state.posts.push(post);
		},
	},
	actions: {
		//methods
		addPost({ commit }, post) {
			console.log('addPost', post);

			//비동기 작업, axios.post DB역할 settimeout
			setTimeout(function () {
				commit('ADD_POST', post);
			}, 1000);
		},
	},
	getters: {
		//computed
		postsByCategory: state => category => {
			return state.posts.filter(post => {
				return post.category.split(',').indexOf(category.toLowerCase()) > -1;
			});
		},
		postsById: state => id => {
			const post = state.posts.find(post => post.id === id);
			console.log('postsById', post);
			return post;
		},
		postsAll: state => {
			return state.posts;
		},
		// postInit: () => {
		// 	return new Post();
		// },
	},
};
