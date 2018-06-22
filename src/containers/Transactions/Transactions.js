import React, { Component } from 'react';
import Transaction from '../../components/UI/Transaction/Transaction'
class Transactions extends Component {
    render () {
        return this.props.transactions.map( ( tr, index ) => {
            return <Transaction
                click={() => this.props.clicked( index )}
                from={tr.from}
                to={tr.to}
                value={tr.value}
                id={tr.id}/>
        } );
    }
}
export default Transactions;