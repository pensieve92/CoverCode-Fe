const wait = timeToDelay =>
	new Promise(resolve => setTimeout(resolve, timeToDelay)); //이와 같이 선언 후

import moment from 'moment';

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
	/**
	 * 동기 로직 처리
	 */
	mutations: {
		//state 변경
		ADD_POST(state, payload) {
			console.log('--4-- store mutation addPost');
			state.posts.push(payload);
		},
		UPDATE_POST(state, payload) {
			let oldPost = state.posts.find(post => post.id === payload.id);
			oldPost.content = payload.content;
			oldPost.modiDate = moment().format('L');
		},
		GET_POST_BY_ID(state, payload) {
			// TODO finde >>> filter
			// DONE id는 고유값인데 2개 이상이 조회 될 수 있기 때문에
			// DB에서 고유키 설정해주면 문제는 없을 듯 하다.

			// return state.posts.find(post => post.id === payload.id);
			const post = state.posts.filter(post => post.id === payload);
			console.log('🍉🍉 ' + 'post' + ' : ', post[0]);
			if (post.length === 1) {
				// DONE mutation에서 값을 return 하지 않는다?!
				// return은 로직의 종료용으로 사용?
				return post[0];
			} else if (post.length === 0) {
				throw new Error('해당 게시물이 존재하지 않습니다.');
			} else {
				throw new Error('해당 게시물이 2개이상 존재합니다.');
			}
		},
	},
	/**
	 * 비동기 로직 처리
	 */
	actions: {
		//methods
		async addPost({ commit }, post) {
			// return new Promise((resolve, reject) => {
			// 	setTimeout(resolve, 1000);
			// });

			// 비동기 작업, axios.post DB역할 setTimeout
			// 실행하고 기다리는게 아니라
			// 기달렸다가 실행하는 거네..
			// return setTimeout(async function () {
			// 	return commit('ADD_POST', post);
			// }, 1000);
			console.log('--3-- store action addPost');
			await wait(500); // 이렇게 await와 함께 사용하면 동기적으로 동작한다.
			commit('ADD_POST', post);
		},
		async updatePost({ commit }, payload) {
			const { id } = payload;
			// TODO backend server가 있으면
			// 존재 여부확인하는 로직은 backend server에 넣어야하나?
			// DONE 어떻게 설계하냐에 따라 다를듯!!
			// 전환 과제 같은 경우는 backend server를 그대로 쓰기 때문에
			// 존재여부 확인 로직이 backend에 넣는게 맞을 것 같음!!
			// api server는 존재여부 확인 로직을 front에서 분리해서 처리해도 무방함

			try {
				// 존재여부 확인
				const isExit = commit('GET_POST_BY_ID', id);
				console.log('🍉🍉 ' + 'isExit' + ' : ', isExit);
				// await wait(500); // 이렇게 await와 함께 사용하면 동기적으로 동작한다.
				// post content 업데이트
				console.log('🍉🍉 ' + 'exitPost' + ' : ', payload);
				await commit('UPDATE_POST', payload);
			} catch (error) {
				alert('error : ' + error);
			}
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
