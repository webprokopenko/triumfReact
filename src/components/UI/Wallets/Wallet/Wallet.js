import React, { Component } from 'react';
import CSS from  './Wallet.css';

class Wallet extends Component {
    showSendTransactionWindow(e, id){
        e.preventDefault();
        console.log('Show Transaction Window');
        console.log(id);
    }
    render() {
        return (
            <li href="/" className={[CSS.central_side_menu_item, CSS.central_side_menu_item_active, CSS.clearfix].join(' ')}>
                <a href="/" onClick={(e) => this.props.showSend(e, this.props.id)} className={CSS.clearfix}>
                    <div className={CSS.central_side_menu_item_right}>
                        <a href="/" className={CSS.central_side_menu_button_red}> {this.props.couse_usd} $</a>
                        <a href="/" onClick={(e) => this.showSendTransactionWindow(e, this.props.id)} className={CSS.central_side_menu_button_select}>SELECT WALLET</a>
                    </div>
                    <div className={CSS.central_side_menu_item_left}>
                        <img src={this.props.img} alt={this.props.alt} />
                        <span className={CSS.central_side_menu_item_text_1}>
                            {this.props.name}
                        </span>
                        <span className={CSS.central_side_menu_item_text_2}>
                            {this.props.amount}
                        </span>
                        <span className={CSS.central_side_menu_item_text_3}>
                            {this.props.amount_usd} $
                        </span>
                    </div>
                </a>
            </li>
        )
    }
}

export default Wallet;