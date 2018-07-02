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
            {this.props.window}
        </div>
        )
    }
}

export default RightSide;