import React, {Component} from 'react';
import {connect} from 'react-redux';
import TransactionsUI from '../../components/Transactions/Transactions'

class Transactions extends Component{
    render(){
        return(
            <TransactionsUI 
            trList={this.props.globalWallets[this.props.id].transactions}
            logo={this.props.globalWallets[this.props.id].logo} 
            blockchain={this.props.globalWallets[this.props.id].blockchain}
            balance={this.props.globalWallets[this.props.id].balance}
            showSendTransaction = {this.props.showSendTransaction}
            showSendToken = {this.props.showSendToken}
            id={this.props.id}
            />
        );
    }
}
const MapStateToProps = state =>{
    return{
        globalWallets: state.wall.wallets,
        curr: state.curr.curr
    }
}
export default connect(MapStateToProps)(Transactions)