import React, { Component } from 'react';
import CSS from './CentralSide.css';
import Wallets from '../../components/UI/Wallets/Wallets';

class CentralSide extends Component {
    render() {
        return (
            <div className={CSS.central_side}>
			<menu className="clearfix">
				<Wallets />
			</menu>
			<a href="/" className={CSS.create_new_wallet_button}>
				CREATE NEW WALLET
			</a>
		</div>
        )
    }
}

export default CentralSide;