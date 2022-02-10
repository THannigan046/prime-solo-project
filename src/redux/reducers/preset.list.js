const presetList = (state = [], action) => {
    switch (action.type) {
        case 'SET_PRESET_LIST':
            return action.payload.data
    }
    return state
}

export default presetList