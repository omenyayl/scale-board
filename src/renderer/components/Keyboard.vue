<template>
    <div class="keyboard">
        <KeyboardRow :key="i" v-for="(row, i) in keyboardRows" :held-keys="heldKeys" :row="row" :i="i"/>
<!--        <v-divider style="margin-top: 1em"/>-->
    </div>
</template>

<script>
    import KeyboardRow from "./KeyboardRow";
    import keymap from "../config/keymap";
    import MidiService from "../services/MidiService";
    import NoteUtils from "../../utils/NoteUtils";
    import scales from "../config/scales";

    /**
     *
     * @param {number} startOffset
     * @param {[number]} scale
     */
    // function initKeyMap(startOffset, scale) {
    //     let i = 0;
    //     let scaleLen = scale.length;
    //     let shift = startOffset;
    //
    //     let newKeymap = {};
    //
    //     for (let k in keymap) {
    //         let note = keymap[k].note;
    //         newKeymap[k] = {
    //             note: shift,
    //             musicNote: NoteUtils.musicNote(note),
    //             octave: NoteUtils.octave(note)
    //         }
    //         shift += scale[i % scaleLen];
    //         i++;
    //     }
    //     return newKeymap;
    // }

    let sustainHeld = false;

    export default {
        name: "Keyboard",
            components: {KeyboardRow},
            data: () => {
                return {
                    heldKeys: {},
                }
            },
            methods: {
            },
            computed: {
                keymap: function() {
                    let i = 0;
                    let scaleLen = this.scaleArray.length;
                    let octaveNum = parseInt(this.octave);
                    let tonicNum = parseInt(this.tonic);
                    let shift = (12*octaveNum) + tonicNum;

                    let newKeymap = {};

                    for (let k in keymap) {
                        let button = keymap[k];
                        let note = shift;
                        newKeymap[k] = {
                            ...button,
                            note: note,
                            musicNote: NoteUtils.musicNote(note),
                            octave: NoteUtils.octave(note)
                        }
                        shift += this.scaleArray[i % scaleLen];
                        i++;
                    }
                    return newKeymap;
                },
                keyboardRows: function () {
                    let currentKeymap = this.keymap;
                    return [
                        [currentKeymap.Digit1, currentKeymap.Digit2, currentKeymap.Digit3, currentKeymap.Digit4, currentKeymap.Digit5, currentKeymap.Digit6, currentKeymap.Digit7, currentKeymap.Digit8, currentKeymap.Digit9, currentKeymap.Digit0, currentKeymap.Minus, currentKeymap.Equal],
                        [currentKeymap.KeyQ, currentKeymap.KeyW, currentKeymap.KeyE, currentKeymap.KeyR, currentKeymap.KeyT, currentKeymap.KeyY, currentKeymap.KeyU, currentKeymap.KeyI, currentKeymap.KeyO, currentKeymap.KeyP, currentKeymap.BracketLeft, currentKeymap.BracketRight],
                        [currentKeymap.KeyA, currentKeymap.KeyS, currentKeymap.KeyD, currentKeymap.KeyF, currentKeymap.KeyG, currentKeymap.KeyH, currentKeymap.KeyJ, currentKeymap.KeyK, currentKeymap.KeyL, currentKeymap.Semicolon, currentKeymap.Quote],
                        [currentKeymap.KeyZ, currentKeymap.KeyX, currentKeymap.KeyC, currentKeymap.KeyV, currentKeymap.KeyB, currentKeymap.KeyN, currentKeymap.KeyM, currentKeymap.Comma, currentKeymap.Period, currentKeymap.Slash],
                    ]
                }
            },
            props: [
                'scaleArray',
                'octave',
                'tonic'
            ],
            beforeMount() {

                window.onkeypress = (e) => {
                    if (e.code === 'Space') e.preventDefault();
                }

                window.onkeydown = (e) => {
                    if (e.code === 'Space') {
                        sustainHeld = true;
                    }
                    if (!(e.code in this.keymap) || this.heldKeys[e.code]) return;
                    this.$set(this.heldKeys, e.code, true);
                    MidiService.noteOn(this.keymap[e.code].note);
                }

                window.onkeyup = (e) => {
                    if (e.code === 'Space') {
                        sustainHeld = false;
                        MidiService.clearPlaying();
                    }

                    const button = this.keymap[e.code];
                    if (!(e.code in this.keymap)) return;
                    console.log(`${button.name}: ${button.note}`);
                    this.$set(this.heldKeys, e.code, false);
                    if (!sustainHeld) {
                        MidiService.noteOff(button.note);
                    }
                }
            }
        }
</script>

<style scoped>
    .keyboard {
        padding: 1em;
        white-space: nowrap;
    }
</style>