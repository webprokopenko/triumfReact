import React, {Component} from 'react';
import {connect} from 'react-redux';
import TransactionsUI from '../../components/Transactions/Transactions'

class Transactions extends Component{
    render(){
        console.log(this.props.globalWallets[this.props.id].transactions)
        let amount_usd = (this.props.globalWallets[this.props.id].balance!=='...'? (this.props.curr[this.props.globalWallets[this.props.id].blockchain].usd * this.props.globalWallets[this.props.id].balance): '...');
        return(
            <TransactionsUI 
            trList={this.props.globalWallets[this.props.id].transactions}
            logo={this.props.globalWallets[this.props.id].logo} 
            blockchain={this.props.globalWallets[this.props.id].blockchain}
            balance={this.props.globalWallets[this.props.id].balance}
            showSendTransaction = {this.props.showSendTransaction}
            id={this.props.id}
            amount_usd={amount_usd}
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