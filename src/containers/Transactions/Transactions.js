import React, {Component} from 'react';
import {connect} from 'react-redux';
import TransactionsUI from '../../components/Transactions/Transactions'

import Bch from '../../services/Bch/Bch';
import Eth from '../../services/Eth/Eth';
import Btc from '../../services/Btc/Btc';
import Ltc from '../../services/Ltc/Ltc';

class Transactions extends Component{
    constructor(params){
        super(params);
        this.BlockChain={};
        this.wallet={};
        this.state={
            trList:{}
        }
        this.setBlockChain(this.props.globalWallets[this.props.id]);
    }
    async componentWillMount(){
        try {
            console.log(this.BlockChain);
            let tr = await this.BlockChain.getTransactionsList(this.wallet.address);
            this.setState({trList : this.BlockChain.prepareTransaction(tr,this.wallet.address)});
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
            case 'ltc':
                this.BlockChain = new Ltc();
                this.wallet =  obj;
                break;        
            default:
                break;
        }
    }
    render(){
        return(
            <TransactionsUI 
            trList={this.state.trList}
            logo={this.wallet.logo} 
            blockchain={this.wallet.blockchain}
            balance={this.wallet.balance}
            showSendTransaction = {this.props.showSendTransaction}
            id={this.props.id}
            />
        );
    }
}
const MapStateToProps = state =>{
    return{
        globalWallets: state.wallets
    }
}
export default connect(MapStateToProps)(Transactions)