import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSS from './SendTransaction.css';
import Bch from '../../../services/Bch/Bch';
import Eth from '../../../services/Eth/Eth';

class SendTransaction extends Component {
    constructor(props){
        super(props);
        this.state = {
            to_address: '',
            quantity: 0,
            wallet:''
        }
        this.wallet = {}
        this.BlockChain = {};
    }
    componentWillMount(){
        this.setBlockChain(this.props.globalWallets[this.props.id])
    }
    sendTransaction(e){
        e.preventDefault();
        console.log('Send Transaction');
        console.log('prepare Transaction params: ');
        let trParams = this.prepareParamsToSendTransaction();
        this.BlockChain.sendTransaction(trParams);
    }
    prepareParamsToSendTransaction(){
        return  {
            FromAddress: this.wallet.address,
            PrivateKey: this.wallet.privateKey,
            ToAdress: this.state.to_address,
            Quantity: this.state.quantity,
        }
    }
    setBlockChain(obj){
        switch (obj.blockchain) {
            case 'bch':
                this.BlockChain = new Bch();
                this.wallet =  obj;
                break;
            
            default:
                break;
        }
    }

    render() {
        return (
            <div>
                <div className={CSS.right_side_send_transaction}>
                    <input type="text" name="public_key" className={CSS.input_send_transaction} value={this.state.to_address} onChange={(event) => this.setState({ to_address: event.target.value })}/>
                    <span className={CSS.label_send_transaction}>
                        TO PUBLIC KEY
                </span>
                    <input type="text" name="quantity" className={CSS.input_send_transaction} value={this.state.quantity} onChange={(event) => this.setState({ quantity: event.target.value })}/>
                    <span className={CSS.label_send_transaction}>
                        QUANTITY
                </span>
                    <input type="text" name="fee" className={CSS.input_send_transaction} />
                    <span className={CSS.label_send_transaction}>
                        NETWORK FEE
                </span>
                </div>
                <a href="/" onClick={(e)=>this.sendTransaction(e)} className={CSS.button_send}>SEND</a>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        globalWallets: state.wallets
    }
}
export default connect(mapStateToProps)(SendTransaction); 
