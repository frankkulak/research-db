<template>
    <b-row class="language-display mb-5" v-show="(showNoMatch === 'true') || entries.length > 0">
        <b-col cols="12" class="text-left mb-3">
            <h3><strong>{{ lang.name }}</strong></h3>
            <h6 v-if="oceanic">{{ lang.family }}, {{ lang.region }} (Source: {{ lang.source }})</h6>
            <h6 v-else>(Source: {{ lang.source }})</h6>
        </b-col>

        <datapoint-display v-for="(entry, n) in entries" :key="`${lang.name}-${n}`" :data="entry"
                           :show-tags="showTags"/>

        <div v-show="entries.length === 0" class="mb-5">
            <em class="ml-3">No matching entries.</em>
        </div>
    </b-row>
</template>

<script>
    import DatapointDisplay from "@/components/DatapointDisplay";
    import {getTagFilters} from "@/modules/Filter";

    export default {
        name: "LanguageDisplay",
        components: {DatapointDisplay},
        props: {
            lang: Object,
            oceanic: Boolean,
            showTags: String,
            filterQueries: String,
            showNoMatch: String
        },
        computed: {
            entries() {
                let entriesToShow = this.lang.reduplication;

                getTagFilters(this.filterQueries).forEach(function (filterFunction) {
                    entriesToShow = entriesToShow.filter(filterFunction);
                });

                return entriesToShow;
            }
        }
    }
</script>

<style lang="scss">
    .language-display {

    }
</style>