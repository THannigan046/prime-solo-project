import * as Tone from 'tone'
import {useEffect} from 'react'
function Play() {

    const synth = new Tone.MembraneSynth().toDestination()

    //jotting down ideas as I go 
    /* 
    Could make a simple drum machine
    */

    

    /* const seq = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, 0.1, time);
        // subdivisions are given as subarrays
    }, ["C4", false,]).start(0); */
    
    const playKick = () => {
        kick.start()
    }

    const playSnare = () => {
        snare.start()
    }

    const playHat = () => {
        hihat.start()
    }

    const playTom = () => {
        tom1.start()
    }

    const kick = new Tone.Player("https://tonejs.github.io/audio/drum-samples/CR78/kick.mp3").toDestination()

    const snare = new Tone.Player("https://tonejs.github.io/audio/drum-samples/CR78/snare.mp3").toDestination()

    const hihat = new Tone.Player("https://tonejs.github.io/audio/drum-samples/CR78/hihat.mp3").toDestination()

    const tom1 = new Tone.Player("https://tonejs.github.io/audio/drum-samples/CR78/tom1.mp3").toDestination()
    
    return (
        <>


        <h1>Dammit bobby, play your dang synths</h1>
            <img src="https://art.ngfiles.com/images/1647000/1647974_thejudinator_synth-bobby.jpg?f1613569660"/>
            <button onClick={playKick}>Kick</button>
            <button onClick={playSnare}>Snare</button>
            <button onClick={playHat}>Hihat</button>
            <button onClick={playTom}>Tom1</button>
            
        </>
    )
}
export default Play;