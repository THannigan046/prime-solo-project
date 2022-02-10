import * as Tone from 'tone'
import react, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
function Presets () {
    const dispatch = useDispatch()
    const user = useSelector(store => store.user)
    const presetList = useSelector(store => store.presetList)
    console.log('presetLit is', presetList);
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
        /* axios({
            method: 'GET', 
            url: '/api/preset'
        }).then(res => {
            console.log('response is', res.data);
            setPresetList(res.data)
        }).catch(err => {
            console.log('get err', err);
        }) */
        
    }

    const deletePreset = (id) => {
        dispatch({
            type: 'DELETE_PRESET',
            payload: id
        })
        /* console.log('id is', id);
        axios.delete(`/api/preset/${id}`)
        .then((res) => {
            console.log('delete success', res);
            getPresets()
        }) */
    }
    return(
        <>
        <h1>this is a presets page</h1>
        <h2>You can save and load presets over here</h2>
            <img src="https://i1.sndcdn.com/artworks-000191633248-ye4tjs-t500x500.jpg"/>
            
        <ul>
            {Array.isArray(presetList) ? presetList.map(preset => (
                <li key={preset.id}>{preset.name} <button>load</button> <button onClick={() => deletePreset(preset.id)}>delete</button></li>
            )) : <p>loading</p>}
        </ul>
        </>
    )
}

export default Presets;