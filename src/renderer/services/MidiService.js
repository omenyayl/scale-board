const {ipcRenderer} = require('electron');

class MidiService {

    playingKeys = {};

    constructor() {
    }

    noteOn (note, velocity=127, channel=0) {
        if (this.playingKeys[note]) {
            this.sendMidi('noteoff', note, velocity, channel);
            console.log(`${note} already playing, turning off`);
            delete this.playingKeys[note];
            setTimeout(() => {
                this.sendMidi('noteon', note, velocity, channel);
                this.playingKeys[note] = {velocity, channel};
            }, 10);
            return;
        }
        this.sendMidi('noteon', note, velocity, channel);
        this.playingKeys[note] = {velocity, channel};
    }

    noteOff (note, velocity=127, channel=0) {
        this.sendMidi('noteoff', note, velocity, channel);
        delete this.playingKeys[note];
    }

    clearPlaying() {
        for (let note in this.playingKeys) {
            let {velocity, channel} = this.playingKeys[note];
            this.noteOff(note, velocity, channel);
        }
    }

    sendMidi (action, note, velocity=127, channel=0) {
        ipcRenderer.sendSync('midi', {
            action,
            note,
            velocity,
            channel
        });
    }

    info () {
        return new Promise((resolve) => {
            ipcRenderer.on('midi-name', (event, msg) => {
                console.log(`midi name: ${msg}`);
                resolve(msg);
            });
            ipcRenderer.send('midi-name');
        });
    }

}

export default new MidiService();