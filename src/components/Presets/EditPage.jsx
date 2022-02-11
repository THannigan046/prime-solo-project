import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const [notes, setNotes] = useState(["A3", "A3", "A3", "A3", "A3", "A3", "A3", "A3",])
    const [kicks, setKicks] = useState([null, null, null, null, null, null, null, null,])
    const [snares, setSnares] = useState([null, null, null, null, null, null, null, null,])
    const [hats, setHats] = useState([null, null, null, null, null, null, null, null,])
    const [toms, setToms] = useState([null, null, null, null, null, null, null, null,])
    const [oscil, setOscil] = useState('sine')
    const [pattern, setPattern] = useState('up')
    const [presetName, setPresetName] = useState('')
    const [bpm, setBpm] = useState(80)
    const activePreset = useSelector(store => store.activePreset)

    
    const handleChange = (stepNumber, event) => {
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
        if (snares[stepNumber] === value) {
            value = null
        }

        setSnares([...snares.slice(0, stepNumber), value, ...snares.slice(stepNumber + 1)])
    }

    const handleHatChange = (stepNumber, event) => {
        let value = event.target.value
        if (hats[stepNumber] === value) {
            value = null
        }

        setHats([...hats.slice(0, stepNumber), value, ...hats.slice(stepNumber + 1)])
    }

    const handleTomChange = (stepNumber, event) => {
        let value = event.target.value
        if (toms[stepNumber] === value) {
            value = null
        }

        setToms([...toms.slice(0, stepNumber), value, ...toms.slice(stepNumber + 1)])
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
        /* axios.post('/api/preset', {
            presetName, notes, kicks, snares, hats, toms, oscil, pattern, bpm, userId
        }).then(() => {
            console.log('post success');
            alert('Preset Saved!')
        }).catch((err) => {
            console.log('post failed', err);
            alert('ya dun goofed, try again')
        }) */
    }
    useEffect(() => {
        dispatch({
            type: 'FETCH_ACTIVE_PRESET', 
            payload: params.id 
        })

    }, [params.id] )
    return(
        <>
        <h1>this is an edit page</h1>
        <p>id is {params.id}</p>
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
            <input type="text" placeholder='name your preset' onChange={(e) => setPresetName(e.target.value)} />
            <button onClick={savePreset}>Save</button>
 
        </>
    )

}

export default EditPage