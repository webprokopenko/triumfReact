import React, { Component } from 'react';
import CSS from './SendTransaction.css';

class SendTransaction extends Component {
    render() {
        return (
            <div>
                <div className={CSS.right_side_send_transaction}>
                    <input type="text" name="public_key" className={CSS.input_send_transaction} />
                    <span className={CSS.label_send_transaction}>
                        PUBLIC KEY
                </span>
                    <input type="text" name="quantity" className={CSS.input_send_transaction} />
                    <span className={CSS.label_send_transaction}>
                        QUANTITY
                </span>
                    <input type="text" name="fee" className={CSS.input_send_transaction} />
                    <span className={CSS.label_send_transaction}>
                        NETWORK FEE
                </span>
                </div>
                <a href="/" className={CSS.button_send}>SEND</a>
            </div>
        )
    }
}

export default SendTransaction;