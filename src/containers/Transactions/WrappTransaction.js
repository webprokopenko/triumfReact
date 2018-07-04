import Transactions from '../../components/UI/Transactions/Transactions';
import React, { Component } from 'react';
import axios from '../../axios';

class WrappTransaction extends Component {
    constructor( props ) {
      super( props );
      this.state = {
        transactions:[],
        showTransactions: false
      };
      this.downloadTransactions();
    }
    downloadTransactions = () => {
        axios.get(`v4.2/ETH/getTransactionsList/0xb4016d8ca33ab5970b1acdc3fb9a63a123a30638`)
            .then(resp => {
                const tra = resp.data.transactions.map((tr,key) => {
                    return {
                        ...tr,
                        id:key,
                        datetime: new Date(tr.timestamp * 1000),
                    }
                });
                this.setState({ transactions: tra, showTransactions: true });
            })
            .catch(error => {
                console.log(error);
            })
    }
    componentWillUpdate( NextProps, NextState ){
        console.log('Wrapp Transaction NextState:');
        console.log(NextState);
        console.log('Wrapp Transaction NextProps:');
        console.log(NextProps);
    }
    deletePersonHandler = ( id ) => {
        console.log('Delete: ' + id);
        // const persons = this.state.persons.slice();
        const tr = [...this.state.transactions];
        tr.splice( id, 1 );
        this.setState( { transactions: tr } );
    }
    render () {
        let transactions = null;
    
        if(this.state.showTransactions){
            transactions = <Transactions
            transactions={this.state.transactions}
            clicked={this.deletePersonHandler}/>;
        }
        return (
          <div >
            <button onClick={this.downloadTransactions}>Show TR</button>
            {transactions}
          </div>
        );
    }
}    
export default WrappTransaction;