const InitialState = {
    wallets: [],
}

const reducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'ADD_WALLET':
            return {
                ...state,
                wallets: [...state.wallets, action.wallet]
            }
        case 'SET_BALANCE':
            let NewWallets = [...state.wallets];
            NewWallets.map(wallet => {
                if (wallet.address === action.address) wallet.balance = action.balance;
            })
            return {
                ...state,
                wallets: NewWallets
            }

        case 'SET_TR-HISTORY':
            let NewWalletsHistory = [...state.wallets];
            NewWalletsHistory.map(wallet => {
                if (wallet.address === action.address) wallet.transactions = action.transactions
            })
            return {
                ...state,
                wallets: NewWalletsHistory
            }
        default:
            return state;
    }
};

export default reducer;