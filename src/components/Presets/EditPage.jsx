import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Grid, Container, Checkbox, Box, Input, Stack, Slider, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import * as Tone from 'tone'
function EditPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    useEffect(() => {
        Tone.Transport.stop();
        Tone.Transport.cancel()
        dispatch({
            type: 'FETCH_ACTIVE_PRESET',
            payload: params.id
        })
    }, [params.id])


    let notes = useSelector(store => store.config.noteReducer)
    let kicks = useSelector(store => store.config.kickReducer)
    let snares = useSelector(store => store.config.snareReducer)
    let hats = useSelector(store => store.config.hatReducer)
    let toms = useSelector(store => store.config.tomReducer)
    let oscil = useSelector(store => store.config.oscilReducer)
    let pattern = useSelector(store => store.config.patternReducer)
    let bpm = useSelector(store => store.config.bpmReducer)
    let presetName = useSelector(store => store.config.presetName)
    const activePreset = useSelector(store => store.activePreset)


    const handleChange = (stepNumber, event) => {
        event.preventDefault()
        const value = event.target.value
        const notesToSend = [...notes.slice(0, stepNumber), value, ...notes.slice(stepNumber + 1)]
        console.log('notesToSend is', notesToSend);
        dispatch({
            type: 'SET_NOTES',
            payload: notes
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

    const savePreset = () => {
        dispatch({
            type: 'SAVE_PRESET',
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
                id: activePreset.id
            }

        })
        history.push('/play')
    }



    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <Container maxWidth='md'>


            <Grid container spacing={6} direction='column' alignItems='center'>
                <h1>Edit your preset </h1>
                <h3>active preset is {activePreset.name}</h3>
                <h3>id is {params.id}</h3>
                <br></br>


                <Grid item>
                    <div>

                        <FormControl required sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel>1</InputLabel>
                            <Select
                                name="step0" id="step0"
                                
                                onChange={(e) => handleChange(0, e)}>
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
                        <Slider aria-label='bpm' id='bpm' min={20} max={1000}
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
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleKickChange(0, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleKickChange(1, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleKickChange(2, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleKickChange(3, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleKickChange(4, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleKickChange(5, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleKickChange(6, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleKickChange(7, e))} />
                        <br></br>
                        <h3>snare</h3>
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleSnareChange(0, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleSnareChange(1, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleSnareChange(2, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleSnareChange(3, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleSnareChange(4, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleSnareChange(5, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleSnareChange(6, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleSnareChange(7, e))} />
                        <br></br>
                        <h3>hihat</h3>
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleHatChange(0, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleHatChange(1, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleHatChange(2, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleHatChange(3, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleHatChange(4, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleHatChange(5, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleHatChange(6, e))} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => (handleHatChange(7, e))} />
                        <br></br>
                        <h3>tom1</h3>
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => { handleTomChange(0, e) }} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => { handleTomChange(1, e) }} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => { handleTomChange(2, e) }} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => { handleTomChange(3, e) }} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => { handleTomChange(4, e) }} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => { handleTomChange(5, e) }} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => { handleTomChange(6, e) }} />
                        <Checkbox {...label} size='medium' value="C3" onChange={(e) => { handleTomChange(7, e) }} />
                    </div>
                </Grid>
                <br></br>
                <Input type="text" placeholder='name your preset' onChange={(e) => dispatch({ type: 'SET_PRESET_NAME', payload: e.target.value })} />
                <Button onClick={savePreset}>save preset</Button>
                <br></br>
            </Grid>

        </Container>
    )

}

export default EditPage