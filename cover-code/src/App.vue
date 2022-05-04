<template>
	<div id="app">
		<header>
			<router-link to="/js">js</router-link>
			<router-link to="/vue">vue</router-link>
			<router-link to="/java">java</router-link>
		</header>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'App',
	components: {},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
