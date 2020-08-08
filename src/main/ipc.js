const {ipcMain} = require('electron');
import MidiOut from "./midiout";


function initIPC() {
    let midiOut = MidiOut();

    ipcMain.on('midi-name', (event, _) => {
        event.sender.send('midi-name', midiOut ? midiOut.name : null);
    });

    if (midiOut) {
        ipcMain.on('midi', (event, msg) => {
            midiOut.send(msg.action, {
                note: msg.note,
                velocity: msg.velocity,
                channel: msg.channel
            });
            event.returnValue = true;
        });
    }
}

export default initIPC;


