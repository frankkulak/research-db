<template>
    <div id="home">
        <b-container fluid class="text-left px-5">
            <b-button v-b-modal.modal-1 id="help-btn" variant="outline-info">Help</b-button>

            <b-modal id="modal-1" title="How to filter data" ok-only>
                <h5>Tags</h5>
                <p>Tags can be filtered with the key <code>tag</code>, or <code>t</code> for short.</p>
                <p>Example: To show data points tagged as "partial", enter <code>t=partial</code>.</p>

                <h5 class="mt-5">Family / Branch</h5>
                <p>Branches of Oceanic can be filtered with the key <code>family</code>, or <code>f</code> for short.</p>
                <p>Each branch has a shortcut:</p>
                <ul>
                    <li>Western: <code>w</code></li>
                    <li>Central-Eastern: <code>ce</code></li>
                    <li>Admiralty: <code>a</code></li>
                    <li>St. Matthias: <code>sm</code></li>
                    <li>Yapese: <code>y</code></li>
                </ul>
                <p>Example: To show only Central-Eastern Oceanic languages, enter <code>f=ce</code>.</p>

                <h5 class="mt-5">Region</h5>
                <p>Regions can be filtered with the key <code>region</code>, or <code>r</code> for short.</p>
                <p>Each region has a shortcut:</p>
                <ul>
                    <li>Papua New Guinea: <code>png</code></li>
                    <li>Solomon Islands: <code>si</code></li>
                    <li>Hawaii, United States: <code>hw</code></li>
                    <li>Easter Island, Chile: <code>ei</code></li>
                    <li>New Zealand: <code>nz</code></li>
                    <li>Federated States of Micronesia: <code>mc</code></li>
                </ul>
                <p>Example: To show only languages spoken in the Solomon Islands, enter <code>r=si</code>.</p>

                <h5 class="mt-5">Language</h5>
                <p>Languages can be filtered with the key <code>language</code>, or <code>l</code> for short.</p>
                <p>Languages do not have shortcuts.</p>
                <p>Example: To only show Hoava, enter <code>l=Hoava</code>.</p>

                <h5 class="mt-5">Logic operators</h5>
                <p>The "and" operation can be achieved with <code>;</code>.</p>
                <ul>
                    <li>Example: To show data points tagged with both "total" and "aspect", use
                        <code>t=total; t=aspect</code>.</li>
                    <li>Example: To show data points tagged with "partial" from Western Oceanic languages spoken in the
                        Solomon Islands, use <code>t=partial; f=w; r=si</code>.</li>
                </ul>
                <p>The "or" operation can be achieved with <code>,</code>.</p>
                <ul>
                    <li>Example: To show data points tagged with either "progressive", "continuous", or "durative" use
                        <code>t=progressive,continuous,durative</code>.</li>
                    <li>Example: To show data points tagged with "aspect" from either the Western or Central-Eastern
                        branches, use <code>t=aspect; f=w,ce</code>.</li>
                </ul>

                <p>The "not" operation can be achieved with <code>!</code> before the key.</p>
                <ul>
                    <li>Example: To show data points <em>not</em> tagged with "aspect", use <code>!t=aspect</code>.</li>
                    <li>Example: To show data points tagged with "inflection", but <em>not</em> "aspect", from neither
                        the Admiralty nor St. Matthias branches, use <code>t=inflection; !t=aspect; !f=a,sm</code>.</li>
                </ul>
            </b-modal>

            <b-row id="filter-area" class="pb-5 mx-auto">
                <b-col cols="12" md="4" class="text-left mt-5">
                    <b-form-checkbox id="cbox-tags" v-model="showTags" name="cbox-tags"
                                     value="true" unchecked-value="false">
                        Show tags
                    </b-form-checkbox>

                    <b-form-checkbox id="cbox-nomatch" v-model="showNoMatch" name="cbox-nomatch"
                                     value="true" unchecked-value="false">
                        Show languages without matches
                    </b-form-checkbox>
                </b-col>

                <b-col cols="12" md="8" class="mt-5">
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
    import {OceanicLanguages, AllTags} from "@/modules/Data";
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
    // const sortedOtherLanguages = OtherLanguages.sort(sortByName);

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
            // numOceanicLanguagesShown() {
            //     return document.getElementById("oceanic-languages-div").childElementCount;
            // },
            // numOceanicLanguages() {
            //     return sortedOceanicLanguages.length;
            // },
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
        #help-btn {
            position: fixed;
            right: 12px;
            bottom: 12px;
            opacity: 80%;
            z-index: 1024;
        }

        .all-tags-display {
            background-color: white;
            border-radius: 12px;
            box-shadow: 1px 2px 12px #cdcdcd;
        }
    }
</style>
