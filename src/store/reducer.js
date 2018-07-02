const InitialState = {
    wallets:0
}

const reducer = (state = InitialState, action) => {
    if(action.type === 'ADD'){
        console.log(state.wallets);
        return {
            wallets: state.wallets + action.wallet 
        }
    }
    return state;
};

export default reducer;