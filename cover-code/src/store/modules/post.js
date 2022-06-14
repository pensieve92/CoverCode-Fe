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
		ADD_POST(state, value) {
			state.posts.push({
				id: Math.random(),
				text: value,
				checked: false,
			});
		},
	},
	actions: {
		//methods
		addPost({ commit }, value) {
			//비동기 작업, axios.post DB역할 settimeout
			setTimeout(function () {
				commit('ADD_POST', value);
			}, 1000);
		},
	},
	getters: {
		//computed
		postsByCategory: state => category => {
			return state.posts.filter(post => post.category === category);
		},
		postsById: state => id => {
			const post = state.posts.find(post => post.id === id);
			console.log('postsById', post);
			return post;
		},
		postsAll: state => {
			return state.posts;
		},
	},
};
