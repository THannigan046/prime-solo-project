import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    useEffect(() => {
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
    }
    

        

    
    return(
        <>
        <h1>this is an edit page</h1>
        <p>id is {params.id}</p>
        <p>active preset is {activePreset.name}</p>
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
                    onChange={(e) => dispatch({ type: 'SET_OSCIL', payload: e.target.value })}>
                    <option value="sine">Sine</option>
                    <option value="triangle">Triangle</option>
                    <option value="sawtooth">Saw</option>
                    <option value="square">Square</option>

                </select>
                <select
                    name='pattern' id='pattern'
                    onChange={(e) => dispatch({ type: 'SET_PATTERN', payload: e.target.value })}
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
                    placeholder='bpm' onChange={(e) => dispatch({ type: 'SET_BPM', payload: e.target.value })}
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
            <input type="text" placeholder='name your preset' onChange={(e) => dispatch({ type: 'SET_PRESET_NAME', payload: e.target.value })} />
            <button onClick={savePreset}>Save</button>
 
        </>
    )

}

export default EditPage