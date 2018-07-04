import React, { Component } from 'react';
import { connect } from 'react-redux';
import Transaction from './Transaction/Transaction';
import CSS from './Transaction/Transaction.css';
import Bch from '../../../services/Bch/Bch';
import Eth from '../../../services/Eth/Eth';
import Btc from '../../../services/Btc/Btc';
class Transactions extends Component {
    constructor(params){
        super(params);
        this.BlockChain={};
        this.wallet={};
        this.setBlockChain(this.props.globalWallets[this.props.id]);
        this.state = {
            trList:[]
        }
    }
    async componentWillMount(){
        try {
            let tr = await this.BlockChain.getTransactionsList('0x' + this.wallet.address);
            let trList = this.BlockChain.prepareTransaction(tr, '0x' + this.wallet.address);
            this.setState({trList: trList});
        } catch (error) {
            console.log(error);
        }
    }
    
    setBlockChain(obj){
        switch (obj.blockchain) {
            case 'bch':
                this.BlockChain = new Bch();
                this.wallet =  obj;
                break;
            case 'btc':
                this.BlockChain = new Btc();
                this.wallet =  obj;
                break;
            case 'eth':
                this.BlockChain = new Eth();
                this.wallet =  obj;
                break;    
            default:
                break;
        }
    }
    render() {
         let transactions = this.state.trList.map(tr => {
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
        return (
            <div>
                <div className={[CSS.right_side_button_block, CSS.clearfix].join(' ')}>
                    <a href="/" className={[CSS.button_send, CSS.left].join(' ')}>SEND</a>
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
const MapStateToProps = state =>{
    return{
        globalWallets: state.wallets
    }
}
export default connect(MapStateToProps)(Transactions);