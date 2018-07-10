import React, { Component } from 'react';
import Transaction from './Transaction/Transaction';
import InfoBlock from '../UI/InfoBlock/InfoBlock';
import CSS from './Transaction/Transaction.css';

class Transactions extends Component {
    render() {
        let transactions = {}
        if(Array.isArray(this.props.trList)) {
             transactions = this.props.trList.map(tr => {
                return (
                    <Transaction
                        key={tr.id}
                        id={tr.id}
                        from={tr.from}
                        to={tr.to}
                        value={tr.value}
                        date={tr.date}
                        tr_in={tr.tr_in} />
                )
            });
        } else {
             transactions = (
                <div>
                    Transactions downloads
                </div>
            )
        }
        return (
            <div className={CSS.right_side}>
                < InfoBlock 
                    logo={this.props.logo}
                    blockchain={this.props.blockchain}
                    balance={this.props.balance}
                    amount_usd={this.props.amount_usd}
                 />

                 <div className={[CSS.right_side_button_block, CSS.clearfix].join(' ')}>
                    <a href="/" onClick={(e) => this.props.showSendTransaction(e, this.props.id)} className={[CSS.button_send, CSS.left].join(' ')}>SEND</a>
                    <a href="/" className={[CSS.button_resive, CSS.right].join(' ')}>RECIVE</a>
                </div>

                <div className={CSS.right_side_tr_history_block}>
                    <span className={CSS.right_side_tr_history_text_1}>
                        TRANSACTION HISTORY
				</span>
                    <div className={CSS.right_side_wrapp_tr_history}>
                        <menu className={CSS.right_side_tr_history_menu}>
                            <li className={CSS.right_side_tr_history_item} id='transactions_all'>
                                <a href="/" className={CSS.right_side_tr_history_link}>ALL</a>
                            </li>
                            <li className={CSS.right_side_tr_history_item} id='transactions_send'>
                                <a href="/" className={CSS.right_side_tr_history_link}>SEND</a>
                            </li>
                            <li className={CSS.right_side_tr_history_item} id='transactions_recived'>
                                <a href="/" className={CSS.right_side_tr_history_link}>RECIVED</a>
                            </li>
                            <li className={CSS.right_side_tr_history_item} id='transactions_exchanged'>
                                <a href="/" className={CSS.right_side_tr_history_link}>EXCHANGED</a>
                            </li>
                        </menu>
                    </div>
                    <div className={[CSS.right_side_tr_history_list, CSS.clearfix].join(' ')}>
                        <ul className={CSS.right_side_tr_history_ul}>
                            {transactions}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default Transactions;