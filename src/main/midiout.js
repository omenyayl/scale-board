const easymidi = require('easymidi');

function MidiOut() {
    /*
 Init MIDI output
  */
    const deviceName = 'scale-board';
    let midiOut;
    if (process.platform === "win32") {
        // find the loopmidi 'NodeJS MIDI out' virtual port
        const outputs = easymidi.getOutputs();
        outputs.some(name => {
            console.log(`Connected to ${name}`);
            if (name.toLowerCase().indexOf(deviceName.toLowerCase()) > -1) {
                midiOut = new easymidi.Output(name);
                return true;
            }
            return false;
        });
    } else {
        midiOut = new easymidi.Output(deviceName, true);
    }
    return midiOut;
}

export default MidiOut;
