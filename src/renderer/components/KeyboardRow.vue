<template>
    <div class="keyboard-row" :class="{'first-row': i === 0}">
        <KeyboardButton :key="i" v-for="(button, i) in row" :button="button" :is-held="button.code in heldKeys && heldKeys[button.code]"/>
    </div>
</template>

<script>
    import KeyboardButton from "./KeyboardButton";
    export default {
        name: "KeyboardRow",
        components: {KeyboardButton},
        props: [
            'row',
            'i',
            'heldKeys'
        ],

    }
</script>

<style scoped>
    .keyboard-row {
        text-align: center;
        display: block;
        flex-flow: row wrap;
    }

    .first-row {
        margin-left: -4.2em;
    }

    .keyboard-button-half {
        flex: 0.5;
        height: 5em;
        text-align: center;
        margin: 0.2em;
    }
</style>