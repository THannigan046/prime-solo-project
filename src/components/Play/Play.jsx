import * as Tone from 'tone'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
function Play() {

    useEffect(() => {
        getPresets()
    }, []) 
    const preset = useSelector(store => store.presetReducer)
    const activePreset = useSelector(store => store.activePreset)
    const presetList = useSelector(store => store.presetList)
    const history = useHistory()
    const dispatch = useDispatch();
    const userId = useSelector(store => store.user.id);
    const [sequence, setSequence] = useState(null)
    let notes = useSelector(store => store.config.noteReducer)
    let kicks = useSelector(store => store.config.kickReducer)
    let snares = useSelector(store => store.config.snareReducer)
    let hats = useSelector(store => store.config.hatReducer)
    let toms = useSelector(store => store.config.tomReducer)
    let oscil = useSelector(store => store.config.oscilReducer)
    let pattern = useSelector(store => store.config.patternReducer)
    let bpm = useSelector(store => store.config.bpmReducer)
    let presetName = useSelector(store => store.config.presetName)
    let [isPlaying, setIsPlaying] = useState(false)
    let [playButtonText, setPlayButtonText] = useState('play')
    
    Tone.Transport.bpm.value = bpm
    
    
    // console.log('presetList [0] is', presetList[0]);
    const volumeNode = new Tone.Volume(-5).toDestination();
    
    
    
    const getPresets = () => {
        dispatch({
            type: 'FETCH_PRESETS', 
            payload: userId
        })
    }

    const toEdit = (id) => {
        history.push(`/presets/${id}/edit`)
        Tone.Transport.stop()
        Tone.Transport.cancel()
    }



    
    const savePresetAs = () => {
        dispatch({
            type: 'SAVE_PRESET_AS',
            payload: {
               name: presetName,
               notes: notes, 
               kicks: kicks, 
               snares: snares, 
               hats: hats, 
               toms: toms, 
               oscil: oscil, 
               pattern: pattern, 
               bpm: bpm,
               userId: userId
            }
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

    const deletePreset = (id) => {
        dispatch({
            type: 'DELETE_PRESET', 
            payload: id
        })
    }
    // Declare handleChange
    const handleChange = (stepNumber, event) => {
        event.preventDefault()
        const value = event.target.value
        const notesToSend = [...notes.slice(0, stepNumber), value, ...notes.slice(stepNumber + 1)]
        console.log('notesToSend is', notesToSend);
        dispatch({
            type: 'SET_NOTES', 
            payload: notesToSend
        })
    }
    const handleKickChange = (stepNumber, event) => {
        event.preventDefault()
        let value = event.target.value
        
        /* console.log('stepnumber is', stepNumber);
        console.log('value is', value); */
        if (kicks[stepNumber] === value) {
            value = null
        }
        const kicksToSend = [...kicks.slice(0, stepNumber), value, ...kicks.slice(stepNumber + 1)]
        dispatch({
            type: 'SET_KICKS', 
            payload: kicksToSend
        })
        
    }

    const handleSnareChange = (stepNumber, event) => {
        event.preventDefault()
        let value = event.target.value
        if (snares[stepNumber] === value) {
            value = null
        }

        const snaresToSend = [...snares.slice(0, stepNumber), value, ...snares.slice(stepNumber + 1)]
        dispatch({
            type: 'SET_SNARES',
            payload: snaresToSend
        })
    }

    const handleHatChange = (stepNumber, event) => {
        event.preventDefault()
        let value = event.target.value
        if (hats[stepNumber] === value) {
            value = null
        }

        let hatsToSend = [...hats.slice(0, stepNumber), value, ...hats.slice(stepNumber + 1)]
        dispatch({
            type: 'SET_HATS', 
            payload: hatsToSend
        })
    }

    const handleTomChange = (stepNumber, event) => {
        event.preventDefault()
        let value = event.target.value
        if (toms[stepNumber] === value) {
            value = null
        }

        let tomsToSend = [...toms.slice(0, stepNumber), value, ...toms.slice(stepNumber + 1)]
        dispatch({
            type: 'SET_TOMS', 
            payload: tomsToSend
        })
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

    const loadPreset = (id) => {
        dispatch({
            type: 'FETCH_ACTIVE_PRESET', 
            payload: id
        })
        axios.get(`api/preset/load/${id}`)
        .then((res) => {
            console.log('response is', res.data);
            dispatch({
                type: 'SET_BPM', 
                payload: res.data.bpm
            })
            dispatch({
                type: 'SET_TOMS',
                payload: res.data.toms
            })
            dispatch({
                type: 'SET_HATS',
                payload: res.data.hats
            })
            dispatch({
                type: 'SET_SNARES',
                payload: res.data.snares
            })
            dispatch({
                type: 'SET_KICKS',
                payload: res.data.kicks
            })
            dispatch({
                type: 'SET_NOTES',
                payload: res.data.notes
            })

            dispatch({ type: 'SET_PATTERN', payload: res.data.pattern })

            dispatch({ type: 'SET_OSCIL', payload: res.data.oscil })
        })  
        
        
    }

    return (
        <>

            <h1>Dammit bobby, play your dang synths</h1>
            <h3>active preset is {activePreset.name}</h3>
            {/* <h3>Active preset is: {activePreset.name} </h3> */}
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
                    onChange={(e) => dispatch({type: 'SET_OSCIL', payload: e.target.value})}>
                    <option value="sine">Sine</option>
                    <option value="triangle">Triangle</option>
                    <option value="sawtooth">Saw</option>
                    <option value="square">Square</option>

                </select>
                <select
                    name='pattern' id='pattern'
                    onChange={(e) => dispatch({type: 'SET_PATTERN', payload: e.target.value})}
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
                    placeholder='bpm' onChange={(e) => dispatch({type: 'SET_BPM', payload: e.target.value})}
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
            <input type="text" placeholder='name your preset' onChange={(e) => dispatch({type: 'SET_PRESET_NAME', payload: e.target.value})} />
            <button onClick={savePresetAs}>Save Preset As</button>
            <br></br>
            <h2>Presets</h2>
            <ul>
                {Array.isArray(presetList) ? presetList.map(preset => (
                    <li key={preset.id}>{preset.name} <button onClick={() => loadPreset(preset.id)}>Load</button> <button onClick={() => { toEdit(preset.id) }}>Edit</button> <button onClick={() => deletePreset(preset.id)}>delete</button></li>
                )) : <p>loading</p>}
            </ul>

        </>
    )
}
export default Play;