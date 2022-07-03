const wait = timeToDelay =>
	new Promise(resolve => setTimeout(resolve, timeToDelay)); //이와 같이 선언 후

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
			console.log('--4-- store mutation addPost');
			state.posts.push(post);
		},
	},
	actions: {
		//methods
		async addPost({ commit }, post) {
			// return new Promise((resolve, reject) => {
			// 	setTimeout(resolve, 1000);
			// });

			// 비동기 작업, axios.post DB역할 settimeout
			// 실행하고 기다리는게 아니라
			// 기달렸다가 실행하는 거네..
			// return setTimeout(async function () {
			// 	return commit('ADD_POST', post);
			// }, 1000);
			console.log('--3-- store action addPost');
			await wait(500); // 이렇게 await와 함께 사용하면 동기적으로 동작한다.
			commit('ADD_POST', post);
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
			return state.posts.find(post => post.id === id);
		},
		postsAll: state => {
			return state.posts;
		},
		// postInit: () => {
		// 	return new Post();
		// },
	},
};
