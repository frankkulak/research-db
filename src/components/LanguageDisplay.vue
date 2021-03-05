<template>
    <b-row class="language-display mb-5">
        <b-col cols="12" class="text-left mb-3">
            <h3><strong>{{ lang.name }}</strong></h3>
            <h6 v-if="oceanic">{{ lang.family }}, {{ lang.region }} (Source: {{ lang.source }})</h6>
            <h6 v-else>(Source: {{ lang.source }})</h6>
        </b-col>

        <datapoint-display v-for="(data, n) in lang.reduplication" :key="`${lang.name}-${n}`" :data="data"
                           :show-tags="showTags"/>
    </b-row>
</template>

<script>
    import DatapointDisplay from "@/components/DatapointDisplay";
    export default {
        name: "LanguageDisplay",
        components: {DatapointDisplay},
        props: {
            lang: Object,
            oceanic: Boolean,
            showTags: String
        }
    }
</script>

<style lang="scss">
    .language-display {

    }
</style>