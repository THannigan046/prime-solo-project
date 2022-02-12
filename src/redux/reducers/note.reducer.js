const noteReducer = (state = ["A3", "A3", "A3", "A3", "A3", "A3", "A3", "A3",], action) => {
    switch (action.type) {
        case 'SET_NOTES': 
            return action.payload
    }
    return state
}

export default noteReducer;