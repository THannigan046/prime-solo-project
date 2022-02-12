import { combineReducers } from 'redux';

const noteReducer = (state = ["A3", "A3", "A3", "A3", "A3", "A3", "A3", "A3",], action) => {
    switch (action.type) {
        case 'SET_NOTES':
            return action.payload
    }
    return state
}

const kickReducer = (state = [null, null, null, null, null, null, null, null,], action) => {
    switch (action.type) {
        case 'SET_KICKS':
            return action.payload
    }
    return state
}

const snareReducer = (state = [null, null, null, null, null, null, null, null,], action) => {
    switch (action.type) {
        case 'SET_SNARES':
            return action.payload
    }
    return state
}

const hatReducer = (state = [null, null, null, null, null, null, null, null,], action) => {
    switch (action.type) {
        case 'SET_HATS':
            return action.payload
    }
    return state
}

const tomReducer = (state = [null, null, null, null, null, null, null, null,], action) => {
    switch (action.type) {
        case 'SET_TOMS':
            return action.payload
    }
    return state
}

const oscilReducer = (state = 'sine', action) => {
    switch (action.type) {
        case 'SET_OSCIL': 
            return action.payload
    }
    return state
}

const patternReducer = (state = 'up', action) => {
    switch (action.type) {
        case 'SET_PATTERN':
            return action.payload
    }
    return state
}

const presetName = (state = '', action) => {
    switch (action.type) {
        case 'SET_PRESET_NAME':
            return action.payload
    }
    return state
}
    
export default combineReducers({
    noteReducer, 
    kickReducer, 
    snareReducer, 
    hatReducer,
    tomReducer, 
    oscilReducer, 
    patternReducer, 
    presetName
})