import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfoBlock from '../InfoBlock/InfoBlock';
import CSS from './../SendTransaction/SendTransaction.css';

class SendTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            to_address: '',
            to_contract: '',
            quantity: 0,
        }
    }
    render() {
        return (
            <div className={CSS.right_side}>
                < InfoBlock 
                    id_wallet={this.props.id}
                 />
                <div className={CSS.right_side_send_transaction}>
                    <input type="text" name="public_key" className={CSS.input_send_transaction} value={this.state.to_address} onChange={(event) => this.setState({ to_address: event.target.value })} />
                    <span className={CSS.label_send_transaction}>
                        TO PUBLIC KEY
                    </span>
                    <input type="text" name="public_key" className={CSS.input_send_transaction} value={this.state.to_contract} onChange={(event) => this.setState({ to_contract: event.target.value })} />
                    <span className={CSS.label_send_transaction}>
                        FROM CONTRACT
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
                <a href="/" onClick={(e) => this.props.showConfirmToken(e,[this.state.to_address,this.state.quantity,this.props.id, this.state.to_contract])} className={CSS.button_send}>SEND</a>
                {/* <a href="/" onClick={(e) => this.sendTransaction(e)} className={CSS.button_send}>SEND</a> */}
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
