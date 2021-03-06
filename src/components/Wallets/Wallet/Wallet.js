import React, { Component } from 'react';
import CSS from './Wallet.css';

class Wallet extends Component {
    render() {
        return (
            <li className={[CSS.central_side_menu_item, CSS.central_side_menu_item_active, CSS.clearfix].join(' ')}>
                <div className={CSS.central_side_menu_item_right}>
                    <a href="/" onClick={(e) => this.props.showTransactionsHistory(e, this.props.id)} className={CSS.central_side_menu_button_red}> {this.props.couse_usd} $</a>
                    <a href="/" onClick={(e) => this.props.showTransactionsHistory(e, this.props.id)} className={CSS.central_side_menu_button_select}>SELECT WALLET</a>
                </div>
                <div className={[CSS.central_side_menu_item_left, CSS.clearfix].join(' ')} onClick={(e) => this.props.showSend(e, this.props.id)}>
                    <img src={this.props.logo} alt='Triumf Crypto Coin' />
                    <div className={CSS.central_side_menu_item_text_1}>
                        {this.props.name}
                    </div>
                    <div className={CSS.central_side_menu_item_text_2}>
                        {this.props.amount}
                    </div>
                    <div className={CSS.central_side_menu_item_text_3}>
                        USD ~ {this.props.amount_usd} $
                        </div>
                </div>
            </li>
        )
    }
}

export default Wallet; 