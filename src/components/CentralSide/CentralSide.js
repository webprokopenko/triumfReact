import React, { Component } from 'react';
import CSS from './CentralSide.css';

import LogoBtc from '../../assets/images/icons/btc.png';
import LogoEth from '../../assets/images/icons/eth.png';

class CentralSide extends Component {
    render() {
        return (
            <div className={CSS.central_side}>
			<menu className="clearfix">
				<li href="/" className={[CSS.central_side_menu_item, CSS.central_side_menu_item_active, CSS.clearfix].join(' ')}>
					<a href="/" className="clearfix">
						<div className={CSS.central_side_menu_item_right}>
							<a href="/" className={CSS.central_side_menu_button_red}>$ 16752.29</a>
							<a href="/" className={CSS.central_side_menu_button_select}>SELECT WALLET</a>
						</div>
						<div className={CSS.central_side_menu_item_left}>
							<img src={LogoBtc} alt="Triumf crypto coin BTC" />
							<span className={CSS.central_side_menu_item_text_1}>
								BTC
							</span>
							<span className={CSS.central_side_menu_item_text_2}>
								0.0008962
							</span>
							<span className={CSS.central_side_menu_item_text_3}>
								USD ~ 136.75
							</span>
						</div>
					</a>
				</li>
				<li href="/" className={[CSS.central_side_menu_item, CSS.clearfix].join(' ')}>
					<div className={CSS.central_side_menu_item_right}>
						<a href="/" className={[CSS.central_side_menu_button_red, CSS.green].join(' ')}>$ 16752.29</a>
						<a href="/" className={CSS.central_side_menu_button_select}>SELECT WALLET</a>
					</div>
					<div className={CSS.central_side_menu_item_left}>
						<img src={LogoEth} alt="Triumf crypto coin ETH" />
						<span className={CSS.central_side_menu_item_text_1}>
							ETH
						</span>
						<span className={CSS.central_side_menu_item_text_2}>
							0.0008962
						</span>
						<span className={CSS.central_side_menu_item_text_3}>
							USD ~ 136.75
						</span>
					</div>
				</li>
				<li href="/" className={[CSS.central_side_menu_item, CSS.clearfix].join(' ')}>
					<div className={CSS.central_side_menu_item_right}>
						<a href="/" className={CSS.central_side_menu_button_red}>$ 16752.29</a>
						<a href="/" className={CSS.central_side_menu_button_select}>SELECT WALLET</a>
					</div>
					<div className={CSS.central_side_menu_item_left}>
						<img src={LogoBtc} alt="Triumf crypto coin BTC" />
						<span className={CSS.central_side_menu_item_text_1}>
							BTC
						</span>
						<span className={CSS.central_side_menu_item_text_2}>
							0.0008962
						</span>
						<span className={CSS.central_side_menu_item_text_3}>
							USD ~ 136.75
						</span>
					</div>
				</li>
			</menu>
			<a href="/" className={CSS.create_new_wallet_button}>
				CREATE NEW WALLET
			</a>
		</div>
        )
    }
}

export default CentralSide;