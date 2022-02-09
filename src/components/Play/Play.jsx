import * as Tone from 'tone'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';

function Play() {
    const userId = useSelector(store => store.user.id);
    let [sequence, setSequence] = useState(null)
    let [notes, setNotes] = useState(["A3", "A3", "A3", "A3", "A3", "A3", "A3", "A3",])
    const [kicks, setKicks] = useState([null, null, null, null, null, null, null, null,])
    const [snares, setSnares] = useState([null, null, null, null, null, null, null, null,])
    const [hats, setHats] = useState([null, null, null, null, null, null, null, null,])
    const [toms, setToms] = useState([null, null, null, null, null, null, null, null,])
    let [oscil, setOscil] = useState('sine')
    let [pattern, setPattern] = useState('up')
    let [presetName, setPresetName] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)
    const [playButtonText, setPlayButtonText] = useState('play')
    let [bpm, setBpm] = useState(80)
    Tone.Transport.bpm.value = bpm

    const volumeNode = new Tone.Volume(-5).toDestination();

    const savePresetAs = () => {
        
        axios.post('/api/preset', {
            presetName, notes, userId
        })
    }

    const synth = new Tone.MonoSynth({
        oscillator: {
            //can be sine, square, tri or saw
            type: oscil
        },
        filter: {
            frequency: 8000,
            type: 'lowpass'
        },
        filterEnvelope: {
            attack: 0.1,
            baseFrequency: "C3",
            octaves: 4
        }


    }).chain(volumeNode, Tone.Destination)




    // Declare handleChange
    const handleChange = (stepNumber, event) => {
        console.log('stepNumber is', stepNumber);
        console.log('value is', event.target.value);
        ;
        setNotes([...notes.slice(0, stepNumber), event.target.value, ...notes.slice(stepNumber + 1)])
    }
    const handleKickChange = (stepNumber, event) => {
        let value = event.target.value
        /* console.log('stepnumber is', stepNumber);
        console.log('value is', value); */
        if (kicks[stepNumber] === value) {
            value = null
        }

        setKicks([...kicks.slice(0, stepNumber), value, ...kicks.slice(stepNumber + 1)])
    }

    const handleSnareChange = (stepNumber, event) => {
        let value = event.target.value
        /* console.log('stepNumber is', stepNumber);
        console.log('value is', value); */
        if (snares[stepNumber] === value) {
            value = null
        }

        setSnares([...snares.slice(0, stepNumber), value, ...snares.slice(stepNumber + 1)])
    }

    const handleHatChange = (stepNumber, event) => {
        let value = event.target.value
        console.log('stepnumber is', stepNumber);
        console.log('value is', value);
        if (hats[stepNumber] === value) {
            value = null
        }

        setHats([...hats.slice(0, stepNumber), value, ...hats.slice(stepNumber + 1)])
    }

    const handleTomChange = (stepNumber, event) => {
        let value = event.target.value
        console.log('stepnumber is', stepNumber);
        console.log('value is', value);
        if (toms[stepNumber] === value) {
            value = null
        }

        setToms([...toms.slice(0, stepNumber), value, ...toms.slice(stepNumber + 1)])
    }



    const transport = () => {
        if (!isPlaying) {
            setIsPlaying(true)
            setPlayButtonText('stop')
            const timeSequence = new Tone.Pattern((time, note) => {
                synth.triggerAttackRelease(note, 0.1, time)

            }, notes, pattern)

            const kickSequence = new Tone.Sequence((time, note) => {
                kick.triggerAttackRelease(note, 0.1, time)
            }, kicks)

            const snareSequence = new Tone.Sequence((time, note) => {
                snare.triggerAttackRelease(note, 0.1, time)
            }, snares)

            const hatSequence = new Tone.Sequence((time, note) => {
                hihat.triggerAttackRelease(note, 0.1, time)
            }, hats)

            const tomSequence = new Tone.Sequence((time, note) => {
                tom1.triggerAttackRelease(note, 0.1, time)
            }, toms)

            setSequence(timeSequence)
            Tone.start() // start tone audio context on user interaction per spec of web audio api
            // !START! 
            Tone.Transport.start();
            //seq.start()
            timeSequence.start()
            kickSequence.start()
            snareSequence.start()
            hatSequence.start()
            tomSequence.start()
        }
        else {
            setIsPlaying(false)
            setPlayButtonText('play')
            Tone.Transport.stop()
            Tone.Transport.cancel()
            //sequence.clear()
        }

    }

    /* const startTransport = () => {
        const timeSequence = new Tone.Sequence((time, note) => {
            synth.triggerAttackRelease(note, 0.1, time)

        }, notes) 
        setSequence(timeSequence)
        Tone.start() // start tone audio context on user interaction per spec of web audio api
        // !START! 
        Tone.Transport.start();
        //seq.start()
        timeSequence.start()
    }
    
    const stopTransport = () => {
        Tone.Transport.stop()

        sequence.clear()
    } */


    const kick = new Tone.Sampler({
        urls: {
            C3: 'kick.mp3'
        },
        baseUrl: 'https://tonejs.github.io/audio/drum-samples/CR78/'
    }).toDestination()

    const snare = new Tone.Sampler({
        urls: {
            C3: 'snare.mp3'
        },
        baseUrl: 'https://tonejs.github.io/audio/drum-samples/CR78/'
    }).toDestination()

    const hihat = new Tone.Sampler({
        urls: {
            C3: 'hihat.mp3'
        },
        baseUrl: 'https://tonejs.github.io/audio/drum-samples/CR78/'
    }).toDestination()

    const tom1 = new Tone.Sampler({
        urls: {
            C3: 'tom1.mp3'
        },
        baseUrl: 'https://tonejs.github.io/audio/drum-samples/CR78/'
    }).toDestination()


    

    //const kick = new Tone.Player("https://tonejs.github.io/audio/drum-samples/CR78/kick.mp3").toDestination()

    //const snare = new Tone.Player("https://tonejs.github.io/audio/drum-samples/CR78/snare.mp3").toDestination()

    //const hihat = new Tone.Player("https://tonejs.github.io/audio/drum-samples/CR78/hihat.mp3").toDestination()

    //const tom1 = new Tone.Player("https://tonejs.github.io/audio/drum-samples/CR78/tom1.mp3").toDestination()


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
            <img src="https://art.ngfiles.com/images/1647000/1647974_thejudinator_synth-bobby.jpg?f1613569660" />
            <br></br>
            <button onClick={transport}>{playButtonText}</button>
            <p>Notes</p>
            <form>
                <select
                    name="step0" id="step0"
                    onChange={(e) => handleChange(0, e)}>
                    <option value="A3">A3</option>
                    <option value="A#3">A#3</option>
                    <option value="B3">B3</option>
                    <option value="C3">C3</option>
                    <option value="C#3">C#3</option>
                    <option value="D3">D3</option>
                    <option value="D#3">D#3</option>
                    <option value="E3">E3</option>
                    <option value="F3">F3</option>
                    <option value="F#3">F#3</option>
                    <option value="G3">G3</option>
                    <option value="G#3">G#3</option>
                </select>
                <select
                    name="step1" id="step1"
                    onChange={(e) => handleChange(1, e)}>
                    <option value="A3">A3</option>
                    <option value="A#3">A#3</option>
                    <option value="B3">B3</option>
                    <option value="C3">C3</option>
                    <option value="C#3">C#3</option>
                    <option value="D3">D3</option>
                    <option value="D#3">D#3</option>
                    <option value="E3">E3</option>
                    <option value="F3">F3</option>
                    <option value="F#3">F#3</option>
                    <option value="G3">G3</option>
                    <option value="G#3">G#3</option>
                </select>
                <select
                    name="step2" id="step2"
                    onChange={(e) => handleChange(2, e)}>
                    <option value="A3">A3</option>
                    <option value="A#3">A#3</option>
                    <option value="B3">B3</option>
                    <option value="C3">C3</option>
                    <option value="C#3">C#3</option>
                    <option value="D3">D3</option>
                    <option value="D#3">D#3</option>
                    <option value="E3">E3</option>
                    <option value="F3">F3</option>
                    <option value="F#3">F#3</option>
                    <option value="G3">G3</option>
                    <option value="G#3">G#3</option>
                </select>
                <select
                    name="step3" id="step3"
                    onChange={(e) => handleChange(3, e)}>
                    <option value="A3">A3</option>
                    <option value="A#3">A#3</option>
                    <option value="B3">B3</option>
                    <option value="C3">C3</option>
                    <option value="C#3">C#3</option>
                    <option value="D3">D3</option>
                    <option value="D#3">D#3</option>
                    <option value="E3">E3</option>
                    <option value="F3">F3</option>
                    <option value="F#3">F#3</option>
                    <option value="G3">G3</option>
                    <option value="G#3">G#3</option>
                </select>
                <select
                    name="step4" id="step4"
                    onChange={(e) => handleChange(4, e)}>
                    <option value="A3">A3</option>
                    <option value="A#3">A#3</option>
                    <option value="B3">B3</option>
                    <option value="C3">C3</option>
                    <option value="C#3">C#3</option>
                    <option value="D3">D3</option>
                    <option value="D#3">D#3</option>
                    <option value="E3">E3</option>
                    <option value="F3">F3</option>
                    <option value="F#3">F#3</option>
                    <option value="G3">G3</option>
                    <option value="G#3">G#3</option>
                </select>
                <select
                    name="step5" id="step5"
                    onChange={(e) => handleChange(5, e)}>
                    <option value="A3">A3</option>
                    <option value="A#3">A#3</option>
                    <option value="B3">B3</option>
                    <option value="C3">C3</option>
                    <option value="C#3">C#3</option>
                    <option value="D3">D3</option>
                    <option value="D#3">D#3</option>
                    <option value="E3">E3</option>
                    <option value="F3">F3</option>
                    <option value="F#3">F#3</option>
                    <option value="G3">G3</option>
                    <option value="G#3">G#3</option>
                </select>
                <select
                    name="step6" id="step6"
                    onChange={(e) => handleChange(6, e)}>
                    <option value="A3">A3</option>
                    <option value="A#3">A#3</option>
                    <option value="B3">B3</option>
                    <option value="C3">C3</option>
                    <option value="C#3">C#3</option>
                    <option value="D3">D3</option>
                    <option value="D#3">D#3</option>
                    <option value="E3">E3</option>
                    <option value="F3">F3</option>
                    <option value="F#3">F#3</option>
                    <option value="G3">G3</option>
                    <option value="G#3">G#3</option>
                </select>
                <select
                    name="step7" id="step7"
                    onChange={(e) => handleChange(7, e)}>
                    
                    <option value="A3">A3</option>
                    <option value="A#3">A#3</option>
                    <option value="B3">B3</option>
                    <option value="C3">C3</option>
                    <option value="C#3">C#3</option>
                    <option value="D3">D3</option>
                    <option value="D#3">D#3</option>
                    <option value="E3">E3</option>
                    <option value="F3">F3</option>
                    <option value="F#3">F#3</option>
                    <option value="G3">G3</option>
                    <option value="G#3">G#3</option>
                </select>
                <select
                    name="oscType" id="oscType"
                    onChange={(e) => setOscil(e.target.value)}>
                    <option value="sine">Sine</option>
                    <option value="triangle">Triangle</option>
                    <option value="sawtooth">Saw</option>
                    <option value="square">Square</option>

                </select>
                <select
                    name='pattern' id='pattern'
                    onChange={(e) => setPattern(e.target.value)}
                >
                    <option value="up">up</option>
                    <option value="down">down</option>
                    <option value="upDown">upDown</option>
                    <option value='downUp'>downUp</option>
                    <option value='random'>random</option>
                    <option value='randomWalk'>randomWalk</option>
                    <option value='randomOnce'>randomOnce</option>
                </select>
                <input name='bpm' id='bpm'
                    placeholder='bpm' onChange={(e) => setBpm(e.target.value)}
                ></input>
            </form>


            
            <br></br>
            <p>drums</p>
            <br></br>
            <div className='drumSequencer'>
                <p>kick</p>
                <input type="checkbox" value="C3" onChange={(e) => (handleKickChange(0, e))} />
                <input type="checkbox" value="C3" onChange={(e) => (handleKickChange(1, e))} />
                <input type="checkbox" value="C3" onChange={(e) => (handleKickChange(2, e))} />
                <input type="checkbox" value="C3" onChange={(e) => (handleKickChange(3, e))} />
                <input type="checkbox" value="C3" onChange={(e) => (handleKickChange(4, e))} />
                <input type="checkbox" value="C3" onChange={(e) => (handleKickChange(5, e))} />
                <input type="checkbox" value="C3" onChange={(e) => (handleKickChange(6, e))} />
                <input type="checkbox" value="C3" onChange={(e) => (handleKickChange(7, e))} />
                <br></br>
                <p>snare</p>
                <input type="checkbox" value='C3' onChange={(e) => (handleSnareChange(0, e))} />
                <input type="checkbox" value='C3' onChange={(e) => (handleSnareChange(1, e))} />
                <input type="checkbox" value='C3' onChange={(e) => (handleSnareChange(2, e))} />
                <input type="checkbox" value='C3' onChange={(e) => (handleSnareChange(3, e))} />
                <input type="checkbox" value='C3' onChange={(e) => (handleSnareChange(4, e))} />
                <input type="checkbox" value='C3' onChange={(e) => (handleSnareChange(5, e))} />
                <input type="checkbox" value='C3' onChange={(e) => (handleSnareChange(6, e))} />
                <input type="checkbox" value='C3' onChange={(e) => (handleSnareChange(7, e))} />
                <br></br>
                <p>hihat</p>
                <input type="checkbox" value='C3' onChange={(e) => (handleHatChange(0, e))} />
                <input type="checkbox" value='C3' onChange={(e) => (handleHatChange(1, e))} />
                <input type="checkbox" value='C3' onChange={(e) => (handleHatChange(2, e))} />
                <input type="checkbox" value='C3' onChange={(e) => (handleHatChange(3, e))} />
                <input type="checkbox" value='C3' onChange={(e) => (handleHatChange(4, e))} />
                <input type="checkbox" value='C3' onChange={(e) => (handleHatChange(5, e))} />
                <input type="checkbox" value='C3' onChange={(e) => (handleHatChange(6, e))} />
                <input type="checkbox" value='C3' onChange={(e) => (handleHatChange(7, e))} />
                <br></br>
                <p>tom1</p>
                <input type="checkbox" value='C3' onChange={(e) => { handleTomChange(0, e) }} />
                <input type="checkbox" value='C3' onChange={(e) => { handleTomChange(1, e) }} />
                <input type="checkbox" value='C3' onChange={(e) => { handleTomChange(2, e) }} />
                <input type="checkbox" value='C3' onChange={(e) => { handleTomChange(3, e) }} />
                <input type="checkbox" value='C3' onChange={(e) => { handleTomChange(4, e) }} />
                <input type="checkbox" value='C3' onChange={(e) => { handleTomChange(5, e) }} />
                <input type="checkbox" value='C3' onChange={(e) => { handleTomChange(6, e) }} />
                <input type="checkbox" value='C3' onChange={(e) => { handleTomChange(7, e) }} />
            </div>
            <input type="text"  placeholder='name your preset' onChange={(e) => setPresetName(e.target.value)} />
            <button onClick={savePresetAs}>Save Preset As</button>

        </>
    )
}
export default Play;