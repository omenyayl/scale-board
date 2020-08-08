export default {

    /**
     * @param num {number} The midi value
     * @returns {string} Music note, i.e. C#
     */
    musicNote(num) {
        switch (num%12) {
            case 0: return 'C';
            case 1: return 'C#';
            case 2: return 'D';
            case 3: return 'D#';
            case 4: return 'E';
            case 5: return 'F';
            case 6: return 'F#';
            case 7: return 'G';
            case 8: return 'G#';
            case 9: return 'A';
            case 10: return 'A#';
            case 11: return 'B';
        }
    },

    /**
     *
     * @param num {number} The midi value
     * @returns {number} The octave of the midi value
     */
    octave(num) {
        if (num < 24) return -1;
        return Math.floor((num-24)/12);
    },

    isSharp(num) {
        switch (num%12) {
            case 1:
            case 3:
            case 6:
            case 8:
            case 10:
                return true;
            default:
                return false;
        }
    }
}