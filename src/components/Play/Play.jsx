import * as Tone from 'tone'
import * as React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Container, Checkbox, Box, Input, Stack, Slider, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import './Play.css'

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
            type: 'FETCH_PRESETS'
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

        console.log('value', event.target.value);
        console.log('stepNumber', stepNumber);
        console.log('kicks[stepNumber]', kicks[stepNumber])
        //event.preventDefault()
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
        axios.get(`/api/preset/${id}`)
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
    
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return (
        <Container maxWidth='md'>

            
            <Grid container spacing={6} direction='column' alignItems='center'>
                <h1>Play your dang Synths </h1>
                <h3>active preset is {activePreset.name}</h3>
                <img src="https://art.ngfiles.com/images/1647000/1647974_thejudinator_synth-bobby.jpg?f1613569660" />
                <br></br>
                <h4>Stop and restart to apply your changes</h4>
                <Button id='playButton' onClick={transport}>{playButtonText}</Button>
                <Grid item>
                <div>
                    {/* [0, 1, 2, 3, 4] */}
                    <FormControl required sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel>1</InputLabel>
                        <Select 
                            name="step0" id="step0"
                            value={notes[0]}
                            onChange={(e) => handleChange(0, e)}>
                            {/* {['A3', 'A3#', 'B3'].map(val => )} */}
                            <MenuItem value="A3">A3</MenuItem>
                            <MenuItem value="A#3">A#3</MenuItem>
                            <MenuItem value="B3">B3</MenuItem>
                            <MenuItem value="C3">C3</MenuItem>
                            <MenuItem value="C#3">C#3</MenuItem>
                            <MenuItem value="D3">D3</MenuItem>
                            <MenuItem value="D#3">D#3</MenuItem>
                            <MenuItem value="E3">E3</MenuItem>
                            <MenuItem value="F3">F3</MenuItem>
                            <MenuItem value="F#3">F#3</MenuItem>
                            <MenuItem value="G3">G3</MenuItem>
                            <MenuItem value="G#3">G#3</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl required sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel>2</InputLabel>
                        <Select
                                value={notes[1]}
                            name="step1" id="step1"
                            onChange={(e) => handleChange(1, e)}>
                            <MenuItem value="A3">A3</MenuItem>
                            <MenuItem value="A#3">A#3</MenuItem>
                            <MenuItem value="B3">B3</MenuItem>
                            <MenuItem value="C3">C3</MenuItem>
                            <MenuItem value="C#3">C#3</MenuItem>
                            <MenuItem value="D3">D3</MenuItem>
                            <MenuItem value="D#3">D#3</MenuItem>
                            <MenuItem value="E3">E3</MenuItem>
                            <MenuItem value="F3">F3</MenuItem>
                            <MenuItem value="F#3">F#3</MenuItem>
                            <MenuItem value="G3">G3</MenuItem>
                            <MenuItem value="G#3">G#3</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl required sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel>3</InputLabel>
                        <Select
                                value={notes[2]}
                            name="step2" id="step2"
                            onChange={(e) => handleChange(2, e)}>
                            <MenuItem value="A3">A3</MenuItem>
                            <MenuItem value="A#3">A#3</MenuItem>
                            <MenuItem value="B3">B3</MenuItem>
                            <MenuItem value="C3">C3</MenuItem>
                            <MenuItem value="C#3">C#3</MenuItem>
                            <MenuItem value="D3">D3</MenuItem>
                            <MenuItem value="D#3">D#3</MenuItem>
                            <MenuItem value="E3">E3</MenuItem>
                            <MenuItem value="F3">F3</MenuItem>
                            <MenuItem value="F#3">F#3</MenuItem>
                            <MenuItem value="G3">G3</MenuItem>
                            <MenuItem value="G#3">G#3</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl required sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel>4</InputLabel>
                        <Select
                                value={notes[3]}
                            name="step3" id="step3"
                            onChange={(e) => handleChange(3, e)}>
                            <MenuItem value="A3">A3</MenuItem>
                            <MenuItem value="A#3">A#3</MenuItem>
                            <MenuItem value="B3">B3</MenuItem>
                            <MenuItem value="C3">C3</MenuItem>
                            <MenuItem value="C#3">C#3</MenuItem>
                            <MenuItem value="D3">D3</MenuItem>
                            <MenuItem value="D#3">D#3</MenuItem>
                            <MenuItem value="E3">E3</MenuItem>
                            <MenuItem value="F3">F3</MenuItem>
                            <MenuItem value="F#3">F#3</MenuItem>
                            <MenuItem value="G3">G3</MenuItem>
                            <MenuItem value="G#3">G#3</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl required sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel>5</InputLabel>
                        <Select
                                value={notes[4]}
                            name="step4" id="step4"
                            onChange={(e) => handleChange(4, e)}>
                            <MenuItem value="A3">A3</MenuItem>
                            <MenuItem value="A#3">A#3</MenuItem>
                            <MenuItem value="B3">B3</MenuItem>
                            <MenuItem value="C3">C3</MenuItem>
                            <MenuItem value="C#3">C#3</MenuItem>
                            <MenuItem value="D3">D3</MenuItem>
                            <MenuItem value="D#3">D#3</MenuItem>
                            <MenuItem value="E3">E3</MenuItem>
                            <MenuItem value="F3">F3</MenuItem>
                            <MenuItem value="F#3">F#3</MenuItem>
                            <MenuItem value="G3">G3</MenuItem>
                            <MenuItem value="G#3">G#3</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl required sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel>6</InputLabel>
                        <Select
                                value={notes[5]}
                            name="step5" id="step5"
                            onChange={(e) => handleChange(5, e)}>
                            <MenuItem value="A3">A3</MenuItem>
                            <MenuItem value="A#3">A#3</MenuItem>
                            <MenuItem value="B3">B3</MenuItem>
                            <MenuItem value="C3">C3</MenuItem>
                            <MenuItem value="C#3">C#3</MenuItem>
                            <MenuItem value="D3">D3</MenuItem>
                            <MenuItem value="D#3">D#3</MenuItem>
                            <MenuItem value="E3">E3</MenuItem>
                            <MenuItem value="F3">F3</MenuItem>
                            <MenuItem value="F#3">F#3</MenuItem>
                            <MenuItem value="G3">G3</MenuItem>
                            <MenuItem value="G#3">G#3</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl required sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel>7</InputLabel>

                        <Select
                                value={notes[6]}
                            name="step6" id="step6"
                            onChange={(e) => handleChange(6, e)}>
                            <MenuItem value="A3">A3</MenuItem>
                            <MenuItem value="A#3">A#3</MenuItem>
                            <MenuItem value="B3">B3</MenuItem>
                            <MenuItem value="C3">C3</MenuItem>
                            <MenuItem value="C#3">C#3</MenuItem>
                            <MenuItem value="D3">D3</MenuItem>
                            <MenuItem value="D#3">D#3</MenuItem>
                            <MenuItem value="E3">E3</MenuItem>
                            <MenuItem value="F3">F3</MenuItem>
                            <MenuItem value="F#3">F#3</MenuItem>
                            <MenuItem value="G3">G3</MenuItem>
                            <MenuItem value="G#3">G#3</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl required sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel>8</InputLabel>
                        <Select
                                value={notes[7]}
                            name="step7" id="step7"
                            onChange={(e) => handleChange(7, e)}>

                            <MenuItem value="A3">A3</MenuItem>
                            <MenuItem value="A#3">A#3</MenuItem>
                            <MenuItem value="B3">B3</MenuItem>
                            <MenuItem value="C3">C3</MenuItem>
                            <MenuItem value="C#3">C#3</MenuItem>
                            <MenuItem value="D3">D3</MenuItem>
                            <MenuItem value="D#3">D#3</MenuItem>
                            <MenuItem value="E3">E3</MenuItem>
                            <MenuItem value="F3">F3</MenuItem>
                            <MenuItem value="F#3">F#3</MenuItem>
                            <MenuItem value="G3">G3</MenuItem>
                            <MenuItem value="G#3">G#3</MenuItem>
                        </Select>
                    </FormControl>
                    <br></br>
                    
                    <FormControl required sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Wave type</InputLabel>
                        <Select
                        value={oscil}
                            name="oscType" id="oscType"
                            onChange={(e) => dispatch({ type: 'SET_OSCIL', payload: e.target.value })}>
                            <MenuItem value="sine">Sine</MenuItem>
                            <MenuItem value="triangle">Triangle</MenuItem>
                            <MenuItem value="sawtooth">Saw</MenuItem>
                            <MenuItem value="square">Square</MenuItem>

                        </Select>
                    </FormControl>
                    <FormControl required sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Patt type</InputLabel>
                        <Select
                            value={pattern}
                            name='pattern' id='pattern'
                            onChange={(e) => dispatch({ type: 'SET_PATTERN', payload: e.target.value })}
                        >
                            <MenuItem value="up">up</MenuItem>
                            <MenuItem value="down">down</MenuItem>
                            <MenuItem value="upDown">upDown</MenuItem>
                            <MenuItem value='downUp'>downUp</MenuItem>
                            <MenuItem value='random'>random</MenuItem>
                            <MenuItem value='randomWalk'>randomWalk</MenuItem>
                            <MenuItem value='randomOnce'>randomOnce</MenuItem>
                        </Select>
                    </FormControl>

                </div>
                </Grid>
                <h3>Bpm</h3>
                <Box sx={{ width: 300 }}>
                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <Slider value={Number(bpm)} aria-label='bpm' id='bpm' min={20} max={1000}
                            onChange={(e) => dispatch({ type: 'SET_BPM', payload: e.target.value })}
                        />
                    </Stack>
                </Box>




                <br></br>
                <Grid item>
                <h3>drums</h3>
                <br></br>
                <div className='drumSequencer'>
                    <h3>kick</h3>
{/*                     {[0, 1, 2, 3, 4, 5, 6].map(n => ())} */}
                    <Checkbox checked={kicks[0] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleKickChange(0, e))} />
                    <Checkbox checked={kicks[1] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleKickChange(1, e))} />
                    <Checkbox checked={kicks[2] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleKickChange(2, e))} />
                    <Checkbox checked={kicks[3] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleKickChange(3, e))} />
                    <Checkbox checked={kicks[4] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleKickChange(4, e))} />
                    <Checkbox checked={kicks[5] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleKickChange(5, e))} />
                    <Checkbox checked={kicks[6] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleKickChange(6, e))} />
                    <Checkbox checked={kicks[7] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleKickChange(7, e))} />
                    <br></br>
                    <h3>snare</h3>
                    <Checkbox checked={snares[0] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleSnareChange(0, e))} />
                    <Checkbox checked={snares[1] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleSnareChange(1, e))} />
                    <Checkbox checked={snares[2] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleSnareChange(2, e))} />
                    <Checkbox checked={snares[3] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleSnareChange(3, e))} />
                    <Checkbox checked={snares[4] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleSnareChange(4, e))} />
                    <Checkbox checked={snares[5] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleSnareChange(5, e))} />
                    <Checkbox checked={snares[6] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleSnareChange(6, e))} />
                    <Checkbox checked={snares[7] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleSnareChange(7, e))} />
                    <br></br>
                    <h3>hihat</h3>
                    <Checkbox checked={hats[0] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleHatChange(0, e))} />
                    <Checkbox checked={hats[1] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleHatChange(1, e))} />
                    <Checkbox checked={hats[2] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleHatChange(2, e))} />
                    <Checkbox checked={hats[3] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleHatChange(3, e))} />
                    <Checkbox checked={hats[4] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleHatChange(4, e))} />
                    <Checkbox checked={hats[5] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleHatChange(5, e))} />
                    <Checkbox checked={hats[6] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleHatChange(6, e))} />
                    <Checkbox checked={hats[7] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => (handleHatChange(7, e))} />
                    <br></br>
                    <h3>tom1</h3>
                    <Checkbox checked={toms[0] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => { handleTomChange(0, e) }} />
                    <Checkbox checked={toms[1] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => { handleTomChange(1, e) }} />
                    <Checkbox checked={toms[2] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => { handleTomChange(2, e) }} />
                    <Checkbox checked={toms[3] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => { handleTomChange(3, e) }} />
                    <Checkbox checked={toms[4] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => { handleTomChange(4, e) }} />
                    <Checkbox checked={toms[5] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => { handleTomChange(5, e) }} />
                    <Checkbox checked={toms[6] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => { handleTomChange(6, e) }} />
                    <Checkbox checked={toms[7] === 'C3'} {...label} size='medium' value="C3" onChange={(e) => { handleTomChange(7, e) }} />
                </div>
                </Grid>
                <br></br>
                <Input type="text" placeholder='name your preset' onChange={(e) => dispatch({ type: 'SET_PRESET_NAME', payload: e.target.value })} />
                <Button onClick={savePresetAs}>Save Preset As</Button>
                <br></br>

                <Grid item>
                    <h2>Presets</h2>
                    <ul>
                        {Array.isArray(presetList) ? presetList.map(preset => (
                            <li key={preset.id}>{preset.name} <Button onClick={() => loadPreset(preset.id)}>Load</Button> <Button onClick={() => { toEdit(preset.id) }}>Edit</Button> <Button onClick={() => deletePreset(preset.id)}>delete</Button></li>
                        )) : <p>loading</p>}
                    </ul>
                </Grid>
            </Grid>

        </Container>
    )
}
export default Play;