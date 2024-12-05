<script>
import Header from './components/layout/Header.vue';
import Main from './components/layout/Main.vue';

export default {
    components: {
        Header,
        Main
    }
}
</script>

<template>
    <Header />
    <Main />
</template>

<style lang="scss">
@use './styles/generals.scss' as *;
</style>