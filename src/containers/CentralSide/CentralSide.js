import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSS from './CentralSide.css';
import Wallets from '../../components/UI/Wallets/Wallets';

class CentralSide extends Component {
	componentWillUpdate(){
		console.log('Central Side will update');
	}
    render() {
		let walletsList = null;
		if(!isEmptyObj(this.props.globalWallets)){
			walletsList = (
				<Wallets wallets={this.props.globalWallets} showSend={this.props.sendTransaction}/>
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