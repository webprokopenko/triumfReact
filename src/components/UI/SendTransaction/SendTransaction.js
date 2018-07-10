import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfoBlock from '../InfoBlock/InfoBlock';
import CSS from './SendTransaction.css';
import Bch from '../../../services/Bch/Bch';
import Eth from '../../../services/Eth/Eth';
import Btc from '../../../services/Btc/Btc';
import Ltc from '../../../services/Ltc/Ltc';

class SendTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            to_address: '',
            quantity: 0,
            wallet: ''
        }
        this.wallet = {}
        this.BlockChain = {};
    }
    componentWillMount() {
        this.setBlockChain(this.props.globalWallets[this.props.id])
    }
    async sendTransaction(e) {
        e.preventDefault();
        console.log('Send Transaction');
        console.log('prepare Transaction params: ');
        let trParams = await this.prepareParamsToSendTransaction();
        this.BlockChain.sendTransaction(trParams);
    }
    async prepareParamsToSendTransaction() {
        if (this.wallet.blockchain !== 'eth') {
            return {
                FromAddress: this.wallet.address,
                PrivateKey: this.wallet.privateKey,
                ToAdress: this.state.to_address,
                Quantity: this.state.quantity,
            }
        } else {
            let sysData = await this.getSystemData();
            let transactionCount = await this.BlockChain.getTransactionCount(this.wallet.address)

            return {
                transactionCount: transactionCount,
                gasPrice: sysData.gasPrice,
                PrivateKey: this.wallet.privateKey,
                ToAdress: this.state.to_address,
                Quantity: this.state.quantity,
            }
        }
    }
    async getSystemData() {
        let data = await this.BlockChain.getSystemData();
        return data;
    }
    setBlockChain(obj) {
        switch (obj.blockchain) {
            case 'bch':
                this.BlockChain = new Bch();
                this.wallet = obj;
                break;
            case 'btc':
                this.BlockChain = new Btc();
                this.wallet = obj;
                break;
            case 'eth':
                this.BlockChain = new Eth();
                this.wallet = obj;
                break;
            case 'ltc':
                this.BlockChain = new Ltc();
                this.wallet = obj;
                break;    
            default:
                break;
        }
    }

    render() {
        let amount_usd = (this.wallet.balance!=='...'? (this.props.curr[this.wallet.blockchain].usd * this.wallet.balance): '...');
        return (
            <div className={CSS.right_side}>
                < InfoBlock 
                    logo={this.wallet.logo}
                    blockchain={this.wallet.blockchain}
                    balance={this.wallet.balance}
                    amount_usd={amount_usd}
                 />
                <div className={CSS.right_side_send_transaction}>
                    <input type="text" name="public_key" className={CSS.input_send_transaction} value={this.state.to_address} onChange={(event) => this.setState({ to_address: event.target.value })} />
                    <span className={CSS.label_send_transaction}>
                        TO PUBLIC KEY
                    </span>
                    <input type="text" name="quantity" className={CSS.input_send_transaction} value={this.state.quantity} onChange={(event) => this.setState({ quantity: event.target.value })} />
                    <span className={CSS.label_send_transaction}>
                        QUANTITY
                    </span>
                    <input type="text" name="fee" className={CSS.input_send_transaction} />
                    <span className={CSS.label_send_transaction}>
                        NETWORK FEE
                    </span>
                </div>
                <a href="/" onClick={(e) => this.sendTransaction(e)} className={CSS.button_send}>SEND</a>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        globalWallets: state.wall.wallets,
        curr: state.curr.curr
    }
}
export default connect(mapStateToProps)(SendTransaction); 
