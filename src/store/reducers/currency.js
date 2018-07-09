const InitialState = {
    curr: {}
}

const reducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'SET_CURR':
            return {
                ...state,
                curr: action.curr,
            }
        default:
            break;
    }

    return state;
};

export default reducer;