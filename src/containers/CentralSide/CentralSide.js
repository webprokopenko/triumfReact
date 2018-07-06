import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSS from './CentralSide.css';
import Wallets from '../../components/Wallets/Wallets';

class CentralSide extends Component {
    render() {
		let walletsList = null;
		if(!isEmptyObj(this.props.globalWallets)){
			walletsList = (
				<Wallets wallets={this.props.globalWallets} showSend={this.props.sendTransaction} showTransactionsHistory={this.props.transactionsHistory} />
			)
		}
        return (
            <div className={CSS.central_side}>
			<menu className="clearfix">
				{walletsList}
			</menu>
			<a href="/" onClick={this.props.createWallet} className={CSS.create_new_wallet_button}>
				CREATE NEW WALLET
			</a>
		</div>
        )
    }
}
const isEmptyObj = obj => {
	if(typeof obj === 'undefined') 
		return false;
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
const mapStateToProps = state => {
    return {
        globalWallets: state.wallets
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addNewWallet: (wallet) => dispatch({ type: 'ADD_WALLET', wallet: wallet })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CentralSide); 