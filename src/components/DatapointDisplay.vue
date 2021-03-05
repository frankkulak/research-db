<template>
    <b-col class="datapoint-display py-2 px-4 ml-3 text-left" cols="auto">
        <b-row>
            <b-col v-if="data.control !== null" cols="auto">
                <em class="form">{{ data.control.form }}</em>
                <p class="gloss" v-html="data.control.gloss"></p>
                <p class="translation">'{{ data.control.translation }}'</p>
            </b-col>
            <b-col v-if="data.control !== null" cols="auto">
                <p>&#8594;</p>
            </b-col>
            <b-col cols="auto">
                <em class="form">{{ data.form }}</em>
                <p class="gloss" v-html="data.gloss"></p>
                <p class="translation">'{{ data.translation }}' (p. {{ data.page }})</p>
            </b-col>
        </b-row>
    </b-col>
</template>

<script>
    export default {
        name: "DatapointDisplay",
        props: {
            data: Object
        }
    }
</script>

<style lang="scss">
    .datapoint-display {
        background-color: white;
        border-radius: 12px;
        box-shadow: 1px 2px 12px #cdcdcd;

        .row {
            display: flex;
            align-items: center;
        }

        em, p {
            padding: 0;
            margin: 0;
        }

        .gloss {
            span {
                font-variant: small-caps;
            }
        }
    }
</style>