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

                    <b-form-checkbox id="cbox-nomatch" v-model="showNoMatch" name="cbox-nomatch"
                                     value="true" unchecked-value="false">
                        Show languages without matches
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

                <b-col cols="12" class="px-3 pt-3 mt-3 all-tags-display" v-show="showTags === 'true'">
                    <h6><em>All tags (Oceanic only)</em></h6>
                    <tag-list :show-self="showTags" :tag-list="allTags"/>
                </b-col>
            </b-row>

            <hr>
            <h6 class="mb-5"><em>Oceanic Languages</em></h6>
            <div v-show="oceanicLanguages.length > 0" id="oceanic-languages-div">
                <language-display v-for="language in oceanicLanguages" :key="language.name"
                                  :lang="language" :oceanic="true" :show-tags="showTags"
                                  :filter-queries="filterQueries" :show-no-match="showNoMatch"/>
            </div>
            <div v-show="oceanicLanguages.length === 0" class="mb-5">
                <em>No matching languages.</em>
            </div>

            <div v-show="showOther === 'true'">
                <hr>
                <h6 class="mb-5"><em>Other Languages</em></h6>
                <language-display v-for="language in otherLanguages" :key="language.name"
                                  :lang="language" :oceanic="false" :show-tags="showTags"
                                  :filter-queries="filterQueries" :show-no-match="showNoMatch"/>
            </div>
        </b-container>
    </div>
</template>

<script>
    import {OceanicLanguages, OtherLanguages, AllTags} from "@/modules/Data";
    import {getFilters} from "@/modules/Filter";
    import LanguageDisplay from "@/components/LanguageDisplay";
    import TagList from "@/components/TagList";

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
        components: {TagList, LanguageDisplay},
        data: function () {
            return {
                showTags: 'false',
                showOther: 'false',
                filterQueryText: '',
                filterQueries: '',
                showNoMatch: 'false',
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
            },
            numOceanicLanguagesShown() {
                return document.getElementById("oceanic-languages-div").childElementCount;
            },
            numOceanicLanguages() {
                return sortedOceanicLanguages.length;
            },
            allTags() {
                const sortedEntries = Object.entries(AllTags).sort(([, count1], [, count2]) => {
                    if (count1 > count2) {
                        return -1;
                    } else if (count1 < count2) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                return sortedEntries.map(([tag, count]) => `${tag} (${count})`);
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
        .all-tags-display {
            background-color: white;
            border-radius: 12px;
            box-shadow: 1px 2px 12px #cdcdcd;
        }
    }
</style>
