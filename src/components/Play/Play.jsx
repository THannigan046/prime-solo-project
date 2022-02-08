import * as Tone from 'tone'
import {useEffect, useState} from 'react'
function Play() {
    let notes = [step1, "C4", "C5", "C4",]
    console.log(step1);
    const [step1, setStep1] = useState("C3")
    const [isPlaying, setIsPlaying] = useState(false)
    const [playButtonText, setPlayButtonText] = useState('play')
    let [bpm, setBpm] = useState(120)
    Tone.Transport.bpm.value = bpm

    const volumeNode = new Tone.Volume(-9).toDestination();
    const synth = new Tone.MonoSynth({
        oscillator: {
            //can be square, tri or saw, 
            //gonna add a selector shortly
            type: 'square'
        }, 
        filter: {
            frequency: 18000,
            type: 'lowpass'
        }

    }).chain(volumeNode, Tone.Destination)

    

    const timeSequence = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, 0.1, time)

    }, notes ) 


    const startTransport = () => {
        
        Tone.start() // start tone audio context on user interaction per spec of web audio api
        // !START! 
        Tone.Transport.start();
        //seq.start()
        timeSequence.start()
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
            <br></br>
            <p>transport</p>
            
            <select 
            name="step1" id="step1"
            value={step1} onChange={evt => (setStep1(evt.target.value))}>
            <option value="C3">C3</option>
            <option value="D3">D3</option>
            <option value="E3">E3</option>
            <option value="G3">G3</option>
            <option value="A4">A4</option>
            <option value="C4">C4</option>
            </select>
            <select
                name="step2" id="step2">
                <option value="C3">C3</option>
                <option value="D3">D3</option>
                <option value="E3">E3</option>
                <option value="G3">G3</option>
                <option value="A4">A4</option>
                <option value="C4">C4</option>
            </select>
            <select
                name="step3" id="step3">
                <option value="C3">C3</option>
                <option value="D3">D3</option>
                <option value="E3">E3</option>
                <option value="G3">G3</option>
                <option value="A4">A4</option>
                <option value="C4">C4</option>
            </select>
            <select
                name="step4" id="step4">
                <option value="C3">C3</option>
                <option value="D3">D3</option>
                <option value="E3">E3</option>
                <option value="G3">G3</option>
                <option value="A4">A4</option>
                <option value="C4">C4</option>
            </select>
            <button onClick={startTransport}>{playButtonText}</button>
            <button onClick={stopTransport}>stop</button>
            <br></br>
            <p>drums</p>
            <button onClick={playKick}>Kick</button>
            <button onClick={playSnare}>Snare</button>
            <button onClick={playHat}>Hihat</button>
            <button onClick={playTom}>Tom1</button>
            <br></br>
            <div className='drumSequencer'>
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
            </div>
            
        </>
    )
}
export default Play;