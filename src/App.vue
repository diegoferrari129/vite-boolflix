<script>
import Header from './components/layout/Header.vue';
import Main from './components/layout/Main.vue';

export default {
    name: 'App',
    components: {
        Header,
        Main
    }
}
</script>

<template>
    <Header @search="searchMovies"/>
    <Main />
</template>

<style lang="scss">
@use './styles/generals.scss' as *;
</style>