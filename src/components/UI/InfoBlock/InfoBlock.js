import React, { Component } from 'react';
import {connect} from 'react-redux';

import CSS from './InfoBlock.css';

class InfoBlock extends Component {
    render() {
        let id_wallet = this.props.id_wallet;
        let amount_usd = (this.props.globalWallets[id_wallet].balance!=='...'? (this.props.curr[this.props.globalWallets[id_wallet].blockchain].usd * this.props.globalWallets[id_wallet].balance): '...');
        return (
            <div>
                <div className={CSS.right_side_info_block}>
                    <img src={this.props.globalWallets[id_wallet].logo} className={CSS.right_side_info_img} alt="Triumf Wallet"/>
                    <span className={CSS.right_side_info_block_text_1}>
                        {this.props.globalWallets[id_wallet].blockchain}
                    </span>
                    <span className={CSS.right_side_info_block_text_2}>
                        {this.props.globalWallets[id_wallet].balance}
                    </span>
                    <span className={CSS.right_side_info_block_text_3}>
                        USD ~ $ {amount_usd}
                    </span>
                </div>
            </div>
        )
    }
}
const MapStateToProps = state =>{
    return{
        globalWallets: state.wall.wallets,
        curr: state.curr.curr
    }
}
export default connect(MapStateToProps)(InfoBlock)