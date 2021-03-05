<template>
    <b-row class="language-display mb-5">
        <b-col cols="12" class="text-left">
            <h3><strong>{{ lang.name }}</strong></h3>
            <p v-if="oceanic">{{ lang.family }}, {{ lang.region }} (Source: {{ lang.source }})</p>
            <p v-else>(Source: {{ lang.source }})</p>
        </b-col>

        <datapoint-display v-for="(data, n) in lang.reduplication" :key="`${lang.name}-${n}`" :data="data"/>
    </b-row>
</template>

<script>
    import DatapointDisplay from "@/components/DatapointDisplay";
    export default {
        name: "LanguageDisplay",
        components: {DatapointDisplay},
        props: {
            lang: Object,
            oceanic: Boolean
        }
    }
</script>

<style lang="scss">
    .language-display {

    }
</style>