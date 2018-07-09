const InitialState = {
    wallets:[],
    curr:{}
}

const reducer = (state = InitialState, action) => {
    switch(action.type )
    {
        case 'ADD_WALLET':
            return {
                ...state,
                wallets: [...state.wallets, action.wallet]
            }
        case 'SET_BALANCE':
            let NewWallets = [...state.wallets];
            NewWallets.map(wallet =>{
                if(wallet.address === action.address) wallet.balance = action.balance;
            })
        return {
            ...state,
            wallets: NewWallets
        }
        case 'SET_CURR':
            return{
                ...state,
                curr:  action.curr,
            }
        default: 
            break;
    }

    return state;
};

export default reducer;