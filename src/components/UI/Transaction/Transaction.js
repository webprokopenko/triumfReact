import React, { Component } from 'react';
import './Transaction.css';

class Transaction extends Component {
    render() {
        return (
            <article className="Transaction" onClick={this.props.click}>

                <h1>Id: {this.props.id}</h1>
                <h1>From: {this.props.from}</h1>
                <div className="Info">
                    <div className="Author">To: {this.props.to}</div>
                    <div className="Author">Count: {this.props.value}</div>
                </div> 
            </article> 
        )
    }
}

export default Transaction;