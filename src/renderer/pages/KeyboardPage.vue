<template>
    <md-content class="keyboard-container">

        <md-card style="padding: 1em">
            <div v-if="midiName === null">
                <p>Failed to connect to a midi device. Download loopMIDI and create a new loopback device named "scale-board" and restart this app</p>
            </div>
            <div v-if="midiName !== null">
                <div class="controls">
                    <div class="control">
                        <strong>MIDI Output</strong>
                        <p style="margin: 0">{{midiName}}</p>
                    </div>
                    <div class="control">
                        <md-field>
                            <label><strong>Octave</strong></label>
                            <md-input style="width: 3em" v-model="octave" type="number"></md-input>
                        </md-field>
                    </div>
                    <div class="control">
                        <md-field>
                            <label>Tonic Note</label>
                            <md-select style="width: 8em" v-model="tonic" name="tonic" id="tonic">
                                <md-option value="24">C</md-option>
                                <md-option value="25">C#</md-option>
                                <md-option value="26">D</md-option>
                                <md-option value="27">D#</md-option>
                                <md-option value="28">E</md-option>
                                <md-option value="29">F</md-option>
                                <md-option value="30">F#</md-option>
                                <md-option value="31">G</md-option>
                                <md-option value="32">G#</md-option>
                                <md-option value="33">A</md-option>
                                <md-option value="34">A#</md-option>
                                <md-option value="35">B</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="control">
                        <md-field>
                            <label>Scale</label>
                            <md-select v-model="scale" name="scale" id="scale">
                                <div :key="i" v-for="(scaleType, i) in scaleTypes">
                                    <md-option :key="j" v-for="(scaleName, j) in scaleType.names" :value="scaleType.type + ':' + scaleName">{{scaleType.type}} {{scaleName}}</md-option>
                                </div>
                            </md-select>
                        </md-field>
                    </div>
                </div>
            </div>
            <md-divider/>
            <Keyboard :scale-array="scaleArray" :tonic="tonic" :octave="octave"/>
        </md-card>
    </md-content>
</template>

<script>

    import Keyboard from "../components/Keyboard";
    import MidiService from "../services/MidiService";
    import scales from "../config/scales";

    export default {
        name: 'keyboard-page',
        components: {Keyboard},
        methods: {
            getScaleTypes() {
                let scaleTypes = [];
                for (let scaleType in scales) {
                    if (scales.hasOwnProperty(scaleType)) {
                        const scale = scales[scaleType];
                        let scaleNames = [];
                        for (let scaleName in scale) {
                            if (scale.hasOwnProperty(scaleName)) {
                                scaleNames.push(scaleName);
                            }
                        }
                        scaleTypes.push({
                            type: scaleType,
                            names: scaleNames
                        });
                    }
                }
                return scaleTypes;
            }
        },
        data: () => ({
            midiName: '',
            octave: '0',
            tonic: '24',
            scale: 'Heptatonic:Major',
            scaleTypes: [],
        }),
        computed: {
            scaleArray: function() {
                const [scaleType, scaleName] = this.scale.split(':');
                if (scaleType && scaleName) {
                    return scales[scaleType][scaleName];
                }
                return scales.Heptatonic.Major;
            }
        },
        created() {
            MidiService.info().then(midiName => { this.midiName = midiName });
            this.scaleTypes = this.getScaleTypes();
        }
    }
</script>

<style>
    .keyboard-container {
        padding: 2em;
    }
    .controls {

    }

    .control {
        display: inline-block;
        padding-right: 3em;
    }
</style>

