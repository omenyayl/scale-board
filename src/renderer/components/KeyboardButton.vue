<template>
    <div class="keyboard-button" :class="{'highlighted': isHeld, 'sharp': isSharp}">
        <div class="keyboard-button-text">
            {{button.name}}
        </div>
        <div class="keyboard-button-note">
            {{button.musicNote}}
        </div>
        <div class="keyboard-button-octave">
            O{{button.octave}}
        </div>
    </div>
</template>

<script>
    import NoteUtils from "../../utils/NoteUtils";

    export default {

        name: "KeyboardButton",
        data: () => ({
        }),
        computed: {
            isSharp: function() {
                return NoteUtils.isSharp(this.button.note);
            }
        },
        props: [
            'button',
            'isHeld'
        ],
        created () {
        }
    }
</script>

<style scoped>
    .keyboard-button {
        flex: 1;
        width: 3.5em;
        height: 6em;
        text-align: center;
        border: 2px solid lightgray;
        border-radius: 5px;
        margin: 0.2em;
        padding-top: 0.5em;
        font-family: 'Roboto', sans-serif;
        display: inline-block;
    }

    .keyboard-button-text {
        font-size: 1.5em;
        color: black;
        position: relative;
        padding-top: 15%;
    }

    .keyboard-button-note {
        color: slategray;
        font-size: 1em;
        position: relative;
    }

    .highlighted {
        /*background-color: cyan;*/
        border: 2px solid cornflowerblue;
    }

    .keyboard-button-octave {
        font-size: 0.8em;
        color: darkgray;
    }

    .sharp {
        background-color: #e8eef7;
        color: white;
    }

</style>