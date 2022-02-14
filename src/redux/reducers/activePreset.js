const activePreset = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_PRESET':
            return action.payload
        case 'UPDATE_ACTIVE_PRESET':
            return {
                ...state,
                ...action.payload
            }
    }
    return state
}

export default activePreset