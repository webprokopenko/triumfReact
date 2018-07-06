import React, { Component } from 'react';
import CSS from './Transaction.css';

class Transaction extends Component {
    render() {
        let ClassTrInOut = this.props.tr_in ? CSS.tr_history_up : CSS.tr_history_down
        let FromTo = this.props.tr_in ? this.props.from : this.props.to
        return (
            <li className="right_side_tr_hisotry_item clearfix" key={this.props.id}>
                <div className="left">
                    <div className={ClassTrInOut}>{this.props.value}</div>
                    <div className={CSS.tr_history_address}>
                        {FromTo}
                    </div>
                </div>
                <div className={CSS.right}>
                    <div className={CSS.tr_history_date}>
                        {this.props.date}
                    </div>
                    <div className={CSS.tr_history_date}>
                        {this.props.date}
                    </div>
                </div>
            </li>
        )
    }
}

export default Transaction;