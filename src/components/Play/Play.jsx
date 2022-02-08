import * as Tone from 'tone'
import {useEffect} from 'react'
function Play() {


    const startTransport = () => {
        const kick1 = new Tone.MembraneSynth().toDestination();
        const seq = new Tone.Sequence((time, note) => {
            kick1.triggerAttackRelease(note, 0.1, time);
            // subdivisions are given as subarrays
        }, [false, null, false, null, false, null, false, null,]).start(0);
        Tone.Transport.start();
    }

    const stopTransport = () => {
        Tone.Transport.stop()
    }
   
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
    
    /* const drumSet = new Tone.Players({
        urls: {
            0: "kick.mp3",
            1: "snare.mp3",
            2: "hihat.mp3", 
            3: "tom1.mp3",
        },
        fadeOut: "16n",
        baseUrl: "https://tonejs.github.io/audio/drum-samples/CR78/"
    }).toDestination() */

    return (
        <>


        <h1>Dammit bobby, play your dang synths</h1>
            <img src="https://art.ngfiles.com/images/1647000/1647974_thejudinator_synth-bobby.jpg?f1613569660"/>
            <button onClick={startTransport}>start</button>
            <button onClick={stopTransport}>stop</button>
            <br></br>
            <button onClick={playKick}>Kick</button>
            <button onClick={playSnare}>Snare</button>
            <button onClick={playHat}>Hihat</button>
            <button onClick={playTom}>Tom1</button>
            <br></br>
            <p>kick</p>
            <input  type="checkbox"/>
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <br></br>
            <p>snare</p>
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <br></br>
            <p>hihat</p>
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <br></br>
            <p>tom1</p>
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            
        </>
    )
}
export default Play;