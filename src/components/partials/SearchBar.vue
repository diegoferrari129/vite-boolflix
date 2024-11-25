<script>
import { store } from '../../store.js';

export default {
    name: 'SearchBar',
    data() {
        return {
            searchText: '',
            store
        }
    },
    methods: {
        searchAndScroll() {
            store.search(this.searchText);
            setTimeout(() => {
                document.getElementById('results').scrollIntoView();
            }, 500);
        }
    }
}
</script>

<template>
    <div class="search-box">
        <div class="row">
            <div class="col">
                <!-- INPUT -->
                <div class="input-group">
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Movie or TV Series..."
                        v-model="searchText"
                        @keyup.enter="searchAndScroll"
                    >
                    <button class="btn" @click="searchAndScroll">Search</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../styles/_variables' as *;
@use '../../styles/_colors' as *;

.search-box {
    width: $search-width;
    
    .input-group {
        input {
            background-color: $bg-input;
            border: 1px solid $border-color;
            color: $text-light;
            padding: 0.625rem $spacing-md;
            border-radius: $border-radius 0 0 $border-radius;
            
            &::placeholder {
                color: $text-dimmed;
            }
            
            &:focus {
                outline: none;
                border-color: $text-dimmed;
                box-shadow: none;
            }
        }
        
        .btn {
            background-color: $netflix-red;
            color: $text-light;
            border: none;
            padding: 0.625rem  $spacing-lg;
            cursor: pointer;
            transition: background-color $transition-speed;
            border-radius: 0 $border-radius $border-radius 0;
            white-space: nowrap;
            
            &:hover {
                background-color: $netflix-red-hover;
            }
        }
    }
}
</style>