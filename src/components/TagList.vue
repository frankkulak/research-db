<template>
    <b-row v-if="tagList.length > 0" v-show="showSelf === 'true'" class="tag-list mr-3 mt-3">
        <p v-for="tag in tagList" :key="tag" class="tag ml-3 px-1">{{ tag }}</p>
    </b-row>
</template>

<script>
    export default {
        name: "TagList",
        props: {
            showSelf: String,
            tagList: Array
        }
    }
</script>

<style lang="scss">
    .tag-list {
        p.tag {
            border-style: solid;
            border-radius: 3px;
            border-width: 1px;
            background-color: #f1f6fb;
        }
    }
</style>