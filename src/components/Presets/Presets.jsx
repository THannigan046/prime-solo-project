import * as Tone from 'tone'
import react, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
function Presets () {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(store => store.user)
    const presetList = useSelector(store => store.presetList)
    //let [presetList, setPresetList] = useState([])
    useEffect(() => {
        Tone.Transport.stop()
        Tone.Transport.cancel()
        getPresets()
    }, [])

    const getPresets = () => {
        dispatch({
            type: 'FETCH_PRESETS'
        })
    }
    const toEdit = (id) => {
        history.push(`/presets/${id}/edit`)
    }
    const deletePreset = (id) => {
        dispatch({
            type: 'DELETE_PRESET',
            payload: id
        })
    }
    return(
        <>
        <h1>this is a presets page</h1>
        <h2>You can save and load presets over here</h2>
            <img src="https://i1.sndcdn.com/artworks-000191633248-ye4tjs-t500x500.jpg"/>
            
        <ul>
            {Array.isArray(presetList) ? presetList.map(preset => (
                <li key={preset.id}>{preset.name} <button>Load</button> <button onClick={() => {toEdit(preset.id)}}>Edit</button> <button onClick={() => deletePreset(preset.id)}>delete</button></li>
            )) : <p>loading</p>}
        </ul>
        </>
    )
}

export default Presets;