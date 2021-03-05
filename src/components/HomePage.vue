<template>
    <div id="home">
        <b-container fluid class="text-left px-5">
            <b-row id="filter-area" class="p-5 mx-auto">
                <b-col cols="4" class="text-left">
                    <b-form-checkbox id="cbox-tags" v-model="showTags" name="cbox-tags"
                                     value="true" unchecked-value="false">
                        Show tags
                    </b-form-checkbox>

                    <b-form-checkbox id="cbox-other" v-model="showOther" name="cbox-other"
                                     value="true" unchecked-value="false">
                        Show non-Oceanic languages
                    </b-form-checkbox>
                </b-col>

                <b-col cols="8">
                    <b-input-group>
                        <b-form-input v-model="filterQueryText" placeholder="Enter filters"
                                      @keydown.enter.native="keydownEventHandler"></b-form-input>
                        <b-input-group-append>
                            <b-button variant="outline-primary" @click="applyFilters">Filter</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
            </b-row>

            <hr>
            <h6 class="mb-5"><em>Oceanic Languages</em></h6>
            <div v-show="oceanicLanguages.length > 0">
                <language-display v-for="language in oceanicLanguages" :key="language.name"
                                  :lang="language" :oceanic="true" :show-tags="showTags"/>
            </div>
            <div v-show="oceanicLanguages.length === 0" class="mb-5">
                <em>No entries match this query.</em>
            </div>

            <div v-show="showOther === 'true'">
                <hr>
                <h6 class="mb-5"><em>Other Languages</em></h6>
                <language-display v-for="language in otherLanguages" :key="language.name"
                                  :lang="language" :oceanic="false" :show-tags="showTags"/>
            </div>
        </b-container>
    </div>
</template>

<script>
    import {OceanicLanguages, OtherLanguages} from "@/modules/Data";
    import {getFilters} from "@/modules/Filter";
    import LanguageDisplay from "@/components/LanguageDisplay";

    const sortByName = (val1, val2) => {
        const val1Name = val1.name.toUpperCase();
        const val2Name = val2.name.toUpperCase();
        if (val1Name < val2Name) {
            return -1;
        } else if (val1Name > val2Name) {
            return 1;
        } else {
            return 0;
        }
    };

    const sortedOceanicLanguages = OceanicLanguages.sort(sortByName);
    const sortedOtherLanguages = OtherLanguages.sort(sortByName);

    export default {
        name: 'HomePage',
        components: {LanguageDisplay},
        data: function () {
            return {
                showTags: 'false',
                showOther: 'false',
                filterQueryText: '',
                filterQueries: ''
            }
        },
        computed: {
            oceanicLanguages() {
                let languagesToShow = sortedOceanicLanguages;

                getFilters(this.filterQueries).forEach(function (filterFunction) {
                    languagesToShow = languagesToShow.filter(filterFunction);
                });

                return languagesToShow;
            },
            otherLanguages() {
                return sortedOtherLanguages;
            }
        },
        methods: {
            applyFilters() {
                this.filterQueries = this.filterQueryText;
            },
            keydownEventHandler() {
                this.applyFilters();
            }
        }
    }
</script>

<style lang="scss">
    #home {
        // intentionally blank
    }
</style>
