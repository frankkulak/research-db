<template>
    <div id="home">
        <section id="search" class="p-5 mx-auto">
            <b-input-group>
                <b-form-input></b-form-input>
                <b-input-group-append>
                    <b-button variant="outline-success">Filter</b-button>
                </b-input-group-append>
            </b-input-group>
        </section>

        <b-container fluid class="text-left px-5">
            <hr>
            <p class="mb-5"><em>Oceanic Languages</em></p>
            <language-display v-for="language in oceanicLanguages" :key="language.name"
                              :lang="language" :oceanic="true"/>

            <hr>
            <p class="mb-5"><em>Other Languages</em></p>
            <language-display v-for="language in otherLanguages" :key="language.name"
                              :lang="language" :oceanic="false"/>
        </b-container>
    </div>
</template>

<script>
    import {OceanicLanguages, OtherLanguages} from "@/modules/Data";
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

    export default {
        name: 'HomePage',
        components: {LanguageDisplay},
        data: function () {
            return {
                oceanicLanguages: OceanicLanguages.sort(sortByName),
                otherLanguages: OtherLanguages.sort(sortByName),
            }
        }
    }
</script>

<style lang="scss">
    #home {
        section#search {
            max-width: 728px;
        }
    }
</style>
