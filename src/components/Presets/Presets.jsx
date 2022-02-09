
import react, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
function Presets () {

    let [presetList, setPresetList] = useState([])

    useEffect(() => {
        getPresets()
    }, [])

    const getPresets = () => {
        axios({
            method: 'GET', 
            url: '/api/preset'
        }).then(res => {
            console.log('response is', res.data);
            setPresetList(res.data)
        }).catch(err => {
            console.log('get err', err);
        })
        
    }

    const deletePreset = (id) => {
        console.log('id is', id);
    }
    return(
        <>
        <h1>this is a presets page</h1>
        <h2>You can save and load presets over here</h2>
            <img src="https://i1.sndcdn.com/artworks-000191633248-ye4tjs-t500x500.jpg"/>
            
        <ul>
            {presetList.map(preset => (
                <li key={preset.id}>{preset.name} <button>load</button> <button onClick={() => deletePreset(preset.id)}>delete</button></li>
            ))}
        </ul>
        </>
    )
}

export default Presets;