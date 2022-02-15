import { Button, Grid, Container, Checkbox, Box, Input, Stack, Slider, InputLabel, MenuItem, FormControl, Select } from '@mui/material'

export default function Synth() {


    return(
        <Container maxWidth='md'>


            <Grid container spacing={6} direction='column' alignItems='center'>
                <h1>Dammit bobby, play your dang synths</h1>
                <h3>active preset is {activePreset.name}</h3>
                <img src="https://art.ngfiles.com/images/1647000/1647974_thejudinator_synth-bobby.jpg?f1613569660" />
                <br></br>

                <Button id='playButton' onClick={transport}>{playButtonText}</Button>
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
                    <p>drums</p>
                    <br></br>
                    <div className='drumSequencer'>
                        <p>kick</p>
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