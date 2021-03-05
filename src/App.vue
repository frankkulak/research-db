<template>
    <div id="app">
        <home-page />
    </div>
</template>

<script>
    import HomePage from './components/HomePage.vue'

    export default {
        name: 'App',
        components: {
            HomePage
        }
    }
</script>

<style lang="scss">
    html {
        background-color: #f1f6fb;
    }

    #app {
        font-family: Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-color: #f1f6fb;

        h1, h2, h3, h4, h5, h6 {
            font-family: Avenir, Arial, sans-serif;
        }
    }
</style>
