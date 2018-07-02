import React, { Component } from 'react';
import CSS from './RightSide.css';

import LogoBtc from '../../assets/images/icons/btc.png';
import LogoEth from '../../assets/images/icons/eth.png';

class RightSide extends Component {
    render() {
        return (
            <div className={CSS.right_side}>
            <div className={CSS.right_side_info_block}>
                <img src={LogoEth} className={CSS.right_side_info_img} alt="Triumf Crypto coin" />
                <span className={CSS.right_side_info_block_text_1}>
                    ETHEREUM
                </span>
                <span className={CSS.right_side_info_block_text_2}>
                    0.08962
                </span>
                <span className={CSS.right_side_info_block_text_3}>
                    USD ~ $ 1136.78
                </span>
            </div>
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

export default RightSide;