import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';


function* presetSaga() {
    yield takeLatest ('FETCH_ACTIVE_PRESET', fetchActivePreset)
    yield takeEvery('FETCH_PRESETS', fetchPresets)
    yield takeEvery('SAVE_PRESET_AS', savePresetAs)
    yield takeEvery('DELETE_PRESET', deletePreset)
    yield takeEvery('SAVE_PRESET', savePreset)
}


function* fetchActivePreset(action) {
    const res = yield axios.get(`/api/preset/${action.payload}`)
    yield put({
        type: 'UPDATE_ACTIVE_PRESET',
        payload: res.data
    })
}
function* savePreset(action) {
    yield axios.put(`/api/preset/${action.payload.id}`, action.payload)
    yield put({
        type:'SET_PRESET_LIST'
    })
}
function * deletePreset(action) {
   let response = yield axios.delete(`/api/preset/${action.payload}`)
    yield put({
        type: 'FETCH_PRESETS',
        payload: response.data
    })
}

function* savePresetAs(action) {
    console.log('action.payload is', action.payload);
    
    yield axios.post('/api/preset', action.payload)
    yield put ({ type: 'FETCH_PRESETS'})
}

function* fetchPresets() {
    try {
        const response = yield axios.get('/api/preset')
        console.log('response is', response);
        
        yield put({ type: 'SET_PRESET_LIST', payload: response })
    } catch (error) {
        console.log(error);
        
    }

}


export default presetSaga;