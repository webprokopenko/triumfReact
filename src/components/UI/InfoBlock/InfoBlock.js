import React, { Component } from 'react';
import CSS from './InfoBlock.css';

class InfoBlock extends Component {
    render() {
        return (
            <div>
                <div className={CSS.right_side_info_block}>
                    <img src={this.props.logo} className={CSS.right_side_info_img} alt='Triumf Crypto Coin' />
                    <span className={CSS.right_side_info_block_text_1}>
                        {this.props.blockchain}
                    </span>
                    <span className={CSS.right_side_info_block_text_2}>
                        {this.props.balance}
                    </span>
                    <span className={CSS.right_side_info_block_text_3}>
                        USD ~ $ {this.props.amount_usd}
                    </span>
                </div>
            </div>
        )
    }
}
export default InfoBlock