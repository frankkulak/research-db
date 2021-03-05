<template>
    <section id="search">
        <b-input-group class="mt-3">
            <b-form-input></b-form-input>
            <b-input-group-append>
                <b-button variant="outline-info">Search</b-button>
            </b-input-group-append>
        </b-input-group>
    </section>
</template>

<script>
    export default {
        name: "Search"
    }
</script>

<style lang="scss">
    section#search {
        max-width: 768px;
    }
</style>