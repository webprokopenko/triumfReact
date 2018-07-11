const InitialState = {
    curr: {
        'eth': {
            'usd': '...',
            'eur': '...',
          },
          'btc': {
            'usd': '...',
            'eur': '...',
          },
          'bch': {
            'usd': '...',
            'eur': '...',
          },
          'btg': {
            'usd': '...',
            'eur': '...',
          },
          'ltc': {
            'usd': '...',
            'eur': '...',
          },
    }
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