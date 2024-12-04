<script>
import SearchBar from '../partials/SearchBar.vue';

export default {
    components: {
        SearchBar
    }
}
</script>

<template>
    <header>
        <div class="container-fluid">
            <div class="row">
                <div class="col d-flex justify-content-between align-items-center mx-2">
                    <a class="brand" href="#">BOOLFLIX</a>
                    <SearchBar />
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use '../../styles/_variables' as *;
@use '../../styles/_colors' as *;

header {
    background-color: $bg-dark;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    padding: $spacing-sm 0;
}

.brand {
    color: $netflix-red;
    font-size: $font-lg;
    font-weight: bold;
    text-decoration: none;
}
</style>