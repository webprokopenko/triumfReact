const InitialState = {
    wallets:[]
}

const reducer = (state = InitialState, action) => {
    if(action.type === 'ADD_WALLET'){
        return {
            ...state,
            wallets: [...state.wallets, action.wallet]
        }
    }
    return state;
};

export default reducer;