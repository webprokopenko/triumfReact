import React, { Component } from 'react';
import InfoBlock from '../InfoBlock/InfoBlock';
import {connect} from 'react-redux';

import Eth from '../../../services/Eth/Eth';
import CSS from './../ConfirmTransaction/ConfirmTransaction.css';

class ConfirmTransaction extends Component {
    componentWillMount() {
        this.BlockChain = new Eth();
        this.wallet = this.props.globalWallets[this.props.params[2]];
    }
    async sendTransaction(e) {
        e.preventDefault();
        console.log('Send Token Transaction');
        let trParams = await this.prepareParamsToSendTransaction();
        console.log('trParams: ');
        console.log(trParams);
        this.BlockChain.sendTokenEth(trParams);
    }
    async prepareParamsToSendTransaction() {
        let sysData = await this.getSystemData();
        let transactionCount = await this.BlockChain.getTransactionCount(this.wallet.address)

        return {
            transactionCount: transactionCount,
            gasPrice: sysData.gasPrice,
            PrivateKey: this.wallet.privateKey,
            ToAdress: this.props.params[0],
            Quantity: this.props.params[1],
            ToContract: this.props.params[3]
        }
    }
    async getSystemData() {
        let data = await this.BlockChain.getSystemData();
        return data;
    }
    render() {
        return (
            <div className={CSS.right_side}>
                < InfoBlock
                    id_wallet={this.props.params[2]}
                />

                <div className={CSS.right_side_send_transaction}>
                    <div className={CSS.right_side_confirm_transaction}>
                        <div className={CSS.text_send_transaction_1}>
                            ARE YOU SHURE YOU WANT TO MAKE THIS TRANSACTION?
                        </div>
                        <div className={CSS.text_send_transaction}>
                            {this.props.params[0]}
                        </div>
                        <div className={CSS.label_send_transaction}>
                            PUBLIC KEY
                        </div>
                        <div className={CSS.text_send_transaction}>
                            {this.props.params[1]} ($0.0 USD)
                        </div>
                        <div className={CSS.label_send_transaction}>
                            CONTRACT
                        </div>
                        <div className={CSS.text_send_transaction}>
                            {this.props.params[3]}
                        </div>
                        <div className={CSS.label_send_transaction}>
                            QUANTITY
                        </div>
                        <div className={CSS.text_send_transaction}>
                            0.0000000 ($0.0 USD)
                        </div>
                        <div className={CSS.label_send_transaction}>
                            NERWORK FEE
                        </div>
                    </div>
                </div>
                <a href="/" className={CSS.button_confirm} onClick={(e)=>this.sendTransaction(e)}>CONFIRM</a>
            </div>
        )
    }
}
const MapStateToProps = state =>{
    return{
        globalWallets: state.wall.wallets,
    }
}
export default connect(MapStateToProps)(ConfirmTransaction)